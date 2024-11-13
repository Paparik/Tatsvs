<?php
require_once '../functions.php';
require_once './manager.php';
session_start();

$action = null;
$payload = null;
$token = null;

// проверка методов запроса
switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        if (isset($_GET['action'], $_GET['payload'], $_GET['csrf_token'])) {
            $action = filter_var($_GET['action'], FILTER_SANITIZE_SPECIAL_CHARS);
            $payload = $_GET['payload'];
            $token = $_GET['csrf_token'];
        } else {
            http_response_code(400);
            echo json_encode(['code' => 400, 'message' => 'Bad Request: Missing required parameters']);
            exit;
        }
        break;
    case "POST":
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['action'], $data['payload'], $data['csrf_token'])) {
            $action = filter_var($data['action'], FILTER_SANITIZE_SPECIAL_CHARS);
            $payload = $data['payload'];
            $token = $data['csrf_token'];
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

// проверка CSRF токена
$tokenVerification = TokenVerification($token, $_SESSION['csrf_token']);
if ($tokenVerification["code"] != 200) {
    http_response_code($tokenVerification["code"]);
    echo json_encode($tokenVerification);
    exit;
}

// вызов функции Init и возврат результата
$result = Init($action, $payload);
if(isset($result['code'])){
    http_response_code($result['code']);
}
echo json_encode($result);
exit;
?>