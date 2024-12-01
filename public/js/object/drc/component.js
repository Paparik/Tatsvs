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
        return{
            backTo,
            wellImg,
            store,
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
                            v-for="oper in store.operators"
                            :style="{background: '#' + store.operatorsColors[oper]}"
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
                                v-for="(oper,i) in store.drc.closet.opers"
                                :style="{background: oper.operator!=null ?  '#' + store.operatorsColors[oper.operator]: 'none',color:  oper.operator!=null ? '#fff' : '#000'}"
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