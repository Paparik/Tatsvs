class WellsManager{
    wells = [];

    constructor(schemaName, schemaId, wells){
        this.Load(schemaName, schemaId, wells);
    }

    Load = async (schemaName, schemaId, wells) => {
        if(wells != null){
            wells.forEach(element => {
                this.CreateWell(element.wellObject, element.coords, schemaName, schemaId, element.id);
                allObjectNames[element.wellObject.numWell + " схема: " + schemaName] = { id: schemaId, type: "schema" };
            });
        }
    }

    GetLastBigId = () => {
        let big = 0;
        this.wells.forEach(element => {
            if(element.id > big){
                big = element.id;
            }
        });
        return big;
    }

    CreateWell = (data, coords, schemaName, schemaId, id = null) =>{
        if(id == null) id = this.wells.length + 1;
        let marker = null;

        if(!data.typeWell.includes("Ввод") && !data.typeWell.includes("ввод")) marker = mapManager.CreateMarker(coords, { schema: true, opacity: 1, visible: true, interactive: true, icon: constructorManager.GetIcon("Колодец"), pane: 'popupPane' }, true);
        else marker = mapManager.CreateMarker(coords, { schema: true, opacity: 1, visible: true, interactive: true, icon: constructorManager.GetIcon("Ввод в дом"), pane: 'popupPane' }, true);
        
        let well = new Well(id, coords, marker, data, schemaName, schemaId);
        
        marker.on('click', (e) => { well.MarkerClicked(); });
        marker.on('contextmenu', (e) => { well.ContextClicked(); });
        this.wells.push(well);

        // window.stateStore.state.newScheme.wells.push(well);
        window.vueApp.pushWell(well)
        return well;
    }

    DeleteWell = (id) => {
        let well = this.GetWellById(id);
        // window.stateStore.newScheme.wells.splice(this.wells.indexOf(well), 1);
        window.vueApp.delWell(this.wells.indexOf(well))
        this.wells.splice(this.wells.indexOf(well), 1);
        well.Destroy();
    }

    GetWellById = (id) => {
        return this.wells.find(x => x.id === id);
    }

    destroy = async () => {
        this.wells.forEach(async (el) => {
            mapManager.Remove(el.getMarker());
        });
    }
}