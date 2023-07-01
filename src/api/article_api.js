import {Service} from "@/services/service";

export function getCategoryListApi(){
    return Service.get("/api/categorys")
}

export function createArticleApi(data){
    return Service.post("/api/articles",data)
}

export function updateArticleApi(id,data){
    data.id=id
    return Service.put("/api/articles",data)
}


export function getArticleContentApi(id){
    return Service.get("/api/articles/content/"+id)
}

export function getArticleIDTitle(){
    return Service.get("/api/article_id_title")
}

export function getArticleCalendarApi() {
    return Service.get("/api/articles/calendar")
}