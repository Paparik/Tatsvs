import { ref } from 'vue'
export const firstkkconstructor = {
    props:{
        obj: {
            type: Object
        },
    },
    setup(props,{emit}){
        let key = ref(0);
        let confirmDell = ref(false)
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
                        numKabLine: props.obj.cableLines.length + 1,
                        start: '',
                        finish: '',
                        length: '',
                        type: '',
                        mark: '',
                        owner: '',
                        additionalParameters: []
                    };
                    props.obj.cableLines.push(objss);
                    break;
                case 1:
                    constructorManager.object.EditLine(0, props.obj.cableLines.find(x => x.numKabLine == id));
                    break;
                case 2:
                    props.obj.cableLines.splice(props.obj.cableLines.findIndex(x => x.numKabLine == id), 1);
                    break;
            }
        }
        function getWell(type, finish){
            switch(type){
                case "well":
                    let obj1 = props.obj.wells.find(x => x.id == finish);
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
                    if(props.obj.name == "" || props.obj.name == " ") {
                        $.notify("Введите название схемы", { type:"toast" });
                        return;
                    }
                    if(props.obj.wells.length <= 0) {
                        $.notify("Заполните данные", { type:"toast" });
                        return;
                    }
                    if(!props.obj.edit){
                        constructorManager.object.cableSchem.name = props.obj.name;
                        constructorManager.object.cableSchem.channels = props.obj.kls;
                        constructorManager.object.cableSchem.cableLines = props.obj.cableLines;
                        constructorManager.LoadingPage(true)
                        await constructorManager.destroy(0);
                    }
                    else{
                        constructorManager.object.cableSchem.name = props.obj.name;
                        constructorManager.object.cableSchem.channels = props.obj.kls;
                        constructorManager.object.cableSchem.cableLines = props.obj.cableLines;
                        constructorManager.LoadingPage(true)
                        await constructorManager.destroy(3);
                    }
                break;
                case 1:
                    if(!props.obj.edit){
                        await constructorManager.destroy(1);
                    }
                    else{
                        await constructorManager.destroy(4);
                    }
                break;
                case 2:
                    constructorManager.LoadingPage(true)
                    await cableSchemasManager.DeleteSchemFull(props.obj.id);
                    constructorManager.destroy(1)
                break;
            }
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
            confirmDell
        }
    },
    template:`
        <div class="items mainkk constructor">

            <div class="item item_active">
                <div class="mainkk-input">
                    <input v-model="obj.name" type="text" placeholder="Название схемы">
                </div>
                <div class="item__title">
                    <p>Колодцы</p>
                </div>
                <div class="mainkk-items">
                    <div class="mainkk-item" v-for="(well, indx) in obj.wells" @mouseover="misterProper(1, well)" @mouseleave="misterProper(0, well)">
                        <div class="mainkk-item__name">
                            {{well.wellObject.numWell}}
                        </div>
                        <div class="mainkk-item__buttons">
                            <button class="mainkk-item__button" @click="wellButtons(1, well.id)">Редактировать</button>
                            <button class="mainkk-item__button" @click="wellButtons(0, well)">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item item_active">
                <div class="item__title">
                    <p>Кабельные каналы</p>
                </div>
                <div class="mainkk-items">
                    <div class="mainkk-item mainkk-itemKK" v-for="(kl, indx) in obj.kls" @mouseover="misterProper2(1, kl)" @mouseleave="misterProper2(0, kl)">
                        <div class="mainkk-item__name">
                            {{getWell("well", kl.cableChannelObject.start)}} -> {{getWell(kl.cableChannelObject.finishtype, kl.cableChannelObject.finish)}}
                        </div>
                        <div class="mainkk-item__buttons">
                            <button class="mainkk-item__button" @click="klsButtons(1, kl.id)">Редактировать</button>
                            <button class="mainkk-item__button" @click="klsButtons(0, kl.id)">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item item_active">
                <div class="item__title">
                    <p>Кабельные линии</p>
                    <div @click="cabLinesButtons(0)" class="button" style="height:40px;">Добавить</div>
                </div>
                <div class="mainkk-items">
                    <div class="mainkk-item" v-for="(cabline, indx) in obj.cableLines" @mouseover="misterProper3(1, cabline.numKabLine)" @mouseleave="misterProper3(0, cabline.numKabLine)">
                        <div class="mainkk-item__name">
                            КЛ - {{cabline.numKabLine}}
                        </div>
                        <div class="mainkk-item__buttons">
                            <button class="mainkk-item__button" @click="cabLinesButtons(1, cabline.numKabLine)">Редактировать</button>
                            <button class="mainkk-item__button" @click="cabLinesButtons(2, cabline.numKabLine)">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="save-buttons">
                <button class="save-buttons__item" @click="button(1)">Отменить</button>
                <button class="save-buttons__item" v-if="obj.edit" @click="this.confirmDell=true">Удалить</button>
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
                        <div class="button"  @click="button(2)">
                            Удалить
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}