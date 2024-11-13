<?php
require_once '../files/classes/file.php';
require_once '../functions.php';
require_once '../../encryption/encryption.php';

function UploadImages(array $files, string $path){
    $arrayNewFiles = [];
    $maxWidth = 800;
    $maxHeight = 600;

    foreach ($files['tmp_name'] as $key => $tmp_name) {
        $originalFileName = basename($files['name'][$key]);
        $fileTmpPath = $files['tmp_name'][$key];
        $fileSize = $files['size'][$key];
        $fileError = $files['error'][$key];

        if ($fileError === UPLOAD_ERR_OK) {
            if ($fileSize > (20 * 1024 * 1024)) continue;

            $fileExtension = pathinfo($originalFileName, PATHINFO_EXTENSION);
            $timestamp = time();
            $safeFileName = preg_replace('/[^a-zA-Z0-9_\.\-а-яА-ЯёЁ]/u', '_', pathinfo($originalFileName, PATHINFO_FILENAME));
            $uniqueFileName = $safeFileName . '_' . $timestamp . '.' . $fileExtension;
            $destination = $path . '/' . $uniqueFileName;

            $directoryaresult = CreateDirectory($path);
            if($directoryaresult["code"] != 200){
                return $directoryaresult;
            }


            $fileInfo = getimagesize($fileTmpPath);
            if ($fileInfo !== false) {
                $mime = $fileInfo['mime'];
                if (!in_array($mime, ['image/jpeg', 'image/png', 'image/gif'])) continue;

                list($origWidth, $origHeight) = $fileInfo;
                $ratio = $origWidth / $origHeight;
                if ($maxWidth / $maxHeight > $ratio) {
                    $newWidth = $maxHeight * $ratio;
                    $newHeight = $maxHeight;
                } else {
                    $newHeight = $maxWidth / $ratio;
                    $newWidth = $maxWidth;
                }

                $newWidth = (int)$newWidth;
                $newHeight = (int)$newHeight;

                $image_p = imagecreatetruecolor($newWidth, $newHeight);
                switch ($mime) {
                    case 'image/jpeg':
                        $image = imagecreatefromjpeg($fileTmpPath);
                        break;
                    case 'image/png':
                        $image = imagecreatefrompng($fileTmpPath);
                        break;
                    case 'image/gif':
                        $image = imagecreatefromgif($fileTmpPath);
                        break;
                    default:
                        continue 2;
                }

                imagecopyresampled($image_p, $image, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight);

                switch ($mime) {
                    case 'image/jpeg':
                        imagejpeg($image_p, $destination, 100);
                        break;
                    case 'image/png':
                        imagepng($image_p, $destination);
                        break;
                    case 'image/gif':
                        imagegif($image_p, $destination);
                        break;
                }

                imagedestroy($image_p);
                imagedestroy($image);
            } else {
                if (!move_uploaded_file($fileTmpPath, $destination)) {
                    continue;
                }
            }

            $encr = encrypt($destination, "6d28df036e31a9809d1cdce9e4ef68092ff1a9ae9ef97774183a28140515d777");
            $encrypted_path = rawurlencode($encr);

            $newFile = new NewFile($uniqueFileName, "./php/api/filesManager/getImage.php?fd=$encrypted_path");
            $arrayNewFiles[] = $newFile;
        } else {
            continue;
        }
    }
    return ['code' => 200, 'message' => 'Files saved successfully', 'files' => json_encode($arrayNewFiles)];
}
?>