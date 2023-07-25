import {Service} from "@/services/service";


// 群聊聊天记录
export function chatGroupApi(params){
return Service.get("/api/chat_groups_records",{params})
}