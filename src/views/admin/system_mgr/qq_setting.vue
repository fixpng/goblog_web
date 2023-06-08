<template>
  <div class="gvb_settings_box">
    <div class="gvb_settings_head">
      QQ登录配置
    </div>
    <div class="gvb_setting_body">
      <a-form
          :model="state"
          name="basic"
          ref="formRef"
          label-align="left"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 21 }"
          autocomplete="off"
      >
        <a-form-item label="appID" name="app_id" has-feedback
                     :rules="[{ required: true, message: '请输入appID' ,trigger: 'blur'}]">
          <a-input v-model:value="state.app_id" placeholder="appID"/>
        </a-form-item>
        <a-form-item label="key" name="key" has-feedback
                     :rules="[{ required: true, message: '请输入key' ,trigger: 'blur'}]">
          <a-input v-model:value="state.key" placeholder="key"/>
        </a-form-item>
        <a-form-item label="回调地址" name="redirect" has-feedback
                     :rules="[{ required: true, message: '请输入回调地址' ,trigger: 'blur'}]">
          <a-input v-model:value="state.redirect" placeholder="回调地址"/>
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
import {message} from "ant-design-vue";
import {getQQInfoApi,updateQQInfoApi} from "@/api/system_api"


const formRef = ref(null)

const state = reactive({
    app_id: "",
    key: "",
    redirect: ""
})

async function update() {
  let res = await updateQQInfoApi(state)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  return

}

//获取数据接口
async function getData() {
  let res = await getQQInfoApi()
  Object.assign(state, res.data)

  try {
    await formRef.value.validate()
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