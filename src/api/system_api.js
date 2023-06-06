import {Service} from "@/services/service";

export function getSiteInfoApi(){
    return Service.get("/api/settings/site")
}