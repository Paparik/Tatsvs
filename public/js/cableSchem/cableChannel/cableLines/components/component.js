import { computed  } from 'vue'
import { useStateStore } from '../../../../pinia/store.js'

export const kablines = {

    setup(props, {emit}){
        const store = useStateStore()

        
        function back(){
            window.vueApp.back()
        }
        const counter = computed(() => {
            let schema = cableSchemasManager.cableSchemas.find(x => x.id == store.kabChannelObj.schemaId)
            
            let length = 0
            for (let index = 0; index < schema.channels.length; index++) {
                if (schema.channels[index].cableChannelObject.KabLines.find(item => item.numKabLine == store.kabLinelObj.numKabLine)){
                    length +=  Number(schema.channels[index].cableChannelObject.length)
                }
            }
            return length.toFixed(2) + " м"
        })
        return{
            back,
            counter,
            store,
        }
    },
    template: `
        <div class="items">
            <div class="item ">
                <div class="item__title">
                    <p>Кабельная линия №{{store.kabLinelObj.numKabLine}}</p>    
                    <button class="back" @click="back()">
                        <svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70045 0.248461C8.36917 -0.082821 7.83278 -0.082821 7.50234 0.248461L0.496283 7.2725C-0.165428 7.93591 -0.165428 9.01215 0.496283 9.67556L7.55308 16.7514C7.88096 17.0793 8.41067 17.0835 8.7428 16.7599C9.08255 16.4295 9.0858 15.885 8.75198 15.5495L2.29324 9.07501C1.96196 8.74288 1.96196 8.20518 2.29324 7.87304L8.70045 1.44957C9.03173 1.11829 9.03173 0.579742 8.70045 0.248461Z" fill="#2E2E2E"/>
                        </svg>
                        Назад
                    </button>
                </div>
                <div class="item__content" style="display: block;">
                    <div class="table">
                        <default-column name="Начало" :value="store.kabLinelObj.start"></default-column>
                        <default-column name="Конец" :value="store.kabLinelObj.finish"></default-column>
                        <default-column name="Длина" :value="counter"></default-column>
                        <default-column name="Тип кабеля" :value="store.kabLinelObj.type"></default-column>
                        <default-column name="Марка кабеля" :value="store.kabLinelObj.mark"></default-column>
                        <default-column name="Собственник" :value="store.kabLinelObj.owner"></default-column>
                    </div>
                </div>
                <additional-parameters v-if="store.kabLinelObj.additionalParameters.length">
                        <default-column v-for="item in store.kabLinelObj.additionalParameters" :name="item[0]" :value="item[1]"></default-column>
                </additional-parameters>
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