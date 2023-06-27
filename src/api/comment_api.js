import {Service} from "@/services/service";

export function commentRemoveApi(id){
    return Service.delete("/api/comments/"+id)
}