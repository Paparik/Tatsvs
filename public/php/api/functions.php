<?php

// Проверка CSRF токена
function TokenVerification(string $token, string $csrf) {
    if (!isset($token) || $token !== $csrf) {
        return ['code' => 400, 'message' => 'Error: Invalid CSRF token'];
    }
    return ['code' => 200];
}

function CreateDirectory(string $path) {
    if (!is_dir($path)) {
        if (!mkdir($path, 0777, true)) {
            return ['code' => 500, 'message' => 'Failed to create directories'];
        }
    }
    return ['code' => 200, 'message' => 'Directory created successfully or already exists'];
}

function deleteFilesOnly(string $dir) {
    if (!is_dir($dir)) {
        return false;
    }
    $items = array_diff(scandir($dir), array('.', '..'));
    foreach ($items as $item) {
        $path = "$dir/$item";
        if (is_file($path)) {
            unlink($path);
        }
    }
    return true;
}

function deleteFilesOnlyByOld(string $dir, array $old) {
    if (!is_dir($dir)) {
        return false;
    }
    $items = array_diff(scandir($dir), array('.', '..'));
    foreach ($items as $item) {
        if (!in_array($item, $old)) {
            $path = "$dir/$item";
            if (is_file($path)) {
                unlink($path);
            }
        }
    }
    return true;
}

function deleteAll($dir) {
    if (!is_dir($dir)) {
        return false;
    }

    $items = array_diff(scandir($dir), array('.', '..'));
    foreach ($items as $item) {
        $path = "$dir/$item";
        if (is_dir($path)) {
            deleteAll($path);
        } else {
            unlink($path);
        }
    }

    try {
        rmdir($dir);
    } catch (Exception $e) {
        return ['code' => 500, 'message' => 'Failed to remove directory', 'error' => $e->getMessage()];
    }

    return true;
}

function getClientIp() {
    if (isset($_SERVER['HTTP_CLIENT_IP']) && filter_var($_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP)) {
        return $_SERVER['HTTP_CLIENT_IP'];
    }

    if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        foreach ($ips as $ip) {
            $ip = trim($ip);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }

    if (isset($_SERVER['REMOTE_ADDR']) && filter_var($_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP)) {
        return $_SERVER['REMOTE_ADDR'];
    }

    return 'UNKNOWN';
}

function getAccess() {
    if(isset($_SESSION['user_id'])) {
        if($_SESSION['role'] == 2) return true;
        else return false;
    }
    else return false;
}

function getModerAccess() {
    if(isset($_SESSION['user_id'])) {
        if($_SESSION['role'] == 1 || $_SESSION['role'] == 2) return true;
        else return false;
    }
    else return false;
}
?>