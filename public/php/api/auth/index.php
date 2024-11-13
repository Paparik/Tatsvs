<?php
require_once './manager.php';
session_start();

// проверка методов запроса
switch ($_SERVER['REQUEST_METHOD']) {
    case "POST":
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['action'], $data['payload'], $data['csrf_token'])) {
            $result = Init($data['action'], $data['payload']);
            http_response_code($result['code']);
            echo json_encode($result);
        } else {
            http_response_code(400);
            echo json_encode(['code' => 400, 'message' => 'Bad Request: Missing required parameters']);
            exit;
        }
        break;
    default:
        http_response_code(400);
        echo json_encode(['code' => 400, 'message' => 'Bad Request: Invalid request method']);
        exit;
}
?>