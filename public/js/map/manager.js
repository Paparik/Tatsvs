class MapManager {
    mapConfig = {
        coords: [55.79008712193883, 49.12811279296876],
        zoom: 11
    }
    allMarkers = [];
    allPolylines = [];
    GLOBALMAP = null;

    constructor(){
        this.allMarkers = [];
        this.allPolylines = [];
        this.GLOBALMAP = L.map('map').setView(this.mapConfig.coords, this.mapConfig.zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors', maxZoom: 21 }).addTo(this.GLOBALMAP);
        setTimeout(() => {

        }, 1000);
        this.Init()
    }

    Init = () => {
        this.GLOBALMAP.on('click', (e) => { constructorManager.mouseclick(e.latlng); });
        this.GLOBALMAP.on('mousemove', (e) => { constructorManager.mousemove(e.latlng); });
    }

    CableChannelsVisible = (toggle) => {
        this.allMarkers.forEach(element => {
            if(element.options.schema == true){
                element.setOpacity(Number(toggle))
            }
        });
        this.allPolylines.forEach(element => {
            if(element.options.schema){
                element.setStyle({opacity: Number(toggle)})
            }
        });
    }

    CreateMarker = (coords, markerObj, type = false) =>{
        let marker = L.marker(L.latLng(coords), markerObj);
        if(this.allMarkers.includes(marker)) return null;
        
        marker.addTo(this.GLOBALMAP);
        this.allMarkers.push(marker);
        return marker;   
    }

    CreatePolyline = (coords, polylineObj, type = false) =>{
        let polyline = L.polyline(coords, polylineObj);
        polyline.shema = type;
        if(this.allPolylines.includes(polyline)) return null;

        polyline.addTo(this.GLOBALMAP);
        this.allPolylines.push(polyline);
        return polyline;
    }

    Remove = async (obj) => {
        if(this.allMarkers.includes(obj)){
            this.allMarkers.splice(this.allMarkers.indexOf(obj), 1);
        }
        if(this.allPolylines.includes(obj)){
            this.allPolylines.splice(this.allPolylines.indexOf(obj), 1);
        }
        await this.GLOBALMAP.removeLayer(obj);
    }
}