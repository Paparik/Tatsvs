import { ref, nextTick, computed } from 'vue'
import { useStateStore } from '../../pinia/store.js'
export const drcconstructor = {

    setup(props,{emit}){
        const store = useStateStore()

        function addToOperList(){
            store.newDrc.operList.push([''])
        }
        function setOperToElem(i,value){
            store.newDrc.closet.opers[i].operator = value
        }
        function addOper(){
            store.newDrc.closet.opers.push({name: '', operator: ''})
        }
        function dellOper(i){
            store.newDrc.closet.opers.splice(i,1)
        }
        function dellPort(i){
            store.newDrc.closet.ports.splice(i,1)
        }
        function addPort(){
            store.newDrc.closet.ports.push({name: '', operator: ''})
        }

        function backTo(){
            window.vueApp.back()
        }

        function SelectPhoto(id){
            const reader = new FileReader();
            let fileManager = new FilesManager(true);
            fileManager.selectFiles().then(files => {
                switch(id){
                    case "lastphoto":
                        store.newDrc.lastPhoto.file = files;
                        reader.onload = e => {
                            store.newDrc.lastPhoto.reader.path = e.target.result;
                        };
                        reader.readAsDataURL(files[0]);
                        nextTick();
                    break;
                }
            });
        }
        const wellImg = computed(() => {
            if(store.newDrc.lastPhoto.reader.path != null && store.newDrc.lastPhoto.reader.path.includes("./php")){
                return store.newDrc.lastPhoto.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            }
            else if(store.newDrc.lastPhoto.reader.path != null && !store.newDrc.lastPhoto.reader.path.includes("./php")){
                return store.newDrc.lastPhoto.reader.path;
            }
        })
        function dellPhoto(){
            store.newDrc.lastPhoto = { reader: { name: null, path: null }, file: null };
        }

        return{
            addToOperList,
            setOperToElem,
            addOper,
            dellOper,
            dellPort,
            backTo,
            addPort,
            SelectPhoto,
            dellPhoto,
            wellImg,
            store
        }
    },
    template:`
        <div class="container">
            <div class="drc drc-constructor">
                <div class="drc">
                    <div class="drc-about">
                        <button class="button" @click="backTo">Назад</button>
                        <div class="drc-about__title">
                            Последнее фото шкафа:
                            <svg @click="dellPhoto()" v-if="store.newDrc.lastPhoto.reader.path != null" class="item-img__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                            </svg>
                        </div>
                        <div v-if="store.newDrc.lastPhoto.reader.path == null" style="margin-top: 19px;" class="item-documents__item item-documents_big" @click="SelectPhoto('lastphoto')">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                            </svg>
                            <span>Добавить</span>  
                        </div>
                        <div v-if="store.newDrc.lastPhoto.reader.path != null" class="item-img" @click="SelectPhoto('lastphoto')">
                            <div class="item-img__container">
                                <img :src="wellImg" alt="">
                            </div>
                        </div>
                        <div class="drc-constructor__infotext">
                            <p>Описание:</p>
                            <textarea v-model="store.newDrc.desc" name=""  placeholder="Введите инфомацию"></textarea>
                        </div>
                    </div>
                    <div class="drc-main">
                        <div class="drc-operList">
                            <div 
                                class="drc-operList__item" 
                                v-for="(oper, indx) in store.newDrc.operList"
                            >
                                <input type="text" v-model="oper[0]" placeholder="Оператор">
                                <svg @click="store.newDrc.operList.splice(indx,1)" class="drc-operList__dell" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                                </svg>
                            </div>
                            <svg @click="addToOperList()" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                            </svg>
                        </div>
                        <div class="drc-main__container">
                            <div class="drc-main__opers">
                                <div class="drc-main__item" >
                                    <p>Шкаф операторов</p>
                                </div>
            
                                <div class="drc-main__item" 
                                    v-for="(oper,i) in store.newDrc.closet.opers"
                                    >
                                    <div class="drc-main__number" >
                                        {{i+1}}
                                    </div>
                                    <span>
                                        <input list="operatori" v-model="oper.name" type="text" placeholder="Элемент">
                                        <datalist id="operatori">
                                            <option v-for="promt in store.promptsOptions.drc_elements_closet" :value="promt"></option>
                                        </datalist>
                                    </span>
                                    <div class="slider">
                                        <div class="slider__title" onclick="openSliderConstructor(this)">
                                            <p style="font-size: 20px;">
                                                {{oper.operator == "" ? 'Оператор' : oper.operator}}
                                            </p>
                                            <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#6B6B6B"/>
                                            </svg>                                                    
                                        </div>
                                        <div class="slider__items">
                                            <div class="slider__item" onclick="closeSliderConstructor(this)" v-show="operator[0]!=''" v-for="operator in store.newDrc.operList" @click="setOperToElem(i,operator[0])">
                                                {{operator[0]}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="slider" @click="dellOper(i)">
                                        <div class="slider__title" onclick="openSliderConstructor(this)">
                                            <p style="font-size: 20px;">
                                                Удалить
                                            </p>                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="drc-main__item" @click="addOper()">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 12H22M12 2V22" stroke="black" stroke-width="3.67" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                                        
                                </div>
                            </div>
                            <div class="drc-main__ports">
                                <div class="drc-main__item">
                                    <p>ДРС</p>
                                </div>
                                <div class="drc-main__item" v-for="(port,i) in store.newDrc.closet.ports">
                                    <span>
                                        <input list="drcs" v-model="port.name" type="text" placeholder="Элемент">
                                        <datalist id="drcs">
                                            <option v-for="promt in store.promptsOptions.drc_elements_drc" :value="promt"></option>
                                        </datalist>
                                    </span>
                                    <div class="slider" @click="dellPort(i)">
                                        <div class="slider__title" onclick="openSliderConstructor(this)">
                                            <p style="font-size: 20px;">
                                                Удалить
                                            </p>                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="drc-main__item" @click="addPort()">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 12H22M12 2V22" stroke="black" stroke-width="3.67" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}