import {logoutApi} from "@/api/user_api";
import {message} from "ant-design-vue";
import router from "@/router"
import {useStore} from "@/stores/store";

// 如果在js里面,直接用router
export async function logoutUtil() {
  const store = useStore()
  let res = await logoutApi()
  store.clear()
  await router.push({name: 'login'})
  if (res.code) {
    message.error(res.msg)
    return
  }
    message.success(res.msg)

}
