<?php
require_once '../functions.php';
require_once './manager.php';
session_start();

$action = null;
$payload = null;
$token = null;
$filesArray = [];

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['data'])) {
            $data = json_decode($_POST['data'], true);

            if (isset($data['action'], $data['payload'], $data['csrf_token'])) {
                $action = filter_var($data['action'], FILTER_SANITIZE_SPECIAL_CHARS);
                $payload = $data['payload'];
                $token = $data['csrf_token'];
            } else {
                respondWithJson(400, 'Bad Request: Missing required parameters');
            }

            if (!empty($_FILES['files'])) {
                $filesArray = $_FILES['files'];
            }
        } else {
            respondWithJson(400, 'Bad Request: Missing data parameter');
        }
    } else {
        respondWithJson(400, 'Bad Request: Invalid request method');
    }

    $tokenVerification = TokenVerification($token, $_SESSION['csrf_token']);
    if ($tokenVerification["code"] != 200) {
        respondWithJson($tokenVerification["code"], $tokenVerification['message']);
    }

    // Вызов функции Init и возврат результата
    $result = Init($action, $payload, $filesArray);

    header('Content-Type: application/json');
    if (isset($result['code'])) {
        http_response_code($result['code']);
    }
    echo json_encode($result);
} catch (Exception $e) {
    respondWithJson(500, 'Internal Server Error: ' . $e->getMessage());
}
exit;

// Функция для отправки JSON ответов
function respondWithJson($code, $message) {
    http_response_code($code);
    echo json_encode(['code' => $code, 'message' => $message]);
    exit;
}
?>