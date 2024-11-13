<?php
    session_start();

    function checkAuth() {
        if(isset($_SESSION['user_id']) && !empty($_SESSION['csrf_token'])) return true;
        else return false;
    }

    function getUsername() {
        if(isset($_SESSION['user_id'])) return $_SESSION['username'];
        else return false;
    }

    function getRole() {
        if(isset($_SESSION['user_id'])) {
            switch($_SESSION['role']){
                case 0: return "Пользователь";
                case 1: return "Модератор";
                case 2: return "Администратор";
            }
        }
        else return "Пользователь";
    }
?>