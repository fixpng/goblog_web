<template>
  <div class="gvb_settings_box">
    <div class="gvb_settings_head">
      七牛云配置
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
        <a-form-item label="access_key" name="access_key" has-feedback
                     :rules="[{ required: true, message: '请输入access_key' ,trigger: 'blur'}]">
          <a-input v-model:value="state.access_key" placeholder="access_key"/>
        </a-form-item>
        <a-form-item label="secret_key" name="secret_key" has-feedback
                     :rules="[{ required: true, message: '请输入secret_key' ,trigger: 'blur'}]">
          <a-input v-model:value="state.secret_key" placeholder="secret_key"/>
        </a-form-item>
        <a-form-item label="存储桶" name="bucket" has-feedback
                     :rules="[{ required: true, message: '请输入存储桶' ,trigger: 'blur'}]">
          <a-input v-model:value="state.bucket" type="password" placeholder="存储桶"/>
        </a-form-item>
        <a-form-item label="访问链接" name="cdn" has-feedback
                     :rules="[{ required: true, message: '请输入cdn' ,trigger: 'blur'}]">
          <a-input v-model:value="state.cdn" placeholder="cdn"/>
        </a-form-item>
        <a-form-item label="地区" name="zone" has-feedback
                     :rules="[{ required: true, message: '请输入zone' ,trigger: 'blur'}]">
          <a-input v-model:value="state.zone" placeholder="zone"/>
        </a-form-item>
        <a-form-item label="前缀" name="prefix" has-feedback
                     :rules="[{ required: true, message: '请输入prefix' ,trigger: 'blur'}]">
          <a-input v-model:value="state.prefix" placeholder="prefix"/>
        </a-form-item>
        <a-form-item label="大小限制" name="size" has-feedback
                     :rules="[{ required: true, message: '请输入size' ,trigger: 'blur'}]">
          <a-input-number v-model:value="state.size" placeholder="size"/>
        </a-form-item>
        <a-form-item label="是否启用" name="enable" >
          <a-switch v-model:checked="state.enable"/>
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
import {getQiniuInfoApi, updateQiniuInfoApi} from "@/api/system_api"


const formRef = ref(null)

const state = reactive({
    enable: false,
    access_key: "",
    secret_key: "",
    bucket: "",
    cdn: "",
    zone: "z2",
    prefix: "",
    size: 5
})

async function update() {
  let res = await updateQiniuInfoApi(state)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  return

}

//获取数据接口
async function getData() {
  let res = await getQiniuInfoApi()
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