import {Service} from "@/services/service"


export function baseListApi(url,params){
    return Service.get(url,{params})

}