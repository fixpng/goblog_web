import {Service} from "@/services/service";

// 邮箱登录接口
export  function emailLoginApi(data){
    return  Service.post("/api/email_login",data)
}

// 用户列表
export function userListApi(params){
    return Service.get("/api/users",{params})
}

// 添加用户
export function userCreateApi(params){
    return Service.get("/api/users",{params})
}