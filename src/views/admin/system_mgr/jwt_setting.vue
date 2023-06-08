<template>
  <div class="gvb_settings_box">
    <div class="gvb_settings_head">
      Jwt配置
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
        <a-form-item label="secret" name="secret" has-feedback
                     :rules="[{ required: true, message: '请输入secret' ,trigger: 'blur'}]">
          <a-input v-model:value="state.secret" placeholder="secret"/>
        </a-form-item>
        <a-form-item label="过期时间" name="expires" has-feedback
                     :rules="[{ required: true, message: '请输入过期时间' ,trigger: 'blur'}]">
          <a-input-number v-model:value="state.expires" placeholder="过期时间"/>
        </a-form-item>
        <a-form-item label="签发人" name="issuer" has-feedback
                     :rules="[{ required: true, message: '请输入签发人' ,trigger: 'blur'}]">
          <a-input v-model:value="state.issuer" placeholder="签发人"/>
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
import {getJwtInfoApi,updateJwtInfoApi} from "@/api/system_api"


const formRef = ref(null)

const state = reactive({
    secret: "",
    expires: 1,
    issuer: ""
})

async function update() {
  let res = await updateJwtInfoApi(state)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  return

}

//获取数据接口
async function getData() {
  let res = await getJwtInfoApi()
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