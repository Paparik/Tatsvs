import { ref, watch, computed  } from 'vue'
export const homeobject = {
    props: {
        obj: {
            type: Object
        },
        role: {
            type: String
        }
    },
    setup(props, {emit}){
        const characteristics = ref(props.obj.characteristics);
        const spd = ref(props.obj.spd);
        const svn = ref(props.obj.svn);
        const skud = ref(props.obj.skud);
        const askue = ref(props.obj.askue);
        const apartmentAutomation = ref(props.obj.apartmentAutomation);
        function yardAssembly(yard,yardWickets,yardGates){
            return yard ? `${yardWickets}; Калиток ${yardGates} ворот` : `Нет`
        }
        watch(() => props.obj, (newObj) => {
            characteristics.value = newObj.characteristics;
            spd.value = newObj.spd;
            svn.value = newObj.svn;
            skud.value = newObj.skud;
            askue.value = newObj.askue;
            apartmentAutomation.value = newObj.apartmentAutomation;
        }, { deep: true });
        function button(id, obj){
            switch(id){
                case "openSchem":
                    objectsManager.OpenSchem(obj)
                break;
            }
        }

        function openFile(path) {
            let newPath = path.replace('./php/api/filesManager/getImage.php', './php/api/filesManager/openFile.php')
            window.open(newPath + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content'), '_blank');
        }

        function editButton(){
            constructorManager.create(4, props.obj.id)
        }

        const svnimage = computed(() => {
            if(props.obj.svn.photo.reader.path != null && props.obj.svn.photo.reader.path.includes("./php")){
                return props.obj.svn.photo.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            }
            else if(props.obj.svn.photo.reader.path != null && !props.obj.svn.photo.reader.path.includes("./php")){
                return props.obj.svn.photo.reader.path;
            }
        })

        const skudimage = computed(() => {
            if(props.obj.skud.photo.reader.path != null && props.obj.skud.photo.reader.path.includes("./php")){
                return props.obj.skud.photo.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            }
            else if(props.obj.skud.photo.reader.path != null && !props.obj.skud.photo.reader.path.includes("./php")){
                return props.obj.skud.photo.reader.path;
            }
        })

        return{
            characteristics,
            spd,
            svn,
            skud,
            askue,
            apartmentAutomation,
            yardAssembly,
            button,
            svnimage,
            skudimage,
            editButton,
            openFile
        }

    },
    template: `
    <div class="items">
        <div class="mainkk-input">
            <input readonly v-model="obj.name" style="background: #fff;box-shadow:0px 8px 22px 1px rgba(0, 0, 0, 0.25); text-align: center; padding-left: 0;" type="text" placeholder="Название объекта">
        </div>
        <default-item-table name="Характеристики объекта">

            <div class="table">
                <default-column name="Тип объекта" :value="characteristics.type"></default-column>
                <default-column name="Количество этажей" :value="characteristics.floors"></default-column>
                <default-column name="Количество подъездов" :value="characteristics.entrancesCount"></default-column>
                <default-column name="Количество квартир" :value="characteristics.apartmentsCount"></default-column>
                <default-column name="Наличие офисов" :value="characteristics.offices"></default-column>
                <default-column name="Кладовки" :value="characteristics.storageRooms"></default-column>
                <default-slider v-if="characteristics.yard" name="Закрытый двор" :operators="false" >
                    <div class="number">
                        Калиток <a>{{characteristics.yardWickets}}</a >
                    </div>
                    <div class="number">
                        Ворот <a>{{characteristics.yardGates}}</a >
                    </div>
                </default-slider>
                <default-column v-if="!characteristics.yard" name="Закрытый двор" :value="yardAssembly(characteristics.yard,characteristics.yardWickets,characteristics.yardGates)"></default-column>
                <default-slider name="Операторы" :operators="characteristics.operators"></default-slider>
                <default-slider name="Управляющие компании" :operators="characteristics.managementCompanies"></default-slider>
                <default-slider name="Полезные контакты" :operators="characteristics.usefulContacts"></default-slider>
            </div>
            <additional-parameters v-if="characteristics.additionalParameters.length">
                <default-column v-for="item in characteristics.additionalParameters" :name="item[0]" :value="item[1]"></default-column>
            </additional-parameters>
        </default-item-table>
        <default-item-table name="Сеть передачи данных (СПД)">
            <div class="item-documents wrap">
                <div class="item-documents__title" v-if="spd.docs.length">
                    Документы:
                </div>
                <div class="item-documents__items">
                    <div class="item-documents__item" v-for="doc in spd.docs" @click="openFile(doc.path)">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                            <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                            <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                        </svg>
                        <span>{{doc.name}}</span> 
                    </div>
                </div>
                <div class="item-slot" v-if="spd.cableDuct.length">
                    <div class="item-slot__title" onclick="openItemSlot(this)">
                        <p>Кабельная канализация</p>
                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                        </svg>
                    </div>
                    <div class="item-slot__content">
                        <div class="item-documents__items">
                            <div class="item-documents__item" v-for="doc in spd.cableDuct" @click="openFile(doc.path)">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                    <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                    <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                                </svg>   
                                <span>{{doc.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item-slot item-slot_active" @click="button('openSchem', houseschem)">
                    <div class="item-slot__title centerdf">
                        <p>Схема дома</p>
                    </div>
                </div>
            </div>
        </default-item-table>
        <default-item-table name="Система видеонаблюдения (СВН)">
            <div class="table">
                <default-column name="Видеорегистратор" :value="svn.DVR"></default-column>
                    <default-column name="Внутренние камеры" :value="svn.internalCameras"></default-column>
                    <default-column name="Внешние камеры" :value="svn.externalCameras"></default-column>
                </div>
                <div class="item__columns">
                    <div class="item-documents grid-2" v-if="svn.docs.length">
                        <div class="item-documents__title">
                            Документы:
                        </div>
                        <div class="item-documents__items">
                            <div class="item-documents__item" v-for="doc in svn.docs" @click="openFile(doc.path)">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                    <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                    <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                                </svg>   
                                <span>{{doc.name}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="svn.photo.reader.path != null" class="item-img">
                        <div class="item-documents__title">
                            Фото СВН
                        </div>
                        <img :src="svnimage" alt="">
                    </div>
                </div>

            <additional-parameters v-if="svn.additionalParameters.length">
                <default-column v-for="item in svn.additionalParameters" :name="item[0]" :value="item[1]"></default-column>
            </additional-parameters>
        </default-item-table>
        <default-item-table name="СКУД/Домофон">
            <div class="table" onclick="setActive(this)">
                <default-column name="Вызывные панели" :value="skud.callPanels"></default-column>
                <default-column name="Калитки" :value="skud.wickets"></default-column>
                <default-column name="Ворота" :value="skud.gates"></default-column>
                <default-column name="Шлагбаум " :value="skud.barriers"></default-column>
            </div>
            <div class="item__columns">
                <div>
                    <div class="item-documents grid-2" v-if="skud.docs.length">
                        <div class="item-documents__title">
                            Документы:
                        </div>
                        <div class="item-documents__items">
                            <div class="item-documents__item" v-for="doc in skud.docs" @click="openFile(doc.path)">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                    <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                    <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                                </svg>   
                                <span>{{doc.name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="item-documents grid-2" v-if="skud.backups.length">
                        <div class="item-documents__title">
                            Бэкапы:
                        </div>
                        <div class="item-documents__items">
                            <div class="item-documents__item" v-for="doc in skud.backups" @click="openFile(doc.path)">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                    <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                    <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                                </svg>   
                                <span>{{doc.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="svn.photo.reader.path != null" class="item-img">
                    <div class="item-documents__title">
                        Фото СКУД/Домофон
                    </div>
                    <img :src="skudimage" alt="">
                </div>
                
            </div>

            <additional-parameters v-if="skud.additionalParameters.length">
                <default-column v-for="item in skud.additionalParameters" :name="item[0]" :value="item[1]"></default-column>
            </additional-parameters>
        </default-item-table>
        <default-item-table name="АСКУЭ">
            <div class="item-documents wrap" v-if="askue.docs.length">
                <div class="item-documents__title">
                    Документы:
                </div>
                <div class="item-documents__items">
                    <div class="item-documents__item" v-for="doc in askue.docs" @click="openFile(doc.path)">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                            <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                            <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                        </svg>   
                        <span>{{doc.name}}</span>
                    </div>
                </div>
            </div>

            <additional-parameters v-if="askue.additionalParameters.length">
                <default-column v-for="item in askue.additionalParameters" :name="item[0]" :value="item[1]"></default-column>
            </additional-parameters>
        </default-item-table>
        <default-item-table name="Автоматизация Квартир">
            <div class="item-documents wrap" v-if="apartmentAutomation.docs.length">
                <div class="item-documents__title">
                    Документы:
                </div>
                <div class="item-documents__items">
                    <div class="item-documents__item" v-for="doc in apartmentAutomation.docs" @click="openFile(doc.path)">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                            <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                            <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                        </svg>   
                        <span>{{doc.name}}</span>
                    </div>
                </div>
            </div>
            <additional-parameters v-if="apartmentAutomation.additionalParameters.length">
                <default-column v-for="item in apartmentAutomation.additionalParameters" :name="item[0]" :value="item[1]"></default-column>
            </additional-parameters>
        </default-item-table>
        <div class="save-buttons" v-if="role == 'Администратор'">
            <button class="save-buttons__item" @click="editButton()">Редактировать</button>
        </div>
    </div>
    `,
    methods:{
        yardAssembly(yard,yardWickets,yardGates){
            return yard ? `Да <div class="point"></div> ${yardWickets} калиток <div class="point"></div> ${yardGates} ворот` : `Нет`

        },
    },

    components: {
        AdditionalParameters,
        DefaultColumn,
        DefaultSlider,
        DefaultItemTable
    }
}