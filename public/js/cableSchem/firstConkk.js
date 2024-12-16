import { ref } from 'vue'
import { useStateStore } from '../pinia/store.js'
export const firstkkconstructor = {

    setup(props,{emit}){

        const store = useStateStore()

        const steps = ref(0)

        if(store.state.whereBack == 72){
            steps.value = 1
        }

        const nextStep = async () => {
            if(store.newScheme.name == "" || store.newScheme.name == " ") {
                $.notify("Введите название схемы", { type:"toast" });
                return;
            }else{
                if(!store.newScheme.edit){
                    let result = await apiManager.setData("create", "./php/api/cableSchemas/index.php", JSON.stringify([store.newScheme.name]));
                    store.newScheme.id = result.data;

                    store.newScheme.files = await cableSchemasManager.SaveSchemFiles(store.newScheme.id, store.newScheme.files);
                }
                else{
                    await apiManager.setData("setName", "./php/api/cableSchemas/index.php", JSON.stringify([store.newScheme.id, store.newScheme.name, "name"]));

                    store.newScheme.files = await cableSchemasManager.SaveSchemFiles(store.newScheme.id, store.newScheme.files);
                }
                steps.value++
            }
        }

        
        let confirmDell = ref(false)

        const saveFiles = (index) => {
            switch (index) {
                case 0: // Колодцы
                    constructorManager.LoadingPage(true)
                    cableSchemasManager.SaveSchemSection(store.newScheme.id, "wells", store.newScheme.wells);
                    
                    $.notify("Колодцы успешно сохранены", { type:"toast" });
                    break;
                case 1: // Кабельные каналы
                    constructorManager.LoadingPage(true)
                    cableSchemasManager.SaveSchemSection(store.newScheme.id, "channels", store.newScheme.kls);
                    
                    $.notify("Кабельные каналы успешно сохранены", { type:"toast" });
                    break;
                case 2: // Кабельные линии
                    constructorManager.LoadingPage(true)
                    cableSchemasManager.SaveSchemSection(store.newScheme.id, "cableLines", store.newScheme.cableLines);
                        
                    $.notify("Кабельные линии успешно сохранены", { type:"toast" });
                    break;

                default:
                    break;
            }
        }
        
        function wellButtons(type, well){
            switch(type){
                case 0:
                    constructorManager.object.deleteWell(well.id);
                break;
                case 1:
                    constructorManager.object.EditWell(0, well);
                break;
            }
        }
        function klsButtons(type, id){
            switch(type){
                case 0:
                    constructorManager.object.deleteChannel(id);
                    break;
                case 1:
                    constructorManager.object.EditChannel(0, id);
                    break;
            }
        }
        function cabLinesButtons(type, id = null){
            switch(type){
                case 0:
                    let objss = {
                        numKabLine: store.newScheme.cableLines.length + 1,
                        start: '',
                        finish: '',
                        length: '',
                        type: '',
                        mark: '',
                        owner: '',
                        additionalParameters: []
                    };
                    store.newScheme.cableLines.push(objss);
                    break;
                case 1:
                    constructorManager.object.EditLine(0, store.newScheme.cableLines.find(x => x.numKabLine == id));
                    break;
                case 2:
                    store.newScheme.cableLines.splice(store.newScheme.cableLines.findIndex(x => x.numKabLine == id), 1);
                    break;
            }
        }
        function getWell(type, finish){
            switch(type){
                case "well":
                    let obj1 = store.newScheme.wells.find(x => x.id == finish);
                    if(obj1 != null) return obj1.wellObject.numWell;
                break;
                case "object":
                    let obj2 = JSON.parse(finish);
                    return obj2.name;
            }
        }
        function misterProper3(id, line){
            constructorManager.object.updatePolylineCabLine(id, line);
        }
        function misterProper2(id, channel){
            constructorManager.object.updatePolyline(id, channel.id);
        }
        function misterProper(id, well){
            constructorManager.object.updateMarker(id, well);
        }
        async function button(id){
            switch(id){
                case 0:
                    if(!store.newScheme.edit){
                        constructorManager.object.cableSchem.name = store.newScheme.name;
                        constructorManager.object.cableSchem.channels = store.newScheme.kls;
                        constructorManager.object.cableSchem.cableLines = store.newScheme.cableLines;
                        constructorManager.LoadingPage(true)
                        await constructorManager.destroy(0);
                    }
                    else{
                        constructorManager.object.cableSchem.name = store.newScheme.name;
                        constructorManager.object.cableSchem.channels = store.newScheme.kls;
                        constructorManager.object.cableSchem.cableLines = store.newScheme.cableLines;
                        constructorManager.LoadingPage(true)
                        await constructorManager.destroy(3);
                    }
                break;
                case 1:
                    if(!store.newScheme.edit){
                        await constructorManager.destroy(1);
                    }
                    else{
                        await constructorManager.destroy(4);
                    }
                break;
                case 2:
                    constructorManager.LoadingPage(true)
                    await cableSchemasManager.DeleteSchemFull(store.newScheme.id);
                    constructorManager.destroy(1)
                break;
            }
        }

        function SelectFiles(id){
            let fileManager = new FilesManager(false);
            fileManager.selectFiles().then(files => {
                switch(id){
                    case "files":
                        files.forEach(element => {
                            store.newScheme.files.unshift(element); 
                        });
                    break;
                }
            });
        }
        return{
            wellButtons,
            klsButtons,
            cabLinesButtons,
            misterProper,
            misterProper2,
            misterProper3,
            button,
            getWell,
            confirmDell,
            store,
            steps,
            nextStep,
            saveFiles,
            SelectFiles
        }
    },
    components:{
        DefaultItemTable,
    },
    template:`

        <div class="items mainkk constructor">
            <default-item-table name="Начальные параметры схемы" :active="true" v-if="steps==0">
                <div class="mainkk-input" v-if="steps==0">
                    <input v-model="store.newScheme.name" style="background: #fff;box-shadow:0px 8px 22px 1px rgba(0, 0, 0, 0.25);" type="text" placeholder="Название схемы">
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
                            <div class="item-documents__item" @click="SelectFiles('files')">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="20" width="10" height="50" rx="3" fill="black"/>
                                    <rect y="30" width="10" height="50" rx="3" transform="rotate(-90 0 30)" fill="black"/>
                                </svg>
                                <span>Добавить</span>
                            </div>
                            <div class="item-documents__item" v-for="(file, indx) in store.newScheme.files">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M52.1244 29.0666C51.7843 28.7754 51.3468 28.6232 50.8994 28.6405C50.452 28.6578 50.0276 28.8432 49.7109 29.1599C49.3943 29.4765 49.2089 29.9009 49.1916 30.3483C49.1743 30.7957 49.3265 31.2332 49.6177 31.5733L55.3955 37.3333H46.2222V40.8889H55.4488L49.6177 46.72C49.4316 46.8793 49.2805 47.0755 49.1738 47.296C49.0671 47.5166 49.0071 47.7568 48.9976 48.0017C48.9882 48.2465 49.0294 48.4906 49.1188 48.7188C49.2082 48.9469 49.3438 49.1541 49.517 49.3274C49.6903 49.5006 49.8975 49.6362 50.1256 49.7256C50.3537 49.8149 50.5979 49.8562 50.8427 49.8467C51.0875 49.8373 51.3278 49.7773 51.5483 49.6706C51.7689 49.5639 51.965 49.4127 52.1244 49.2266L62.2222 39.1111L52.1244 29.0666Z" fill="black"/>
                                    <path d="M30.2222 39.1111C30.2222 38.6396 30.4095 38.1874 30.7429 37.854C31.0763 37.5206 31.5285 37.3333 32 37.3333H46.2222V21.9378C43.7946 20.4163 41.9249 18.1496 40.893 15.4769C39.8611 12.8042 39.7224 9.86918 40.4978 7.11108H19.3244L7.11108 19.3066V53.3333C7.11108 54.2763 7.48569 55.1807 8.15248 55.8475C8.81928 56.5143 9.72365 56.8889 10.6666 56.8889H42.6666C43.6096 56.8889 44.514 56.5143 45.1808 55.8475C45.8476 55.1807 46.2222 54.2763 46.2222 53.3333V40.8889H32C31.5285 40.8889 31.0763 40.7016 30.7429 40.3682C30.4095 40.0348 30.2222 39.5826 30.2222 39.1111ZM21.3333 21.3333H10.6666V20.7644L20.7822 10.6666H21.3333V21.3333Z" fill="black"/>
                                    <path d="M53.3332 19.5556C58.2424 19.5556 62.2221 15.5759 62.2221 10.6667C62.2221 5.75752 58.2424 1.77783 53.3332 1.77783C48.424 1.77783 44.4443 5.75752 44.4443 10.6667C44.4443 15.5759 48.424 19.5556 53.3332 19.5556Z" fill="black"/>
                                </svg>
                                <span>{{file.name}}</span>
                                <svg @click="store.newScheme.files.splice(indx, 1)" class="item-documents__del" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="save-buttons">
                    <button class="save-buttons__item" @click="button(1)">Отменить</button>
                    <button class="save-buttons__item" @click="nextStep()">Далее</button>
                </div>
            </default-item-table>
            <span v-else>
                <div class="item item_active">
                    <div class="item__title">
                        <p>Колодцы</p>
                    </div>
                    <div class="mainkk-items">
                        <div class="mainkk-item" v-for="(well, indx) in store.newScheme.wells" @mouseover="misterProper(1, well)" @mouseleave="misterProper(0, well)">
                            <div class="mainkk-item__name">
                                {{well.wellObject.numWell}}
                            </div>
                            <div class="mainkk-item__buttons">
                                <button class="mainkk-item__button" @click="wellButtons(1, well.id)">Редактировать</button>
                                <button class="mainkk-item__button" @click="wellButtons(0, well)">Удалить</button>
                            </div>
                        </div>
                    </div>
                    <div class="save-files-button" @click="saveFiles(0)">
                        <div class="item-slot__title centerdf">
                            <p>Сохранить</p>
                        </div>
                    </div>
                </div>
                <div class="item item_active">
                    <div class="item__title">
                        <p>Кабельные каналы</p>
                    </div>
                    <div class="mainkk-items">
                        <div class="mainkk-item mainkk-itemKK" v-for="(kl, indx) in store.newScheme.kls" @mouseover="misterProper2(1, kl)" @mouseleave="misterProper2(0, kl)">
                            <div class="mainkk-item__name">
                                {{getWell("well", kl.cableChannelObject.start)}} -> {{getWell(kl.cableChannelObject.finishtype, kl.cableChannelObject.finish)}}
                            </div>
                            <div class="mainkk-item__buttons">
                                <button class="mainkk-item__button" @click="klsButtons(1, kl.id)">Редактировать</button>
                                <button class="mainkk-item__button" @click="klsButtons(0, kl.id)">Удалить</button>
                            </div>
                        </div>
                    </div>
                    <div class="save-files-button" @click="saveFiles(1)">
                        <div class="item-slot__title centerdf">
                            <p>Сохранить</p>
                        </div>
                    </div>
                </div>
                <div class="item item_active">
                    <div class="item__title">
                        <p>Кабельные линии</p>
                        <div @click="cabLinesButtons(0)" class="button" style="height:40px;">Добавить</div>
                    </div>
                    <div class="mainkk-items">
                        <div class="mainkk-item" v-for="(cabline, indx) in store.newScheme.cableLines" @mouseover="misterProper3(1, cabline.numKabLine)" @mouseleave="misterProper3(0, cabline.numKabLine)">
                            <div class="mainkk-item__name">
                                КЛ - {{cabline.numKabLine}}
                            </div>
                            <div class="mainkk-item__buttons">
                                <button class="mainkk-item__button" @click="cabLinesButtons(1, cabline.numKabLine)">Редактировать</button>
                                <button class="mainkk-item__button" @click="cabLinesButtons(2, cabline.numKabLine)">Удалить</button>
                            </div>
                        </div>
                    </div>
                    <div class="save-files-button" @click="saveFiles(2)">
                        <div class="item-slot__title centerdf">
                            <p>Сохранить</p>
                        </div>
                    </div>
                </div>
                <div class="save-buttons">
                    <!-- <button class="save-buttons__item" @click="button(1)">Отменить</button> -->
                    <button class="save-buttons__item" v-if="store.newScheme.edit" @click="this.confirmDell=true">Удалить</button>
                    <!-- <button class="save-buttons__item" @click="button(0)">Сохранить</button> -->
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
                            <div class="button"  @click="button(2)">
                                Удалить
                            </div>
                        </div>
                    </div>
                </div>
            </span>
            
        </div>
    `
}