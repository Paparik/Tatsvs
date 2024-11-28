import { ref, nextTick,reactive, computed } from 'vue'
import {Constructorinputadd} from '../library/constructorInputAdd.js'
import { useStateStore } from '../pinia/store.js'
export const objectconstructor = {

    setup(props, {emit}){
        const store = useStateStore()


        let confirmDell = ref(false)
        let operator = reactive({
            name: '',
            num: '',
            dop: ''
        })

        const updateOperator = (newOperator) => {
            operator.name = newOperator.name;
            operator.num = newOperator.num;
            operator.dop = newOperator.dop;
        };

        function setNewOperator(){
            if ( operator.name != ''){
                let arr=[operator.name, operator.num, operator.dop]
                

                store.state.objectForConstructor.characteristics.operators.push(arr)

                operator.name = '';
                operator.num = '';
                operator.dop = '';
            }
        }
        function delOper(ind){
            store.state.objectForConstructor.characteristics.operators.splice(ind,1)
        }

        const uk = reactive({
            name: '',
            num: '',
            dop: ''
        })
        const updateUk = (newUk) => {
            uk.name = newUk.name;
            uk.num = newUk.num;
            uk.dop = newUk.dop;
        };
        function setNewUk(){
            if ( uk.name != ''){
                let arr=[uk.name, uk.num, uk.dop]
                store.state.objectForConstructor.characteristics.managementCompanies.push(arr)

                uk.name = '';
                uk.num = '';
                uk.dop = '';
            }
        }
        function delUk(ind){
            store.state.objectForConstructor.characteristics.managementCompanies.splice(ind,1)
        }

        const contact = reactive({
            name: '',
            num: '',
            dop: ''
        })
        const updateContact = (newContact) => {
            contact.name = newContact.name;
            contact.num = newContact.num;
            contact.dop = newContact.dop;
        };

        function setNewContact(){
            if ( contact.name != ''){
                let arr=[contact.name, contact.num, contact.dop]
                store.state.objectForConstructor.characteristics.usefulContacts.push(arr)

                contact.name = '';
                contact.num = '';
                contact.dop = '';
            }
        }
        function delContact(ind){
            store.state.objectForConstructor.characteristics.usefulContacts.splice(ind,1)
        }

        async function button(id){
            switch(id){
                case 0: // Сохранить
                    if(store.state.objectForConstructor.characteristics.type == "" || store.state.objectForConstructor.name == "" || store.state.objectForConstructor.name == " "){
                        $.notify("Заполните данные", { type:"toast" });
                        return;
                    }
                    if(!constructorManager.object.edit){
                        constructorManager.LoadingPage(true)
                        let markerCoords = constructorManager.object.marker.getLatLng();
                        let coords = [markerCoords.lat, markerCoords.lng];
    
                        let payload = [store.state.objectForConstructor.characteristics.type, coords,  store.state.objectForConstructor];
                        objectsManager.CreateObject(constructorManager.object.marker, payload);
    
                        await constructorManager.destroy(0);
                    }else{
                        constructorManager.LoadingPage(true)
                        let markerCoords = constructorManager.object.marker.getLatLng();
                        let coords = [markerCoords.lat, markerCoords.lng];
                        let payload = [store.state.objectForConstructor.characteristics.type, coords,  store.state.objectForConstructor];

                        objectsManager.EditObject(store.state.objectForConstructor.id, constructorManager.object.marker, payload);
                        await constructorManager.destroy(0);
                    }
                    $.notify("Объект успешно сохранён", { type:"toast" });
                    break;
                case 1:
                    if(!constructorManager.object.edit){
                        await constructorManager.destroy(1);
                    }else{
                        await constructorManager.destroy(2);
                    }
                    break;
                case 2:
                    constructorManager.object.OpenObjectSchem(store.state.objectForConstructor);
                    break;
                case 3:
                    constructorManager.LoadingPage(true)
                    await objectsManager.DeleteObjectFull(store.state.objectForConstructor.id);
                    constructorManager.destroy(2)
                    break;
            }
        }

        function setSlider(objec,key,value){
            store.state.objectForConstructor[objec][key] = value
        }

        const edit = computed(() => {
            return constructorManager.object.edit;
        })

        const svnphoto = computed(() => {
            if(store.state.objectForConstructor.svn.photo.reader.path != null && store.state.objectForConstructor.svn.photo.reader.path.includes("./php")){
                return store.state.objectForConstructor.svn.photo.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            }
            else if(store.state.objectForConstructor.svn.photo.reader.path != null && !store.state.objectForConstructor.svn.photo.reader.path.includes("./php")){
                return store.state.objectForConstructor.svn.photo.reader.path;
            }
        })

        const skudphoto = computed(() => {
            if(store.state.objectForConstructor.skud.photo.reader.path != null && store.state.objectForConstructor.skud.photo.reader.path.includes("./php")){
                return store.state.objectForConstructor.skud.photo.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            }
            else if(store.state.objectForConstructor.skud.photo.reader.path != null && !store.state.objectForConstructor.skud.photo.reader.path.includes("./php")){
                return store.state.objectForConstructor.skud.photo.reader.path;
            }
        })

        function SelectFiles(id){
            const reader = new FileReader();
            let fileManager = new FilesManager(false);
            if(id.includes("photo")){
                fileManager = new FilesManager(true);
            }
            fileManager.selectFiles().then(files => {
                switch(id){
                    case "spd":
                        files.forEach(element => {
                            store.state.objectForConstructor.spd.docs.push(element); 
                        });
                    break;
                    case "spdcab":
                        files.forEach(element => {
                            store.state.objectForConstructor.spd.cableDuct.push(element);
                        });
                    break;
                    case "svn":
                        files.forEach(element => {
                            store.state.objectForConstructor.svn.docs.push(element); 
                        });
                    break;
                    case "svnphoto":
                        store.state.objectForConstructor.svn.photo.file = files[0];
                        reader.onload = e => {
                            store.state.objectForConstructor.svn.photo.reader.path = e.target.result;
                        };
                        reader.readAsDataURL(files[0]);
                        nextTick();
                    break;
                    case "skud":
                        files.forEach(element => {
                            store.state.objectForConstructor.skud.docs.push(element); 
                        });
                    break;
                    case "skudbackups":
                        files.forEach(element => {
                            store.state.objectForConstructor.skud.backups.push(element); 
                        });
                    break;
                    case "skudphoto":
                        store.state.objectForConstructor.skud.photo.file = files[0];
                        reader.onload = e => {
                            store.state.objectForConstructor.skud.photo.reader.path = e.target.result;
                        };
                        reader.readAsDataURL(files[0]);
                        nextTick();
                    break;
                    case "askue":
                        files.forEach(element => {
                            store.state.objectForConstructor.askue.docs.push(element); 
                        });
                    break;
                    case "auto":
                        files.forEach(element => {
                            store.state.objectForConstructor.apartmentAutomation.docs.push(element); 
                        });
                    break;
                }
            });
        }
        function dellPhoto(id){
            switch (id) {
                case 0: // Фото СВН
                    store.state.objectForConstructor.svn.photo.reader = { name: null, path: null };
                    store.state.objectForConstructor.svn.photo.file = null;
                    break;
                case 1: // Фото СКУД/Домофон
                    store.state.objectForConstructor.skud.photo.reader = { name: null, path: null };
                    store.state.objectForConstructor.skud.photo.file = null;
                    break;
                default:
                    break;
            }
        }

        return{
            store,
            operator,
            uk,
            contact,
            updateOperator,
            setSlider,
            setNewOperator,
            setNewUk,
            setNewContact,
            button,
            delOper,
            delUk,
            updateUk,
            updateContact,
            delContact,
            SelectFiles,
            svnphoto,
            skudphoto,
            dellPhoto,
            edit,
            confirmDell
        }
    },
    components:{
        ConstructorInput,
        DefaultItemTable,
        DefaultColumn,
        ConstructorChoice,
        ConstructorDvor,
        // ConstructorInputAdd
        Constructorinputadd,
        ConstructorInputAp
    },
    template:`
        <div class="items constructor">
            <div class="mainkk-input">
                <input v-model="store.state.objectForConstructor.name" style="background: #fff;box-shadow:0px 8px 22px 1px rgba(0, 0, 0, 0.25);" type="text" placeholder="Название объекта">
            </div>
            <default-item-table name="Характеристики объекта">
                <div class="table">
                    <constructor-choice 
                        name="Тип объекта"
                        v-model:model="store.state.objectForConstructor.characteristics.type"
                        :items="[ 'Жилой дом','Паркинг','Офисное здание' ]"
                    ></constructor-choice>
                    <constructor-input name="Количество этажей" v-model:model="store.state.objectForConstructor.characteristics.floors" myplaceholder='Мин и Макс(9-16)'></constructor-input>
                    <constructor-input name="Количество подъездов" v-model:model="store.state.objectForConstructor.characteristics.entrancesCount" myplaceholder=''></constructor-input>
                    <constructor-input name="Количество квартир" v-model:model="store.state.objectForConstructor.characteristics.apartmentsCount" myplaceholder=''></constructor-input>
                    <constructor-choice 
                        name="Наличие офисов"
                        v-model:model="store.state.objectForConstructor.characteristics.offices"
                        :items="[ 'Да','Нет',]"
                    ></constructor-choice>
                    <constructor-choice 
                        name="Кладовки"
                        v-model:model="store.state.objectForConstructor.characteristics.storageRooms"
                        :items="[ 'Да','Нет',]"
                    ></constructor-choice>
                    <constructor-dvor  
                     name="Закрытый двор"
                     v-model:model="store.state.objectForConstructor.characteristics.yard"
                     v-model:input1="store.state.objectForConstructor.characteristics.yardWickets" 
                     v-model:input2="store.state.objectForConstructor.characteristics.yardGates" 
                     ></constructor-dvor>
                    <Constructorinputadd
                        name="Операторы"
                        :operator="operator" 
                        @update:operator="updateOperator"
                        v-model:items="store.state.objectForConstructor.characteristics.operators"
                        @delOper="delOper"
                        @save-item="setNewOperator"
                        firesPlaceholder="Оператор"
                        :options="store.promptsOptions.operators"
                        optionsid="1"
                    ></Constructorinputadd>
                    <Constructorinputadd
                        name="Управляющие компании"
                        :operator="uk" 
                        @delOper="delUk"
                        @update:operator="updateUk"
                        v-model:items="store.state.objectForConstructor.characteristics.managementCompanies"
                        firesPlaceholder="Компания"
                        @save-item="setNewUk"
                        :options="store.promptsOptions.management_companies"
                        optionsid="2"
                     >
                    </Constructorinputadd>
                    <Constructorinputadd
                     name="Полезные контакты"
                     :operator="contact" 
                     @delOper="delContact"
                     @update:operator="updateContact"
                     v-model:items="store.state.objectForConstructor.characteristics.usefulContacts"
                     @save-item="setNewContact"
                     firesPlaceholder="Контакт"
                     >
                    </Constructorinputadd>
                    
                    
                </div>
                <div class="additionalParameters-constructor">
                    <div class="additional-parameters__title">
                        Дополнительные параметры
                    </div>
                    <div class="table">
                        <constructor-input-ap v-for="(parameter,indx) in store.state.objectForConstructor.characteristics.additionalParameters"
                        v-model:model="parameter[1]"
                        v-model:name="parameter[0]"
                        >
                        <button class="constructor__button" @click="store.state.objectForConstructor.characteristics.additionalParameters.splice(indx,1)">
                            Удалить
                        </button>
                    </constructor-input-ap>
                        <div class="table__item" @click="store.state.objectForConstructor.characteristics.additionalParameters.push(['',''])">
                            <div class="table__title" style="display: flex;justify-content: center;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 12H22M12 2V22" stroke="black" stroke-width="3.67" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                                
                            </div>
                        </div>
                    </div>
                </div>
            </default-item-table>
            <default-item-table name="Сеть передачи данных (СПД)">
                <div class="item-documents wrap">
                    <div class="item-documents__title">
                        Документы:
                    </div>
                    <div class="item-documents__items">
                        <div class="item-documents__item" @click="SelectFiles('spd')">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                            </svg>
                            <span>Добавить</span>
                        </div>
                        <div class="item-documents__item" v-for="(file,indx) in store.state.objectForConstructor.spd.docs">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                            </svg>
                            <span>{{file.name}}</span>
                            <svg @click="store.state.objectForConstructor.spd.docs.splice(indx, 1)" class="item-documents__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                            </svg>
                        </div>
                    </div>
                    <div class="item-slot item-slot_active">
                        <div class="item-slot__title">
                            <p>Кабельная канализация</p>
                            <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                            </svg>
                        </div>
                        <div class="item-slot__content">
                            <div class="item-documents__items">
                                <div class="item-documents__item" @click="SelectFiles('spdcab')">
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                        <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                                    </svg>
                                    <span>Добавить</span>  
                                </div>
                                <div class="item-documents__item" v-for="(file, indx) in store.state.objectForConstructor.spd.cableDuct">
                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                        <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                        <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                                    </svg>
                                    <span>{{file.name}}</span>
                                    <svg @click="store.state.objectForConstructor.spd.cableDuct.splice(indx, 1)" class="item-documents__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                                    </svg>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="item-slot item-slot_active" @click="button(2)">
                        <div class="item-slot__title centerdf">
                            <p>Схема дома</p>
                        </div>
                    </div>
                </div>
                <div class="additionalParameters-constructor">
                    <div class="additional-parameters__title">
                        Дополнительные параметры
                    </div>
                    <div class="table">
                        <constructor-input-ap v-for="(parameter,indx) in store.state.objectForConstructor.spd.additionalParameters"
                        v-model:model="parameter[1]"
                        v-model:name="parameter[0]"
                        >
                        <button class="constructor__button" @click="store.state.objectForConstructor.spd.additionalParameters.splice(indx,1)">
                            Удалить
                        </button>
                    </constructor-input-ap>
                        <div class="table__item" @click="store.state.objectForConstructor.spd.additionalParameters.push(['',''])">
                            <div class="table__title" style="display: flex;justify-content: center;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 12H22M12 2V22" stroke="black" stroke-width="3.67" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                                
                            </div>
                        </div>
                    </div>
                </div>
            </default-item-table>
            <default-item-table name="Система видеонаблюдения (СВН)">
                <div class="table">
                    <constructor-input name="Видеорегистратор" v-model:model="store.state.objectForConstructor.svn.DVR" myplaceholder=''></constructor-input>
                    <constructor-input name="Внутренние камеры" v-model:model="store.state.objectForConstructor.svn.internalCameras" myplaceholder=''></constructor-input>
                    <constructor-input name="Внешние камеры" v-model:model="store.state.objectForConstructor.svn.externalCameras" myplaceholder=''></constructor-input>
                </div>
                <div class="item__columns">
                    <div class="item-documents grid-2">
                        <div class="item-documents__title">
                            Документы:
                        </div>
                        <div class="item-documents__items">
                            <div class="item-documents__item" @click="SelectFiles('svn')">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                    <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                                </svg>
                                <span>Добавить</span>  
                            </div>
                            <div class="item-documents__item" v-for="(file, indx) in store.state.objectForConstructor.svn.docs">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                    <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                    <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                                </svg>
                                <span>{{file.name}}</span>
                                <svg @click="store.state.objectForConstructor.svn.docs.splice(indx, 1)" class="item-documents__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="item-img">
                        <div class="item-documents__title">
                            <p>Фото СВН:</p>
                            <svg @click="dellPhoto(0)" v-if="store.state.objectForConstructor.svn.photo.reader.path != null" class="item-img__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                            </svg>
                        </div>
                        <div v-if="store.state.objectForConstructor.svn.photo.reader.path == null" class="item-documents__item item-documents_big" @click="SelectFiles('svnphoto')">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                            </svg>
                            <span>Добавить</span>
                        </div>
                        <div v-if="store.state.objectForConstructor.svn.photo.reader.path != null" class="item-img__container" @click="SelectFiles('svnphoto')">
                            <img :src="svnphoto">
                        </div>
                    </div>
                    
                </div>
                <div class="additionalParameters-constructor">
                    <div class="additional-parameters__title">
                        Дополнительные параметры
                    </div>
                    <div class="table">
                        <constructor-input-ap v-for="(parameter,indx) in store.state.objectForConstructor.svn.additionalParameters"
                        v-model:model="parameter[1]"
                        v-model:name="parameter[0]"
                        >
                        <button class="constructor__button" @click="store.state.objectForConstructor.svn.additionalParameters.splice(indx,1)">
                            Удалить
                        </button>
                    </constructor-input-ap>
                        <div class="table__item" @click="store.state.objectForConstructor.svn.additionalParameters.push(['',''])">
                            <div class="table__title" style="display: flex;justify-content: center;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 12H22M12 2V22" stroke="black" stroke-width="3.67" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                                
                            </div>
                        </div>
                    </div>
                </div>
            </default-item-table>
            <default-item-table name="СКУД/Домофон">
                <div class="table">
                    <constructor-input name="Вызывные панели" v-model:model="store.state.objectForConstructor.skud.callPanels" myplaceholder=''></constructor-input>
                    <constructor-input name="Калитки" v-model:model="store.state.objectForConstructor.skud.wickets" myplaceholder=''></constructor-input>
                    <constructor-input name="Ворота" v-model:model="store.state.objectForConstructor.skud.gates" myplaceholder=''></constructor-input>
                    <constructor-input name="Шлагбаум" v-model:model="store.state.objectForConstructor.skud.barriers" myplaceholder=''></constructor-input>
                </div>
                <div class="item__columns">
                    <div>
                        <div class="item-documents grid-2">
                            <div class="item-documents__title">
                                Документы:
                            </div>
                            <div class="item-documents__items">
                                <div class="item-documents__item" @click="SelectFiles('skud')">
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                        <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                                    </svg>
                                    <span>Добавить</span>  
                                </div>
                                <div class="item-documents__item" v-for="(file, indx) in store.state.objectForConstructor.skud.docs">
                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                        <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                        <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                                    </svg>
                                    <span>{{file.name}}</span>
                                    <svg @click="store.state.objectForConstructor.skud.docs.splice(indx, 1)" class="item-documents__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="item-documents grid-2">
                            <div class="item-documents__title">
                                Бэкапы:
                            </div>
                            <div class="item-documents__items">
                                <div class="item-documents__item" @click="SelectFiles('skudbackups')">
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                        <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                                    </svg>
                                    <span>Добавить</span>
                                </div>
                                <div class="item-documents__item" v-for="(file, indx) in store.state.objectForConstructor.skud.backups">
                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                        <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                        <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                                    </svg>
                                    <span>{{file.name}}</span>
                                    <svg @click="store.state.objectForConstructor.skud.backups.splice(indx, 1)" class="item-documents__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="item-img">
                        <div class="item-documents__title">
                            <p>Фото СКУД/Домофон:</p>
                            <svg @click="dellPhoto(1)" v-if="store.state.objectForConstructor.skud.photo.reader.path != null" class="item-img__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                            </svg>
                        </div>
                        <div v-if="store.state.objectForConstructor.skud.photo.reader.path == null" class="item-documents__item item-documents_big" @click="SelectFiles('skudphoto')">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                            </svg>
                            <span title="Добавить фото СКУД/Домофон">Добавить фото СКУД/Домофон</span>  
                        </div>
                        <div v-if="store.state.objectForConstructor.skud.photo.reader.path != null" class="item-img__container" @click="SelectFiles('skudphoto')">
                            <img :src="skudphoto" alt="">
                        </div>
                    </div>
                    
                </div>
                <div class="additionalParameters-constructor">
                    <div class="additional-parameters__title">
                        Дополнительные параметры
                    </div>
                    <div class="table">
                        <constructor-input-ap v-for="(parameter,indx) in store.state.objectForConstructor.skud.additionalParameters"
                        v-model:model="parameter[1]"
                        v-model:name="parameter[0]"
                        >
                        <button class="constructor__button" @click="store.state.objectForConstructor.skud.additionalParameters.splice(indx,1)">
                            Удалить
                        </button>
                    </constructor-input-ap>
                        <div class="table__item" @click="store.state.objectForConstructor.skud.additionalParameters.push(['',''])">
                            <div class="table__title" style="display: flex;justify-content: center;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 12H22M12 2V22" stroke="black" stroke-width="3.67" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                                
                            </div>
                        </div>
                    </div>
                </div>
            </default-item-table>
            <default-item-table name="АСКУЭ">
                <div class="item-documents wrap">
                    <div class="item-documents__title">
                        Документы:
                    </div>
                    <div class="item-documents__items">
                        <div class="item-documents__item" @click="SelectFiles('askue')">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                            </svg>
                            <span>Добавить</span>
                        </div>
                        <div class="item-documents__item" v-for="(file, indx) in store.state.objectForConstructor.askue.docs">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                            </svg>
                            <span>{{file.name}}</span>
                            <svg @click="store.state.objectForConstructor.askue.docs.splice(indx, 1)" class="item-documents__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="additionalParameters-constructor">
                    <div class="additional-parameters__title">
                        Дополнительные параметры
                    </div>
                    <div class="table">
                        <constructor-input-ap v-for="(parameter,indx) in store.state.objectForConstructor.askue.additionalParameters"
                        v-model:model="parameter[1]"
                        v-model:name="parameter[0]"
                        >
                        <button class="constructor__button" @click="store.state.objectForConstructor.askue.additionalParameters.splice(indx,1)">
                            Удалить
                        </button>
                    </constructor-input-ap>
                        <div class="table__item" @click="store.state.objectForConstructor.askue.additionalParameters.push(['',''])">
                            <div class="table__title" style="display: flex;justify-content: center;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 12H22M12 2V22" stroke="black" stroke-width="3.67" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                                
                            </div>
                        </div>
                    </div>
                </div>
            </default-item-table>
            <default-item-table name="Автоматизация Квартир">
                <div class="item-documents wrap">
                    <div class="item-documents__title">
                        Документы:
                    </div>
                    <div class="item-documents__items">
                        <div class="item-documents__item" @click="SelectFiles('auto')">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                            </svg>
                            <span>Добавить</span>  
                        </div>
                        <div class="item-documents__item" v-for="(file, indx) in store.state.objectForConstructor.apartmentAutomation.docs">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                            </svg>
                            <span>{{file.name}}</span>
                            <svg @click="store.state.objectForConstructor.apartmentAutomation.docs.splice(indx, 1)" class="item-documents__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="additionalParameters-constructor">
                    <div class="additional-parameters__title">
                        Дополнительные параметры
                    </div>
                    <div class="table">
                        <constructor-input-ap v-for="(parameter,indx) in store.state.objectForConstructor.apartmentAutomation.additionalParameters"
                        v-model:model="parameter[1]"
                        v-model:name="parameter[0]"
                        >
                        <button class="constructor__button" @click="store.state.objectForConstructor.apartmentAutomation.additionalParameters.splice(indx,1)">
                            Удалить
                        </button>
                    </constructor-input-ap>
                        <div class="table__item" @click="store.state.objectForConstructor.apartmentAutomation.additionalParameters.push(['',''])">
                            <div class="table__title" style="display: flex;justify-content: center;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 12H22M12 2V22" stroke="black" stroke-width="3.67" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                                
                            </div>
                        </div>
                    </div>
                </div>
            </default-item-table>
            <div class="save-buttons">
                <button class="save-buttons__item" @click="button(1)">Отменить</button>
                <button class="save-buttons__item" @click="confirmDell = true" v-if="edit">Удалить</button>
                <button class="save-buttons__item" @click="button(0)">Сохранить</button>
            </div>
            <div class="users-add" v-if="confirmDell">
                <div class="users-add__container">
                    <div class="users-add__title">
                        Вы уверенны что хотите удалить схему?
                    </div>
                    <div class="users-add__buttons">
                        <div class="button" @click="confirmDell = false">
                            Отменить
                        </div>
                        <div class="button"  @click="button(3)">
                            Удалить
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}