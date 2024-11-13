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
        const state = reactive({
            mainType: 0,
            cabChannelsActive: true,
            objectHome: {},
            wellObj: {},
            kabChannelObj: {},
            kabLinelObj: {},
            objectForConstructor: {},
            wellForConstructor:{},
            kkForConstructor:{},
            kabLinelForConstructor: {},
            newSchemeObject:{ drc: [], entrances: [] },
            newScheme: { edit: false, id: '', name: '', wells:[], kls:[], cableLines: [] },
            colors: ['FF5555','3BC171','5194BA','7351BA','C02C61','C18B3B'],
            newUser: { username: '', password: '', role: '' },
            closetsColor:{},
            drc:{},
            newDrc: {},
            entrances: [],
            entrances: [],
            userList: [],
            allObjectsAndSchemas:{},


            username: "",
            password: "",
            whereBack: null,
            chupapiIndex: -1,
            search: '',
            loading: false,
            countObj: 0,
            countKl: 0,

            logs: []
        })

        const promptsOptions = {
            operators: ["МТС", "Таттелеком", "Уфанет", "ЭР-телеком"],
            management_companies: ["Тулпар"],
            well_type: ["ККС - 2", "ККС - 4", "ККС - 5", "Ввод в дом"],
            luke_type: ["Стальной", "Квадратный"],
            cable_channel_material: ["Пластик", "Медь"],
            cable_type_in_cable_line: ["Первый", "Второй"],
            cable_mark_in_cable_line: ["Первый", "Второй"],
            drc_elements_drc: ["Первый", "Второй"],
            drc_elements_closet: ["Органайзер", "Оптический кросс", "Коммутатор"]
        }

        function kablinesCounter(id){
            let lenght = 0
            for (let index = 0; index < state.newScheme.cableLines.length; index++) {
                if (state.newScheme.cableLines[index].KabLines.find(item => item.numKabLine == id) != -1){
                    lenght +=  Number(state.newScheme.cableLines[index].length)
                }
                
            }
            return lenght
        }

        function ResetWell(){
            let obj = cableSchemasManager.cableSchemas.find(x => x.id == state.wellObj.schemaId);
            if(obj){
                let manager = obj.GetWellsManager();
                if(manager){
                    let well = manager.wells.find(x => x.id == state.wellObj.id);
                    if(well){
                        if(!well.wellObject.typeWell.includes("Ввод") && !well.wellObject.typeWell.includes("ввод")) well.getMarker().setIcon(constructorManager.GetIcon("Колодец", 0));
                    }
                }
            }
        }

        function ResetPolylineCablines(){
            let schem = cableSchemasManager.cableSchemas.find(x => x.id == state.kabChannelObj.schemaId);
            if(schem){
                let manager = schem.GetCableChannelsManager();
                if(manager){
                    let objects = manager.cableChannels.filter(x => x.cableChannelObject.KabLines.find(x => x.numKabLine == state.kabLinelObj.numKabLine))
                    objects.forEach(element => {
                        element.GetPolyline().setStyle({ color: 'rgba(105, 105, 105, 0.5)' })
                    });
                }
            }
        }

        function ResetPolyline(){
            let obj = cableSchemasManager.cableSchemas.find(x => x.id == state.kabChannelObj.schemaId);
            if(obj){
                let manager = obj.GetCableChannelsManager();
                if(manager){
                    let channel = manager.cableChannels.find(x => x.id == state.kabChannelObj.numKabChannel);
                    if(channel){
                        channel.GetPolyline().setStyle({ color: 'rgba(105, 105, 105, 0.5)' })
                    }
                }
            }
        }

        function GetMainPage(){
            switch(state.mainType){
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
                    if(state.newScheme.edit == true){
                        constructorManager.destroy(4);
                    }
                    else{
                        constructorManager.destroy(2);
                    }
                break;
                default:
                    state.mainType=0
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
            const query = state.search.toLowerCase();
            return Object.fromEntries(
                Object.entries(state.allObjectsAndSchemas).filter(([key]) =>
                    key.toLowerCase().includes(query)
                )
            );
        });

        async function auth(){
            let result = await apiManager.setData("login", "./php/api/auth/index.php", JSON.stringify([state.username, state.password]));
            switch(result.code){
                case 200:
                    $.notify("Успешный вход", { type:"toast" });
                    setTimeout(() => {
                        window.location.reload();
                    }, 700);
                break;
                case 201:
                    $.notify("Неверное имя пользователя или пароль.", { type:"toast" });
                break;
            }
        }

        function CabChannelsActiveToggle() {
            state.cabChannelsActive = !state.cabChannelsActive;
            mapManager.CableChannelsVisible(state.cabChannelsActive);
        }
        
        function back(){
            state.mainType=state.whereBack
            switch(state.whereBack){
                case 52:
                    state.whereBack = 12;
                break;
                case 3:
                    ResetPolylineCablines();
                    let obj = cableSchemasManager.cableSchemas.find(x => x.id == state.kabChannelObj.schemaId);
                    if(obj){
                        let manager = obj.GetCableChannelsManager();
                        if(manager){
                            let channel = manager.cableChannels.find(x => x.id == state.kabChannelObj.numKabChannel);
                            if(channel){
                                channel.GetPolyline().setStyle({ color: 'rgba(255, 69, 0, 0.7)' })
                            }
                        }
                    }
                break;
                case 5:
                    state.whereBack = 1;
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
                state.chupapiIndex = id
            }
            switch (type) {
                case 0: break;
                case 1:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    state.objectHome=obj; 
                    break;
                case 2: 
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    state.wellObj=obj;
                    break;
                case 3:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    state.kabChannelObj=obj; 
                    break;
                case 4:
                    ResetWell();
                    ResetPolylineCablines();
                    state.kabLinelObj=obj;
                    state.whereBack = 3; 
                    break;
                case 12:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    state.objectForConstructor = obj; 
                    break;
                case 72:
                    ResetWell();
                    ResetPolyline();
                    ResetPolylineCablines();
                    state.newScheme = obj;
                    break;

                case 22:
                    state.wellForConstructor = obj;
                    state.whereBack = 72;
                    break;
                case 32:
                    state.kkForConstructor = obj;
                    state.whereBack = 72;
                    break;
                case 42:
                    state.kabLinelForConstructor = obj;
                    state.whereBack = 72;
                    break;
                case 5:
                    state.entrances=obj;
                    state.whereBack = 1
                    setTimeout(() => {
                        $('.owl-carousel').owlCarousel({
                            loop:false,
                            autoWidth:true,
                            items:4
                        })
                    }, 200);
                    break;
                case 6:
                    state.drc=obj;
                    state.whereBack = 5
                    break;
                case 8:
                    state.userList=obj;
                    break;
                case 9:
                    state.logs=obj;
                    break;
                case 52:
                    state.newSchemeObject = obj;
                    state.whereBack = 12
                    break;
                case 62:
                    state.newDrc = obj[id];
                    state.whereBack = 52
                    break;
                default:
                    break;
            }
            state.mainType = type
        }

        function updateKabLines(newKabLines) {
            state.kkForConstructor.kabLines = newKabLines;
        }

        function wellButtonFp(type){
            if (type){ // редактировать

            }else{ // удалить

            }
        }

        function klsButtonFp(type){
            if (type){ // редактировать

            }else{ // удалить

            }
        }


        function sortColor() {
            const colorIndexMap = {};
            let colorIndex = 0;
        
            for (const floor in state.entrances) {
                const floorData = state.entrances[floor];
                const aparts = floorData.aparts;
        
                for (const apart of aparts) {
                    const id = apart[3];
                    if (!colorIndexMap.hasOwnProperty(id)) {
                        colorIndexMap[id] = colorIndex;
                        colorIndex++;
                        if (colorIndex >= state.colors.length) {
                            colorIndex = 0;
                        }
                    }
                    const color = state.colors[colorIndexMap[id]];
                    state.closetsColor[id]= color;
                }
            }
        }
        
        const operators = computed(() => {
            const uniqueOperators = [];
            const operatorsSet = new Set();
        
            state.drc.closet.opers.forEach(item => {
                if (item.operator && !operatorsSet.has(item.operator)) {
                    operatorsSet.add(item.operator);
                    uniqueOperators.push(item.operator);
                }
            });
            
            return uniqueOperators;
        })

        const operatorsColors = computed(() => {
            let a = {}
            const colorIndexMap = {};
            let colorIndex = 0;
            for (const floor in state.drc.closet.opers) {
                const floorData = state.drc.closet.opers[floor];
                const id = floorData.operator;
                if (!colorIndexMap.hasOwnProperty(id)) {
                    colorIndexMap[id] = colorIndex;
                    colorIndex++;
                    if (colorIndex >= state.colors.length) {
                        colorIndex = 0;
                    }
                }
                const color = state.colors[colorIndexMap[id]];
                a[id] = color;
            }
            return a

        })



        return {
            perehod,
            state,
            setData,
            updateKabLines,
            sortColor,
            wellButtonFp,
            klsButtonFp,
            operators,
            operatorsColors,
            back,
            CabChannelsActiveToggle,
            auth,
            filteredObjects,
            GetMainPage,
            kablinesCounter,
            ResetPolyline,
            ResetWell,
            ResetPolylineCablines,
            promptsOptions
        };
    },
    created(){
        this.sortColor()
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



window.vueApp = app.mount('.wrapper');

$('.owl-carousel').owlCarousel({
    loop:false,
    autoWidth:true,
    items:4
})





