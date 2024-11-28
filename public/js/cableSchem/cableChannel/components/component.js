import { computed  } from 'vue'
import { useStateStore } from '../../../pinia/store.js'

export const kabchannel = {
    setup(){
        const store = useStateStore()
        function editButton(){
            constructorManager.create(2, store.state.kabChannelObj.schemaId)
        }
        function getWell(type, finish){
            switch(type){
                case "well":
                    let obj1 = cableSchemasManager.cableSchemas.find(x => x.id == store.state.kabChannelObj.schemaId).wells.find(x => x.id == finish);
                    if(obj1 != null) return obj1.wellObject.numWell;
                break;
                case "object":
                    let obj2 = JSON.parse(finish);
                    return obj2.name;
            }
        }
        function openKabLine(lineId){
            cableSchemasManager.OpenKabLine(store.state.kabChannelObj.schemaId, lineId);
        }
        const counter = computed(() => {
            return store.state.kabChannelObj.length + " м"
        })
        return{
            editButton,
            getWell,
            openKabLine,
            counter,
            role: store.role,
            store,
        }
    },
    template: `
        <div class="items">
            <div class="mainkk-input">
                <input readonly v-model="store.state.kabChannelObj.schemaName" style="background: #fff;box-shadow:0px 8px 22px 1px rgba(0, 0, 0, 0.25); text-align: center; padding-left: 0;" type="text" placeholder="Название схемы">
            </div>
            <div class="item item_active">
                <div class="item__title">
                    <p>Кабельный канал <a style="color: #ff6a4a;">№{{this.store.state.kabChannelObj.numKabChannel}}</a></p>                             
                </div>
                <div class="item__content">
                    <div class="table">
                        <default-column name="Начало" :value="getWell('well', this.store.state.kabChannelObj.start)"></default-column>
                        <default-column name="Конец" :value="getWell(this.store.state.kabChannelObj.finishtype, this.store.state.kabChannelObj.finish)"></default-column>
                        <default-column name="Длина" :value="counter"></default-column>
                        <default-column name="Диаметр" :value="this.store.state.kabChannelObj.diameter + ' м'"></default-column>
                        <default-column name="Материал" :value="this.store.state.kabChannelObj.material"></default-column>
                        <div class="table__item table_active">
                            <div class="table__title" onclick="setTableActive(this)">
                                <p>Кабельные линии</p>
                                <svg width="54" height="27" viewBox="0 0 54 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.789228 0.89866C-0.263081 1.8925 -0.263081 3.50166 0.789228 4.49298L23.1009 25.5112C25.2082 27.4963 28.6268 27.4963 30.7341 25.5112L53.2104 4.34077C54.2519 3.35711 54.2654 1.76799 53.2373 0.771618C52.1877 -0.247653 50.4582 -0.257398 49.3924 0.744053L28.8265 20.1203C27.7715 21.1141 26.0635 21.1141 25.0085 20.1203L4.60452 0.89866C3.55221 -0.0951823 1.84153 -0.0951823 0.789228 0.89866Z" fill="#2E2E2E"/>
                                </svg> 
                            </div>
                            <div class="table__content kl-links">
                                <span v-for="link in this.store.state.kabChannelObj.KabLines">
                                    <p class="kl-links__item" v-if="link.numKabLine != ''" @click="openKabLine(link.numKabLine)">КЛ-{{link.numKabLine}};</p>
                                </span>
                            </div>
                        </div>
                        <additional-parameters v-if="this.store.state.kabChannelObj.additionalParameters.length">
                            <default-column v-for="item in this.store.state.kabChannelObj.additionalParameters" :name="item[0]" :value="item[1]"></default-column>
                        </additional-parameters>
                    </div>
                </div> 
            </div>
            <div class="save-buttons" v-if="role == 'Администратор'">
                <button class="save-buttons__item" @click="editButton()">Редактировать</button>
            </div>
        </div>
    `,
    components: {
        ConstructorInput,
        DefaultColumn,
        DefaultSlider,
        DefaultItemTable,
        AdditionalParameters
    }
}