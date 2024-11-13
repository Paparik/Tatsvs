class Well{
    id;
    coords;
    wellObject = {
        id: '',
        schemaName: '',
        schemaId: '',
        numWell: '',
        typeWell: '',
        typeLuke: '',
        imgWell: { reader: {name: null, path: null }, file: null},
        imgWellSchem: { reader: {name: null, path: null }, file: null},
        desc: '',
        additionalParameters: []
    };
    #schemaName;
    #schemaId;
    #marker;

    constructor(id, coords, marker, data, schemaName, schemaId){
        this.id = id;
        this.coords = coords;
        this.#marker = marker;
        this.#schemaName = schemaName;
        this.#schemaId = schemaId;
        if(data != null) this.wellObject = data;
        this.wellObject.id = id;
        this.wellObject.schemaName = schemaName;
        this.wellObject.schemaId = schemaId;
    }

    getMarker = () => {
        return this.#marker;
    }

    MarkerClicked = () => {
        if(window.vueApp.state.cabChannelsActive){
            if(constructorManager.object != null && constructorManager.object.cableSchem != null){
                if(constructorManager.object.cableSchem.name != this.#schemaName) return;
                constructorManager.object.selectedPoint = this;
            }
            else{
                window.vueApp.setData(2, this.wellObject);
                if(!this.wellObject.typeWell.includes("Ввод") && !this.wellObject.typeWell.includes("ввод")) this.#marker.setIcon(constructorManager.GetIcon("Колодец", 1));
            }
        }
    }

    ContextClicked = () => {
        let coords1 = constructorManager.object.selectedPoint.getMarker().getLatLng();
        let coords2 = this.coords;
        if(constructorManager.object != null && constructorManager.object.cableSchem != null && constructorManager.object.cableSchem.name == this.#schemaName){
            if(constructorManager.object.FindPolyline(coords1, coords2) == null && constructorManager.object.FindPolyline(coords2, coords1) == null){
                constructorManager.object.createLine(this);
                constructorManager.object.selectedPoint = this;
            }
        }
    }

    Destroy = () => {
        mapManager.Remove(this.#marker);
    }
}