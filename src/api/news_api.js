import {Service} from "@/services/service";

export function getNewsApi(id,size=1,headers){
    return Service.post("/api/news",{id,size},{headers:headers})
}
