import {Service} from "@/services/service";

export function createMenuApi(data){
    return Service.post("/api/menus",data)
}

export function updateMenuApi(id,data){
    return Service.put("/api/menus/"+id,data)
}

export function getMenuNameListApi(){
    return Service.get("/api/menus/detail")
}