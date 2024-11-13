<?php
require_once '../../database/dataBaseManager.php';
// require_once '../classes/user.php';
require_once '../logs/manager.php';

$database = null;

function Init(string $act, string $load) {
    global $database;

    $database = new DatabaseManager();
    $data = null;

    switch($act) {
        case "login":
            $load = json_decode($load);
            $username = $load[0];
            $password = $load[1];

            $user = $database->executeQuery("SELECT * FROM `users` WHERE `username`=:username", ['username' => $username]);
    
            if ($user && password_verify($password, $user[0]['password'])) {
                $_SESSION['user_id'] = $user[0]['id'];
                $_SESSION['username'] = $user[0]['username'];
                $_SESSION['role'] = $user[0]['role'];
                $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
                
                LogsInit("create", [$user[0]['username'], "АВТОРИЗАЦИЯ", "Вход в аккаунт"]);
                $data = ['code' => 200, 'message' => 'Success'];
            } 
            else {
                $data = ['code' => 201, 'message' => 'Invalid data'];
            }
            break;
        default:
            $data = ['code' => 400, 'message' => 'Invalid action'];
            break;
    }
    return $data;
}
?>