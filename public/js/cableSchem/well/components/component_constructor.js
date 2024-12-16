import { nextTick,computed,onMounted,reactive } from 'vue'
import { useStateStore } from '../../../pinia/store.js'
export const wellconstructor = {
    setup() {
        const store = useStateStore()

        // СДЕЛАТЬ НАХУ
        
        function setLineToWell(indx,value){
            // нужно добавить в объект wellForConstructor - KabLines
            // store.wellForConstructor.KabLines[indx] = value
        }

        const usedNumKabLines = computed(() => {
            return store.kkForConstructor.KabLines.map(line => line.numKabLine);
        })
        function isNumKabLineUsed(numKabLine) {
            return this.usedNumKabLines.includes(numKabLine);
        }

        function addCabLine(){
            if(store.wellForConstructor.KabLines.length >= store.newScheme.cableLines.length) return;
            store.wellForConstructor.KabLines.push({
                numKabLine: '',
                start: '',
                finish: '',
                length: '',
                type: '',
                mark: '',
                owner: '',
                additionalParameters: []
            })
        }
        // onMounted(() => {
        //     if (store.wellForConstructor.KabLines.length==0){
        //         addCabLine()
        //     }
        // })

        const indexPhotoSliders = reactive([0,0]);

        const getlength = (indx) => {
            return indx ? store.wellForConstructor.wellSchemPhotos.length : store.wellForConstructor.wellPhotos.length
        }

        const nextImage = (indx) => {
            indexPhotoSliders[indx] = (indexPhotoSliders[indx] + 1) % getlength(indx);
        };
  
        const prevImage = (indx) => {   
            indexPhotoSliders[indx] =
                (indexPhotoSliders[indx] - 1 + getlength(indx)) % getlength(indx);
        };


        

        const wellImg = computed(() => {
            if(!store.wellForConstructor.wellPhotos[indexPhotoSliders[0]].path.includes("data:image/")){
                return store.wellForConstructor.wellPhotos[indexPhotoSliders[0]].path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
            return store.wellForConstructor.wellPhotos[indexPhotoSliders[0]].path;
        })

        const wellSchemImg = computed(() => {
            if(!store.wellForConstructor.wellSchemPhotos[indexPhotoSliders[1]].path.includes("data:image/")){
                return store.wellForConstructor.wellSchemPhotos[indexPhotoSliders[1]].path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
            return store.wellForConstructor.wellSchemPhotos[indexPhotoSliders[1]].path;
        })

        function button(type) {
            constructorManager.object.updateMarker(0, store.wellForConstructor);
            switch(type){
                case 0: // Сохранить
                    constructorManager.object.EditWell(1, store.wellForConstructor);
                    break;
                case 1: // назад
                    window.vueApp.back()
                    break;
            }
        }
        function delPhoto(id) {
            switch(id){
                case 0:
                    store.wellForConstructor.wellPhotos.splice(indexPhotoSliders[0], 1)
                break;
                case 1:
                    store.wellForConstructor.wellSchemPhotos.splice(indexPhotoSliders[1], 1)
                break;
            }
        }

        function setSlider(objec,key,value){
            obj[objec][key] = value
        }
        function SelectFiles(id){
            var currentdate = new Date()
            let fileManager = new FilesManager(true);
            fileManager.selectFiles().then(files => {
                switch(id){
                    case "lastphoto":
                        files.forEach(element => {
                            const reader = new FileReader();
                            reader.onload = function(event) {
                                const path = event.target.result;
                                const obj = { 
                                    name: element.name, 
                                    date: currentdate.toLocaleDateString(), 
                                    path: path,
                                    file: element
                                };
                                store.wellForConstructor.wellPhotos.unshift(obj);
                            };
                            reader.readAsDataURL(element);
                        });
                    break;
                    case "schema":
                        files.forEach(element => {
                            const reader = new FileReader();
                            reader.onload = function(event) {
                                const path = event.target.result;
                                const obj = { 
                                    name: element.name, 
                                    date: currentdate.toLocaleDateString(), 
                                    path: path,
                                    file: element
                                };
                                store.wellForConstructor.wellSchemPhotos.unshift(obj);
                            };
                            reader.readAsDataURL(element);
                        });
                    break;
                }
            });
        }





        return {
            setSlider,
            button,
            SelectFiles,
            wellSchemImg,
            wellImg,
            delPhoto,
            store,
            setLineToWell,
            usedNumKabLines,
            addCabLine,
            isNumKabLineUsed,
            nextImage,
            prevImage,
            indexPhotoSliders,
            getlength
            
        }
    },
    components:{
        ConstructorInput,
        DefaultItemTable,
        ConstructorChoice,
        DefaultColumnSlot,
        ConstructorInputAp,

    },
    template:`
    <div class="item item_active">
        <div class="item__title">
            <p v-if="!store.wellForConstructor.typeWell.includes('ввод') && !store.wellForConstructor.typeWell.includes('Ввод')">Редактировать колодец:</p>
            <p v-if="store.wellForConstructor.typeWell.includes('ввод') || store.wellForConstructor.typeWell.includes('Ввод')">Редактировать ввод:</p>
        </div>
        <div class="table">
            <constructor-input v-if="!store.wellForConstructor.typeWell.includes('ввод') && !store.wellForConstructor.typeWell.includes('Ввод')" name="Название колодца" v-model:model="store.wellForConstructor.numWell" myplaceholder='Введите название'></constructor-input>
            <constructor-input v-if="store.wellForConstructor.typeWell.includes('ввод') || store.wellForConstructor.typeWell.includes('Ввод')" name="Название" v-model:model="store.wellForConstructor.numWell" myplaceholder='Введите название'></constructor-input>
            <constructor-choice v-if="!store.wellForConstructor.typeWell.includes('ввод') && !store.wellForConstructor.typeWell.includes('Ввод')"
                name="Тип колодца"
                v-model:model="store.wellForConstructor.typeWell"
                :items="store.promptsOptions.well_type"
            ></constructor-choice>
            <constructor-choice v-if="store.wellForConstructor.typeWell.includes('ввод') || store.wellForConstructor.typeWell.includes('Ввод')"
                name="Тип"
                v-model:model="store.wellForConstructor.typeWell"
                :items="store.promptsOptions.well_type"
            ></constructor-choice>
            <constructor-choice v-if="!store.wellForConstructor.typeWell.includes('ввод') && !store.wellForConstructor.typeWell.includes('Ввод')"
                name="Тип люка"
                v-model:model="store.wellForConstructor.typeLuke"
                :items="store.promptsOptions.luke_type"
            ></constructor-choice>
            <div class="sub-table__item sub-table_active" v-if="!store.wellForConstructor.typeWell.includes('ввод') && !store.wellForConstructor.typeWell.includes('Ввод')">
                <div class="table__title">
                    <p>Фото колодца</p>
                </div>
                <div class="sub-table__content" v-if="store.wellForConstructor.wellPhotos.length > 0">
                    <div class="photos-slider">
                        <div class="photos-slider__btn" @click="prevImage(0)" v-if="store.wellForConstructor.wellPhotos.length > 1">
                            <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                            </svg>
                        </div>
                        <div class="photos-slider__content">
                            <svg class="photos-slider__empty" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                                <path d="M36,40.301c0.552,0,1-0.447,1-1v-24.6c0-0.022-0.011-0.041-0.013-0.063c-0.006-0.09-0.023-0.177-0.053-0.262
                                c-0.012-0.034-0.021-0.066-0.036-0.098c-0.045-0.096-0.103-0.186-0.179-0.265c-0.006-0.006-0.009-0.015-0.016-0.021
                                c-0.001-0.001-0.002-0.003-0.003-0.005l-5.5-5.4c-0.083-0.081-0.18-0.14-0.282-0.188c-0.031-0.014-0.063-0.022-0.096-0.033
                                c-0.085-0.029-0.172-0.047-0.262-0.053C30.54,8.312,30.522,8.301,30.5,8.301H14c-0.552,0-1,0.447-1,1v30c0,0.553,0.448,1,1,1H36z
                                M31.5,11.685l2.054,2.017H31.5V11.685z M15,10.301h14.5v4.4c0,0.553,0.448,1,1,1H35v22.6H15V10.301z"/>
                            </svg>  
                            <div class="photos-slider__dell" @click="delPhoto(0)">
                                <svg  width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                    <g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g>
                                </svg>      
                            </div>                                  
                            <div class="photos-slider__date">
                                {{store.wellForConstructor.wellPhotos[indexPhotoSliders[0]].date}}
                            </div>
                            <img :src="wellImg" :alt="indexPhotoSliders[0]">
                        </div>
                        <div class="photos-slider__btn" @click="nextImage(0)" v-if="store.wellForConstructor.wellPhotos.length > 1">
                            <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <button class="add-photo" @click="SelectFiles('lastphoto')">Добавить фото</button>
            </div>
            <div class="sub-table__item sub-table_active" v-if="!store.wellForConstructor.typeWell.includes('ввод') && !store.wellForConstructor.typeWell.includes('Ввод')">
                <div class="table__title">
                    <p>Схема колодца</p>
                </div>
                <div class="sub-table__content" v-if="store.wellForConstructor.wellSchemPhotos.length > 0">
                    <div class="photos-slider">
                        <div class="photos-slider__btn" @click="prevImage(0)" v-if="store.wellForConstructor.wellSchemPhotos.length > 1">
                            <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                            </svg>
                        </div>
                        <div class="photos-slider__content">
                            <svg class="photos-slider__empty" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                                <path d="M36,40.301c0.552,0,1-0.447,1-1v-24.6c0-0.022-0.011-0.041-0.013-0.063c-0.006-0.09-0.023-0.177-0.053-0.262
                                c-0.012-0.034-0.021-0.066-0.036-0.098c-0.045-0.096-0.103-0.186-0.179-0.265c-0.006-0.006-0.009-0.015-0.016-0.021
                                c-0.001-0.001-0.002-0.003-0.003-0.005l-5.5-5.4c-0.083-0.081-0.18-0.14-0.282-0.188c-0.031-0.014-0.063-0.022-0.096-0.033
                                c-0.085-0.029-0.172-0.047-0.262-0.053C30.54,8.312,30.522,8.301,30.5,8.301H14c-0.552,0-1,0.447-1,1v30c0,0.553,0.448,1,1,1H36z
                                M31.5,11.685l2.054,2.017H31.5V11.685z M15,10.301h14.5v4.4c0,0.553,0.448,1,1,1H35v22.6H15V10.301z"/>
                            </svg>  
                            <div class="photos-slider__dell" @click="delPhoto(1)">
                                <svg  width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                    <g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g>
                                </svg>      
                            </div>                                  
                            <div class="photos-slider__date">
                                {{store.wellForConstructor.wellSchemPhotos[indexPhotoSliders[1]].date}}
                            </div>
                            <img :src="wellSchemImg" :alt="indexPhotoSliders[1]">
                        </div>
                        <div class="photos-slider__btn" @click="nextImage(1)" v-if="store.wellForConstructor.wellSchemPhotos.length > 1">
                            <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <button class="add-photo" @click="SelectFiles('schema')">Добавить фото</button>
            </div> 
            <default-column-slot name="Описание">
                <textarea type="text" v-model="store.wellForConstructor.desc" placeholder="..."></textarea>
            </default-column-slot>

            <!-- <div class="table__item" v-for="(kabLine, index) in store.wellForConstructor.KabLines">
                <div class="table__title">
                    <p>Кабельная линия</p>
                    <div class="table__title__items">
                        <button @click="store.wellForConstructor.KabLines.splice(index,1)" class="constructor__button" style="margin-right: 0px;">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.382031 17.7734C-0.127344 18.2828 -0.127344 19.1086 0.382031 19.618C0.891406 20.1273 1.71729 20.1273 2.22666 19.618L0.382031 17.7734ZM10.9223 10.9223C11.4317 10.4129 11.4317 9.58715 10.9223 9.07776C10.4129 8.56836 9.58715 8.56836 9.07776 9.07776L10.9223 10.9223ZM9.07776 9.07776C8.56836 9.58715 8.56836 10.4129 9.07776 10.9223C9.58715 11.4317 10.4129 11.4317 10.9223 10.9223L9.07776 9.07776ZM19.618 2.22666C20.1273 1.71729 20.1273 0.891406 19.618 0.382031C19.1086 -0.127344 18.2828 -0.127344 17.7734 0.382031L19.618 2.22666ZM10.9223 9.07776C10.4129 8.56836 9.58715 8.56836 9.07776 9.07776C8.56836 9.58715 8.56836 10.4129 9.07776 10.9223L10.9223 9.07776ZM17.7734 19.618C18.2828 20.1273 19.1086 20.1273 19.618 19.618C20.1273 19.1086 20.1273 18.2828 19.618 17.7734L17.7734 19.618ZM9.07776 10.9223C9.58715 11.4317 10.4129 11.4317 10.9223 10.9223C11.4317 10.4129 11.4317 9.58715 10.9223 9.07776L9.07776 10.9223ZM2.22666 0.382031C1.71729 -0.127344 0.891406 -0.127344 0.382031 0.382031C-0.127344 0.891406 -0.127344 1.71729 0.382031 2.22666L2.22666 0.382031ZM2.22666 19.618L10.9223 10.9223L9.07776 9.07776L0.382031 17.7734L2.22666 19.618ZM10.9223 10.9223L19.618 2.22666L17.7734 0.382031L9.07776 9.07776L10.9223 10.9223ZM9.07776 10.9223L17.7734 19.618L19.618 17.7734L10.9223 9.07776L9.07776 10.9223ZM10.9223 9.07776L2.22666 0.382031L0.382031 2.22666L9.07776 10.9223L10.9223 9.07776Z" fill="#6B6B6B"/>
                            </svg>
                        </button>
                        <div class="slider">
                            <div class="slider__title" onclick="openSliderConstructor(this)">
                                <p style="font-size: 20px;">{{kabLine.numKabLine=="" ? 'Выбрать' : kabLine.numKabLine}}</p>
                                <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#6B6B6B"/>
                                </svg>                                                    
                            </div>
                            <div class="slider__items">
                                <div 
                                    class="slider__item" 
                                    onclick="closeSliderConstructor(this)" 
                                    v-for="item in store.newScheme.cableLines"
                                    @click="setLineToWell(index,item)"
                                    v-show="!isNumKabLineUsed(item.numKabLine)"
                                    >
                                        {{item.numKabLine}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <svg @click="addCabLine()" style="margin:0 auto;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12H22M12 2V22" stroke="black" stroke-width="3.67" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> -->
            
        </div>
        <div class="additionalParameters-constructor">
            <div class="additional-parameters__title">
                Дополнительные параметры
            </div>
            <div class="table">
                <constructor-input-ap v-for="(parameter,indx) in store.wellForConstructor.additionalParameters"
                    v-model:model="parameter[1]"
                    v-model:name="parameter[0]"
                    >
                    <button class="constructor__button" @click="store.wellForConstructor.additionalParameters.splice(indx,1)">
                        Удалить
                    </button>
                </constructor-input-ap>
                <div class="table__item" @click="store.wellForConstructor.additionalParameters.push(['',''])" >
                    <div class="table__title" style="display: flex;justify-content: center;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 12H22M12 2V22" stroke="black" stroke-width="3.67" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                                
                    </div>
                </div>
            </div>
        </div>
        <div class="save-buttons">
            <button class="save-buttons__item" @click="button(1)">Назад</button>
        </div>
    </div>
    `,
}