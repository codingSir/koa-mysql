const RetResult  = require('./ret.result');
const RetCode = require('./ret.code')

class RetResponse {

    static successMsg = '成功';

    static makeOkRsp() {
        return new RetResult().setCode(RetCode.success).setMsg(RetResponse.successMsg);
    }

    static makeOkRspByData(data){
        return new RetResult().setCode(RetCode.success).setMsg(RetResponse.successMsg).setData(data);
    }

    static makeErrRsp(message){
        return new RetResult().setCode(RetCode.fail).setMsg(message);
    }

    static makeRspNoData({code,message}){
        return new RetResult().setCode(code).setMsg(message);
    }

    static makeRsp({code, message, data}){
        return new RetResult().setCode(code).setMsg(message).setData(data);
    }
}
module.exports = RetResponse;