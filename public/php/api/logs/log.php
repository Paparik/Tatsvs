<?php
    class Log {
        public DateTime $date;
        public string $login;
        public string $type;
        public string $text;
        public string $ip;

        public function __construct(DateTime $date, string $login, string $type, string $text, string $ip) {
            $this->date = $date;
            $this->login = $login;
            // $types = ["ПОЛЬЗОВАТЕЛИ", "АВТОРИЗАЦИЯ", "ОБЪЕКТЫ", "СХЕМЫ"];
            $this->type = $type;
            $this->text = $text;
            $this->ip = $ip;
        }
    }
?>