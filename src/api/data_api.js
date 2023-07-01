import {Service} from "@/services/service";

export function getWeekDataApi() {
    /*
    {
      "code": 0,
      "data": {
        "date_list": ["2023-06-25","2023-06-26","2023-06-27","2023-06-28","2023-06-29","2023-06-30","2023-07-01"],
        "login_data": [1,2,3,3,2,0,1],
        "sign_data": [0,0,0,0,0,0,0]
      },
      "msg": "成功"
    }
     */
    return Service.get("/api/data_seven_login")
}


export function getSumDataApi(){
    /*
    {
      "code": 0,
      "data": {
        "user_count": 7,
        "article_count": 5,
        "message_count": 11,
        "chat_group_count": 16,
        "now_login_count": 4,
        "now_sign_count": 0
      },
      "msg": "成功"
    }
    * */
    return Service.get("/api/data_sum")
}