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

    EditObject = async (id, marker, payload) => {
        // let data = payload[2];
        // data.id = id;
        // data = await this.EditDocs(data, id);
        // await apiManager.setData("set", "./php/api/objects/index.php", JSON.stringify(["", id, data, payload[0]]));
        // let obj = new Objects(id, payload[0], payload[1], marker);
        // obj.getMarker().setIcon(constructorManager.GetIcon(payload[0]));
        // this.objects[this.objects.findIndex(x => x.id == id)] = obj;
        // constructorManager.LoadingPage(false)
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

    EditDocs = async (data, id) => {
        data.svn.photo = await this.EditImage(data.svn.photo, [id, "svn", "photo"]);
        data.skud.photo = await this.EditImage(data.skud.photo, [id, "skud", "photo"]);

        data.spd.docs = await this.EditFiles(data.spd.docs, [id, "spd", "docs"]);
        data.spd.cableDuct = await this.EditFiles(data.spd.cableDuct, [id, "spd", "cableDuct"]);
        data.svn.docs = await this.EditFiles(data.svn.docs, [id, "svn", "docs"]);
        data.skud.docs = await this.EditFiles(data.skud.docs, [id, "skud", "docs"]);
        data.skud.backups = await this.EditFiles(data.skud.backups, [id, "skud", "backups"]);
        data.askue.docs = await this.EditFiles(data.askue.docs, [id, "askue", "docs"]);
        data.apartmentAutomation.docs = await this.EditFiles(data.apartmentAutomation.docs, [id, "apartmentAutomation", "docs"]);

        data.houseschem.drc = await this.EditDrcImages(data.houseschem.drc, id, "editDrc");
        return data;
    }

    EditFiles = async (obj, params) => {
        if(obj != null && obj.length == 0) return obj;
        let docs = [[],[],[],[],[]];
        obj.forEach(element => {
            if(element.path){
                docs[2].push(element);
                docs[1].push(element.name);
            }
            else{
                docs[0].push(element);
            }
            docs[3].push(element.name);
            docs[4].push(element);
        });
        if(docs[0].length != 0){
            params.push(docs[1]);
            let result = await apiManager.setDataWithFiles("editObjectFiles", "./php/api/files/index.php", JSON.stringify(params), docs[0]);
            let newFilesResult = JSON.parse(result.files);
            newFilesResult.forEach(element => {
                docs[2].push(new NewFile(element.name, element.path));
            });
            return docs[2];
        }
        else {
            params.push(docs[3]);
            await apiManager.setDataWithFiles("deleteUnnecessaryFiles", "./php/api/files/index.php", JSON.stringify(params));
            return docs[4];
        }
    }

    ChangeDocs = async (data, id) => {
        data.svn.photo = await this.SaveImage(data.svn.photo, [id, "svn", "photo"]);
        data.skud.photo = await this.SaveImage(data.skud.photo, [id, "skud", "photo"]);

        data.spd.docs = await this.SaveFiles(data.spd.docs, [id, "spd", "docs"]);
        data.spd.cableDuct = await this.SaveFiles(data.spd.cableDuct, [id, "spd", "cableDuct"]);
        data.svn.docs = await this.SaveFiles(data.svn.docs, [id, "svn", "docs"]);
        data.skud.docs = await this.SaveFiles(data.skud.docs, [id, "skud", "docs"]);
        data.skud.backups = await this.SaveFiles(data.skud.backups, [id, "skud", "backups"]);
        data.askue.docs = await this.SaveFiles(data.askue.docs, [id, "askue", "docs"]);
        data.apartmentAutomation.docs = await this.SaveFiles(data.apartmentAutomation.docs, [id, "apartmentAutomation", "docs"]);

        data.houseschem.drc = await this.SaveDrcImages(data.houseschem.drc, id, "saveDrc");
        return data;
    }

    SaveFiles = async (obj, params) => {
        if(obj == null || obj.length == 0) return obj;
        let newDocs = [];
        let result = await apiManager.setDataWithFiles("saveObject", "./php/api/files/index.php", JSON.stringify(params), obj);
        let newFilesResult = JSON.parse(result.files);
        newFilesResult.forEach(element => {
            newDocs.push(new NewFile(element.name, element.path));
        });
        return newDocs;
    }

    EditDrcImages = async (obj, id, action) => {
        if(obj.length == 0) return obj;
        for(let i = 0; i < obj.length; i++){
            if(obj[i].lastPhoto.file == null){
                if(obj[i].lastPhoto.reader.path == null){
                    await apiManager.setDataWithFiles("deleteDrc", "./php/api/files/index.php", JSON.stringify([id, i]));
                    obj[i].lastPhoto = { reader: { name: null, path: null }, file: null};
                    continue;
                }
            }
            if(!obj[i].lastPhoto.reader.path.includes("./php/")){
                let result = await apiManager.setDataWithFiles(action, "./php/api/files/index.php", JSON.stringify([id, i]), obj[i].lastPhoto.file);
                let newFilesResult = JSON.parse(result.files);
                obj[i].lastPhoto.file = null;
                obj[i].lastPhoto.reader = newFilesResult[0];
            }
        }
        return obj;
    }

    SaveDrcImages = async (obj, id, action) => {
        if(obj.length == 0) return obj;
        for(let i = 0; i < obj.length; i++){
            if(obj[i].lastPhoto.file == null) continue;
            let result = await apiManager.setDataWithFiles(action, "./php/api/files/index.php", JSON.stringify([id, i]), obj[i].lastPhoto.file);
            let newFilesResult = JSON.parse(result.files);
            obj[i].lastPhoto.file = null;
            obj[i].lastPhoto.reader = newFilesResult[0];
        }
        return obj;
    }

    EditImage = async (object, params) => {
        if(object.file == null && object.reader.path == null){
            await apiManager.setDataWithFiles("deleteObject", "./php/api/files/index.php", JSON.stringify(params));
            object = { reader: { name: null, path: null }, file: null};
            return object;
        }
        if(object.file != null && !object.reader.path.includes("./php/")){
            let result = await apiManager.setDataWithFiles("editObjectPhoto", "./php/api/files/index.php", JSON.stringify(params), [object.file]);
            let json = JSON.parse(result.files);
            object.file = null;
            object.reader = json[0];
            return object;
        }
        return object;
    }

    SaveImage = async (object, params) => {
        if(object.file == null) return object;
        let result = await apiManager.setDataWithFiles("saveObject", "./php/api/files/index.php", JSON.stringify(params), [object.file]);
        let json = JSON.parse(result.files);
        object.file = null;
        object.reader = json[0];
        return object;
    }
}