<?php
require_once '../../database/dataBaseManager.php';
require_once './classes/cableSchema.php';
require_once '../../encryption/encryption.php';
require_once '../functions.php';
require_once '../logs/manager.php';
session_start();

$database = new DatabaseManager();

function Init(string $act, mixed $load){
    global $database;
    $data = null;
    $access = getAccess();

    switch($act){
        case "getAll":
            $data = getAll($database);
            break;
        case "get":
            $data = get($database, $load);
            break;
        case "set":
            if(!$access){
                $data = ['code' => 400, 'message' => 'No access'];
                break;
            }
            else $data = set($database, $load);
            break;
        case "setName":
            if(!$access){
                $data = ['code' => 400, 'message' => 'No access'];
                break;
            }
            else $data = setName($database, $load);
            break;
        case "setNew":
            if(!$access){
                $data = ['code' => 400, 'message' => 'No access'];
                break;
            }
            else $data = setNew($database, $load);
            break;
        case "create":
            if(!$access){
                $data = ['code' => 400, 'message' => 'No access'];
                break;
            }
            else $data = create($database, $load);
            break;
        case "delete":
            if(!$access){
                $data = ['code' => 400, 'message' => 'No access'];
                break;
            }
            else $data = delete($database, $load);
            break;
        default:
            $data = ['code' => 400, 'message' => 'Invalid action'];
            break;
    }
    return $data;
}

