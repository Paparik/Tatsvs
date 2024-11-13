<?php
require_once '../functions.php';
require_once './manager.php';
session_start();

// Проверка методов запроса
function handleRequest() {
    switch ($_SERVER['REQUEST_METHOD']) {
        case "GET":
            return handleGetRequest();
        default:
            respondWithJson(400, 'Bad Request: Invalid request method');
            break;
    }
}

function handleGetRequest() {
    if (isset($_GET['action'], $_GET['payload'], $_GET['csrf_token'])) {
        $action = filter_var($_GET['action'], FILTER_SANITIZE_SPECIAL_CHARS);
        $payload = $_GET['payload'];
        $token = $_GET['csrf_token'];

        validateCsrfToken($token);
        return LogsInit($action, $payload);
    } else {
        respondWithJson(400, 'Bad Request: Missing required parameters');
    }
}

function validateCsrfToken($token) {
    $tokenVerification = TokenVerification($token, $_SESSION['csrf_token']);
    if ($tokenVerification["code"] != 200) {
        respondWithJson($tokenVerification["code"], $tokenVerification['message']);
    }
}

function respondWithJson($code, $message) {
    http_response_code($code);
    echo json_encode(['code' => $code, 'message' => $message]);
    exit;
}

try {
    $result = handleRequest();
    http_response_code($result['code'] ?? 200);
    echo json_encode($result);
} catch (Exception $e) {
    respondWithJson(500, 'Internal Server Error: ' . $e->getMessage());
}
exit;
?>