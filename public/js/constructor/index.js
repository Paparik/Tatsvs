class ConstructorManager {
    object = null;
    constructor() {
        this.object = null;
    }

    mouseclick = (e) => {
        if(this.object == null) return;
        this.object.mouseclick(e);
    }

    mousemove = (e) => {
        if(this.object == null) return;
        this.object.mousemove(e);
    }

    create = async (type, id = null) => {
        switch(type){
            case 0:
                this.object = new ObjectsConstructor({
                    name: "",
                    id: "",
                    characteristics:{
                        type: "",
                        floors: "",
                        entrancesCount: null,
                        apartmentsCount: null,
                        offices: "",
                        storageRooms: "",
                        yard: null,
                        yardWickets: null,
                        yardGates: null,
                        operators: [],
                        managementCompanies: [],
                        usefulContacts: [],
                        additionalParameters: []
                    },
                    spd:{
                        docs:[],
                        cableDuct:[],
                        additionalParameters: []
                    },
                    svn:{
                        DVR: null,
                        internalCameras:null,
                        externalCameras: null,
                        photos: [],
                        docs:[],
                        additionalParameters: []
                    },
                    skud:{
                        callPanels: null,
                        wickets: null,
                        gates: null,
                        barriers: null,
                        docs:[],
                        photos: [],
                        backups:[],
                        additionalParameters: []
                    },
                    askue:{
                        docs:[],
                        additionalParameters: []
                    },
                    apartmentAutomation:{
                        docs:[],
                        additionalParameters: []
                    },
                    houseschem: {
                        drc: [],
                        entrances: [],
                    }
                });
            break;
            case 1:
                window.vueApp.setData(72, { edit: false, id: '', name: '', wells:[], kls:[], cableLines: [] });
                this.object = new CableLinesConstructor();
            break;
            case 2:
                if(id != null){
                    let schem = cableSchemasManager.cableSchemas.find(x => x.id == id);
                    this.object = new CableLinesConstructor(schem);
                    window.vueApp.setData(72, { edit: true, id: schem.id, name: schem.name, wells:schem.wells, kls:schem.channels, cableLines: schem.cableLines });
                }
            break;
            case 4:
                if(id != null){
                    let object = objectsManager.objects.find(x => x.id == id);
                    object.getMarker().setIcon(this.GetIcon(object.type, 1));

                    this.object = new ObjectsConstructor(await object.Get(), object.getMarker(), true);
                    window.vueApp.setData(12, this.object.default);
                }
            break;
        }
    }

    GetIcon = (type, id = 0) => {
        let params = [];
        switch(type){
            case "Жилой дом":
                if(id != 0) params.push('./assets/home_active.png')
                    else params.push('./assets/home.png')
                params.push([20, 20])
            break;
            case "Паркинг":
                if(id != 0) params.push('./assets/parking_active.png')
                    else params.push('./assets/parking.png')
                params.push([20, 20])
            break;
            case "Офисное здание":
                if(id != 0) params.push('./assets/office_active.png')
                    else params.push('./assets/office.png')
                params.push([20, 20])
            break;
            case "Колодец":
                if(id != 0) params.push('./assets/well_active.png')
                    else params.push('./assets/well.png')
                params.push([14, 14])
            break;
            case "Ввод в дом":
                params.push('./assets/link.png')
                params.push([14, 14])
            break;
            default:
                params.push('./assets/customObject.png')
                params.push([20, 20])
            break;
        }
        return L.icon({ iconUrl: params[0], iconSize: params[1], iconAnchor: [10, 10] });
    }

    LoadingPage = (toggle) => {
        window.stateStore.state.loading = toggle;
    }

    destroy = async (id) => {
        window.stateStore.state.mainType = 0;
        window.vueApp.GetMainPage()
        await this.object.destroy(id);
        this.object = null;
    }
}