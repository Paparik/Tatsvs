class ObjectsConstructor{
    customIcon = null;
    marker = null;
    default = null;
    edit = false;

    constructor(a, marker = null, edit = false) {
        this.customIcon = L.icon({ iconUrl: './assets/point.png', iconSize: [25, 25], iconAnchor: [10, 10] });
        this.marker = marker;
        this.edit = edit;
        this.default = a;
    }

    OpenObjectSchem = (obj) => {
        window.vueApp.setData(52, obj.houseschem);
    }

    OpenDrcSchem = (obj, inx) => {
        window.vueApp.setData(62, obj, inx);
    }

    SaveObjectSchem = (obj1, obj2) => {
        // window.vueApp.state.objectForConstructor.houseschem.entrances = obj1;
        // window.vueApp.state.objectForConstructor.houseschem.drc = obj2;
        // this.SaveDocs(obj2);

        window.vueApp.saveObjectSchem(obj1,obj2)
        window.vueApp.setData(12, window.stateStore.state.objectForConstructor);
    }

    SaveDrc = (obj) => {
        window.vueApp.setDrcConstructor()
        // window.vueApp.state.objectForConstructor.houseschem.drc[window.stateStore.state.chupapiIndex] = obj;
        window.vueApp.setData(52, window.stateStore.state.objectForConstructor.houseschem);
    }

    mouseclick = (coords) => {
        if(window.stateStore.state.mainType == 12) return;
        this.marker = mapManager.CreateMarker(coords, {opacity: 1, visible: true, interactive: true, icon: this.customIcon, pane: 'markerPane', schema: false})

        $.notify("Заполните и сохраните данные", { type:"toast" });
        window.vueApp.setData(12, this.default);
    }

    destroy = async (id) => {
        switch(id){
            case 0:

            break;
            case 1:
                if(this.marker != null){
                    mapManager.Remove(this.marker);
                }
            break;
            case 2:
                
            break;
        }
        this.marker = null;
        this.default = null;
    }

    mousemove = (coords) => { return; }
}