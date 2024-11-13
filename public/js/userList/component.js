import { ref   } from 'vue'

export const userlist = {
    props:{
        users: {
            type: Array
        },
        newuser: {
            type: Object
        }
    },
    setup(props,{emit}){
        let newuserActive = ref(false)
        let editActive = ref(false)
        let passwordConfirm = ref('')
        let roles = [
            'Пользователь',
            'Модератор',
            'Администратор',
        ]

        function closeModel(){
            this.newuserActive = false

            props.newuser.id = ""
            props.newuser.username = ""
            props.newuser.password = ""
            props.newuser.role = ""

            this.editActive=false
        }

        function openEditUser(indx){
            this.editActive=true
            this.newuserActive = true
            props.newuser.id = props.users[indx].id
            props.newuser.username = props.users[indx].username
            props.newuser.password = props.users[indx].password
            props.newuser.role = roles[props.users[indx].role]
        }

        function buttons(type){
            switch (type) {
                case 0: // Добавить пользователя
                    if (props.newuser.password!= this.passwordConfirm){
                        $.notify("Введите корректные данные", { type:"toast" });
                        return;
                    }
                    if(props.users.find(x => x.username == props.newuser.username) != null){
                        $.notify("Пользователь с таким логином уже существует", { type:"toast" });
                        return;
                    }
                    if(props.newuser.username == "" || props.newuser.username == " " || props.newuser.password == "" || props.newuser.password == " "){
                        $.notify("Введите корректные данные", { type:"toast" });
                        return;
                    }
                    if(props.newuser.role == ""){
                        $.notify("Выберите роль", { type:"toast" });
                        return;
                    }
                    $.notify("Пользователь создан", { type:"toast" });
                    userManager.CreateUser(props.newuser);
                    this.closeModel();
                    break;
                case 1: // Отредактировать
                    $.notify("Данные обновлены", { type:"toast" });
                    userManager.SaveUser(props.newuser);
                    this.closeModel();
                    break;
                case 2: // Удалить
                    $.notify("Пользователь удалён", { type:"toast" });
                    userManager.DeleteUser(props.newuser.id);
                    this.closeModel();
                    break;
            }
        }

        function exit(){
            emit('back-to-main')
        }


        return{ 
            exit,
            newuserActive,
            closeModel,
            roles,
            buttons,
            openEditUser,
            editActive,
            passwordConfirm

        }
    },
    template:`
        <div class="container" >
            <div class="users-list">
                <div class="item__title " >
                    <p>Список пользователей</p>
                    <div class="users-list__buttons">
                        <button @click="newuserActive=true" class="constructor__button">
                            Добавить
                        </button>                             
                        <button @click="exit" class="constructor__button">
                            Назад
                        </button>          
                    </div>
                </div>
                <div class="users-list__items">
                    <div class="users-list__item" v-for="(user,indx) in users">
                        <div class="users-list__name">
                            {{user.username}}
                        </div>
                        <div class="users-list__itemButtons">
                            <button class="users-list__button" @click="openEditUser(indx)">
                                Редактировать
                            </button>
                            <div class="users-list__role">
                                {{roles[user.role]}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="users-add" v-if="newuserActive">
                    <div class="users-add__container">
                        <div v-if="!editActive" class="users-add__title">
                            Добавить пользователя 
                        </div>
                        <div v-if="editActive" class="users-add__title">
                            Редактировать 
                        </div>
                        <div class="users-add__input">
                            <input v-model="newuser.username" type="text" placeholder="Логин">
                        </div>
                        <div class="users-add__input" title="Оставьте поле пустым, если не хотите менять пароль">
                            <input v-model="newuser.password" type="password" placeholder="Пароль">
                        </div>
                        <p style="margin: -10px 0 10px 0;text-align: center;">Оставьте поле пустым, если не хотите менять пароль</p>
                        <div v-if="!editActive" class="users-add__input" >
                            <input v-model="passwordConfirm" type="password" placeholder="Подтвердите пароль">
                        </div>
                        <div class="table__item">
                            <div class="table__title">
                                <p>Роль:</p>
                                <div class="slider">
                                    <div class="slider__title" onclick="openSliderConstructor(this)">
                                        <p style="font-size: 20px;">
                                        {{newuser.role=='' ? 'Выбрать' : newuser.role}}
                                        </p>
                                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#6B6B6B"/>
                                        </svg>                                                    
                                    </div>
                                    <div class="slider__items">
                                        <div class="slider__item" onclick="closeSliderConstructor(this)" @click="newuser.role = item" v-for="item in roles">{{item}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="users-add__buttons">
                            <div class="button" v-if="!editActive" @click="buttons(0)">
                                Создать
                            </div>
                            <div class="button" v-if="editActive" @click="buttons(1)">
                                Сохранить
                            </div>
                            <div class="button" v-if="editActive" @click="buttons(2)">
                                Удалить пользователя
                            </div>
                            <div class="button" @click="closeModel()">
                                Отменить
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}