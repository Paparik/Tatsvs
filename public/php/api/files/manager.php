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
            return $id;
        }

        $id = $id["data"];
        $uploadDir = getUploadDir($act, $id, $payload);
        if ($uploadDir === null) {
            return ['code' => 400, 'message' => 'Invalid action'];
        }

        switch ($act) {
            case "saveObject":
            case "saveDrc":
            case "saveWells":
            case "saveWellsSchemas":
                $data = UploadImages($files, $uploadDir);
                break;
            case "deleteWell":
            case "deleteWellSchema":
            case "deleteDrc":
            case "deleteObject":
                deleteFilesOnly($uploadDir);
                $data = ['code' => 200];
                break;
            case "editWell":
            case "editWellSchema":
            case "editObjectPhoto":
            case "editDrc":
                deleteFilesOnly($uploadDir);
                $data = UploadImages($files, $uploadDir);
                break;
            case "editObjectFiles":
            case "deleteUnnecessaryFiles":
                deleteFilesOnlyByOld($uploadDir, $payload[3]);
                if ($act == "editObjectFiles") {
                    $data = UploadImages($files, $uploadDir);
                }
                break;
            default:
                $data = ['code' => 400, 'message' => 'Invalid action'];
                break;
        }
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
            "saveObject" => "objects",
            "saveDrc" => "objects",
            "saveWells" => "cable_schemas",
            "saveWellsSchemas" => "cable_schemas",
            "deleteWell" => "cable_schemas",
            "deleteWellSchema" => "cable_schemas",
            "editWell" => "cable_schemas",
            "editWellSchema" => "cable_schemas",
            "editObjectPhoto" => "objects",
            "editObjectFiles" => "objects",
            "deleteUnnecessaryFiles" => "objects",
            "editDrc" => "objects",
            "deleteDrc" => "objects",
            "deleteObject" => "objects"
        ];
        return $actionToTypeMap[$action] ?? '';
    }

    function getUploadDir(string $action, string $id, array $payload): ?string {
        $baseDir = "../../database/uploads/";

        switch ($action) {
            case "saveObject":
            case "editObjectPhoto":
            case "deleteObject":
                return $baseDir . "objects/$id/{$payload[1]}/{$payload[2]}";
            case "saveDrc":
            case "editDrc":
            case "deleteDrc":
                return $baseDir . "objects/$id/houseschem/drc/{$payload[1]}";
            case "saveWells":
            case "editWell":
            case "deleteWell":
                return $baseDir . "schemas/$id/well/{$payload[1]}/well";
            case "saveWellsSchemas":
            case "editWellSchema":
            case "deleteWellSchema":
                return $baseDir . "schemas/$id/well/{$payload[1]}/wellSchem";
            case "editObjectFiles":
            case "deleteUnnecessaryFiles":
                return $baseDir . "objects/$id/{$payload[1]}/{$payload[2]}";
            default:
                return null;
        }
    }
?>