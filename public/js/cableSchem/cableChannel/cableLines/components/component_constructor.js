import { computed  } from 'vue'
import { useStateStore } from '../../../../pinia/store.js'
export const kablinesconstructor = {
    setup() {
        const store = useStateStore()


        function button(type) {
            switch(type){
                case 0:
                    if(store.state.kabLinelForConstructor.numKabLine == ""){
                        $.notify("Введите название кабельной линии", { type:"toast" });
                        return;
                    }
                    constructorManager.object.updatePolylineCabLine(0, store.state.kabLinelForConstructor.numKabLine);
                    constructorManager.object.EditLine(1, store.state.kabLinelForConstructor);
                break;
                case 1:
                    if(store.state.kabLinelForConstructor.numKabLine == ""){
                        $.notify("Введите название кабельной линии", { type:"toast" });
                        return;
                    }
                    constructorManager.object.updatePolylineCabLine(0, store.state.kabLinelForConstructor.numKabLine);
                    constructorManager.object.EditLine(1, store.state.kabLinelForConstructor);
                    window.vueApp.back()
                break;
            }
        }

        const counter = computed(() => {
            if(store.state.kabLinelForConstructor.numKabLine == "") return "0.00 м";
            let length = 0
            for (let index = 0; index < store.state.newScheme.kls.length; index++) {
                if (store.state.newScheme.kls[index].cableChannelObject.KabLines.find(item => item.numKabLine == store.state.kabLinelForConstructor.numKabLine)){
                    length +=  Number(store.state.newScheme.kls[index].cableChannelObject.length)
                }
            }
            return length.toFixed(2) + " м"
        })
        

        function setSlider(objec,key,value){
            store.state.kabLinelForConstructor[objec][key] = value
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
         v-model:model="store.state.kabLinelForConstructor.numKabLine"
         myplaceholder="Введите название"
        ></constructor-input>
        <div class="table">
            <div class="table__item">
                <div class="table__title">
                    <p>Начало</p>
                    <div class="constructor__input">
                        <input type="text" 
                         list="start"
                         v-model="store.state.kabLinelForConstructor.start"
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
                         v-model="store.state.kabLinelForConstructor.finish"
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
                v-model:model="store.state.kabLinelForConstructor.type"
                :items="store.promptsOptions.cable_type_in_cable_line"
            ></constructor-choice>
            <constructor-choice 
                name="Марка Кабеля"
                v-model:model="store.state.kabLinelForConstructor.mark"
                :items="store.promptsOptions.cable_mark_in_cable_line"
            ></constructor-choice>
            <constructor-choice 
                name="Собственник"
                v-model:model="store.state.kabLinelForConstructor.owner"
                :items="store.promptsOptions.operators"
            ></constructor-choice>
            
        </div>
        <div class="save-buttons">
            <button class="save-buttons__item" @click="button(1)">Назад</button>
        </div>
    </div>
    `,
}