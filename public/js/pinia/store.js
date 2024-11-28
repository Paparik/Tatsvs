import { defineStore } from 'pinia';
import { ref, computed, reactive, toRefs, onMounted, nextTick   } from 'vue';


export const useStateStore = defineStore('mainState', () => {
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


    // const role = window.appConfig.role
    
    const role = ""
    
    async function auth(){
        let result = await apiManager.setData("login", "./php/api/auth/index.php", JSON.stringify([state.username, state.password]));
        switch(result.code){
            case 200:
                $.notify("Успешный вход", { type:"toast" });
                setTimeout(() => {
                    window.location.reload();
                }, 700);
                role = window.appConfig.role
            break;
            case 201:
                $.notify("Неверное имя пользователя или пароль.", { type:"toast" });
            break;
        }
    }

    function updateState(key, value) {
        const keys = key.split('.');
        let target = state;
    
        for (let i = 0; i < keys.length - 1; i++) {
          if (!target[keys[i]]) target[keys[i]] = {};
          target = target[keys[i]];
        }
        target[keys[keys.length - 1]] = value;
    }

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

    function setObject(obj){
        state.objectHome = obj
    }

    

    const filteredObjects = computed(() => {
        const query = state.search.toLowerCase();
        return Object.fromEntries(
            Object.entries(state.allObjectsAndSchemas || {}).filter(([key]) =>
                key.toLowerCase().includes(query)
            )
        );
    });

    const CabChannelsActiveToggle = () => {
        cabChannelsActive.value = !cabChannelsActive.value;
        mapManager.CableChannelsVisible(cabChannelsActive.value);
    }

    const cabChannelsActive = ref(true);

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
            const floorData =  state.drc.closet.opers[floor];
            const id = floorData.operator;
            if (!colorIndexMap.hasOwnProperty(id)) {
                colorIndexMap[id] = colorIndex;
                colorIndex++;
                if (colorIndex >=  state.colors.length) {
                    colorIndex = 0;
                }
            }
            const color =  state.colors[colorIndexMap[id]];
            a[id] = color;
        }
        return a

    })

    onMounted(() => {
        sortColor()
    })
    
    return {
        state,
        filteredObjects,
        CabChannelsActiveToggle,
        cabChannelsActive,
        updateState,
        auth,
        role,
        promptsOptions,
        sortColor,
        operators,
        operatorsColors,
        setObject
    };

});