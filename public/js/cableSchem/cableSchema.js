class CableSchema{
    id;
    name;
    wells;
    channels;
    cableLines;
    #wellsManager;
    #cableChannelsManager;

    constructor(id, name, wells, channels, cableLines){
        this.id = id;
        this.name = name;
        this.wells = wells;
        this.channels = channels;
        this.cableLines = cableLines;

        this.#wellsManager = new WellsManager(name, id, wells);
        this.#cableChannelsManager = new CableChannelsManager(name, id, channels);
    }

    SetWellsManager = (a) => {
        this.#wellsManager = a;
    }

    SetCableChannelsManager = (a) => {
        this.#cableChannelsManager = a;
    }

    GetWellsManager = () => {
        return this.#wellsManager;
    }

    GetCableChannelsManager = () => {
        return this.#cableChannelsManager;
    }

    UpdateData = () => {
        this.wells = this.#wellsManager.wells;
        this.channels = this.#cableChannelsManager.cableChannels;
    }

    destroy = async () => {
        await this.#wellsManager.destroy();
        await this.#cableChannelsManager.destroy();
    }
}