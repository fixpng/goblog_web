import {Service} from "@/services/service";

export  function emailLoginApi(data){
    return  Service.post("/api/email_login",data)
}