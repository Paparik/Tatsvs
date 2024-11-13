<?php
    class MapObject {
        public string $id;
        public string $type;
        public array $coords;
        public object $data;


        public function __construct(string $id, string $type, array $coords, object $data) {
            $this->id = $id;
            $this->type = $type;
            $this->coords = $coords;
            $this->data = $data;
        }
    }
?>