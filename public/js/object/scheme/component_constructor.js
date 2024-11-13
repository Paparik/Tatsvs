import { ref, watch, reactive } from 'vue'
export const schemeconstructor = {
    props: {
        newscheme:{
            type: Array
        },
        drc:{
            type: Array
        }
    },
    setup(props,{emit}){
        let entrancesCount = ref(props.newscheme.length)
        let drcCount = ref(props.drc.length)
        
        const scheme = ref([])

        const allClosets = reactive({})


        // created(() => {

        // })
        // onBeforeMount(() => {
        //     entrancesCount = props.newscheme.length
        //     drcCount = props.drc.length
        // })

        function setAllClosets(index){
            for (let i = 0; i < props.newscheme.length; i++) {
                const element = props.newscheme[i];
                let closet = element.closets
                let pos = 0
                for (let key in closet) {
                    if (closet[key]!=''){
                        this.allClosets[String(index)+String(pos)] = closet[key]
                        pos++
                    }

                }
            }
            const uniqueClosets = removeDuplicates(allClosets);

            Object.keys(allClosets).forEach(key => delete allClosets[key]);
            Object.assign(allClosets, uniqueClosets);
        }
        function removeDuplicates(obj) {
            const uniqueValues = new Set();
            const result = {};
          
            for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (!uniqueValues.has(value)) {
                  uniqueValues.add(value);
                  result[key] = value;
                }
              }
            }
          
            return result;
        }

        const checkLimit = (event) => {
            let value = Number(event.target.value);
            if (value > 50) {
                entrancesCount.value = 50;
            }
        };
        const checkLimitDrc = (event) => {
            let value = Number(event.target.value);
            if (value > 50) {
                drcCount.value = 50;
            }
        };

        watch(entrancesCount, (count) => {
            if (count=='') {return false}
            let nowLenght = props.newscheme.length
            
            if (count > props.newscheme.length){
                for (let index = nowLenght; index < count; index++) {
                    props.newscheme.push(
                        {
                            countFloors: null,
                            aparts:[
    
                            ],
                            closets:{
                                top:'',
                                bottom:''
                            }
                        }
                    )
                }
            } else if (count< props.newscheme.length){
                for (let index = props.newscheme.length; index > count; index--) {
                    props.newscheme.pop()
                }
            } 
        })

        watch(drcCount, (count) => {
            if (count=='') {return false}
            let nowLenght = props.drc.length
            
            if (count > props.drc.length){
                for (let index = nowLenght; index < count; index++) {
                    props.drc.push(
                        {
                            name: '',
                            lastPhoto: { reader: { name: null, path: null }, file: null },
                            desc: '',
                            operList: [['']],
                            position: null,
                            closet:{
                                opers:[],
                                ports:[]
                            }
                        }
                    )
                }
            } else if (count< props.drc.length){
                for (let index = props.drc.length; index > count; index--) {
                    props.drc.pop()
                }
            } 
        })

        function setDrcToEtrance(indexEtrance,drc){
            if (drc.position==0){
                props.newscheme[indexEtrance].closets.bottom = drc.name
            }else{
                props.newscheme[indexEtrance].closets.top = drc.name
            }
        }

        function setFloors(index,a){
            let count= props.newscheme[index].countFloors
            if (count>50){
                props.newscheme[index].countFloors = 50
                return
            }
            if (a=="+"){
                props.newscheme[index].aparts.push(
                    [ props.newscheme[index].aparts.length+1 ,'',false,'']
                )
                props.newscheme[index].countFloors++
                return
            }else if (a=="-"){
                props.newscheme[index].aparts.pop()
                props.newscheme[index].countFloors--
                return
            }
            if (count=='') {return false}
            let nowLenght = props.newscheme[index].aparts.length
            
            if (count > props.newscheme[index].aparts.length){
                for (let i = nowLenght; i < count; i++) {
                    props.newscheme[index].aparts.push(
                       [i+1,'',false,'']
                    )
                }
            } else if (count< props.newscheme[index].aparts.length){
                for (let i = props.newscheme[index].aparts.length; i > count; i--) {
                    props.newscheme[index].aparts.pop()
                }
            } 
        }
        function setpatch(inxEtr, indxFloor){
            props.newscheme[inxEtr].aparts[indxFloor][2]=!props.newscheme[inxEtr].aparts[indxFloor][2]
        }
        function setDrc(inxEtr, pos){
            let act = props.newscheme[inxEtr].closets[pos] == undefined ? 1 : 0

            if (act){
                props.newscheme[inxEtr].closets[pos] = ''
                
            }else{
                delete props.newscheme[inxEtr].closets[pos] 
            }

        }
        function setDrcToFloor(inxEtr,indxFloor,drc){
            props.newscheme[inxEtr].aparts[indxFloor][3] = drc
        }

        function backTo(){
            emit('func-back')
        }

        function button(id, inx){
            switch(id){
                case 0:
                    constructorManager.object.OpenDrcSchem(props.drc, inx);
                break;
                case 1:
                    constructorManager.object.SaveObjectSchem(props.newscheme, props.drc);
                break;
            }
        }


        return {
            entrancesCount,
            scheme,
            setFloors,
            setpatch,
            setDrc,
            setDrcToFloor,
            checkLimit,
            backTo,
            allClosets,
            removeDuplicates,
            setAllClosets,
            drcCount,
            setDrcToEtrance,
            button,
            checkLimitDrc
        }
    },
    template: `
        <div class="container">
            <div class="maket-constructor">
                <div class="maket-constructor__header">
                    <button class="button" @click="backTo">Назад</button>
                    <button class="button" @click="button(1, '')">Сохранить</button>
                </div>
                <div class="maket-constructor__main">
                    <div class="maket-constructor__container">
                        <div class="maket-constructor__title">
                            <p>Конструктор схемы</p>
                            <div class="maket-constructor__floors">
                                <button @click="entrancesCount--">-</button>
                                <input @input="checkLimit" v-model.number="entrancesCount" type="text" placeholder="Кол-во подъездов">
                                <button @click="entrancesCount++">+</button>
                            </div>
                        </div>
                        <div class="maket-constructor__entrances">
                            <div class="maket-entrance-slide" v-for="(etrance,ind) in newscheme">
                                <default-item-table :name="'Подъезд '+ (ind+1)">
                                    <div class="maket-entrance-slide__content">
                                        <div class="table">
                                            <div class="table__item">
                                                <div class="table__title">
                                                    <p>Количество этажей</p>
                                                    <div class="maket-floor-input">
                                                        <button @click="setFloors(ind,'-')">-</button>
                                                        <div class="constructor__input">
                                                            <input type="text" 
                                                             @input="setFloors(ind)"
                                                             v-model="etrance.countFloors"
                                                             :placeholder="'Введите кол-во'">
                                                        </div>
                                                        <button @click="setFloors(ind,'+')">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <default-item-scheme name="Шкафы ДРС">
                                                <div class="set-drc">
                                                    <div class="slider">
                                                        <div class="slider__title" onclick="openSliderConstructor(this)">
                                                            <p style="font-size: 20px;">
                                                            {{!etrance.closets.top  ? 'Выбрать Шкаф' : etrance.closets.top }}
                                                            </p>
                                                            <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#6B6B6B"/>
                                                            </svg>                                                    
                                                        </div>
                                                        <div class="slider__items">
                                                            <div class="slider__item" 
                                                                onclick="closeSliderConstructor(this)" 
                                                                @click="setDrcToEtrance(ind,item)"
                                                                v-show="item.position==1"
                                                                v-for="item in drc"
                                                                >
                                                                {{item.name}}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button class="set-drc__pos pos_ac">
                                                        Верхний
                                                    </button>
                                                    <button class="set-drc__pos" @click="etrance.closets.top=''">
                                                        Удалить
                                                    </button>
                                                </div>
                                                <div class="set-drc">
                                                    <div class="slider">
                                                        <div class="slider__title" onclick="openSliderConstructor(this)">
                                                            <p style="font-size: 20px;">
                                                            {{!etrance.closets.bottom  ? 'Выбрать Шкаф' : etrance.closets.bottom }}
                                                            </p>
                                                            <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#6B6B6B"/>
                                                            </svg>                                                    
                                                        </div>
                                                        <div class="slider__items">
                                                            <div class="slider__item" 
                                                                onclick="closeSliderConstructor(this)" 
                                                                @click="setDrcToEtrance(ind,item)"
                                                                v-show="item.position==0"
                                                                v-for="item in drc"
                                                                >
                                                                {{item.name}}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button class="set-drc__pos pos_ac">
                                                        Нижний
                                                    </button>
                                                    <button class="set-drc__pos" @click="etrance.closets.bottom=''">
                                                        Удалить
                                                    </button>
                                                </div>
                                               
                                            </default-item-scheme>
                                            <default-item-scheme name="Этажи">
                                                <div class="set-drc" v-for="(floor,i) in newscheme[ind].aparts">
                                                    <div class="maket-constructor-floor">
                                                        <div class="maket-constructor-floor__name">
                                                            {{floor[0]}} этаж
                                                        </div>
                                                        <div class="maket-constructor-floor__items">
                                                            <div class="slider">
                                                                <div class="slider__title" onclick="openSliderConstructor(this)">
                                                                    <p style="font-size: 20px;">
                                                                    {{floor[3] == "" ? 'Шкаф' : floor[3]}}
                                                                    </p>
                                                                    <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#6B6B6B"/>
                                                                    </svg>                                                    
                                                                </div>
                                                                <div class="slider__items">
                                                                    <div class="slider__item" onclick="closeSliderConstructor(this)" 
                                                                        v-show="closet!=''" 
                                                                        @click="setDrcToFloor(ind,i,closet.name)" 
                                                                        v-for="closet in drc">
                                                                        {{closet.name}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="maket-constructor-floor__patch" @click="setpatch(ind,i)">
                                                                Патч-панель
                                                                <button>
                                                                    <svg v-if="floor[2]" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect x="1.46655" y="9.80762" width="9.00205" height="2" rx="1" transform="rotate(47.16 1.46655 9.80762)" fill="black"/>
                                                                        <rect x="16.5828" y="1.03613" width="19.4554" height="2.0035" rx="1" transform="rotate(121.143 16.5828 1.03613)" fill="black"/>
                                                                    </svg>                                                            
                                                                </button>
                                                            </div>
                                                            <input v-model="floor[1]" type="text" placeholder="Квартиры n-n">
                                                        </div>
                                                    </div>
                                                </div>
                                            </default-item-scheme>
                                        </div>
                                    </div>
                                </default-item-table>
                            </div>
                        </div>
                    </div>
                    <div class="maket-constructor__container">
                        <div class="maket-constructor__title">
                            <p>Шкафы ДРС</p>
                            <div class="maket-constructor__floors">
                                <button @click="drcCount--">-</button>
                                <input @input="checkLimitDrc" v-model.number="drcCount" type="text" placeholder="Кол-во шкафов">
                                <button @click="drcCount++">+</button>
                            </div>
                        </div>
                        <div class="maket-constructor__entrances">
                            <div class="set-drc" v-for="(item,ind) in drc">
                                <input list="drcs"  v-model="item.name" type="text" placeholder="Название">
                                <div class="slider">
                                    <div class="slider__title" onclick="openSliderConstructor(this)">
                                        <p style="font-size: 20px;">
                                        {{item.position == null ? 'Позиция' : item.position==0 ? 'Снизу' : 'Сверху'}}
                                        </p>
                                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#6B6B6B"/>
                                        </svg>                                                    
                                    </div>
                                    <div class="slider__items">
                                        <div class="slider__item" onclick="closeSliderConstructor(this)" 
                                            v-show="item.position!=1" 
                                            @click="item.position=1" 
                                            >
                                            Сверху
                                        </div>
                                        <div class="slider__item" onclick="closeSliderConstructor(this)" 
                                            v-show="item.position!=0" 
                                            @click="item.position=0" 
                                            >
                                            Снизу
                                        </div>
                                    </div>
                                </div>
                                <button class="set-drc__info" @click="button(0, ind)">
                                    Редактировать
                                </button>
                            </div>
    
                        </div>
                    </div>
                </div>

            </div>
        </div>


    `,
    components: {
        ConstructorInput,
        AdditionalParameters,
        DefaultColumn,
        DefaultSlider,
        DefaultItemTable,
        DefaultItemScheme
    }
}