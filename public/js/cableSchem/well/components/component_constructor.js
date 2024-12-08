import { nextTick,computed } from 'vue'
import { useStateStore } from '../../../pinia/store.js'
export const wellconstructor = {
    setup() {
        const store = useStateStore()





        const wellImg = computed(() => {
            if(store.wellForConstructor.imgWell.reader.path != null && store.wellForConstructor.imgWell.reader.path.includes("./php")){
                return store.wellForConstructor.imgWell.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            }
            else if(store.wellForConstructor.imgWell.reader.path != null && !store.wellForConstructor.imgWell.reader.path.includes("./php")){
                return store.wellForConstructor.imgWell.reader.path;
            }
        })

        const wellSchemImg = computed(() => {
            if(store.wellForConstructor.imgWellSchem.reader.path != null && store.wellForConstructor.imgWellSchem.reader.path.includes("./php")){
                return store.wellForConstructor.imgWellSchem.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            }
            else if(store.wellForConstructor.imgWellSchem.reader.path != null && !store.wellForConstructor.imgWellSchem.reader.path.includes("./php")){
                return store.wellForConstructor.imgWellSchem.reader.path;
            }
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
            store
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
            <constructor-choice v-if="store.wellForConstructor.typeWell.includes('ввод') && store.wellForConstructor.typeWell.includes('Ввод')"
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
            <button class="save-buttons__item" @click="button(0)">Сохранить</button>
        </div>
    </div>
    `,
}