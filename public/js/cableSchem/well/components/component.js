import { computed, reactive  } from 'vue'
import { useStateStore } from '../../../pinia/store.js'


export const wellobject = {
    setup(){
        const store = useStateStore()
        

        const indexPhotoSliders = reactive([0,0]);

        const getlength = (indx) => {
            return indx ? store.wellObj.wellPhotos.length : store.wellObj.wellSchemPhotos.length
        }

        const nextImage = (indx) => {
            indexPhotoSliders[indx] = (indexPhotoSliders[indx] + 1) % getlength(indx);
        };
  
        const prevImage = (indx) => {
            indexPhotoSliders[indx] =
                (indexPhotoSliders[indx] - 1 + getlength(indx)) % getlength(indx);
        };


        const wellImg = computed(() => {
            return store.wellObj.wellPhotos[indexPhotoSliders[0]].path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        })

        const wellSchemImg = computed(() => {
            return store.wellObj.wellSchemPhotos[indexPhotoSliders[1]].path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        })



        const typeWell = computed(() => {
            if(store.wellObj.typeWell.includes('Ввод') || store.wellObj.typeWell.includes('ввод')){
                return true;
            }
            return false;
        })

        function editButton(){
            constructorManager.create(2, store.wellObj.schemaId)
        }

        return{
            editButton,
            wellImg,
            wellSchemImg,
            typeWell,
            store,
            role: store.role,
            nextImage,
            prevImage

        }
    },
    template: `
        <div class="items">
            <div class="item wrap">
                <div class="mainkk-input">
                    <input readonly  v-model="store.wellObj.schemaName" style="background: #fff;box-shadow:0px 8px 22px 1px rgba(0, 0, 0, 0.25);" type="text" placeholder="Название схемы">
                </div>
                <div class="item-slot">
                    <div class="item-slot__title" onclick="openItemSlot(this)">
                        <p>Документы:</p>
                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                        </svg>
                    </div>
                    <div class="item-slot__content">
                        <div class="item-documents__items">
                            <div class="item-documents__item">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                    <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                                </svg>
                                <span>Добавить</span>
                            </div>
                            <!-- <div class="item-documents__item" v-for="(file, indx) in store.objectForConstructor.skud.backups">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                    <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                    <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                                </svg>
                                <span>{{file.name}}</span>
                                <svg @click="store.objectForConstructor.skud.backups.splice(indx, 1)" class="item-documents__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                                </svg>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="item item_active">
                <div class="item__title">
                    <p v-if="!typeWell">Колодец <a style="color: #ff6a4a;">{{store.wellObj.numWell}}</a></p>
                    <p v-if="typeWell"><a style="color: #ff6a4a;">{{store.wellObj.numWell}}</a></p>
                </div>
                <div class="item__content">
                    <div class="table">
                        <default-column v-if="!typeWell" name="Тип колодца" :value="store.wellObj.typeWell"></default-column>
                        <default-column v-if="typeWell" name="Тип" :value="store.wellObj.typeWell"></default-column>
                        <default-column v-if="!typeWell" name="Тип люка" :value="store.wellObj.typeLuke"></default-column>
                        <div class="table__item" v-if="!typeWell">
                            <div class="table__title" onclick="setTableActive(this)">
                                <p>Фото колодца</p>
                                <svg width="54" height="27" viewBox="0 0 54 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.789228 0.89866C-0.263081 1.8925 -0.263081 3.50166 0.789228 4.49298L23.1009 25.5112C25.2082 27.4963 28.6268 27.4963 30.7341 25.5112L53.2104 4.34077C54.2519 3.35711 54.2654 1.76799 53.2373 0.771618C52.1877 -0.247653 50.4582 -0.257398 49.3924 0.744053L28.8265 20.1203C27.7715 21.1141 26.0635 21.1141 25.0085 20.1203L4.60452 0.89866C3.55221 -0.0951823 1.84153 -0.0951823 0.789228 0.89866Z" fill="#2E2E2E"/>
                                </svg>    
                            </div>
                            <div class="table__content" v-if="store.wellObj.wellPhotos">
                                <div class="photos-slider">
                                    <div class="photos-slider__btn" @click="prevImage(0)">
                                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                                        </svg>
                                    </div>
                                    <div class="photos-slider__content">                               
                                        <div class="photos-slider__date" v-if="store.wellObj.wellPhotos[indexPhotoSliders[0]]">
                                            {{store.wellObj.wellPhotos[indexPhotoSliders[0]].date}}
                                        </div>
                                        <img :src="wellImg" :alt="indexPhotoSliders[0]" v-if="store.wellObj.wellPhotos[indexPhotoSliders[0]]">
                                    </div>
                                    <div class="photos-slider__btn" @click="nextImage(0)">
                                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                                        </svg>
                                    </div>
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
                            <div class="table__content " v-if="store.wellObj.wellSchemPhotos">
                                <div class="photos-slider">
                                    <div class="photos-slider__btn" @click="prevImage(0)">
                                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                                        </svg>
                                    </div>
                                    <div class="photos-slider__content">                               
                                        <div class="photos-slider__date" v-if="store.wellObj.wellSchemPhotos[indexPhotoSliders[1]]">
                                            {{store.wellObj.wellSchemPhotos[indexPhotoSliders[1]].date}}
                                        </div>
                                        <img :src="wellSchemImg" :alt="indexPhotoSliders[1]" v-if="store.wellObj.wellSchemPhotos[indexPhotoSliders[1]]">
                                    </div>
                                    <div class="photos-slider__btn" @click="nextImage(1)">
                                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                                        </svg>
                                    </div>
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
                                <p>{{store.wellObj.desc}}</p>
                            </div>
                        </div>
                    </div>
                    <additional-parameters v-if="store.wellObj.additionalParameters.length">
                        <default-column v-for="item in store.wellObj.additionalParameters" :name="item[0]" :value="item[1]"></default-column>
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