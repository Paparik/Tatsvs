import { computed  } from 'vue'
import { useStateStore } from '../../../../pinia/store.js'
export const kablinesconstructor = {
    setup() {
        const store = useStateStore()


        function button(type) {
            switch(type){
                case 0:
                    if(store.kabLinelForConstructor.numKabLine == ""){
                        $.notify("Введите название кабельной линии", { type:"toast" });
                        return;
                    }
                    constructorManager.object.updatePolylineCabLine(0, store.kabLinelForConstructor.numKabLine);
                    constructorManager.object.EditLine(1, store.kabLinelForConstructor);
                break;
                case 1:
                    if(store.kabLinelForConstructor.numKabLine == ""){
                        $.notify("Введите название кабельной линии", { type:"toast" });
                        return;
                    }
                    constructorManager.object.updatePolylineCabLine(0, store.kabLinelForConstructor.numKabLine);
                    constructorManager.object.EditLine(1, store.kabLinelForConstructor);
                    window.vueApp.back()
                break;
            }
        }

        const counter = computed(() => {
            if(store.kabLinelForConstructor.numKabLine == "") return "0.00 м";
            let length = 0
            for (let index = 0; index < store.newScheme.kls.length; index++) {
                if (store.newScheme.kls[index].cableChannelObject.KabLines.find(item => item.numKabLine == store.kabLinelForConstructor.numKabLine)){
                    length +=  Number(store.newScheme.kls[index].cableChannelObject.length)
                }
            }
            return length.toFixed(2) + " м"
        })
        

        function setSlider(objec,key,value){
            store.kabLinelForConstructor[objec][key] = value
        }

        return {
            setSlider,
            button,
            counter,
            store,
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
            <p>Редактировать кабельную линию:</p>
        </div>
        <constructor-input
         name="Название"
         v-model:model="store.kabLinelForConstructor.numKabLine"
         myplaceholder="Введите название"
        ></constructor-input>
        <div class="table">
            <div class="table__item">
                <div class="table__title">
                    <p>Начало</p>
                    <div class="constructor__input">
                        <input type="text" 
                         list="start"
                         v-model="store.kabLinelForConstructor.start"
                         placeholder="Колодец">

                        <datalist id="start">
                            <option v-for="well in store.state.newSchemewells" :value="well.wellObject.numWell"></option>
                        </datalist>
                    </div>
                </div>
            </div>
            <div class="table__item">
                <div class="table__title">
                    <p>Конец</p>
                    <div class="constructor__input">

                        <input type="text" 
                         list="finish"
                         v-model="store.kabLinelForConstructor.finish"
                         placeholder="Колодец">

                        <datalist id="finish">
                            <option v-for="well in store.state.newSchemewells" :value="well.wellObject.numWell"></option>
                        </datalist>
                    </div>
                </div>
            </div>
            <div class="table__item">
                <div class="table__title">
                    <p>Длина</p>
                    <div class="constructor__input">
                        <input type="text" 
                        readonly
                        v-model="counter"
                        >
                    </div>
                </div>
            </div>
            <constructor-choice 
                name="Тип кабеля"
                v-model:model="store.kabLinelForConstructor.type"
                :items="store.promptsOptions.cable_type_in_cable_line"
            ></constructor-choice>
            <constructor-choice 
                name="Марка Кабеля"
                v-model:model="store.kabLinelForConstructor.mark"
                :items="store.promptsOptions.cable_mark_in_cable_line"
            ></constructor-choice>
            <constructor-choice 
                name="Собственник"
                v-model:model="store.kabLinelForConstructor.owner"
                :items="store.promptsOptions.operators"
            ></constructor-choice>
            
        </div>
        <div class="save-buttons">
            <button class="save-buttons__item" @click="button(1)">Назад</button>
        </div>
    </div>
    `,
}