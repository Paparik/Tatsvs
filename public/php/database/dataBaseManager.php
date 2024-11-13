<?php
    class DatabaseManager {
        public $db;
        private $lastError;
        private $config = null;

        public function __construct() {
            try {
                if ($this->config == null) {
                    $jsonFilePath = __DIR__."/databaseconfig.json";

                    $jsonContent = file_get_contents($jsonFilePath);
                    if ($jsonContent === false) {
                        throw new Exception("Ошибка при чтении файла конфигурации");
                    }
                    $data = json_decode($jsonContent, true);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        throw new Exception('Ошибка декодирования JSON: ' . json_last_error_msg());
                    }
                    $this->config = (object) [
                        'host' => $data["host"],
                        'dbname' => $data["dbname"],
                        'username' => $data["username"],
                        'password' => $data["password"]
                    ];
                }

                $dsn = "mysql:host=" . $this->config->host . ";dbname=" . $this->config->dbname . ";charset=utf8";
                $this->db = new PDO($dsn, $this->config->username, $this->config->password);
                $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
            } catch (PDOException $e) {
                $this->lastError = $e->getMessage();
                throw new Exception("Ошибка при подключении к базе данных: " . $e->getMessage());
            } catch (Exception $e) {
                $this->lastError = $e->getMessage();
                throw new Exception("Ошибка при работе с конфигурацией: " . $e->getMessage());
            }
        }

        public function executeQuery(string $query, array $params = []) {
            try {
                $stmt = $this->db->prepare($query);
                $stmt->execute($params);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $this->lastError = $e->getMessage();
                throw new Exception("Ошибка выполнения запроса: " . $e->getMessage());
            }
        }

        public function executeNonQuery(string $query, array $params = []) {
            try {
                $stmt = $this->db->prepare($query);
                $stmt->execute($params);
                return $stmt->rowCount();
            } catch (PDOException $e) {
                $this->lastError = $e->getMessage();
                throw new Exception("Ошибка выполнения запроса: " . $e->getMessage());
            }
        }

        public function getLastError() {
            return $this->lastError;
        }

        public function __destruct() {
            $this->db = null;
        }
    }
?>