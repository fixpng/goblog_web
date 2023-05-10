import {Service} from "@/services/service";

export function imageRenameApi(data){
    return Service.put("/api/images",data)
}