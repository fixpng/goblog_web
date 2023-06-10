import {Service} from "@/services/service";

export function getCategoryListApi(){
    return Service.get("/api/categorys")
}