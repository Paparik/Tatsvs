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

import { useRouter, createRouter, createWebHashHistory, useRoute } from 'vue-router';
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

const routes = [
    {
        path: '/',
        components: {
            default: firstpage,
            primary: firstpage, 
        },
    },
    {
        path: '/homeObject/:id',
        name: 'Home',
        components: {
            primary: homeobject, 
        },
        props: { primary: true },
    },
    {
        path: '/homeObject/:id/homeScheme',
        components: {
            secondary: scheme, 
        },
        props: { secondary: true },
    },
    {
        path: '/homeObject/:id/homeScheme/drc/:id2',
        components: {
            secondary: drc, 
        },
        props: { secondary: true },
    },
    {
        path: '/homeConstructor/:id',
        name: 'HomeConstructor',
        components: {
            primary: objectconstructor, 
        },
        props:  { primary: true },
    },
    {
        path: '/homeConstructor/:id/homeScheme',
        components: {
            secondary: schemeconstructor, 
        },
        props: { secondary: true },
    },
    {
        path: '/homeConstructor/:id/homeScheme/drc/:id2',
        components: {
            secondary: drcconstructor, 
        },
        props: { secondary: true },
    },
    {
        path: '/loglist',
        components: {
            secondary: logslist, 
        },
    },
    {
        path: '/userlist',
        components: {
            secondary: userlist, 
        },
    },


];
  
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
  



