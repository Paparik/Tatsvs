<?php
require_once '../../database/dataBaseManager.php';
require_once '../classes/user.php';
require_once '../logs/manager.php';
session_start();

$database = null;

function Init(string $act, mixed $load) {
    global $database;

    $database = new DatabaseManager();
    $payload = $load;
    $data = null;
    $access = getModerAccess();

    switch($act) {
        case "getAll":
            if(!$access){
                $data = ['code' => 400, 'message' => 'No access'];
                break;
            }
            else $data = getAll();
            break;
        case "set":
            if(!$access){
                $data = ['code' => 400, 'message' => 'No access'];
                break;
            }
            else $data = set($payload);
            break;
        case "delete":
            if(!$access){
                $data = ['code' => 400, 'message' => 'No access'];
                break;
            }
            else $data = delete($payload);
            break;
        case "create":
            if(!$access){
                $data = ['code' => 400, 'message' => 'No access'];
                break;
            }
            else $data = create($payload);
            break;
        default:
            $data = ['code' => 400, 'message' => 'Invalid action'];
            break;
    }
    return $data;
}

function delete($payload) {
    global $database;
    try {
        $obj = json_decode($payload, true);
        if (!isset($payload)) {
            return ['code' => 400, 'message' => 'Bad Request: Missing required parameter'];
        }
        $database->executeNonQuery(
            "DELETE FROM `users` WHERE `id`=:id", ['id' => $obj[0]]
        );
        LogsInit("create", [$_SESSION['username'], "ПОЛЬЗОВАТЕЛИ", "Удалён пользователь"]);
    } catch (PDOException $e) {
        return ['code' => 501, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
    }
}

function set($payload) {
    global $database;
    try {
        $obj = json_decode($payload, true);
        if (!isset($payload)) {
            return ['code' => 400, 'message' => 'Bad Request: Missing required parameter'];
        }
        if($obj[2] == ""){
            $database->executeNonQuery(
                "UPDATE `users` SET `username`=:username, `role`=:role WHERE `id`=:id", ['id' => $obj[0], 'username' => $obj[1], 'role' => $obj[3]]
            );
            return;
        }
        $database->executeNonQuery(
            "UPDATE `users` SET `username`=:username, `password`=:pass, `role`=:role WHERE `id`=:id", ['id' => $obj[0], 'username' => $obj[1], 'pass' =>  password_hash($obj[2], PASSWORD_DEFAULT), 'role' => $obj[3]]
        );
        LogsInit("create", [$_SESSION['username'], "ПОЛЬЗОВАТЕЛИ", "Отредактирован пользователь"]);
    } catch (PDOException $e) {
        return ['code' => 500, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
    }
}

function getAll() {
    global $database;
    try {
        $result = $database->executeQuery("SELECT * FROM `users`");
        $list = [];
        if ($result && count($result) > 0) {
            foreach ($result as $row) {
                $user = new User($row['id'], $row['username'], $row["role"], "");
                array_push($list, $user);
            }
            return ['code' => 200, 'data' => $list, 'message' => 'Success!'];
        }
    } catch (PDOException $e) {
        return ['code' => 500, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
    }
}

function create($payload) {
    global $database;
    try {
        $obj = json_decode($payload, true);
        if (!isset($obj[0], $obj[1], $obj[2])) {
            return ['code' => 400, 'message' => 'Bad Request: Missing required parameters'];
        }

        $database->executeNonQuery(
            "INSERT INTO `users` (`username`, `password`, `role`) VALUES (:username, :password, :role);", 
            [
                'username' => $obj[0],
                'password' => password_hash($obj[1], PASSWORD_DEFAULT),
                'role' => $obj[2]
            ]
        );
        LogsInit("create", [$_SESSION['username'], "ПОЛЬЗОВАТЕЛИ", "Создан пользователь"]);
        return ['code' => 200, 'message' => 'Success!'];
    } catch (PDOException $e) {
        return ['code' => 500, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
    }
}
?>