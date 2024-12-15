<?php
    require_once './classes/file.php';
    require_once '../filesManager/manager.php';
    require_once '../../database/dataBaseManager.php';
    require_once '../functions.php';

    $database = null;

    function Init(string $act, string $payload, array $files) {
        global $database;

        if(!getAccess()){
            return ['code' => 400, 'message' => 'No access'];
        }

        $data = null;
        $database = new DatabaseManager();
        $payload = json_decode($payload, true);

        $id = getDecryptedId(getTypeFromAction($act), $payload[0]);
        if ($id['code'] != 200) {
            return ['code' => 400, 'message' => 'Invalid'];
        }
        $id = $id["data"];

        switch ($act) {
            case "saveObjectFiles":
                $uploadDir = "../../database/uploads/objects/".$id."/".$payload[2]."/".$payload[3];
                deleteFilesOnlyByOld($uploadDir, $payload[4]);
                if(count($files) !== 0){
                    $data = UploadImages($files, $uploadDir);
                }
                else{
                    $data = ['code' => 200]; 
                }
                break;
            case "saveSchemaFiles":
                $uploadDir = "../../database/uploads/schemas/".$id."/".$payload[2]."/".$payload[3];
                deleteFilesOnlyByOld($uploadDir, $payload[4]);
                if(count($files) !== 0){
                    $data = UploadImages($files, $uploadDir);
                }
                else{
                    $data = ['code' => 200];
                }
                break;
            default:
                $data = ['code' => 400, 'message' => 'Invalid action'];
                break;
        }

        // $uploadDir = getUploadDir($act, $id, $payload);
        // if ($uploadDir === null) {
        //     return ['code' => 400, 'message' => 'Invalid action'];
        // }

        // switch ($act) {
        //     case "saveObject":
        //     case "saveDrc":
        //     case "saveWells":
        //     case "saveWellsSchemas":
        //         $data = UploadImages($files, $uploadDir);
        //         break;
        //     case "deleteWell":
        //     case "deleteWellSchema":
        //     case "deleteDrc":
        //     case "deleteObject":
        //         deleteFilesOnly($uploadDir);
        //         $data = ['code' => 200];
        //         break;
        //     case "editWell":
        //     case "editWellSchema":
        //     case "editObjectPhoto":
        //     case "editDrc":
        //         deleteFilesOnly($uploadDir);
        //         $data = UploadImages($files, $uploadDir);
        //         break;
        //     case "editObjectFiles":
        //     case "deleteUnnecessaryFiles":
        //         deleteFilesOnlyByOld($uploadDir, $payload[3]);
        //         if ($act == "editObjectFiles") {
        //             $data = UploadImages($files, $uploadDir);
        //         }
        //         break;
        //     default:
        //         $data = ['code' => 400, 'message' => 'Invalid action'];
        //         break;
        // }
        return $data;
    }

    function getDecryptedId(string $type, string $encrypted_id){
        global $database;
        $result = $database->executeQuery("SELECT * FROM `$type` WHERE `encrypted_id`=:encrypted_id", ['encrypted_id' => $encrypted_id]);
        if ($result && count($result) > 0){
            return ['code' => 200, 'data' => decrypt($encrypted_id, $result[0]['key_for_decrypt']), 'message' => 'Success!'];
        } else {
            return ['code' => 404, 'message' => 'Data not found'];
        }
    }

    function getTypeFromAction(string $action): string {
        $actionToTypeMap = [
            "saveObjectFiles" => "objects_upd",
            "saveSchemaFiles" => "cable_schemas"
        ];
        return $actionToTypeMap[$action] ?? '';
    }
?>