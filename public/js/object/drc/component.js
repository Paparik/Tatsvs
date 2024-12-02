import { computed } from 'vue'
import { useStateStore } from '../../pinia/store.js'
export const drc = {

    setup(){
        const store = useStateStore()
        function backTo(){
            window.vueApp.back()
        }
        const wellImg = computed(() => {
            if(store.drc.lastPhoto.reader.path != null && store.drc.lastPhoto.reader.path.includes("./php")){
                return store.drc.lastPhoto.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            }
            else if(store.drc.lastPhoto.reader.path != null && !store.drc.lastPhoto.reader.path.includes("./php")){
                return store.drc.lastPhoto.reader.path;
            }
        })
        
        const operators = computed(() => {
            const uniqueOperators = [];
            const operatorsSet = new Set();
            
                
            store.drc.closet.opers.forEach(item => {
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
            for (const floor in store.drc.closet.opers) {
                const floorData =  store.drc.closet.opers[floor];
                const id = floorData.operator;
                if (!colorIndexMap.hasOwnProperty(id)) {
                    colorIndexMap[id] = colorIndex;
                    colorIndex++;
                    if (colorIndex >=  store.state.colors.length) {
                        colorIndex = 0;
                    }
                }
                const color =  store.state.colors[colorIndexMap[id]];
                a[id] = color;
            }
            return a
    
        })
        
        return{
            backTo,
            wellImg,
            store,
            operators,
            operatorsColors
        }
    },
    template:`
        <div class="container">
            <div class="drc">
                <div class="drc-about">
                    <button class="button" @click="backTo">Назад</button>
                    <div class="drc-about__title">
                        Последнее фото шкафа:
                    </div>
                    <div class="item-img" v-if="store.drc.lastPhoto.reader">
                        <div class="item-img__container">
                            <img :src="wellImg" alt="">
                        </div>
                    </div>
                    <div class="drc-about__desc">
                       {{store.drc.desc}}
                    </div>
                </div>
                <div class="drc-main">
                    <div class="drc-operList">
                        <p>Операторы</p>
                        <div 
                            class="drc-operList__item" 
                            v-for="oper in operators"
                            :style="{background: '#' + operatorsColors[oper]}"
                        >
                            {{oper}}
                        </div>
                    </div>
                    <div class="drc-main__container">
                        <div class="drc-main__opers">
                            <div class="drc-main__item" >
                                <p>Шкаф операторов</p>
                            </div>
                            <div 
                                class="drc-main__item" 
                                :style="{background: oper.operator!=null ?  '#' + operatorsColors[oper.operator]: 'none',color:  oper.operator!=null ? '#fff' : '#000'}"
                                v-for="(oper,i) in store.drc.closet.opers"
                                >
                                <div class="drc-main__number" >
                                    {{i+1}}
                                </div>
                                <p>{{oper.name}}</p>
                            </div>
                        </div>
                        <div class="drc-main__ports">
                            <div class="drc-main__item">
                                <p>ДРС</p>

                            </div>
                            <div class="drc-main__item" v-for="(port, i) in store.drc.closet.ports">
                                <p>{{port.name}}</p>
                                <div class="drc-main__number" >
                                    {{i+1}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}