function delete($database, string $payload) {
    try {
        if (!isset($payload)) {
            return ['code' => 400, 'message' => 'Bad Request: Missing required parameter'];
        }
        $result = $database->executeQuery("SELECT * FROM `cable_schemas` WHERE `encrypted_id`=:encrypted_id", ['encrypted_id' => $payload]);

        if ($result && count($result) > 0) {
            deleteAll('../../database/uploads/schemas/'.$result[0]["id"]);
            $database->executeNonQuery("DELETE FROM `cable_schemas` WHERE `encrypted_id`=:encrypted_id", ['encrypted_id' => $payload]);

            LogsInit("create", [$_SESSION['username'], "СХЕМЫ", "Удалёна схема"]);
            return ['code' => 200, 'message' => 'Success!'];
        } else {
            return ['code' => 404, 'message' => 'Data not found'];
        }
    } catch (PDOException $e) {
        return ['code' => 501, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error set', 'error' => $e->getMessage()];
    }
}

function setNew($database, mixed $payload) {
    try {
        $obj = json_decode($payload, true);
        $database->executeNonQuery(
            "UPDATE `cable_schemas` SET `name`=:name, `wells`=:wells, `channels`=:channels, `cableLines`=:cableLines WHERE `encrypted_id`=:id", 
            [
                'name' => $obj["name"],
                'wells' => json_encode($obj["wells"]),
                'channels' => json_encode($obj["channels"]),
                'cableLines' => json_encode($obj["cableLines"]),
                'id' => $obj["id"]
            ]
        );
        LogsInit("create", [$_SESSION['username'], "СХЕМЫ", "Отредактирована схема".$obj["name"]]);
        return ['code' => 200, 'message' => 'Success!'];
    } catch (PDOException $e) {
        return ['code' => 500, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
    }
}

function setName($database, string $payload) {
    try {
        $obj = json_decode($payload, true);
        if (empty($obj) || !isset($obj[0], $obj[1], $obj[2])) {
            return ['code' => 400, 'message' => 'Bad Request: Missing required parameter'];
        }
        $allowedColumns = ['name'];
        $column = $obj[2];
        if (!in_array($column, $allowedColumns)) {
            return ['code' => 400, 'message' => 'Bad Request: Invalid column name'];
        }

        $sql = "UPDATE `cable_schemas` SET `".$column."`=:value WHERE `encrypted_id` = :encrypted_id";

        $database->executeNonQuery($sql, 
            [
                'encrypted_id' => $obj[0],
                'value' => $obj[1]
            ]
        );

        return ['code' => 200, 'message' => 'Success!'];
    } catch (PDOException $e) {
        return ['code' => 501, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error set', 'error' => $e->getMessage()];
    }
}

function set($database, string $payload) {
    try {
        $obj = json_decode($payload, true);
        if (empty($obj) || !isset($obj[0], $obj[1], $obj[2])) {
            return ['code' => 400, 'message' => 'Bad Request: Missing required parameter'];
        }
        $allowedColumns = ['wells', 'channels', 'cableLines', 'files'];
        $column = $obj[2];
        if (!in_array($column, $allowedColumns)) {
            return ['code' => 400, 'message' => 'Bad Request: Invalid column name'];
        }

        $sql = "UPDATE `cable_schemas` SET `".$column."`=:value WHERE `encrypted_id` = :encrypted_id";

        $database->executeNonQuery($sql, 
            [
                'encrypted_id' => $obj[0],
                'value' => json_encode($obj[1])
            ]
        );

        return ['code' => 200, 'message' => 'Success!'];
    } catch (PDOException $e) {
        return ['code' => 501, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error set', 'error' => $e->getMessage()];
    }
}

function get($database, mixed $payload){
    try {
        $result = $database->executeQuery("SELECT * FROM `cable_schemas` WHERE `encrypted_id`=:encrypted_id", ['encrypted_id' => $payload]);

        if ($result && count($result) > 0){
            return ['code' => 200, 'data' => $result[0], 'message' => 'Success!'];
        } else {
            return ['code' => 404, 'message' => 'Data not found'];
        }
    } catch (PDOException $e) {
        return ['code' => 500, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
    }
}

function getAll($database){
    try {
        $result = $database->executeQuery("SELECT * FROM `cable_schemas`");
        $list = [];
        
        if ($result && count($result) > 0) {
            foreach ($result as $row) {
                $schem = new CableSchema($row['encrypted_id'], $row["name"], json_decode($row['files'], true), json_decode($row['wells'], true), json_decode($row['channels'], true), json_decode($row['cableLines'], true));
                array_push($list, $schem);
            }
            return ['code' => 200, 'data' => $list, 'message' => 'Success!'];
        } else {
            return ['code' => 200, 'data' => $list, 'message' => 'Success!'];
        }
    } catch (PDOException $e) {
        return ['code' => 500, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
    }
}

function create($database, mixed $payload){
    try {
        $obj = json_decode($payload, true);
        if (!isset($obj[0])) {
            return ['code' => 400, 'message' => 'Invalid Payload', 'error' => 'Missing required fields'];
        }
        $schemaKey = generateKey();
        $database->executeNonQuery(
            "INSERT INTO `cable_schemas` (`name`, `wells`, `channels`, `cableLines`, `key_for_decrypt`, `files`) VALUES (:name, :wells, :channels, :cableLines, :key_for_decrypt, :files);", 
            [
                'name' => $obj[0],
                'wells' => json_encode([]),
                'channels' => json_encode([]),
                'cableLines' => json_encode([]),
                'key_for_decrypt' => $schemaKey,
                'files' => json_encode([])
            ]
        );
        $lastInsertId = $database->db->lastInsertId();
        $encryptedId = encrypt($lastInsertId, $schemaKey);
        $database->executeNonQuery("UPDATE `cable_schemas` SET `encrypted_id`=:encrypted_id WHERE `id`=:id", ['id' => $lastInsertId, 'encrypted_id' => $encryptedId]);
        CreateDirectory('../../database/uploads/schemas/'.$lastInsertId);

        LogsInit("create", [$_SESSION['username'], "СХЕМЫ", "Создана новая кабельная схема ".$obj[0]]);
        return ['code' => 200, 'data' => $encryptedId, 'message' => 'Success!'];
    } catch (PDOException $e) {
        return ['code' => 500, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
    }
}
?>