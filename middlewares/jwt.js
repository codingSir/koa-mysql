const koaJwt = require('koa-jwt');
const koaCors = require('koa2-cors')
const jwt  = require('jsonwebtoken');

const secert = 'jwt_secret';

const cors = async function (app) {
    await app.use(koaCors({
        origin: function(ctx) {
            return '*';
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'authorization', 'Accept'],
    }))
};
const jwtKoa= async function (app) {
    await app.use(koaJwt({
        secert,
    }).unless({
        path: [/\/register/, '/login'],
    }))
};

/* 获取一个期限为4小时的token */
function getToken(payload = {}) {
    console.log(payload)
    return jwt.sign(payload, secert, { expiresIn: '4h' });
}

/* 通过token获取JWT的payload部分 */
function getJWTPayload(token) {
    // 验证并解析JWT
    return jwt.verify(token.split(' ')[1], secert);
}

async function verToken(ctx,next){
    let token = ctx.headers.authorization;
    if(token == undefined){

        await next()
    }else{
        let data = getJWTPayload(token);
        ctx.state = {
            data
        }
    }
}

exports.cors = cors;
exports.jwtKoa = jwtKoa;
exports.verToken = verToken;
exports.getToken = getToken;
exports.getJWTPayload = getJWTPayload;