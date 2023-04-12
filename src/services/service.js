import axios from "axios";

// 响应中间件
export const Service = axios.create({
    timeout: 7000, // 超时响应时间7s
    baseURL: "", // 请求前缀
    headers: {
        "Content-Type": "application/json"
    }
})

// 请求中间件
Service.interceptors.request.use(request => {
    // 一般用于添加用户的token
    return request
})

Service.interceptors.response.use(response => {
    return response.data
})