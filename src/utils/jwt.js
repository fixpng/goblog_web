

export function ParseToken(token){
    let payload = token.split(".")[1]
    // 不加escape()的话，中文会解析异常，escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。
    let userInfo = JSON.parse(decodeURIComponent(escape(window.atob(payload.replace(/-/g,"+").replace(/_/g,"/")))))
    return userInfo
}