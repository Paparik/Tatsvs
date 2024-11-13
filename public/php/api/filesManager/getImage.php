<?php
    require_once '../functions.php';
    require_once '../../encryption/encryption.php';
    session_start();
    
    if (isset($_GET['fd']) && isset($_GET['csrf_token'])) {
        $tokenVerification = TokenVerification($_GET['csrf_token'], $_SESSION['csrf_token']);
        if ($tokenVerification["code"] != 200) {
            http_response_code($tokenVerification["code"]);
            echo json_encode($tokenVerification);
            exit;
        }

        $filePath = decrypt(rawurldecode($_GET['fd']), "6d28df036e31a9809d1cdce9e4ef68092ff1a9ae9ef97774183a28140515d777");
        if (file_exists($filePath)) {
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename=' . basename($filePath));
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($filePath));
            readfile($filePath);
            exit;
        } else {
            echo "...";
            exit;
        }
    } else {
        echo "Invalid request.";
        exit;
    }
?>