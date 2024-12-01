import { onMounted, computed } from 'vue'
import { useStateStore } from '../../../pinia/store.js'
export const kkconstructor = {
    setup(){
        const store = useStateStore()

        function setSlider(objec,key,value){
            store.kkForConstructor[objec][key] = value
        }
        function setSliderCabLine(indx,value){
            store.kkForConstructor.KabLines[indx] = value
        }
        const usedNumKabLines = computed(() => {
            return store.kkForConstructor.KabLines.map(line => line.numKabLine);
        })
        function isNumKabLineUsed(numKabLine) {
            return this.usedNumKabLines.includes(numKabLine);
        }
        function button(type) {
            constructorManager.object.updatePolyline(0, store.kkForConstructor.numKabChannel);
            switch(type){
                case 0:
                    constructorManager.object.EditChannel(1, store.kkForConstructor);
                    break;
                case 1:
                    constructorManager.object.EditChannel(1, store.kkForConstructor);
                    window.vueApp.back()
                    break;
            }
        }
        function addCabLine(){
            if(store.kkForConstructor.KabLines.length >= store.newScheme.cableLines.length) return;
            store.kkForConstructor.KabLines.push({
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
        onMounted(() => {
            if (store.kkForConstructor.KabLines.length==0){
                addCabLine()
            }
        })




        return{
            setSlider,
            button,
            setSliderCabLine,
            addCabLine,
            isNumKabLineUsed,
            usedNumKabLines,
            store

        }
    },
    

    components:{
        ConstructorInput,
        DefaultItemTable,
        ConstructorChoice,
        DefaultColumnSlot,
    },
    template:`
    <div class="item item_active">
        <div class="item__title">
            <p>Редактировать кабельный канал:</p>
        </div>
        <div class="table">
            <div class="table__item">
                <div class="table__title">
                    <p>Длина</p>
                    <div class="constructor__input">
                        <input type="number" 
                        v-model="this.store.kkForConstructor.length"
                        placeholder="Введите значение">
                    </div>
                </div>
            </div>
            <constructor-input name="Диаметр" v-model:model="this.store.kkForConstructor.diameter" myplaceholder='Введите значение'></constructor-input>
            <constructor-choice
                name="Материал"
                v-model:model="this.store.kkForConstructor.material"
                :items="store.promptsOptions.cable_channel_material"
            ></constructor-choice >
            <div class="table__item" v-for="(kabLine, index) in this.store.kkForConstructor.KabLines">
                <div class="table__title">
                    <p>Кабельная линия</p>
                    <div class="table__title__items">
                        <button @click="this.store.kkForConstructor.KabLines.splice(index,1)" class="constructor__button" style="margin-right: 0px;">
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
                                    @click="setSliderCabLine(index,item)"
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
            </svg>

        </div>
        <div class="save-buttons">
            <button class="save-buttons__item" @click="button(1)">Назад</button>
        </div>
    </div>
    `,
    
}