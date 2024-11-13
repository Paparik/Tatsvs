<?php
    class User {
        public int $id;
        public string $username;
        public int $role;   
        public string $password;   


        public function __construct(int $id, string $username, int $role, string $password) {
            $this->id = $id;
            $this->username = $username;
            $this->role = $role;
            $this->password = $password;
        }
    }
?>