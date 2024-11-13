import { computed } from 'vue'
export const drc = {
    props:{
        obj:{
            type: Object
        },
        operators: {
            type: Array
        },
        colors:{
            type: Object
        }
    },
    setup(props, {emit}){
        function backTo(){
            emit("func-back")
        }
        const wellImg = computed(() => {
            if(props.obj.lastPhoto.reader.path != null && props.obj.lastPhoto.reader.path.includes("./php")){
                return props.obj.lastPhoto.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            }
            else if(props.obj.lastPhoto.reader.path != null && !props.obj.lastPhoto.reader.path.includes("./php")){
                return props.obj.lastPhoto.reader.path;
            }
        })
        return{
            backTo,
            wellImg
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
                    <div class="item-img" v-if="obj.lastPhoto.reader">
                        <div class="item-img__container">
                            <img :src="wellImg" alt="">
                        </div>
                    </div>
                    <div class="drc-about__desc">
                       {{obj.desc}}
                    </div>
                </div>
                <div class="drc-main">
                    <div class="drc-operList">
                        <p>Операторы</p>
                        <div 
                            class="drc-operList__item" 
                            v-for="oper in operators"
                            :style="{background: '#' + colors[oper]}"
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
                                v-for="(oper,i) in obj.closet.opers"
                                :style="{background: oper.operator!=null ?  '#' + colors[oper.operator]: 'none',color:  oper.operator!=null ? '#fff' : '#000'}"
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
                            <div class="drc-main__item" v-for="(port, i) in obj.closet.ports">
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