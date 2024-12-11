class Objects{
    id;
    type;
    coords;
    name;
    #marker;

    constructor(id, type, coords, marker, name){
        this.id = id;
        this.type = type;
        this.coords = coords;
        this.name = name;
        this.#marker = marker;
    }

    getMarker = () => {
        return this.#marker;
    }

    setMarker = (marker) => {
        this.#marker = marker;
    }

    Get = async () => {
        let result = await apiManager.getData("get", "./php/api/objects/index.php", this.id);
        let data = {
            name: this.name,
            id: this.id,
            characteristics: result.data.characteristics,
            spd: result.data.spd,
            svn: result.data.svn,
            skud: result.data.skud,
            askue: result.data.askue,
            apartmentAutomation: result.data.apartmentAutomation,
            houseschem: result.data.houseschem,
        }
        return data;
    }

    MarkerClick = async () => {
        switch(window.stateStore.state.mainType){
            case 72:
            case 22:
            case 32:
            case 42:
                constructorManager.object.addObject(this);
            break;
            case 12:
            return;
            default:
                window.vueApp.setData(1, await this.Get());
            break;
        }
    }

    Destroy = async () => {
        await mapManager.Remove(this.#marker);
    }
}