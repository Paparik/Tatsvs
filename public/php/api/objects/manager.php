<?php
    require_once '../../database/dataBaseManager.php';
    require_once './classes/object.php';
    require_once './classes/object_data.php';
    require_once '../../encryption/encryption.php';
    require_once '../functions.php';
    require_once '../logs/manager.php';
    session_start();

    function Init(string $act, mixed $load) {
        $database = new DatabaseManager();
        $payload = $load;
        $data = null;
        $access = getAccess();

        switch($act) {
            case "getAll":
                $data = getAll($database);
                break;
            case "get":
                $data = get($database, $payload);
                break;
            case "set":
                if(!$access){
                    return ['code' => 400, 'message' => 'No access'];
                }
                else $data = set($database, $payload);
                break;
            case "create":
                if(!$access){
                    return ['code' => 400, 'message' => 'No access'];
                }
                else $data = create($database, $payload);
                break;
            case "createNewObject":
                if(!$access){
                    return ['code' => 400, 'message' => 'No access'];
                }
                else $data = createNewObject($database, $payload);
                break;
            case "setObjectMainParams":
                if(!$access){
                    return ['code' => 400, 'message' => 'No access'];
                }
                else $data = setObjectMainParams($database, $payload);
                break;
            case "delete":
                if(!$access){
                    return ['code' => 400, 'message' => 'No access'];
                }
                else $data = delete($database, $payload);
                break;
            default:
                $data = ['code' => 400, 'message' => 'Invalid action'];
                break;
        }
        return $data;
    }

    function delete($database, string $payload) {
        try {
            if (empty($payload)) {
                return ['code' => 400, 'message' => 'Bad Request: Missing required parameter'];
            }
            $result = $database->executeQuery("SELECT * FROM `objects_upd` WHERE `encrypted_id`=:encrypted_id", ['encrypted_id' => $payload]);

            if ($result && count($result) > 0) {
                LogsInit("create", [$_SESSION['username'], "ОБЪЕКТЫ", "Удалён объект ".$result[0]["name"]]);

                deleteAll('../../database/uploads/objects/'.$result[0]["id"]);
                $database->executeNonQuery("DELETE FROM `objects_upd` WHERE `encrypted_id`=:encrypted_id", ['encrypted_id' => $payload]);

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

    function setObjectMainParams($database, string $payload){
        try {
            $obj = json_decode($payload, true);
            if (empty($obj) || !isset($obj[0], $obj[1], $obj[2])) {
                return ['code' => 400, 'message' => 'Bad Request: Missing required parameter'];
            }
            $database->executeNonQuery(
                "UPDATE `objects_upd` SET `type`=:type, `name`=:name WHERE `encrypted_id`=:encrypted_id", 
                [
                    'encrypted_id' => $obj[0], 
                    'name' => $obj[1],
                    'type' => $obj[2]
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
            $allowedColumns = ['characteristics', 'spd', 'svn', 'skud', 'askue', 'apartmentAutomation', 'houseschem']; 
            $column = $obj[2];
            if (!in_array($column, $allowedColumns)) {
                return ['code' => 400, 'message' => 'Bad Request: Invalid column name'];
            }

            $sql = "UPDATE `objects_upd` SET `".$column."`=:value WHERE `encrypted_id` = :encrypted_id";

            $database->executeNonQuery($sql, 
                [
                    'encrypted_id' => $obj[0], 
                    'value' => json_encode($obj[1])
                ]
            );

            // LogsInit("create", [$_SESSION['username'], "ОБЪЕКТЫ", "Отредактирован объект ".$obj[3]]);
            return ['code' => 200, 'message' => 'Success!'];
        } catch (PDOException $e) {
            return ['code' => 501, 'message' => 'Database Error', 'error' => $e->getMessage()];
        } catch (Exception $e) {
            return ['code' => 500, 'message' => 'Internal Server Error set', 'error' => $e->getMessage()];
        }
    }

    function get($database, string $payload) {
        try {
            if (empty($payload)) {
                return ['code' => 400, 'message' => 'Bad Request: Missing required parameter'];
            }

            $result = $database->executeQuery("SELECT * FROM `objects_upd` WHERE `encrypted_id`=:encrypted_id", ['encrypted_id' => $payload]);
            if (!empty($result)) {
                $row = $result[0];
                $obj = new MapObjectData(
                    json_decode($row['characteristics']),
                    json_decode($row['spd']),
                    json_decode($row['svn']),
                    json_decode($row['skud']),
                    json_decode($row['askue']),
                    json_decode($row['apartmentAutomation']),
                    json_decode($row['houseschem'])
                );
                return ['code' => 200, 'data' => $obj, 'message' => 'Success!'];
            }
            else {
                return ['code' => 404, 'message' => 'Data not found'];
            }
            
        } catch (PDOException $e) {
            return ['code' => 501, 'message' => 'Database Error', 'error' => $e->getMessage()];
        } catch (Exception $e) {
            return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
        }
    }

    function getAll($database) {
        try {
            $result = $database->executeQuery("SELECT * FROM `objects_upd`");
            $list = [];
            if ($result && count($result) > 0) {
                foreach ($result as $row) {
                    $cable = new MapObject(
                        $row['encrypted_id'], 
                        $row['type'], 
                        json_decode($row['coords'], true), 
                        $row['name']
                    );
                    array_push($list, $cable);
                }
            }
            return ['code' => 200, 'data' => $list, 'message' => 'Success!'];
        } catch (PDOException $e) {
            return ['code' => 501, 'message' => 'Database Error', 'error' => $e->getMessage()];
        } catch (Exception $e) {
            return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
        }
    }

    function createNewObject($database, string $payload){
        try {
            $obj = json_decode($payload, true);
            if (!isset($obj[0], $obj[1])) {
                return ['code' => 400, 'message' => 'Bad Request: Missing required parameters'];
            }
            $objectKey = generateKey();
            $database->executeNonQuery(
                "INSERT INTO `objects_upd` (`type`, `coords`, `name`, `key_for_decrypt`, `characteristics`, `spd`, `svn`, `skud`, `askue`, `apartmentAutomation`, `houseschem`) VALUES (:type, :coords, :name, :key_for_decrypt, :characteristics, :spd, :svn, :skud, :askue, :apartmentAutomation, :houseschem);", 
                [
                    'type' => $obj[0]['characteristics']['type'],
                    'coords' => json_encode($obj[1]),
                    'name' => $obj[0]['name'],
                    'key_for_decrypt' => $objectKey,
                    'characteristics' => json_encode($obj[0]['characteristics']),
                    'spd' => json_encode($obj[0]['spd']),
                    'svn' => json_encode($obj[0]['svn']),
                    'skud' => json_encode($obj[0]['skud']),
                    'askue' => json_encode($obj[0]['askue']),
                    'apartmentAutomation' => json_encode($obj[0]['apartmentAutomation']),
                    'houseschem' => json_encode($obj[0]['houseschem'])
                ]
            );
            $lastInsertId = $database->db->lastInsertId();
            $encryptedId = encrypt($lastInsertId, $objectKey);
            $database->executeNonQuery("UPDATE `objects_upd` SET `encrypted_id`=:encrypted_id WHERE `id`=:id", ['id' => $lastInsertId, 'encrypted_id' => $encryptedId]);
            
            CreateDirectory('../../database/uploads/objects/'.$lastInsertId);

            LogsInit("create", [$_SESSION['username'], "ОБЪЕКТЫ", "Создан новый объект ".$obj[0]['name']]);
            return ['code' => 200, 'data' => $encryptedId, 'message' => 'Success!'];
        } catch (PDOException $e) {
            return ['code' => 501, 'message' => 'Database Error', 'error' => $e->getMessage()];
        } catch (Exception $e) {
            return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
        }
    }

    function create($database, string $payload) {
        try {
            // $obj = json_decode($payload, true);
            // if (!isset($obj[0], $obj[1], $obj[2])) {
            //     return ['code' => 400, 'message' => 'Bad Request: Missing required parameters'];
            // }
            // $objectKey = generateKey();
            // $database->executeNonQuery(
            //     "INSERT INTO `objects` (`type`, `coords`, `data`, `key_for_decrypt`) VALUES (:type, :coords, :data, :key_for_decrypt);", 
            //     [
            //         'type' => $obj[0],
            //         'coords' => json_encode($obj[1]),
            //         'data' => json_encode($obj[2]),
            //         'key_for_decrypt' => $objectKey
            //     ]
            // );
            // $lastInsertId = $database->db->lastInsertId();
            // $encryptedId = encrypt($lastInsertId, $objectKey);
            // $database->executeNonQuery("UPDATE `objects` SET `encrypted_id`=:encrypted_id WHERE `id`=:id", ['id' => $lastInsertId, 'encrypted_id' => $encryptedId]);
            
            // CreateDirectory('../../database/uploads/objects/'.$lastInsertId);

            // LogsInit("create", [$_SESSION['username'], "ОБЪЕКТЫ", "Создан новый объект ".$obj[0]]);
            // return ['code' => 200, 'data' => $encryptedId, 'message' => 'Success!'];
        } catch (PDOException $e) {
            return ['code' => 501, 'message' => 'Database Error', 'error' => $e->getMessage()];
        } catch (Exception $e) {
            return ['code' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()];
        }
    }
?>