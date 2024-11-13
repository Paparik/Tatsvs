class Objects{
    id;
    type;
    coords;
    #marker;

    constructor(id, type, coords, marker){
        this.id = id;
        this.type = type;
        this.coords = coords;
        this.GetName()
        this.#marker = marker;
    }

    getMarker = () => {
        return this.#marker;
    }

    GetName = async () => {
        let data = await this.Get();
        this.name = this.type + " " + data.name;
    }

    Get = async () => {
        let result = await apiManager.getData("get", "./php/api/objects/index.php", this.id);
        result = JSON.parse(result.data)
        return result;
    }

    MarkerClick = async () => {
        switch(window.vueApp.state.mainType){
            case 72:
            case 22:
            case 32:
            case 42:
                constructorManager.object.addObject(this);
            break;
            case 12:
            return;
            default:
                let data = await this.Get();
                window.vueApp.setData(1,data);
            break;
        }
    }

    Destroy = async () => {
        await mapManager.Remove(this.#marker);
    }
}