class CableChannelsManager{
    cableChannels = [];

    constructor(schemaName, schemaId, lines){
        this.Load(schemaName, schemaId, lines);
    }

    Load = async (schemaName, schemaId, lines) => {
        if(lines != null){
            lines.forEach(element => {
                this.CreateChannel(element.coords, element.cableChannelObject, schemaName, schemaId, element.id);
            });
        }
    }

    GetChannelById = (id) => {
        return this.cableChannels.find(x => x.id === id);
    }

    findChannelByCoords = (coords) => {
        return this.cableChannels.find(channel => areCoordsEqual(channel.coords, coords));
    }

    CreateChannel = (coords, data, schemaName, schemaId, id = null) => {
        let polyline = mapManager.CreatePolyline(coords, { color: this.GetColor(0), weight: 7, schema: true });
        if (id == null) id = (this.cableChannels.length + 1);
        let channel = new CableChannel(id, coords, polyline, data, schemaName, schemaId);

        polyline.on('click', (e) => { channel.PolylineClick(); });
        this.cableChannels.push(channel);
        return channel;
    }

    DeleteNearby = (chupapi) => {
        let forDelete = this.cableChannels.filter(x => x.cableChannelObject.finish == chupapi.id || x.cableChannelObject.start == chupapi.id)
        forDelete.forEach(e => {
            e.Destroy();
            this.DeleteCableChannel(e.id)
        });
    }

    DeleteCableChannel = (id) => {
        let channel = this.cableChannels.find(x => x.id === id);
        window.vueApp.state.newScheme.kls.splice(this.cableChannels.indexOf(channel), 1);
        this.cableChannels.splice(this.cableChannels.indexOf(channel), 1);
        channel.Destroy();
    }

    GetColor = (id) =>{
        let color = null;
        switch(id){
            case 1:
                color = 'rgba(58, 255, 24, 0.4)';
            break;
            default:
                color = 'rgba(105, 105, 105, 0.5)';
            break;
        }
        return color;
    }

    destroy = async () => {
        this.cableChannels.forEach(async (el) => {
            await mapManager.Remove(el.GetPolyline());
        });
    }
}

function areCoordsEqual(coords1, coords2) {
    if (coords1.length !== coords2.length) return false;
    for (let i = 0; i < coords1.length; i++) {
        if (coords1[i].lat !== coords2[i].lat || coords1[i].lng !== coords2[i].lng) {
            return false;
        }
    }
    return true;
}