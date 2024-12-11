class ObjectsManager{
    objects = [];

    constructor(){
        this.objects = [];
        this.Load();
    }

    perehod = (id) => {
        let obj = this.objects.find(x => x.id == id);
        obj.MarkerClick();
        mapManager.GLOBALMAP.setView(obj.coords, 19);
    }

    Load = async () => {
        let objects = await apiManager.getData("getAll", "./php/api/objects/index.php");
        if(objects != null){
            objects.data.forEach(element => {
                let marker = mapManager.CreateMarker(element.coords, { opacity: 1, visible: true, interactive: true, icon: constructorManager.GetIcon(element.type), pane: 'popupPane', schema: false });
                let obj = new Objects(element.id, element.type, element.coords, marker, element.name)
                marker.on('click', async (e) => { await obj.MarkerClick(); });

                this.objects.push(obj)
                window.vueApp.incrementCountObj()
                // window.stateStore.countObj += 1;
                
                allObjectNames[element.name] = { id: element.id, type: "object", objecttype: element.type }
            });
        }
    }

    DeleteObjectFull = async (id) => {
        let index = this.objects.findIndex(x => x.id == id)
        await apiManager.setData("delete", "./php/api/objects/index.php", id);
        await this.objects[index].Destroy();
        this.objects.splice(index, 1);
        constructorManager.LoadingPage(false)
        // window.stateStore.countObj -= 1;
        window.vueApp.decrementCountObj()
    }

    OpenSchem = (obj) => {
        window.vueApp.setData(5, obj);
    }

    OpenDrc = (obj) => {
        window.vueApp.setData(6, obj);
    }

    EditObject = async (id, marker) => {
        let objj = this.objects[this.objects.findIndex(x => x.id == id)];

        mapManager.Remove();
        objj.marker = mapManager.CreateMarker(objj.coords, {opacity: 1, visible: true, interactive: true, icon: constructorManager.GetIcon(store.objectForConstructor.characteristics.type, 0), pane: 'markerPane', schema: false})
    }

    CreateObject = async (marker, payload) => {
        // let data = payload[2];
        // payload[2] = {};
        // let result = await apiManager.setData("create", "./php/api/objects/index.php", JSON.stringify(payload));
        // data = await this.ChangeDocs(data, result.data);
        // data.id = result.data;
        // await apiManager.setData("set", "./php/api/objects/index.php", JSON.stringify(["true", result.data, data]));
        // let obj = new Objects(result.data, payload[0], payload[1], marker);
        // obj.getMarker().setIcon(constructorManager.GetIcon(payload[0]));
        // marker.on('click', async (e) => { await obj.MarkerClick(); });
        // this.objects.push(obj);
        // constructorManager.LoadingPage(false)
        // // window.stateStore.countObj += 1;  
        // window.vueApp.incrementCountObj()
    }

    SetData = async (id, obj, section, type) => {
        let oldDocsNames = [];
        let oldDocs = [];
        let newDocs = [];
        obj.forEach(async (element) => {
            if (element instanceof File) 
                newDocs.push(element)
            else{
                oldDocsNames.push(element.name)
                oldDocs.push(element)
            }
        });

        let result = await apiManager.setDataWithFiles(
            "saveObjectFiles", 
            "./php/api/files/index.php", 
            JSON.stringify([id, "object", section, type, oldDocsNames]),
            newDocs
        );

        if('files' in result)
            return JSON.parse(result.files).concat(oldDocs);
        else{
            return oldDocs;
        }
    }

    SaveObjectSection = async (id, section, data) => {
        if('docs' in data){
            data.docs = await this.SetData(id, data.docs, section, "docs");
        }
        if('cableDuct' in data){
            data.cableDuct = await this.SetData(id, data.cableDuct, section, "cableDuct");
        }
        if('photos' in data){
            data.photos = await this.SetData(id, data.photos, section, "photos");
        }
        if('backups' in data){
            data.backups = await this.SetData(id, data.backups, section, "backups");
        }

        apiManager.setData("set", "./php/api/objects/index.php", JSON.stringify([id, data, section]));

        await constructorManager.LoadingPage(false)
    }
}