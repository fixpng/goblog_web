import {Service} from "@/services/service";

export function getSiteInfoApi(){
    return Service.get("/api/settings/site")
}

export function updateSiteInfoApi(data){
    return Service.put("/api/settings/site",data)
}


export function getEmailInfoApi(){
    return Service.get("/api/settings/email")
}

export function updateEmailInfoApi(data){
    return Service.put("/api/settings/email",data)
}


export function getQiniuInfoApi(){
    return Service.get("/api/settings/qiniu")
}

export function updateQiniuInfoApi(data){
    return Service.put("/api/settings/qiniu",data)
}

export function getQQInfoApi(){
    return Service.get("/api/settings/qq")
}

export function updateQQInfoApi(data){
    return Service.put("/api/settings/qq",data)
}

export function getJwtInfoApi(){
    return Service.get("/api/settings/jwt")
}

export function updateJwtInfoApi(data){
    return Service.put("/api/settings/jwt",data)
}