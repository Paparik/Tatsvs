<?php
    class MapObjectData {
        public object $characteristics;
        public object $spd;
        public object $svn;
        public object $skud;
        public object $askue;
        public object $apartmentAutomation;
        public object $houseschem;


        public function __construct(
            object $characteristics, 
            object $spd, 
            object $svn, 
            object $skud, 
            object $askue, 
            object $apartmentAutomation, 
            object $houseschem
        ) {
            $this->characteristics = $characteristics;
            $this->spd = $spd;
            $this->svn = $svn;
            $this->skud = $skud;
            $this->askue = $askue;
            $this->apartmentAutomation = $apartmentAutomation;
            $this->houseschem = $houseschem;
        }
    }
?>