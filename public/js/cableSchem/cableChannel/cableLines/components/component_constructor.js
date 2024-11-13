import { computed  } from 'vue'
export const kablinesconstructor = {
    props: {
        obj: {
            type: Object
        },
        prompts:{
            type: Object
        },
        kls:{
            type: Object
        },
        scheme: {
            type: Object
        }
    },
    setup(props, {emit}) {
        function button(type) {
            switch(type){
                case 0:
                    if(props.obj.numKabLine == ""){
                        $.notify("Введите название кабельной линии", { type:"toast" });
                        return;
                    }
                    constructorManager.object.updatePolylineCabLine(0, props.obj.numKabLine);
                    constructorManager.object.EditLine(1, props.obj);
                break;
                case 1:
                    if(props.obj.numKabLine == ""){
                        $.notify("Введите название кабельной линии", { type:"toast" });
                        return;
                    }
                    constructorManager.object.updatePolylineCabLine(0, props.obj.numKabLine);
                    constructorManager.object.EditLine(1, props.obj);
                    emit('func-back');
                break;
            }
        }

        const counter = computed(() => {
            if(props.obj.numKabLine == "") return "0.00 м";
            let length = 0
            for (let index = 0; index < props.kls.length; index++) {
                if (props.kls[index].cableChannelObject.KabLines.find(item => item.numKabLine == props.obj.numKabLine)){
                    length +=  Number(props.kls[index].cableChannelObject.length)
                }
            }
            return length.toFixed(2) + " м"
        })

        function setSlider(objec,key,value){
            this.obj[objec][key] = value
        }

        return {
            setSlider,
            button,
            counter
        }
    },

    components:{
        ConstructorInput,
        DefaultItemTable,
        ConstructorChoice,
        DefaultColumnSlot
    },
    template:`
   <div class="item item_active">
        <div class="item__title">
            <p>Редактировать кабельную линию:</p>
        </div>
        <constructor-input
         name="Название"
         v-model:model="this.obj.numKabLine"
         myplaceholder="Введите название"
        ></constructor-input>
        <div class="table">
            <div class="table__item">
                <div class="table__title">
                    <p>Начало</p>
                    <div class="constructor__input">
                        <input type="text" 
                         list="start"
                         v-model="this.obj.start"
                         placeholder="Колодец">

                        <datalist id="start">
                            <option v-for="well in scheme.wells" :value="well.wellObject.numWell"></option>
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
                         v-model="this.obj.finish"
                         placeholder="Колодец">

                        <datalist id="finish">
                            <option v-for="well in scheme.wells" :value="well.wellObject.numWell"></option>
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
                v-model:model="this.obj.type"
                :items="this.prompts.cable_type_in_cable_line"
            ></constructor-choice>
            <constructor-choice 
                name="Марка Кабеля"
                v-model:model="this.obj.mark"
                :items="this.prompts.cable_mark_in_cable_line"
            ></constructor-choice>
            <constructor-choice 
                name="Собственник"
                v-model:model="this.obj.owner"
                :items="this.prompts.operators"
            ></constructor-choice>
            
        </div>
        <div class="save-buttons">
            <button class="save-buttons__item" @click="button(1)">Назад</button>
        </div>
    </div>
    `,
}