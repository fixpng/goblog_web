<template>
  <div class="gvb_login_bg">
    <div class="gvb_login_container">
      <div class="gvb_login_main">
        <div class="gvb_login_head">用户登录</div>
        <div class="gvb_login_form">
          <div class="gvb_login_form_item">
            <a-input placeholder="用户名" v-model:value="data.user_name">
              <template #prefix><i class="fa fa-user-o"></i></template>
            </a-input>
          </div>
          <div class="gvb_login_form_item">
            <a-input type="password" placeholder="密码" v-model:value="data.password">
              <template #prefix><i class="fa fa-key"></i></template>
            </a-input>
          </div>
          <div class="gvb_login_form_item">
            <a-button type="primary" @click="emailLogin">登录</a-button>
          </div>
        </div>
        <div class="gvb_login_other">第三方登录</div>
        <div class="gvb_login_other_icons">
          <img src="../../public/icon/qq_logo.png" @click="getQQLogin" class="gvb_login_other_icon" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {reactive} from "vue";
import {message} from "ant-design-vue";
import {emailLoginApi, getQQLoginLinkApi, qqLoginApi} from "@/api/user_api";
import {ParseToken} from "@/utils/jwt";
import {useStore} from "@/stores/store";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const store = useStore()
const data = reactive({
  user_name: "",
  password: "",
})


// 登录方法
async function emailLogin() {
  if (data.user_name.trim() === "") {
    message.error("请输入用户名")
    return
  }
  if (data.password.trim() === "") {
    message.error("请输入密码")
    return
  }

  let res = await emailLoginApi(data)
  if (res.code) {
    message.error(res.msg)
    return
  }
  // res.data就是jwt
  message.success(res.msg)
  let userInfo = ParseToken(res.data)
  userInfo.token = res.data
  store.serUserInfo(userInfo)

  // 登录成功进行页面跳转
  const redirect_url = route.query.redirect_url
  // 1.直接跳转至一个指定页面
  if (redirect_url === undefined) {
    setTimeout(() => {
      router.push({name: "home"})
    }, 200)
    return
  }
  // 2.跳转到原网页
  setTimeout(() => {
    router.push({path: redirect_url})
  }, 200)
  return
}

async function getQQLogin() {
  let res = await getQQLoginLinkApi()
  if (res.code) {
    message.error(res.msg)
    return
  }
  location.href = res.data
}


async function qqLogin() {
  const query = route.query
  if (query.flag !== 'qq') {
    return
  }

  const code = query.code
  let res = await qqLoginApi(code)
  if (res.code) {
    message.error(res.msg)
    return
  }
    message.success(res.msg)

    let userInfo = ParseToken(res.data)
  userInfo.token = res.data
  store.serUserInfo(userInfo)

  // 登录成功进行页面跳转
  // 0.本地缓存的页面redirect_url
  let redirect_url = localStorage.getItem("redirect_url")
  // 1.为空则跳到home
  if (redirect_url === null){
        setTimeout(() => {
      router.push({name: "home"})
    }, 200)
  }
  // 2.不为空则跳转到原网页，并清空本地缓存
  setTimeout(() => {
    router.push({path: redirect_url})
    localStorage.removeItem("redirect_url")
  }, 200)

}

qqLogin()
</script>

<style lang="scss">
.gvb_login_bg {
  background: url("/images/login_bg_light.jpg") 50%/cover no-repeat;
  width: 100%;
  height: 100vh;

}

.gvb_login_container {
  position: fixed;
  text-align: center;
  border-radius: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 490px;
  height: 303px;
  background-color: rgba(white, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;

  .gvb_login_main {
    width: 70%;

    .gvb_login_head {
      font-size: 20px;
      font-weight: 600;
      color: var(--active);
      text-align: center;
      margin-bottom: 12px;
    }

    .gvb_login_form {
      .gvb_login_form_item {
        margin-bottom: 12px;

        .ant-btn {
          width: 100%;
        }
      }
    }

    .gvb_login_other {

      font-size: 14px;
      color: #666;
      display: flex;
      justify-content: center;
      align-items: center;

      &::before {
        width: 34%;
        height: 1px;
        background-color: #666;
        display: inline-block;
        content: "";
        margin-right: 5px;
      }

      &::after {
        width: 34%;
        height: 1px;
        background-color: #666;
        display: inline-block;
        content: "";
        margin-left: 5px;
      }
    }

    .gvb_login_other_icons {
      margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;

      .gvb_login_other_icon {
        width: 40px;
        height: 40px;
        cursor: pointer;
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

}

</style>