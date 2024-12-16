import { ref } from 'vue'
import { useStateStore } from '../pinia/store.js'
import { useRouter } from 'vue-router'
export const userlist = {
    setup(){
        const store = useStateStore()   
        const router = useRouter();

        const users = store.userList
        const newuser = store.newUser


        let newuserActive = ref(false)
        let editActive = ref(false)
        let passwordConfirm = ref('')
        let roles = [
            'Пользователь',
            'Модератор',
            'Администратор',
        ]

        function closeModel(){
            newuserActive.value = false

            newuser.id = ""
            newuser.username = ""
            newuser.password = ""
            newuser.role = ""

            editActive.value=false
        }

        function openEditUser(indx){
            editActive.value=true
            newuserActive.value = true
            newuser.id = users[indx].id
            newuser.username = users[indx].username
            newuser.password = users[indx].password
            newuser.role = roles[users[indx].role]
        }

        function buttons(type){
            switch (type) {
                case 0: // Добавить пользователя
                    if (newuser.password!= this.passwordConfirm){
                        $.notify("Введите корректные данные", { type:"toast" });
                        return;
                    }
                    if(users.find(x => x.username == newuser.username) != null){
                        $.notify("Пользователь с таким логином уже существует", { type:"toast" });
                        return;
                    }
                    if(newuser.username == "" || newuser.username == " " || newuser.password == "" || newuser.password == " "){
                        $.notify("Введите корректные данные", { type:"toast" });
                        return;
                    }
                    if(newuser.role == ""){
                        $.notify("Выберите роль", { type:"toast" });
                        return;
                    }
                    $.notify("Пользователь создан", { type:"toast" });
                    userManager.CreateUser(newuser);
                    this.closeModel();
                    break;
                case 1: // Отредактировать
                    $.notify("Данные обновлены", { type:"toast" });
                    userManager.SaveUser(newuser);
                    this.closeModel();
                    break;
                case 2: // Удалить
                    $.notify("Пользователь удалён", { type:"toast" });
                    userManager.DeleteUser(newuser.id);
                    this.closeModel();
                    break;
            }
        }

        function exit(){
            store.state.mainType=0
            router.back()
        }


        return{ 
            exit,
            newuserActive,
            closeModel,
            roles,
            buttons,
            openEditUser,
            editActive,
            passwordConfirm,
            users,
            newuser,
            store

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
                        <p v-if="editActive" style="margin: -10px 0 10px 0;text-align: center;">Оставьте поле пустым, если не хотите менять пароль</p>
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