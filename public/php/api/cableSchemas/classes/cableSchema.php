<?php
    class CableSchema {
        public string $id;
        public string $name;
        public array $wells;
        public array $channels;
        public array $cableLines;


        public function __construct(string $id, string $name, array $wells, array $channels, array $cableLines) {
            $this->id = $id;
            $this->name = $name;
            $this->wells = $wells;
            $this->channels = $channels;
            $this->cableLines = $cableLines;
        }
    }
?>