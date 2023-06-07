import {Service} from "@/services/service";

export function getSiteInfoApi(){
    return Service.get("/api/settings/site")
}

export function updateSiteInfoApi(data){
    return Service.put("/api/settings/site",data)
}