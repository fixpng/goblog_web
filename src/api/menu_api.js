import {Service} from "@/services/service";

export function createMenuApi(data){
    return Service.post("/api/menus",data)
}

export function updateMenuApi(id,data){
    return Service.put("/api/menus/"+id,data)
}