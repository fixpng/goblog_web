// 当前时间转化为标准格式
export function getFormatDateTime(dateStr) {
    let date = new Date(dateStr);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    month = (month<10)? '0'+ month : month;
    day = (day<10)? '0'+ day : day;
    hour = (hour<10)? '0'+ hour : hour;
    minutes = (minutes<10)? '0'+ minutes : minutes;
    seconds = (seconds<10)? '0'+ seconds : seconds;
    let currentDate = year + "-" + month + "-" + day
            + " " + hour + ":" + minutes + ":" + seconds;
    return currentDate;
}


export function getFormatDate(dateStr) {
    let date = new Date(dateStr);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = (month<10)? '0'+ month : month;
    day = (day<10)? '0'+ day : day;
    let currentDate = year + "-" + month + "-" + day
    return currentDate;
}
