class CableLinesConstructor{
    updateTimeout = null;
    dynamicLine = null;
    cableSchem = null;
    selectedPoint = null;

    constructor(schem = null) {
        if(schem == null){
            this.cableSchem = new CableSchema((cableSchemasManager.cableSchemas.length+1), "", [], [], []);
        }
        else this.cableSchem = schem;
    }

    FindPolyline = (coords1, coords2) => {
        return this.cableSchem.GetCableChannelsManager().findChannelByCoords([coords1, coords2]);
    }

    EditLine = (type, obj) => {
        switch(type){
            case 0:
                window.vueApp.setData(42, obj);
            break;
            case 1:
                // window.vueApp.state.newScheme.cableLines[window.vueApp.state.newScheme.cableLines.findIndex(x => x.id === obj.numKabLine)] = obj;
                // window.vueApp.state.mainType = 72;
                window.vueApp.cancelEditLine(obj)

            break;
        }
    }

    EditChannel = (type, obj) => {
        switch(type){
            case 0:
                let channel = this.cableSchem.GetCableChannelsManager().GetChannelById(obj);
                window.vueApp.setData(32, channel.cableChannelObject);
            break;
            case 1:
                let newChannel = this.cableSchem.GetCableChannelsManager().GetChannelById(Number(obj.numKabChannel));
                newChannel.cableChannelObject = obj;
                // window.vueApp.state.newScheme.kls[window.vueApp.state.newScheme.kls.findIndex(x => x.id === newChannel.id)] = newChannel;
                // window.vueApp.state.mainType = 72;
                window.vueApp.cancelEditChannel(newChannel)
            break;
        }
    }

    EditWell = (type, obj) => {
        switch(type){
            case 0:
                let well = this.cableSchem.GetWellsManager().GetWellById(obj);
                window.vueApp.setData(22, well.wellObject);
            break;
            case 1:
                let newWell = this.cableSchem.GetWellsManager().GetWellById(obj.id);
                newWell.wellObject = obj;
                // window.vueApp.state.newScheme.wells[window.vueApp.state.newScheme.wells.findIndex(x => x.id === newWell.id)] = newWell;
                // window.vueApp.state.mainType = 72;
                window.vueApp.cancelEditWell(newWell)
                
            break;
        }
    }

    mouseclick = (coords) => {
        let manager = this.cableSchem.GetWellsManager();
        let well = null;
        if(manager.wells.length == 0){
            well = manager.CreateWell(
                {
                    id: '',
                    schemaName: "",
                    schemaId: "",
                    numWell: '№' + (this.cableSchem.GetWellsManager().wells.length + 1),
                    typeWell: '',
                    typeLuke: '',
                    imgWell: { reader: {name: null, path: null }, file: null},
                    imgWellSchem: { reader: {name: null, path: null }, file: null},
                    desc: '',
                    additionalParameters: []
                }, 
                coords, 
                this.cableSchem.name, 
                this.cableSchem.id
            );
        }
        else{
            let index = manager.GetLastBigId() + 1;
            well = manager.CreateWell(
                {
                    id: '',
                    schemaName: "",
                    schemaId: "",
                    numWell: '№' + index,
                    typeWell: '',
                    typeLuke: '',
                    imgWell: { reader: {name: null, path: null }, file: null},
                    imgWellSchem: { reader: {name: null, path: null }, file: null},
                    desc: '',
                    additionalParameters: []
                }, 
                coords, 
                this.cableSchem.name, 
                this.cableSchem.id, 
                index
            );
        }
        if(this.selectedPoint != null) this.createLine(well)
        this.selectedPoint = well;
    }

    createLine = (well, type = "well") => {
        let finish = well.id;
        if(type == "object") finish = JSON.stringify(well);
        let data = { numKabChannel: '',schemaName: "",schemaId:"",start: this.selectedPoint.id,finish: finish,finishtype: type,length: '',diameter: '',material: '',KabLines: [],additionalParameters: []}
        let newchannel = this.cableSchem.GetCableChannelsManager().CreateChannel([this.selectedPoint.getMarker().getLatLng(), well.getMarker().getLatLng()], data, this.cableSchem.name); 
        // window.vueApp.state.newScheme.kls.push(newchannel);
        window.vueApp.pushNewChannel(newchannel)
    }

