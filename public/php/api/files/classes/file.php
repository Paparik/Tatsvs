<?php
    class NewFile {
        public string $name;
        public string $path;
        public string $time;

        public function __construct(string $name, string $path) {
            $this->name = $name;
            $this->path = $path;
            $this->time = date("Y-m-d H:i:s");
        }
    }
?>