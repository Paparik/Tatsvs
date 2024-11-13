class UserManager{
    roles = [
        'Пользователь',
        'Модератор',
        'Администратор',
    ]
    constructor(){
    }

    DeleteUser = async (id) => {
        await apiManager.getData("delete", "./php/api/users/index.php", JSON.stringify([id]));
        this.OpenListPage()
    }

    CreateUser = async (obj) => {
        await apiManager.getData("create", "./php/api/users/index.php", JSON.stringify([obj.username,obj.password, this.roles.indexOf(obj.role)]));
        this.OpenListPage()
    }

    SaveUser = async (obj) => {
        await apiManager.getData("set", "./php/api/users/index.php", JSON.stringify([obj.id,obj.username,obj.password, this.roles.indexOf(obj.role)]));
        this.OpenListPage()
    }

    OpenListPage = async () => {
        let data = await this.GetAllUsers();
        if(data != null){
            window.vueApp.setData(8, data);
        }
    }

    GetAllUsers = async () => {
        let result = await apiManager.getData("getAll", "./php/api/users/index.php");
        switch(result.code){
            case 200:
                return result.data;
            default:
            return null;
        }
    }
}