    addObject = (object) => {
        if(this.selectedPoint == null || this.cableSchem.GetCableChannelsManager().findChannelByCoords([this.selectedPoint.getMarker().getLatLng(), object.getMarker().getLatLng()])) return;
        this.createLine(object, "object");
    }

    updateMarker = (id, well) => {
        let obj = this.cableSchem.GetWellsManager().wells.find(x => x.id === well.id);
        obj.getMarker().setIcon(constructorManager.GetIcon("Колодец", id));
    }

    updatePolyline = (id, channel) => {
        let obj = this.cableSchem.GetCableChannelsManager().cableChannels.find(x => x.id === channel);
        obj.GetPolyline().setStyle({ color: this.cableSchem.GetCableChannelsManager().GetColor(id) })
        switch(id){
            case 0:
                obj.GetPolyline().setStyle({ color: 'rgba(105, 105, 105, 0.5)' })
            break;
            case 1:
                obj.GetPolyline().setStyle({ color: 'rgba(255, 69, 0, 0.7)' })
            break;
        }
    }

    updatePolylineCabLine = (id, channel) => {
        let objects = this.cableSchem.GetCableChannelsManager().cableChannels.filter(x => x.cableChannelObject.KabLines.find(x => x.numKabLine == channel))
        switch(id){
            case 0:
                objects.forEach(element => {
                    element.GetPolyline().setStyle({ color: 'rgba(105, 105, 105, 0.5)' }) 
                });
            break;
            case 1:
                objects.forEach(element => {
                    element.GetPolyline().setStyle({ color: 'rgba(0, 255, 255, 0.5)' }) 
                });
            break;
        }
    }

    mousemove = (coords) => {
        clearTimeout(this.updateTimeout);

        this.updateTimeout = setTimeout(() => {
            if (this.selectedPoint != null) {
                let lastCoords = this.selectedPoint.getMarker().getLatLng();
                if (this.dynamicLine == null) {
                    this.dynamicLine = L.polyline([lastCoords, coords], { color: this.cableSchem.GetCableChannelsManager().GetColor(1), weight: 5 }).addTo(mapManager.GLOBALMAP);
                }
                this.dynamicLine.setLatLngs([lastCoords, coords]);
                this.dynamicLine.redraw();
            }
        }, 5);
    }

    destroy = async (id) => {
        switch(id){
            case 0:
                this.cableSchem.UpdateData();
                if(this.cableSchem.wells.length == 0) return;
                await cableSchemasManager.SaveNewCableSchem(this.cableSchem);
                await this.cableSchem.destroy();
                this.cableSchem = null;
            break;
            case 3:
                this.cableSchem.UpdateData();
                if(this.cableSchem.wells.length == 0) return;
                await cableSchemasManager.SaveCableSchem(this.cableSchem);
                this.cableSchem = null;
            break;
            case 4:
                let schemid = this.cableSchem.id;
                await this.cableSchem.destroy();
                this.cableSchem = null;
                await cableSchemasManager.LoadNew(schemid);
            break;
            default:
                await this.cableSchem.destroy();
                this.cableSchem = null;
            break;
        }
        this.selectedPoint = null;
        if(this.dynamicLine != null){
            mapManager.Remove(this.dynamicLine);
        }
    }

    deleteChannel = (id) => {
        this.cableSchem.GetCableChannelsManager().DeleteCableChannel(id);
    }

    deleteWell = (id) => {
        let well = this.cableSchem.GetWellsManager().GetWellById(id);
        this.cableSchem.GetCableChannelsManager().DeleteNearby(well);
        this.cableSchem.GetWellsManager().DeleteWell(id);
        let lastIndex = this.cableSchem.GetWellsManager().wells.length - 1;
        if(lastIndex != -1) this.selectedPoint = this.cableSchem.GetWellsManager().wells[lastIndex];
        else {
            this.selectedPoint = null;
            mapManager.Remove(this.dynamicLine);
            this.dynamicLine = null;
        }
    }
}