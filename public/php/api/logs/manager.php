<?php
require_once 'log.php';
require_once '../../database/dataBaseManager.php';
require_once '../functions.php';
session_start();

function LogsInit(string $act, mixed $load){
    $database = new DatabaseManager();
    $payload = $load;
    $data = null;

    switch($act){
        case "create":
            $data = createLogs($database, $load);
            break;
        case "getAll":
            $data = getAllLogs($database);
            break;
        default:
            $data = ['code' => 400, 'message' => 'Invalid action'];
            break;
    }
    return $data;
}

function getAllLogs($database) {
    try {
        $result = $database->executeQuery("SELECT * FROM `logs` ORDER BY `date` DESC");
        $logs = [];
        
        if ($result && count($result) > 0) {
            foreach ($result as $row) {
                $date = new DateTime($row['date']);
                $log = new Log($date, $row["login"], $row["type"], $row["text"], $row["ip"]);
                array_push($logs, $log);
            }
        }
        return ['code' => 200, 'data' => $logs, 'message' => 'Success!'];
    } catch (PDOException $e) {
        return ['code' => 500, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
    }
}

function createLogs($database, array $payload) {
    try {
        $countQuery = "SELECT COUNT(*) AS count FROM `logs`;";
        $result = $database->executeQuery($countQuery);
        $rowCount = $result[0]['count'];
        if ($rowCount >= 100) {
            $deleteQuery = "DELETE FROM `logs` ORDER BY `date` ASC LIMIT 1;";
            $database->executeNonQuery($deleteQuery);
        }
        $currentDateTime = (new DateTime())->format('Y-m-d H:i:s');
        $insertQuery = "INSERT INTO `logs` (`date`, `login`, `type`, `text`, `ip`) VALUES (:date, :login, :type, :text, :ip);";
        $database->executeNonQuery(
            $insertQuery,
            [
                'date' => $currentDateTime,
                'login' => $payload[0],
                'type' => $payload[1],
                'text' => $payload[2],
                'ip' => getClientIp()
            ]
        );
        return ['code' => 200, 'message' => 'Success!'];
    } catch (PDOException $e) {
        return ['code' => 500, 'message' => 'Database Error', 'error' => $e->getMessage()];
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
    }
}
?>