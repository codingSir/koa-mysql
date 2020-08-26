const userService = require('../service/users.service');
const jwt = require('../middlewares/jwt')
const RetResponse = require('../ret/ret.response');
const RetCode = require('../ret/ret.code');

class LoginController {

    static async login(ctx){
        const { body } = ctx.request;
        console.log(body)
        try {
            let user = await userService.findOne({ username: body.username });
            user = user[0];
            if (!user) {
                ctx.status = RetCode.fail;
                ctx.body = RetResponse.makeRspNoData({code:RetCode.fail,message:'用户名错误'});

                return;
            }
            // 匹配密码是否相等
            if (body.password == user.password) {

                ctx.status = RetCode.success;

                ctx.body = {
                    ...RetResponse.makeRsp({code:RetCode.success,message:'登陆成功',data:{
                            token:jwt.getToken({username:user.user_name,password:user.password})
                        }})
                }
            } else {

                ctx.status = RetCode.fail;

                ctx.body = RetResponse.makeRspNoData({code:RetCode.fail,message:'密码错误'});

            }
        } catch (error) {

            ctx.throw(RetCode.internalServerError)

        }

    }

    static async register(ctx){

        const { body } = ctx.request;
        console.log(body)
        try {
            if (!body.username || !body.password) {
                ctx.status = RetCode.fail;
                ctx.body = RetResponse.makeRspNoData({code:RetCode.fail,message:`expected an object with username, password but got: ${body}`})

                return;
            }
            // body.password = await bcrypt.hash(body.password, 5)
            let user = await userService.findOne({ username: body.username });

            console.log(user)
            if (!user.length) {

                await userService.save(body);

                ctx.status = RetCode.success;
                ctx.body = RetResponse.makeRsp({code:RetCode.success, message:'注册成功',data:{
                        ...body,
                        token:jwt.getToken(body)
                    }});

            } else {

                ctx.status = RetCode.NotAcceptable;
                ctx.body = RetResponse.makeRspNoData({code: RetCode.NotAcceptable, message:'用户名已存在'})
            }

        }catch (e) {

            ctx.throw(500)
        }
    }
}


module.exports = LoginController;