import { nextTick,computed,onMounted,reactive } from 'vue'
import { useStateStore } from '../../../pinia/store.js'
export const wellconstructor = {
    setup() {
        const store = useStateStore()
        
        store.wellForConstructor.wellPhotos.push(
            {date: '123', path: '/maga/'}
        )
        store.wellForConstructor.wellPhotos.push(
            {date: '123', path: '/maga/'}
        )
        store.wellForConstructor.wellSchemPhotos.push(
            {date: '123', path: '/maga/'}
        )
        store.wellForConstructor.wellSchemPhotos.push(
            {date: '123', path: '/maga/'}
        )

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
            return indx ? store.wellForConstructor.wellPhotos.length : store.wellForConstructor.wellSchemPhotos.length
        }

        const nextImage = (indx) => {
            indexPhotoSliders[indx] = (indexPhotoSliders[indx] + 1) % getlength(indx);
        };
  
        const prevImage = (indx) => {
            indexPhotoSliders[indx] =
                (indexPhotoSliders[indx] - 1 + getlength(indx)) % getlength(indx);
        };


        

        const wellImg = computed(() => {
            return store.wellForConstructor.wellPhotos[indexPhotoSliders[0]].path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            // if(store.wellForConstructor.imgWell.reader.path != null && store.wellForConstructor.imgWell.reader.path.includes("./php")){
            //     return store.wellForConstructor.imgWell.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            // }
            // else if(store.wellForConstructor.imgWell.reader.path != null && !store.wellForConstructor.imgWell.reader.path.includes("./php")){
            //     return store.wellForConstructor.imgWell.reader.path;
            // }
        })

        const wellSchemImg = computed(() => {
            return store.wellForConstructor.wellPhotos[indexPhotoSliders[0]].path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            // if(store.wellForConstructor.imgWellSchem.reader.path != null && store.wellForConstructor.imgWellSchem.reader.path.includes("./php")){
            //     return store.wellForConstructor.imgWellSchem.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            // }
            // else if(store.wellForConstructor.imgWellSchem.reader.path != null && !store.wellForConstructor.imgWellSchem.reader.path.includes("./php")){
            //     return store.wellForConstructor.imgWellSchem.reader.path;
            // }
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
                    store.wellForConstructor.imgWell = { reader: {name: null, path: null }, file: null}
                break;
                case 1:
                    store.wellForConstructor.imgWellSchem = { reader: {name: null, path: null }, file: null}
                break;
            }
        }

        function setSlider(objec,key,value){
            obj[objec][key] = value
        }
        function SelectFiles(id){
            const reader = new FileReader();
            let fileManager = new FilesManager(true);
            fileManager.selectFiles().then(files => {
                switch(id){
                    case "lastphoto":
                        store.wellForConstructor.imgWell.file = files;
                        reader.onload = e => {
                            store.wellForConstructor.imgWell.reader.path = e.target.result;
                        };
                        reader.readAsDataURL(files[0]);
                        nextTick();
                    break;
                    case "schema":
                        store.wellForConstructor.imgWellSchem.file = files;
                        reader.onload = e => {
                            store.wellForConstructor.imgWellSchem.reader.path = e.target.result;
                        };
                        reader.readAsDataURL(files[0]);
                        nextTick();
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
            prevImage
            
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
                    <div style="display: flex;align-items: center;">
                        <svg @click="delPhoto(0)" v-if="store.wellForConstructor.imgWellSchem.reader.path != null" class="item-img__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                        </svg>
                        <button @click="SelectFiles('lastphoto')" class="constructor__button" style="margin-right: 0;">
                            Добавить фото
                        </button>
                    </div>

                </div>
                <div class="sub-table__content">
                    <div v-if="wellImg" class="item-img">
                        <div class="item-img__container">
                            <img :src="wellImg" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="sub-table__item sub-table_active" v-if="!store.wellForConstructor.typeWell.includes('ввод') && !store.wellForConstructor.typeWell.includes('Ввод')">
                <div class="table__title">
                    <p>Схема колодца</p>
                    <div style="display: flex;align-items: center;">
                        <svg @click="delPhoto(1)" v-if="store.wellForConstructor.imgWellSchem.reader.path != null" class="item-img__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                        </svg>
                        <button @click="SelectFiles('schema')" class="constructor__button" style="margin-right: 0;">
                            Добавить фото
                        </button>
                    </div>

                </div>
                <div class="sub-table__content">
                    <div v-if="wellSchemImg" class="item-img">
                        <div class="item-img__container">
                            <img :src="wellSchemImg" alt="">
                        </div>
                    </div>
                </div>
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