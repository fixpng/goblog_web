import {Service} from "@/services/service"

export function baseListApi(api,params){
    return Service.get(url,{params})

}