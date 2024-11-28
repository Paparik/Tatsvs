/*
    Информация:
    0 - главная страница
    1 - об объекте
    2 - о колодце
    3 - о кабельном канале
    4 - о кабельной линии
    5 - макет дома
    6 - шкаф дрс
    8 - юзер лист
    9 - логи

    Конструктор:
    12 - объект
    22 - колодец
    32 - кабельный канал
    42 - кабельная линия
    52 - макет дома
    62 - шкаф дрс
    72 - Главная по конструктору кк
*/

import { createApp, reactive, computed, onMounted   } from 'vue'

import { createPinia } from 'pinia';
import { useStateStore } from '../js/pinia/store.js';

import { wellobject } from 'wellcomp'
import { homeobject } from 'homecomp'
import { firstpage } from 'firstpage'
import { kablines } from 'kablines'
import { kabchannel } from 'kabchannel'
import { objectconstructor } from 'objectconstructor'
import { wellconstructor } from 'wellconstructor'
import { kkconstructor } from 'kkconstructor'
import { kablinesconstructor } from 'kablinesconstructor'
import { firstkkconstructor } from 'firstkkconstructor'
import { drc } from 'drc'
import { schemeconstructor } from 'schemeconstructor'
import { drcconstructor } from 'drcconstructor'
import { scheme } from 'scheme'
import { userlist } from 'userlist'
import { logslist } from 'logslist'


async function getLogsList() {
    let result = await apiManager.getData("getAll", "./php/api/logs/index.php");
    window.vueApp.$.ctx.setData(9,result.data);
}

window.getLogsList = getLogsList;

function callSetData(id,obj) {
    if (window.vueApp && window.vueApp.$.ctx.setData) {
        window.vueApp.$.ctx.setData(id,obj);
    }
}

window.callSetData = callSetData;


