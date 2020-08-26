class RetResult {

    code = '';

    msg = '';

    data = null;

    setCode(code){
        this.code = code;
        return this;
    }

    setMsg(msg){
        this.msg = msg;
        return this;
    }

    setData(data){
        this.data = data;
        return this;
    }
}

module.exports = RetResult;