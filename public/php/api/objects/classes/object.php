<?php
    class MapObject {
        public string $id;
        public string $type;
        public array $coords;
        public string $name;


        public function __construct(string $id, string $type, array $coords, string $name) {
            $this->id = $id;
            $this->type = $type;
            $this->coords = $coords;
            $this->name = $name;
        }
    }
?>