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
            <div class="loading-page" v-if="store.state.loading">
                <svg width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"/></svg>
            </div>
        </div>
        

    `,
    components: {
        DefaultItemTable
    },

}