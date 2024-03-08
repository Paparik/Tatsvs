class Constructor {
    constructor() {
        this.points = [];
        this.selectedPoint = null;
        this.lines = [];
        this.dynamicLine = null;
        this.updateTimeout;
        this.main();
    }

    mouseclick = (coords) => {
        let id = this.points.length;
        let dasd = `<br><br>Тип:<br><button onclick="changePoint('well')">колодец</button><br><button onclick="changePoint('object')">объект</button><br><button onclick="changePoint('bend')">изгиб</button><br><button onclick="changePoint('delete')">удалить</button>`

        let marker = L.marker(L.latLng(coords), { opacity: 1, visible: true, interactive: true, icon: customIcon, pane: 'markerPane' })
        marker.addTo(GLOBALMAP)
        marker.bindPopup("Колодец № " + id + " " + dasd);
        marker.on('click', () => { 
            this.selectedPoint = this.points.find(x => x.id == id)
        });
        let newPoint = { 
            id: id,
            name: "Колодец №" + id,
            type: "WELL",
            coords: coords,
            marker: marker,
            wells: []
        };
        this.points.push(newPoint);
        this.createLine(id, coords)
        this.selectedPoint = newPoint;
    }

    createLine = (id, coords) => {
        if(this.selectedPoint != null){
            let polyline = L.polyline([this.selectedPoint.coords, coords], { color: 'rgba(205, 92, 92, 0.4)', weight: 8 })
            polyline.addTo(GLOBALMAP)
            this.lines.push({ id: id, line: polyline });
            this.points[this.selectedPoint.id].wells.push(this.points[id])
        }
    }

    changePointConstructor = (a) => {
        switch(a){
            case "delete":
                if (this.selectedPoint) {
                    // Удаляем маркер
                    this.selectedPoint.marker.remove();
                    
                    // Удаляем связанные линии
                    for (let i = 0; i < this.lines.length; i++) {
                        const line = this.lines[i];
                        const lineCoords = line.line.getLatLngs();
                        const startPointCoords = lineCoords[0];
                        const endPointCoords = lineCoords[lineCoords.length - 1];
                        
                        if (startPointCoords.equals(this.selectedPoint.coords) || endPointCoords.equals(this.selectedPoint.coords)) {
                            line.line.remove();
                            this.lines.splice(i, 1);
                            i--; // Уменьшаем индекс, так как удалили элемент из массива
                        }
                    }
                    
                    // Удаляем точку из массива
                    const index = this.points.findIndex(point => point === this.selectedPoint);
                    if (index !== -1) {
                        this.points.splice(index, 1);
                    }
                    
                    // Обновляем выбранную точку
                    this.selectedPoint = null;
                    if (this.points.length > 0) {
                        this.selectedPoint = this.points[this.points.length - 1];
                    }
                }
                break;
            default:
                console.error("Invalid action:", a);
                break;
        }
    }
    
    
    

    deletePoint(){

    }

    mousemove = (coords) => {
        clearTimeout(this.updateTimeout);

        this.updateTimeout = setTimeout(() => {
            if (this.selectedPoint != null) {
                let lastCoords = this.selectedPoint.coords;
                if (this.dynamicLine == null) {
                    this.dynamicLine = L.polyline([lastCoords, coords], { color: 'rgba(58, 255, 24, 0.4)', weight: 4 }).addTo(GLOBALMAP);
                }
                this.dynamicLine.setLatLngs([lastCoords, coords]);
                this.dynamicLine.redraw();
            }
        }, 5);
    }

    main() {
        GLOBALMAP.on('click', (e) => { this.mouseclick(e.latlng); });
        GLOBALMAP.on('mousemove', (e) => { this.mousemove(e.latlng); });
    }

    destroy() {
        GLOBALMAP.off('click', this.mouseclick);
        GLOBALMAP.off('mousemove', this.mousemove);
    }
}
