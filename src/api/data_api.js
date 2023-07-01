import {Service} from "@/services/service";

export function getWeekDataApi(){

    /*{
    "date_list": ["2023-06-25","2023-06-26","2023-06-27","2023-06-28","2023-06-29","2023-06-30","2023-07-01"],
    "login_data": [1,2,3,3,2,0,1],
    "sign_data": [0,0,0,0,0,0,0]
  }
    * */
    return Service.get("/api/data_seven_login")
}