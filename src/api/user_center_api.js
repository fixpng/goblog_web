import {Service} from "@/services/service";

export function getUserInfoApi(){
    return Service.get("/api/user_info")
}

export function updateUserInfoApi(data){
    return Service.put("/api/user_info",data)
}

// 绑定邮箱之前发验证码
export function sendEmailCodeApi(email){
    return Service.post("/api/user_bind_email",{email})
}
// 绑定邮箱
export function bindEmailCodeApi(data){
    return Service.post("/api/user_bind_email",data)
}