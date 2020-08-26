

class usersModel {

    id = '';

    user_name = '';

    password = '';

    constructor({id, userName, password}){

        this.id = id;

        this.user_name = userName;

        this.password = password;
    }
}

module.exports = usersModel;