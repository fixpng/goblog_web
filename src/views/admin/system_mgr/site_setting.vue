<template>
  <div class="gvb_settings_box">
    <div class="gvb_settings_head">
      网站配置
    </div>
    <div class="gvb_setting_body">
      <a-form
          :model="state"
          name="basic"
          ref="formSiteRef"
          label-align="left"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 21 }"
          autocomplete="off"
      >
        <a-form-item label="网站标题" name="title" has-feedback
                     :rules="[{ required: true, message: '请输入网站标题' ,trigger: 'blur'}]">
          <a-input v-model:value="state.title" placeholder="网站标题"/>
        </a-form-item>
        <a-form-item label="slogan" name="slogan" has-feedback
                     :rules="[{ required: true, message: '请输入slogan' ,trigger: 'blur'}]">
          <a-input v-model:value="state.slogan" placeholder="slogan"/>
        </a-form-item>
        <a-form-item label="英文slogan" name="slogan_en" has-feedback
                     :rules="[{ required: true, message: '请输入英文slogan' ,trigger: 'blur'}]">
          <a-input v-model:value="state.slogan_en" placeholder="英文slogan"/>
        </a-form-item>
        <a-form-item label="备案" name="bei_an" has-feedback
                     :rules="[{ required: true, message: '请输入备案' ,trigger: 'blur'}]">
          <a-input v-model:value="state.bei_an" placeholder="备案"/>
        </a-form-item>
        <a-form-item label="网站版本" name="version" has-feedback
                     :rules="[{ required: true, message: '请输入网站版本' ,trigger: 'blur'}]">
          <a-input v-model:value="state.version" placeholder="网站版本"/>
        </a-form-item>
        <a-form-item label="建站日期" has-feedback>
          <a-date-picker v-model:value="createDate" placeholder="建站日期" allowClear/>
        </a-form-item>
        <a-form-item label="qq" name="qq_image" has-feedback
                     :rules="[{ required: true, message: '请输入qq地址' ,trigger: 'blur'}]">
          <a-input v-model:value="state.qq_image" placeholder="qq"/>
          <a-form-item-rest>
            <a-upload
                name="image"
                list-type="picture-card"
                class="gvb_img_upload"
                :show-upload-list="false"
                action="/api/image"
                :headers="{token: store.userInfo.token}"
                @change="uploadChange($event,'qq')"
            >
              <img :src="state.qq_image" width="90" height="90" style="cursor: pointer" alt="">

            </a-upload>
          </a-form-item-rest>

        </a-form-item>
        <a-form-item label="wechat" name="wechat_image" has-feedback
                     :rules="[{ required: true, message: '请输入wechat图片地址' ,trigger: 'blur'}]">
          <a-input v-model:value="state.wechat_image" placeholder="wechat"/>
          <a-form-item-rest>
            <a-upload
                name="image"
                list-type="picture-card"
                class="gvb_img_upload"
                :show-upload-list="false"
                action="/api/image"
                :headers="{token: store.userInfo.token}"
                @change="uploadChange($event,'wechat')"
            >
              <img :src="state.wechat_image" width="90" height="90" style="cursor: pointer" alt="">
            </a-upload>
          </a-form-item-rest>

        </a-form-item>
      </a-form>
    </div>
    <div class="gvb_settings_head">
      个人信息
    </div>
    <div class="gvb_setting_body">
      <a-form
          :model="state"
          name="basic"
          ref="formMyInfoRef"
          label-align="left"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 21 }"
          autocomplete="off"
      >
        <a-form-item label="昵称" name="name" has-feedback
                     :rules="[{ required: true, message: '请输入昵称' ,trigger: 'blur'}]">
          <a-input v-model:value="state.name" placeholder="昵称"/>
        </a-form-item>
        <a-form-item label="工作" name="job" has-feedback
                     :rules="[{ required: true, message: '请输入工作' ,trigger: 'blur'}]">
          <a-input v-model:value="state.job" placeholder="工作"/>
        </a-form-item>
        <a-form-item label="地址" name="addr" has-feedback
                     :rules="[{ required: true, message: '请输入地址' ,trigger: 'blur'}]">
          <a-input v-model:value="state.addr" placeholder="地址"/>
        </a-form-item>
        <a-form-item label="邮箱" name="email" has-feedback
                     :rules="[{ required: true, message: '请输入邮箱' ,trigger: 'blur'}]">
          <a-input v-model:value="state.email" placeholder="邮箱"/>
        </a-form-item>
      </a-form>
    </div>
    <div class="gvb_settings_head">
      链接信息
    </div>
    <div class="gvb_setting_body">
      <a-form
          :model="state"
          name="basic"
          ref="formLinkRef"
          label-align="left"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 21 }"
          autocomplete="off"
      >
        <a-form-item label="网站地址" name="web" has-feedback
                     :rules="[{ required: true, message: '请输入网站地址' ,trigger: 'blur'}]">
          <a-input v-model:value="state.web" placeholder="网站地址"/>
        </a-form-item>
        <a-form-item label="哔哩哔哩" name="bilibili_url" has-feedback
                     :rules="[{ required: true, message: '请输入哔哩哔哩' ,trigger: 'blur'}]">
          <a-input v-model:value="state.bilibili_url" placeholder="哔哩哔哩"/>
        </a-form-item>
        <a-form-item label="gitee" name="gitee_url" has-feedback
                     :rules="[{ required: true, message: '请输入gitee' ,trigger: 'blur'}]">
          <a-input v-model:value="state.gitee_url" placeholder="gitee"/>
        </a-form-item>
        <a-form-item label="github" name="github_url" has-feedback
                     :rules="[{ required: true, message: '请输入github' ,trigger: 'blur'}]">
          <a-input v-model:value="state.github_url" placeholder="github"/>
        </a-form-item>
      </a-form>
    </div>
    <div class="gb_settings_btn">
      <a-button type="primary" @click="update">修改信息</a-button>

    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import dayjs from "dayjs";
