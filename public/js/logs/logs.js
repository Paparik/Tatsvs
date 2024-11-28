import { useStateStore } from '../pinia/store.js'

export const logslist = {
    // props:{
    //     logs: {
    //         type: Array
    //     },
    // },
    setup(props,{emit}){
        
        const store = useStateStore()
        
        function exit(){
            store.state.mainType=0
        }

        function GetDate(log){
            let a = log["date"].split('.')[0];
            const date = new Date(a.replace(' ', 'T'))
            const time = date.toTimeString().split(' ')[0];
            const formattedDate = date.toISOString().split('T')[0];
            return`${time} ${formattedDate}`;
        }

        return{ 
            store,
            exit,
            GetDate,
            logs: store.state.logs,
        }
    },
    template:`
        <div class="container" >
            <div class="users-list logs">
                <div class="item__title">
                    <p>Список логов</p>
                    <div class="users-list__buttons">                           
                        <button @click="exit" class="constructor__button">
                            Назад
                        </button>
                    </div>
                </div>
                <div class="users-list__items">
                    <div class="users-list__item" v-for="(log,indx) in logs">
                        <div class="users-list__itemButtons">
                            <div class="users-list__role" style="background-color:rgba(0, 102, 255, 0.616); color: #fff">
                                {{GetDate(log.date)}}
                            </div>
                            <div class="users-list__role">
                                {{log.ip}}
                            </div>
                            <div class="users-list__role">
                                {{log.type}}
                            </div>
                            <div class="users-list__role">
                                Логин: {{log.login}}
                            </div>
                            <div class="users-list__role">
                                {{log.text}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}