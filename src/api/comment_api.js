import {Service} from "@/services/service";

export function commentRemoveApi(id){
    return Service.delete("/api/comments/"+id)
}

export function commentCreateApi(data){
    return Service.post("/api/comments/",data)
}

export function getArticleCommentListApi(id){
    return Service.get("/api/comments/"+id)
}
