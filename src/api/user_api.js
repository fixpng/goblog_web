import {Service} from "@/services/service";

// 邮箱登录接口
export  function emailLoginApi(data){
    return  Service.post("/api/email_login",data)
}

// 用户注销退出,token失效
export  function logoutApi(){
 return Service.post("/api/logout")
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

// 修改用户权限和昵称
export function userUpdateUserRoleApi(data){
    return Service.put("/api/user_role", data)
}


export function getQQLoginLinkApi(){
    return Service.get("/api/qq_login_path")
}

export function qqLoginApi(code){
    return Service.post("/api/login?code="+code)
}