class CableSchemasManager{
    constructor(){
        this.cableSchemas = [];
        this.Load();
    }

    Load = async () => {
        let cables = await apiManager.getData("getAll", "./php/api/cableSchemas/index.php");
        if(cables != null){
            let data = cables.data;
            if(data != null){
                data.forEach(el => {
                    let schem = new CableSchema(el.id, el.name, el.wells, el.channels, el.cableLines);
                    this.cableSchemas.push(schem);
                    window.vueApp.state.countKl += 1;
                });
            }
        }
    }

    OpenKabLine = (id, line) => {
        let schem = this.cableSchemas.find(x => x.id == id);
        window.vueApp.setData(4, schem.cableLines.find(x => x.numKabLine == line));
        
        if(schem){
            let manager = schem.GetCableChannelsManager();
            if(manager){
                let objects = manager.cableChannels.filter(x => x.cableChannelObject.KabLines.find(x => x.numKabLine == line))
                objects.forEach(element => {
                    element.GetPolyline().setStyle({ color: 'rgba(0, 255, 255, 0.5)' }) 
                });
            }
        }
    }

    perehod = (key, id) => {
        let name = key.split("схема:")[0].trim();
        let schem = this.cableSchemas.find(x => x.id == id);
        let well = schem.GetWellsManager().wells.find(x => x.wellObject.numWell == name)
        well.MarkerClicked()
        mapManager.GLOBALMAP.setView(well.coords, 19);
    }

    GetAll = () => {
        return this.cableSchemas.length;
    }

    DeleteSchemFull = async (id) => {
        let index = this.cableSchemas.findIndex(x => x.id == id)
        await apiManager.setData("delete", "./php/api/cableSchemas/index.php", id);
        await this.cableSchemas[index].destroy();
        this.cableSchemas.splice(index, 1);
        constructorManager.LoadingPage(false)
        window.vueApp.state.countKl -= 1;
    }

    LoadNew = async (id) => {
        let old = this.cableSchemas.find(x => x.id == id);
        if(old != null) this.cableSchemas.splice(this.cableSchemas.indexOf(old), 1);

        let schem = await apiManager.getData("get", "./php/api/cableSchemas/index.php", id);
        if(schem != null){
            let data = schem.data;
            let newschem = new CableSchema(id, data.name, JSON.parse(data.wells), JSON.parse(data.channels), JSON.parse(data.cableLines));
            this.cableSchemas.push(newschem);
        }
    }

    SaveCableSchem = async (object) =>{
        let schem = this.cableSchemas.find(x => x.id == object.id);
        object.wells = await this.SaveAllNewImages(object.wells, object.id);
        schem.name = object.name;
        schem.wells = object.wells;
        schem.channels = object.channels;
        schem.cableLines = object.cableLines;
        await schem.destroy();
        schem.SetWellsManager(new WellsManager(object.name, object.id, object.wells));
        schem.SetCableChannelsManager(new CableChannelsManager(object.name, object.id, object.channels));
        await apiManager.setData("setNew", "./php/api/cableSchemas/index.php", JSON.stringify(object));
        constructorManager.LoadingPage(false)
    }

    SaveAllNewImages = async (obj, id) => {
        if(obj.length == 0) return;
        for(let i = 0; i < obj.length; i++){
            if(obj[i].wellObject.imgWell.file != null) {
                let result = await apiManager.setDataWithFiles("editWell", "./php/api/files/index.php", JSON.stringify([id, i]), obj[i].wellObject.imgWell.file);
                let newFilesResult = JSON.parse(result.files);
                obj[i].wellObject.imgWell.file = null;
                obj[i].wellObject.imgWell.reader = newFilesResult[0];
            }
            else if(obj[i].wellObject.imgWell.reader.path == null){
                await apiManager.setDataWithFiles("deleteWell", "./php/api/files/index.php", JSON.stringify([id, i]));
            }
            if(obj[i].wellObject.imgWellSchem.file != null) {
                let result2 = await apiManager.setDataWithFiles("editWellSchema", "./php/api/files/index.php", JSON.stringify([id, i]), obj[i].wellObject.imgWellSchem.file);
                let newFilesResult2 = JSON.parse(result2.files);
                obj[i].wellObject.imgWellSchem.file = null;
                obj[i].wellObject.imgWellSchem.reader = newFilesResult2[0];
            }
            else if(obj[i].wellObject.imgWellSchem.reader.path == null){
                await apiManager.setDataWithFiles("deleteWellSchema", "./php/api/files/index.php", JSON.stringify([id, i]));
            }
        }
        return obj;
    }

    SaveNewCableSchem = async (object) =>{
        let data = object.wells;
        object.wells = [];
        let result = await apiManager.setData("create", "./php/api/cableSchemas/index.php", JSON.stringify(object));
        data = await this.SaveAllImages(data, result.data);

        await apiManager.setData("set", "./php/api/cableSchemas/index.php", JSON.stringify([result.data, data]));
        let schem = new CableSchema(result.data, object.name, data, object.channels, object.cableLines);
        this.cableSchemas.push(schem);
        constructorManager.LoadingPage(false)
        window.vueApp.state.countKl += 1;
    }

    SaveAllImages = async (obj, id) => {
        if(obj.length == 0) return;
        for(let i = 0; i < obj.length; i++){
            if(obj[i].wellObject.imgWell.file != null) {
                let result = await apiManager.setDataWithFiles("saveWells", "./php/api/files/index.php", JSON.stringify([id, i]), obj[i].wellObject.imgWell.file);
                let newFilesResult = JSON.parse(result.files);
                obj[i].wellObject.imgWell.file = null;
                obj[i].wellObject.imgWell.reader = newFilesResult[0];
            }
            if(obj[i].wellObject.imgWellSchem.file != null) {
                let result2 = await apiManager.setDataWithFiles("saveWellsSchemas", "./php/api/files/index.php", JSON.stringify([id, i]), obj[i].wellObject.imgWellSchem.file);
                let newFilesResult2 = JSON.parse(result2.files);
                obj[i].wellObject.imgWellSchem.file = null;
                obj[i].wellObject.imgWellSchem.reader = newFilesResult2[0];
            }
        }
        return obj;
    }
}