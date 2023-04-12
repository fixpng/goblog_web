

export function ParseToken(token){
    let payload = token.split(".")[1]
    let userInfo = JSON.parse(decodeURIComponent(window.atob(payload.replace(/-/g,"+").replace(/_/g,"/"))))
    return userInfo
}