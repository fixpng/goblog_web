<template>
  <div class="gvb_user_info_bg">
    <a-modal title="绑定邮箱" v-model:visible="bindEmailVisible">
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
            <a-form-item label="邮箱地址" name="email" has-feedback
                     :rules="[{ required: true, message: '请输入邮箱' },{validator:validateEmail,message: '邮箱格式错误',trigger:'blur'}]">
              <a-input v-model:value="formState.email" placeholder="请输入邮箱"></a-input>
            </a-form-item>
          </template>
          <template v-if="step === 1">
            <a-form-item label="密码">
              <a-input v-model:value="formState.password" placeholder="请输入密码"></a-input>
            </a-form-item>
        <a-form-item label="确认密码" name="re_password" has-feedback
                     :rules="[{ required: true, message: '请再次确认密码' },{validator:validateRePassword,message: '两次密码不一致',trigger:'blur'}]">
          <a-input-password v-model:value="formState.re_password" placeholder="确认密码"/>
        </a-form-item>
            <a-form-item label="验证码">
              <a-input v-model:value="formState.code" placeholder="请输入验证码"></a-input>
            </a-form-item>
          </template>
        </a-form>
      </div>
      <template #footer>
        <a-button @click="bindEmailCache">取消</a-button>
        <a-button type="primary" v-if="step ===1" @click="step--">上一步</a-button>
        <a-button type="primary" v-if="step ===0" @click="sendEmailCode">下一步</a-button>
        <a-button type="primary" v-if="step ===1" @click="bindEmail">完成</a-button>
      </template>

    </a-modal>


    <div class="gvb_user_info_view">
      <div class="user_head">
        个人信息
      </div>
      <div class="body user_info_view">
        <a-form :label-col="{ span: 2 }"
                :wrapper-col="{ span: 22 }">
          <a-form-item label="昵称">
            <a-input @blur="updateUserInfo('nick_name')" label="昵称"
                     :rules="[{ required: true, message: '请输入头像地址' ,trigger: 'blur'}]"
                     placeholder="昵称" v-model:value="userInfo.nick_name"
                     class="user_ipt"></a-input>
          </a-form-item>
          <a-form-item label="头像">
            <a-input @blur="updateUserInfo('avatar')" placeholder="头像" v-model:value="userInfo.avatar"
                     class="user_ipt"></a-input>
          </a-form-item>
          <a-form-item label="头像预览">
            <img :src="userInfo.avatar" height="60" style="border-radius: 5px" alt="">
          </a-form-item>
          <a-form-item label="我的签名">
            <a-textarea @blur="updateUserInfo('sign')" placeholder="我的签名" v-model:value="userInfo.sign"
                        class="user_ipt" :auto-size="{ minRows: 2, maxRows: 5 }"></a-textarea>
          </a-form-item>
          <a-form-item label="我的博客">
            <a-input @blur="updateUserInfo('link')" placeholder="我的博客" v-model:value="userInfo.link"
                     class="user_ipt"></a-input>
          </a-form-item>
          <a-form-item label="邮箱">
            <span>{{ userInfo.email }}</span>
          </a-form-item>
          <a-form-item label="现地址">
            <span>{{ userInfo.addr }}</span>
          </a-form-item>
          <a-form-item label="当前角色">
            <span>{{ userInfo.role }}</span>
          </a-form-item>
          <a-form-item label="注册来源">
            <span>{{ userInfo.sign_status }}</span>
          </a-form-item>
          <a-form-item label="我的积分">
            <span>{{ userInfo.integral }}</span>
          </a-form-item>
        </a-form>
      </div>
      <div class="user_head">
        每日奖励
      </div>
      <div class="body daily_reward">
        <div>
          <img src="../../../assets/icon/ok.svg" alt="">
          每日登陆 +2
        </div>
        <div>
          <img src="../../../assets/icon/ok.svg" alt="">
          发文 +3
        </div>
        <div>
          <img src="../../../assets/icon/ok.svg" alt="">
          发评论 +1
        </div>
        <div>
          <img src="../../../assets/icon/error.svg" alt="">
          群聊 +0.5
        </div>
      </div>
      <div class="user_head">
        成就勋章
      </div>
      <ul class="body medal">
        <li>
          <img src="https://i0.hdslb.com/bfs/face/21fdd1bcd9ad1b52d5725026d71c185a68681644.png" alt="">
          <div class="name">初来乍到</div>
        </li>
        <li>
          <img src="https://i0.hdslb.com/bfs/face/51ca16136e570938450bca360f28761ceb609f33.png" alt="">
          <div class="name">有爱萌新</div>
        </li>
        <li>
          <img src="https://i0.hdslb.com/bfs/face/89491e6cee3b1c88292b618a58703ab614665f66.png" alt="">
          <div class="name">老司机</div>
        </li>
      </ul>


      <div class="user_head">
        操作
      </div>
      <div class="body actions">
        <a-button type="primary" @click="bindEmailVisible=true">绑定邮箱</a-button>
        <a-button type="primary">修改密码</a-button>
        <a-button type="danger">注销退出</a-button>
      </div>


    </div>
  </div>
