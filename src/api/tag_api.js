import {Service} from "@/services/service";

export function getTagNameListApi (){
    return Service.get("/api/tag_names")
}