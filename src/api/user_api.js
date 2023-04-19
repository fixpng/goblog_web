import {Service} from "@/services/service";

// 邮箱登录接口
export  function emailLoginApi(data){
    return  Service.post("/api/email_login",data)
}

// 用户列表
export function userListApi(params){
    return Service.get("/api/users",{params})
}

// 创建用户
export function userCreateApi(data){
    return Service.post("/api/users",data)
}

// 删除用户 参数是用户的id列表
export function userRemoveBatchApi(id_list){
    return Service.delete("/api/users", {data:{id_list}})
}