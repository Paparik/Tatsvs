let mapManager = null;
let constructorManager = null;
let apiManager = null;
let cableSchemasManager = null;
let objectsManager = null;
let userManager = null;
let allObjectNames = {};

setTimeout(async () => {
    apiManager = new ApiManager()
    mapManager = new MapManager();
    constructorManager = new ConstructorManager();
    cableSchemasManager = new CableSchemasManager();
    objectsManager = new ObjectsManager();
    userManager = new UserManager();
    window.vueApp.state.allObjectsAndSchemas = allObjectNames;
}, 300);