const app = createApp({
    setup() {

        const store = useStateStore()
        const router = useRouter();
        const route = useRoute();

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
            store.newScheme.wells.push(well)
        }

        const setDrcConstructor = (obj) =>{
            store.objectForConstructor.houseschem.drc[store.state.chupapiIndex] = obj
        }
        const saveObjectSchem = (obj1,obj2) =>{
            store.objectForConstructor.houseschem.entrances = obj1;
            store.objectForConstructor.houseschem.drc = obj2;
        }

        const pushNewChannel = (newchannel) =>{
            store.newScheme.kls.push(newchannel);
        }

        const cancelEditWell = (newWell) =>{
            store.newScheme.wells[store.newScheme.wells.findIndex(x => x.id === newWell.id)] = newWell;
            store.state.mainType = 72;
        }

        const cancelEditChannel = (newChannel) =>{
            store.newScheme.kls[store.newScheme.kls.findIndex(x => x.id === newChannel.id)] = newChannel;
            store.state.mainType = 72;
        }

        const cancelEditLine = (obj) =>{
            store.newScheme.cableLines[store.newScheme.cableLines.findIndex(x => x.id === obj.numKabLine)] = obj;
            store.state.mainType = 72;
        }

        const delCableChannel = (cableChannels) => {
            store.newScheme.kls.splice(cableChannels, 1);
        }
        const delWell = (well) => {
            store.newScheme.wells.splice(well, 1);
        }


        
        function kablinesCounter(id){
            let lenght = 0
            for (let index = 0; index < store.newScheme.cableLines.length; index++) {
                if (store.newScheme.cableLines[index].KabLines.find(item => item.numKabLine == id) != -1){
                    lenght +=  Number(store.newScheme.cableLines[index].length)
                }
                
            }
            return lenght
        }

        function ResetWell(){
            let obj = cableSchemasManager.cableSchemas.find(x => x.id == store.wellObj.schemaId);
            if(obj){
                let manager = obj.GetWellsManager();
                if(manager){
                    let well = manager.wells.find(x => x.id == store.wellObj.id);
                    if(well){
                        if(!well.wellObject.typeWell.includes("Ввод") && !well.wellObject.typeWell.includes("ввод")) well.getMarker().setIcon(constructorManager.GetIcon("Колодец", 0));
                    }
                }
            }
        }

        function ResetPolylineCablines(){
            let schem = cableSchemasManager.cableSchemas.find(x => x.id == store.kabChannelObj.schemaId);
            if(schem){
                let manager = schem.GetCableChannelsManager();
                if(manager){
                    let objects = manager.cableChannels.filter(x => x.cableChannelObject.KabLines.find(x => x.numKabLine == store.kabLinelObj.numKabLine))
                    objects.forEach(element => {
                        element.GetPolyline().setStyle({ color: 'rgba(105, 105, 105, 0.5)' })
                    });
                }
            }
        }

        function ResetPolyline(){
            let obj = cableSchemasManager.cableSchemas.find(x => x.id == store.kabChannelObj.schemaId);
            if(obj){
                let manager = obj.GetCableChannelsManager();
                if(manager){
                    let channel = manager.cableChannels.find(x => x.id == store.kabChannelObj.numKabChannel);
                    if(channel){
                        channel.GetPolyline().setStyle({ color: 'rgba(105, 105, 105, 0.5)' })
                    }
                }
            }
        }

        function GetMainPage(){
            store.state.whereBack = 0;
            router.push({ path: "/" });
            switch(store.state.mainType){
                case 3:
                case 2:
                case 1:
                case 4:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    store.state.mainType=0
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
                    if(store.newScheme.edit == true){
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
                    let obj = cableSchemasManager.cableSchemas.find(x => x.id == store.kabChannelObj.schemaId);
                    if(obj){
                        let manager = obj.GetCableChannelsManager();
                        if(manager){
                            let channel = manager.cableChannels.find(x => x.id == store.kabChannelObj.numKabChannel);
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
                    store.objectHome = obj
                    const encodedId = encodeURIComponent(store.objectHome.id);
                    router.push({ path: `/homeObject/${encodedId}` });
                    break;
                case 2: 
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    store.wellObj=obj;
                    break;
                case 3:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    store.kabChannelObj=obj; 
                    break;
                case 4:
                    ResetWell();
                    ResetPolylineCablines();
                    store.kabLinelObj=obj;
                    store.state.whereBack = 3; 
                    break;
                case 12:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();

                    store.objectForConstructor = obj;
                    
                    if (obj?.id) {
                        const encodedId = encodeURIComponent(store.objectForConstructor.id);
                        router.push({ path: `/homeConstructor/${encodedId}` });
                    } else {
                        router.push({ path: '/homeConstructor' });
                    }

                    break;
                case 72:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    store.newScheme = obj;
                    break;

                case 22:
                    store.wellForConstructor = obj;
                    store.state.whereBack = 72;
                    break;
                case 32:
                    store.kkForConstructor = obj;
                    store.state.whereBack = 72;
                    break;
                case 42:
                    store.kabLinelForConstructor = obj;
                    store.state.whereBack = 72;
                    break;
                case 5:
                    // store.state.entrances=obj;
                    store.state.whereBack = 1
                    // console.log(router);
                    router.push({ path: `/homeObject/${encodeURIComponent(store.objectHome.id)}/homeScheme` })
                    setTimeout(() => {
                        $('.owl-carousel').owlCarousel({
                            loop:false,
                            autoWidth:true,
                            items:4
                        })
                    }, 200);
                    break;
                case 6:
                    store.drc=obj;
                    // console.log(obj);
                    
                    // console.log(store.drc);
                    // store.setDrc(obj)
                    router.push({ path: `/homeObject/${encodeURIComponent(store.objectHome.id)}/homeScheme/drc/${obj.id}` })
                    store.state.whereBack = 5
                    break;
                case 8:
                    store.userList=obj;
                    router.push({ path: `/userlist` })
                    break;
                case 9:
                    store.logs=obj;
                    router.push({ path: `/loglist` })
                    break;
                case 52:
                    if (store.objectForConstructor ?.id) {
                        router.push({ path: `/homeConstructor/${encodeURIComponent(store.objectForConstructor.id)}/homeScheme` });
                    } else {
                        router.push({ path: '/homeConstructor/homeScheme' });
                    }
                    store.newSchemeObject = obj;
                    store.state.whereBack = 12
                    
                    break;
                case 62:
                    store.newDrc = obj[id];
                    router.push({ path: `/homeConstructor/${encodeURIComponent(store.objectForConstructor.id)}/homeScheme/drc/${store.newDrc.id}` })
                    store.state.whereBack = 52
                    break;
                default:
                    break;
            }
            store.state.mainType = type
        }

        function updateKabLines(newKabLines) {
            store.kkForConstructor.kabLines = newKabLines;
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
app.use(router);

window.vueApp = app.mount('.wrapper');

const stateStore = useStateStore(pinia);
window.stateStore = stateStore;

$('.owl-carousel').owlCarousel({
    loop:false,
    autoWidth:true,
    items:4
})