const app = createApp({
    setup() {

        const store = useStateStore()


        const setAllObjectsAndSchemas = (allObjectNames) => {
            store.state.allObjectsAndSchemas = allObjectNames
        }

        const incrementCountKL = () => {
            store.state.countKl++
        }
        const incrementCountObj = () => {
            store.state.countObj++
        }

        const decrementCountKL = () => {
            store.state.countKl--
        }
        const decrementCountObj = () => {
            store.state.countObj--
        }

        const pushWell = (well) => {
            store.state.newScheme.wells.push(well)
        }

        const setDrcConstructor = (obj) =>{
            window.stateStore.state.objectForConstructor.houseschem.drc[window.stateStore.state.chupapiIndex] = obj
        }
        const saveObjectSchem = (obj1,obj2) =>{
            window.stateStore.state.objectForConstructor.houseschem.entrances = obj1;
            window.stateStore.state.objectForConstructor.houseschem.drc = obj2;
        }

        const pushNewChannel = (newchannel) =>{
            window.stateStore.state.newScheme.kls.push(newchannel);
        }

        const cancelEditWell = (newWell) =>{
            window.stateStore.state.newScheme.wells[window.stateStore.state.newScheme.wells.findIndex(x => x.id === newWell.id)] = newWell;
            window.stateStore.state.mainType = 72;
        }

        const cancelEditChannel = (newChannel) =>{
            window.stateStore.state.newScheme.kls[window.stateStore.state.newScheme.kls.findIndex(x => x.id === newChannel.id)] = newChannel;
            window.stateStore.state.mainType = 72;
        }

        const cancelEditLine = (obj) =>{
            window.stateStore.state.newScheme.cableLines[window.stateStore.state.newScheme.cableLines.findIndex(x => x.id === obj.numKabLine)] = obj;
            window.stateStore.state.mainType = 72;
        }

        const delCableChannel = (cableChannels) => {
            window.stateStore.state.newScheme.kls.splice(cableChannels, 1);
        }
        const delWell = (well) => {
            window.stateStore.state.newScheme.wells.splice(well, 1);
        }


        
        function kablinesCounter(id){
            let lenght = 0
            for (let index = 0; index < store.state.newScheme.cableLines.length; index++) {
                if (store.state.newScheme.cableLines[index].KabLines.find(item => item.numKabLine == id) != -1){
                    lenght +=  Number(store.state.newScheme.cableLines[index].length)
                }
                
            }
            return lenght
        }

        function ResetWell(){
            let obj = cableSchemasManager.cableSchemas.find(x => x.id == store.state.wellObj.schemaId);
            if(obj){
                let manager = obj.GetWellsManager();
                if(manager){
                    let well = manager.wells.find(x => x.id == store.state.wellObj.id);
                    if(well){
                        if(!well.wellObject.typeWell.includes("Ввод") && !well.wellObject.typeWell.includes("ввод")) well.getMarker().setIcon(constructorManager.GetIcon("Колодец", 0));
                    }
                }
            }
        }

        function ResetPolylineCablines(){
            let schem = cableSchemasManager.cableSchemas.find(x => x.id == store.state.kabChannelObj.schemaId);
            if(schem){
                let manager = schem.GetCableChannelsManager();
                if(manager){
                    let objects = manager.cableChannels.filter(x => x.cableChannelObject.KabLines.find(x => x.numKabLine == store.state.kabLinelObj.numKabLine))
                    objects.forEach(element => {
                        element.GetPolyline().setStyle({ color: 'rgba(105, 105, 105, 0.5)' })
                    });
                }
            }
        }

        function ResetPolyline(){
            let obj = cableSchemasManager.cableSchemas.find(x => x.id == store.state.kabChannelObj.schemaId);
            if(obj){
                let manager = obj.GetCableChannelsManager();
                if(manager){
                    let channel = manager.cableChannels.find(x => x.id == store.state.kabChannelObj.numKabChannel);
                    if(channel){
                        channel.GetPolyline().setStyle({ color: 'rgba(105, 105, 105, 0.5)' })
                    }
                }
            }
        }

        function GetMainPage(){
            switch(store.state.mainType){
                case 3:
                case 2:
                case 1:
                case 4:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    state.mainType=0
                    break;
                case 12:
                case 52:
                case 62:
                    if(constructorManager.object.edit == true){
                        constructorManager.destroy(2);
                    }
                    else{
                        constructorManager.destroy(1);
                    }
                break;
                case 22:
                case 32:
                case 42:
                case 72:
                    if(store.state.newScheme.edit == true){
                        constructorManager.destroy(4);
                    }
                    else{
                        constructorManager.destroy(2);
                    }
                break;
                default:
                    store.state.mainType=0
                    break;
            }
        }

        function perehod(key, val){
            if(val.type == "schema"){
                cableSchemasManager.perehod(key, val.id)
            }
            if(val.type == "object"){
                objectsManager.perehod(val.id)
            }
        }

        const filteredObjects = computed(() => {
            const query = store.state.search.toLowerCase();
            return Object.fromEntries(
                Object.entries(store.state.allObjectsAndSchemas).filter(([key]) =>
                    key.toLowerCase().includes(query)
                )
            );
        });

        

        function CabChannelsActiveToggle() {
            store.state.cabChannelsActive = !store.state.cabChannelsActive;
            mapManager.CableChannelsVisible(store.state.cabChannelsActive);
        }
        
        function back(){
            store.state.mainType = store.state.whereBack
            switch(store.state.whereBack){
                case 52:
                    store.state.whereBack = 12;
                break;
                case 3:
                    ResetPolylineCablines();
                    let obj = cableSchemasManager.cableSchemas.find(x => x.id == store.state.kabChannelObj.schemaId);
                    if(obj){
                        let manager = obj.GetCableChannelsManager();
                        if(manager){
                            let channel = manager.cableChannels.find(x => x.id == store.state.kabChannelObj.numKabChannel);
                            if(channel){
                                channel.GetPolyline().setStyle({ color: 'rgba(255, 69, 0, 0.7)' })
                            }
                        }
                    }
                break;
                case 5:
                    store.state.whereBack = 1;
                    setTimeout(() => {
                        $('.owl-carousel').owlCarousel({
                            loop:false,
                            autoWidth:true,
                            items:4
                        })
                    }, 200);
                break;
            }
        }

        function setData(type, obj, id = null){
            if(id != null){
                store.state.chupapiIndex = id
            }
            switch (type) {
                case 0: break;
                case 1:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    store.setObject(obj)
                    
                    break;
                case 2: 
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    store.state.wellObj=obj;
                    break;
                case 3:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    store.state.kabChannelObj=obj; 
                    break;
                case 4:
                    ResetWell();
                    ResetPolylineCablines();
                    store.state.kabLinelObj=obj;
                    store.state.whereBack = 3; 
                    break;
                case 12:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    store.state.objectForConstructor = obj; 
                    break;
                case 72:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    store.state.newScheme = obj;
                    break;

                case 22:
                    store.state.wellForConstructor = obj;
                    store.state.whereBack = 72;
                    break;
                case 32:
                    store.state.kkForConstructor = obj;
                    store.state.whereBack = 72;
                    break;
                case 42:
                    store.state.kabLinelForConstructor = obj;
                    store.state.whereBack = 72;
                    break;
                case 5:
                    store.state.entrances=obj;
                    store.state.whereBack = 1
                    setTimeout(() => {
                        $('.owl-carousel').owlCarousel({
                            loop:false,
                            autoWidth:true,
                            items:4
                        })
                    }, 200);
                    break;
                case 6:
                    store.state.drc=obj;
                    store.state.whereBack = 5
                    break;
                case 8:
                    store.state.userList=obj;
                    break;
                case 9:
                    store.state.logs=obj;
                    break;
                case 52:
                    // obj.lenght = 0
                    store.state.newSchemeObject = obj;
                    store.state.whereBack = 12
                    break;
                case 62:
                    store.state.newDrc = obj[id];
                    store.state.whereBack = 52
                    break;
                default:
                    break;
            }
            store.state.mainType = type
        }

        function updateKabLines(newKabLines) {
            store.state.kkForConstructor.kabLines = newKabLines;
        }






        return {
            store,
            setAllObjectsAndSchemas,
            incrementCountKL,
            incrementCountObj,
            perehod,
            setData,
            setDrcConstructor,
            saveObjectSchem,
            updateKabLines,
            pushNewChannel,
            cancelEditWell,
            cancelEditChannel,
            cancelEditLine,
            decrementCountKL,
            decrementCountObj,
            back,
            CabChannelsActiveToggle,
            delCableChannel,
            // auth,
            filteredObjects,
            GetMainPage,
            kablinesCounter,
            ResetPolyline,
            ResetWell,
            ResetPolylineCablines,
            pushWell,
            delWell
        };
    },

    components: {
        wellobject, 
        homeobject,
        firstpage,
        kablines,
        kabchannel,
        objectconstructor,
        wellconstructor,
        kkconstructor,
        firstkkconstructor,
        drc,
        schemeconstructor,
        drcconstructor,
        scheme,
        kablinesconstructor,
        userlist,
        logslist
    },
})

const pinia = createPinia();
window.pinia = pinia;

app.use(pinia);

window.vueApp = app.mount('.wrapper');

const stateStore = useStateStore(pinia);
window.stateStore = stateStore;

$('.owl-carousel').owlCarousel({
    loop:false,
    autoWidth:true,
    items:4
})









