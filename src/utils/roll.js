// 滚动的位置
export function roll(top){
    let timer = null
    timer = setInterval(() => {
      let newTop = document.documentElement.scrollTop
      if (newTop >= top) {
        // console.log("清除定时器")
        clearInterval(timer)
        return
      }
      document.documentElement.scrollTop += 20
    }, 5)
}