import {getFormatDate} from "@/utils/date"
import {useStore} from "@/stores/store";
import {message} from "ant-design-vue";
import {getSiteInfoApi, updateSiteInfoApi} from "@/api/system_api"

const store = useStore()
const createDate = ref(dayjs('2023-06-06', 'YYYY-MM-DD'))
const formSiteRef = ref(null)
const formMyInfoRef = ref(null)
const formLinkRef = ref(null)

function uploadChange(e, type) {
  if (e.file.status === "done") {
    let res = e.file.response
    if (res.code) {
      message.error(res.error)
      return
    }
    message.success(res.msg)
    if (type === "qq") {
      state.qq_image = res.data
    }
    if (type === 'wechat') {
      state.wechat_image = res.data
    }
  }
}

const state = reactive({
  title: "",
  slogan: "",
  slogan_en: "",
  bei_an: "",
  version: "1.0.0",
  created_at: "",
  qq_image: "",
  wechat_image: "",

  name: "",
  job: "",
  addr: "",
  email: "",

  web: "",
  bilibili_url: "",
  gitee_url: "",
  github_url: ""
})

async function update() {
  //对时间转换
  state.created_at = getFormatDate(createDate.value.toDate())
  let res = await updateSiteInfoApi(state)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  return

}

//获取数据接口
async function getData() {
  let res = await getSiteInfoApi()
  Object.assign(state, res.data)
  createDate.value = dayjs(res.data.created_at, "YYYY-MM-DD")

  try {
    await formSiteRef.value.validate()
    await formMyInfoRef.value.validate()
    await formLinkRef.value.validate()
  } catch (e) {
    return
  }
}

getData()
</script>

<style lang="scss">

.gvb_settings_box {
  margin-top: 20px;
  width: 1000px;
}

.gvb_settings_head {
  margin-top: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  font-weight: 600;

  &::before {
    width: 3px;
    height: 23px;
    display: inline-block;
    content: "";
    margin-right: 6px;
    background-color: var(--active);
  }
}

.gvb_setting_body {
  margin-top: 10px;
}

.gvb_img_upload {
  margin-top: 10px;
}

.gb_settings_btn {
  margin-bottom: 20px;
}


</style>