</template>

<script setup>

import {reactive, ref} from "vue";
import {getUserInfoApi, updateUserInfoApi,sendEmailCodeApi,bindEmailCodeApi} from "@/api/user_center_api";
import {message} from "ant-design-vue";

const userInfo = reactive({
  addr: "",
  avatar: "",
  email: "",
  integral: 0,
  link: "",
  nick_name: "",
  role: "",
  sign: "",
  sign_status: ""
})
const state = reactive({
  avatar: "",
  link: "",
  nick_name: "",
  sign: "",
})

const formState = reactive({
  email: "",
  password: "",
  code: ""
})

const steps = [
  {
    title: "请输入邮箱"
  }, {
    title: "请输入验证码"
  }
]
const step = ref(0)

const bindEmailVisible = ref(false)
const updatePasswordVisible = ref(false)
const formRef = ref(null)

function bindEmailCache(){
  step.value =0
  bindEmailVisible.value=0
  formState.email=""
  formState.password=""
  formState.code=""
}



// 验证密码和确认密码是否一致
let validateEmail = async (_rule, value) => {
   if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)){
    return Promise.resolve();
  }
    return Promise.reject();
};

async function getData() {
  let res = await getUserInfoApi()
  Object.assign(userInfo, res.data)
  state.avatar = res.data.avatar
  state.link = res.data.link
  state.nick_name = res.data.nick_name
  state.sign = res.data.sign
}

getData()

async function updateUserInfo(column) {
  const val = userInfo[column]
  const oldVal = state[column]
  if (val === oldVal) {
    return
  }
  const data = {}
  data[column] = val
  let res = await updateUserInfoApi(data)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  return
}

async function sendEmailCode(){
  try {
    await formRef.value.validate()
  }catch (e) {
    return
  }
 let res = await sendEmailCodeApi(formState.email)
    if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  step.value ++
}
async function bindEmail(){
 let res = await bindEmailCodeApi(formState)
    if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  step.value = 0
  bindEmailVisible =false
}


</script>

<style lang="scss">
.gvb_user_info_bg {
  background-color: var(--card_bg);
  display: flex;
  justify-content: center;
  padding: 20px;

  .gvb_user_info_view {
    width: 1000px;
  }

  .user_head {
    font-size: 18px;
    display: flex;
    align-items: center;
    font-weight: 600;
    margin-bottom: 10px;

    &::before {
      width: 3px;
      height: 1.5rem;
      display: inline-block;
      content: "";
      margin-right: 5px;
      background-color: var(--active);
    }
  }

  .body {
    margin-bottom: 20px;
  }

  .user_info_view {
    .ant-form-item {
      margin: 0 0 5px;
    }

    .user_ipt {
      width: 400px;
    }
  }

  .actions {

    .ant-btn {
      margin-right: 10px;
    }
  }

  .medal {
    display: flex;
    flex-wrap: wrap;

    li {
      margin-right: 20px;

      .name {
        text-align: center;
      }

      &:last-child {
        margin-right: 0;
      }

      img {
        width: 60px;
        height: 60px;
      }
    }
  }

  .daily_reward {
    display: flex;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 50px;
    }

    img {
      width: 60px;
      height: 60px;
    }
  }


}
</style>