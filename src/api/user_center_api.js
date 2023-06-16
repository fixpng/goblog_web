import {Service} from "@/services/service";

export function getUserInfoApi(){
    return Service.get("/api/user_info")
}

export function updateUserInfoApi(data){
    return Service.put("/api/user_info",data)
}