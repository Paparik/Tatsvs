import { useStateStore } from '../pinia/store.js'
export const firstpage = {

    setup(props,  {emit}) {
        const store = useStateStore()


        function buttons(type) {
            switch(type){
                case 0:
                    $.notify("Выберите точку на карте", { type:"toast" });
                    constructorManager.create(0)
                    break;
                case 1:
                    $.notify("Выберите точку на карте", { type:"toast" });
                    constructorManager.create(1)
                    break;
                case 2:
                    userManager.OpenListPage();
                    break;
                case 3:
                    window.getLogsList()
                    // callSetData(9, );
                    break;
            }
        }
        return{

            store,
            buttons
        }
    },
    template:`
         <div class="items">
            <default-item-table v-if="store.role == 'Модератор'" name="Панель администратора">
                <div class="item-slot item-slot_active" @click="buttons(2)">
                    <div class="item-slot__title">
                        <p>Список пользователей</p>
                    </div>
                </div>
            </default-item-table>
            <default-item-table v-if="store.role == 'Администратор'" name="Панель администратора">
                <div class="item-slot item-slot_active" @click="buttons(0)">
                    <div class="item-slot__title">
                        <p>Добавить объект</p>
                    </div>
                </div>
                <div class="item-slot item-slot_active" @click="buttons(1)">
                    <div class="item-slot__title">
                        <p>Создать канализационную схему</p>
                    </div>
                </div>
                <div class="item-slot item-slot_active" @click="buttons(2)">
                    <div class="item-slot__title">
                        <p>Список пользователей</p>
                    </div>
                </div>
                <div class="item-slot item-slot_active" @click="buttons(3)">
                    <div class="item-slot__title">
                        <p>Логи</p>
                    </div>
                </div>
            </default-item-table>
            <div class="item">
                <div class="item__title">
                    <p>Количество объектов</p>
                    <span>{{store.state.countObj}}</span>
                </div>
            </div>
            <div class="item">
                <div class="item__title">
                    <p>Количество канализационных схем</p>
                    <span>{{store.state.countKl}}</span>
                </div>
            </div>
        </div>
        

    `,
    components: {
        DefaultItemTable
    },

}