import { computed  } from 'vue'
import { useStateStore } from '../../../pinia/store.js'


export const wellobject = {
    setup(props, {emit}){
        const store = useStateStore()
        let obj = store.state.wellObj
        
        const wellImg = computed(() => {
            if(store.state.wellObj.imgWell.reader.path != null && store.state.wellObj.imgWell.reader.path.includes("./php")){
                return store.state.wellObj.imgWell.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            }
            else if(store.state.wellObj.imgWell.reader.path != null && !store.state.wellObj.imgWell.reader.path.includes("./php")){
                return store.state.wellObj.imgWell.reader.path;
            }
        })

        const wellSchemImg = computed(() => {
            if( store.state.wellObj.imgWellSchem.reader.path != null &&  store.state.wellObj.imgWellSchem.reader.path.includes("./php")){
                return  store.state.wellObj.imgWellSchem.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            }
            else if( store.state.wellObj.imgWellSchem.reader.path != null && !store.state.wellObj.imgWellSchem.reader.path.includes("./php")){
                return  store.state.wellObj.imgWellSchem.reader.path;
            }
        })

        const typeWell = computed(() => {
            if(store.state.wellObj.typeWell.includes('Ввод') || store.state.wellObj.typeWell.includes('ввод')){
                return true;
            }
            return false;
        })

        function editButton(){
            constructorManager.create(2, store.state.wellObj.schemaId)
        }

        return{
            editButton,
            wellImg,
            wellSchemImg,
            typeWell,
            store,
            obj,
            role: store.role
        }
    },
    template: `
        <div class="items">
            <div class="mainkk-input">
                <input readonly v-model="store.state.wellObj.schemaName" style="background: #fff;box-shadow:0px 8px 22px 1px rgba(0, 0, 0, 0.25); text-align: center; padding-left: 0;" type="text" placeholder="Название схемы">
            </div>
            <div class="item item_active">
                <div class="item__title">
                    <p v-if="!typeWell">Колодец <a style="color: #ff6a4a;">{{store.state.wellObj.numWell}}</a></p>
                    <p v-if="typeWell"><a style="color: #ff6a4a;">{{store.state.wellObj.numWell}}</a></p>
                </div>
                <div class="item__content">
                    <div class="table">
                        <default-column v-if="!typeWell" name="Тип колодца" :value="store.state.wellObj.typeWell"></default-column>
                        <default-column v-if="typeWell" name="Тип" :value="store.state.wellObj.typeWell"></default-column>
                        <default-column v-if="!typeWell" name="Тип люка" :value="store.state.wellObj.typeLuke"></default-column>
                        <div class="table__item" v-if="!typeWell">
                            <div class="table__title" onclick="setTableActive(this)">
                                <p>Фото колодца</p>
                                <svg width="54" height="27" viewBox="0 0 54 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.789228 0.89866C-0.263081 1.8925 -0.263081 3.50166 0.789228 4.49298L23.1009 25.5112C25.2082 27.4963 28.6268 27.4963 30.7341 25.5112L53.2104 4.34077C54.2519 3.35711 54.2654 1.76799 53.2373 0.771618C52.1877 -0.247653 50.4582 -0.257398 49.3924 0.744053L28.8265 20.1203C27.7715 21.1141 26.0635 21.1141 25.0085 20.1203L4.60452 0.89866C3.55221 -0.0951823 1.84153 -0.0951823 0.789228 0.89866Z" fill="#2E2E2E"/>
                                </svg>    
                            </div>
                            <div class="table__content" v-if="store.state.wellObj.imgWell.reader">
                                <div class="item-img">
                                    <img :src="wellImg" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="table__item" v-if="!typeWell">
                            <div class="table__title" onclick="setTableActive(this)">
                                <p>Схема колодца</p>
                                <svg width="54" height="27" viewBox="0 0 54 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.789228 0.89866C-0.263081 1.8925 -0.263081 3.50166 0.789228 4.49298L23.1009 25.5112C25.2082 27.4963 28.6268 27.4963 30.7341 25.5112L53.2104 4.34077C54.2519 3.35711 54.2654 1.76799 53.2373 0.771618C52.1877 -0.247653 50.4582 -0.257398 49.3924 0.744053L28.8265 20.1203C27.7715 21.1141 26.0635 21.1141 25.0085 20.1203L4.60452 0.89866C3.55221 -0.0951823 1.84153 -0.0951823 0.789228 0.89866Z" fill="#2E2E2E"/>
                                </svg>
                            </div>
                            <div class="table__content " v-if="store.state.wellObj.imgWellSchem.reader">
                                <div class="item-img">
                                    <img :src="wellSchemImg" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="table__item table_active">
                            <div class="table__title" onclick="setTableActive(this)">
                                <p>Описание</p>
                                <svg width="54" height="27" viewBox="0 0 54 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.789228 0.89866C-0.263081 1.8925 -0.263081 3.50166 0.789228 4.49298L23.1009 25.5112C25.2082 27.4963 28.6268 27.4963 30.7341 25.5112L53.2104 4.34077C54.2519 3.35711 54.2654 1.76799 53.2373 0.771618C52.1877 -0.247653 50.4582 -0.257398 49.3924 0.744053L28.8265 20.1203C27.7715 21.1141 26.0635 21.1141 25.0085 20.1203L4.60452 0.89866C3.55221 -0.0951823 1.84153 -0.0951823 0.789228 0.89866Z" fill="#2E2E2E"/>
                                </svg>
                            </div>
                            <div class="table__content ">
                                <p>{{store.state.wellObj.desc}}</p>
                            </div>
                        </div>
                    </div>
                    <additional-parameters v-if="store.state.wellObj.additionalParameters.length">
                        <default-column v-for="item in store.state.wellObj.additionalParameters" :name="item[0]" :value="item[1]"></default-column>
                    </additional-parameters>
                </div>
            </div>
            <div class="save-buttons" v-if="role == 'Администратор'">
                <button class="save-buttons__item" @click="editButton()">Редактировать</button>
            </div>
        </div>
    `,
    components: {
        AdditionalParameters,
        DefaultColumn,
        DefaultSlider,
        DefaultItemTable
    }
}