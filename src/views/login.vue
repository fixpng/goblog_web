<template>
  <div class="gvb_login_bg">
    <a-modal title="用户注册" v-model:visible="userRegisterVisible">
      <div>
        <a-steps :current="step">
          <a-step v-for="item in steps" :key="item.title" :title="item.title">

          </a-step>
        </a-steps>
        <a-form :model="formState"
                name="basic"
                ref="formRef"
                style="margin-top: 30px"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 18 }"
                autocomplete="off">
          <template v-if="step===0">
            <a-form-item label="昵称" name="nick_name" has-feedback
                         :rules="[{ required: true, message: '请输入昵称' }]">
              <a-input v-model:value="formState.nick_name" placeholder="请输入昵称"></a-input>
            </a-form-item>
            <a-form-item label="用户名" name="user_name" has-feedback
                         :rules="[{ required: true, message: '请输入用户名' }]">
              <a-input v-model:value="formState.user_name" placeholder="请输入用户名"></a-input>
            </a-form-item>
            <a-form-item label="邮箱地址" name="email" has-feedback
                         :rules="[{ required: true, message: '请输入邮箱' },{validator:validateEmail,message: '邮箱格式错误',trigger:'blur'}]">
              <a-input v-model:value="formState.email" placeholder="请输入邮箱"></a-input>
            </a-form-item>
          </template>
          <template v-if="step === 1">

            <a-form-item label="密码" name="password" has-feedback
                         :rules="[{ required: true, message: '请输入密码' ,trigger:'blur'}]">
              <a-input-password v-model:value="formState.password" placeholder="密码"/>
            </a-form-item>
            <a-form-item label="确认密码" name="re_password" has-feedback
                         :rules="[{ required: true, message: '请再次确认密码' },{validator:validateRePassword,message: '两次密码不一致',trigger:'blur'}]">
              <a-input-password v-model:value="formState.re_password" placeholder="请再次输入密码"/>
            </a-form-item>
            <a-form-item label="验证码" name="code" has-feedback
                         :rules="[{ required: true, message: '请输入验证码' }]">
              <a-input v-model:value="formState.code" placeholder="请输入验证码"></a-input>
            </a-form-item>
          </template>
        </a-form>
      </div>
      <template #footer>
        <a-button @click="userRegusterCache">取消</a-button>
        <a-button type="primary" v-if="step ===1" @click="step--">上一步</a-button>
        <a-button type="primary" v-if="step ===0" @click="sendEmailCode">下一步</a-button>
        <a-button type="primary" v-if="step ===1" @click="userReguster">完成</a-button>
      </template>

    </a-modal>
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
          <div class="gvb_login_form_item">
            <a-button type="link" @click="userRegisterVisible=true" style="height: 10px;">注册</a-button>
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

import {reactive, ref} from "vue";
import {message} from "ant-design-vue";
import {emailLoginApi, getQQLoginLinkApi, qqLoginApi} from "@/api/user_api";
import {ParseToken} from "@/utils/jwt";
import {useStore} from "@/stores/store";
import {useRoute, useRouter} from "vue-router";

import {userRegisterApi} from "@/api/user_api";

const step = ref(0)
const formRef = ref(null)
const pwdFormRef = ref(null)
const route = useRoute()
const router = useRouter()
const store = useStore()
const data = reactive({
  user_name: "",
  password: "",
})
const userRegisterVisible = ref(false)
const formState = reactive({
  email: "",
  code: "",
  user_name: "",
  nick_name: "",
  password: "",
  re_password:"",
})
const steps = [
  {
    title: "请输入账户信息及邮箱"
  }, {
    title: "请输入账户密码及验证码"
  }
]

function userRegusterCache() {
  step.value = 0
  userRegisterVisible.value = 0
  formState.email = ""
  formState.code = ""
  formState.user_name = ""
  formState.nick_name = ""
  formState.password = ""
  formState.re_password = ""
}


// 邮箱格式校验
let validateEmail = async (_rule, value) => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
    return Promise.resolve();
  }
  return Promise.reject();
};

// 验证密码和确认密码是否一致
let validateRePassword = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password again');
  } else if (value !== formState.password) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};

async function sendEmailCode() {
  try {
    await formRef.value.validate()
  } catch (e) {
    return
  }
  let res = await userRegisterApi({email:formState.email,nick_name:formState.nick_name,user_name:formState.user_name})
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  step.value++
}

async function userReguster() {
  if (formState.password !== formState.re_password) {
    message.error("两次密码不一致！")
    return
  }
  let res = await userRegisterApi(formState)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  step.value = 0
  userRegisterVisible.value = false
}


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
  if (redirect_url === null) {
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
  width: 495px;
  height: 323px;
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