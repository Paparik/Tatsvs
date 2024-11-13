class CableChannel{
    #polyline;
    #schemaName;
    #schemaId;
    id;
    coords;
    name;
    cableChannelObject = {
        numKabChannel: '',
        schemaName: "",
        schemaId: "",
        start: '',
        finish: '',
        finishtype: '',
        length: '',
        diameter: '',
        material: '',
        KabLines: [],
        additionalParameters: []
    }

    constructor(id, coords, polyline, data, schemaName, schemaId){
        this.id = id;
        this.coords = coords;
        this.#schemaName = schemaName;
        this.#schemaId = schemaId;
        this.name = "Кабельный канал №" + id;
        this.#polyline = polyline;
        if(data != null) this.cableChannelObject = data;
        this.cableChannelObject.numKabChannel = id;
        this.cableChannelObject.schemaName = schemaName;
        this.cableChannelObject.schemaId = schemaId;
    }

    GetPolyline = () =>{
        return this.#polyline;
    }

    PolylineClick = () => {
        if(window.vueApp.state.cabChannelsActive){
            if(window.vueApp.state.mainType == 72) return;
            window.vueApp.setData(3, this.cableChannelObject);
            this.#polyline.setStyle({ color: 'rgba(255, 69, 0, 0.7)' }) 
        }
    }

    Destroy = () => {
        mapManager.Remove(this.#polyline);
    }
}