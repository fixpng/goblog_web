<template>
  <div class="gvb_settings_bg">
    <div class="gvb_settings_box">
      <div class="gvb_settings_head">
        网站配置
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
          <a-form-item label="建站日期"  has-feedback>
            <a-date-picker v-model:value="createDate" placeholder="建站日期" allowClear/>
          </a-form-item>
          <a-form-item label="qq" name="qq_image" has-feedback
                       :rules="[{ required: true, message: '请输入qq地址' ,trigger: 'blur'}]">
            <a-input v-model:value="state.qq_image" placeholder="qq"/>
            
            <img src="state.qq_image" width="90" height="90" style="margin-top: 10px;cursor: pointer" alt="">
            
          </a-form-item>
          <a-form-item label="wechat" name="wechat_image" has-feedback
                       :rules="[{ required: true, message: '请输入wechat图片地址' ,trigger: 'blur'}]">
            <a-input v-model:value="state.wechat_image" placeholder="wechat"/>

             <img src="state.wechat_image" width="90" height="90" style="margin-top: 10px;cursor: pointer" alt="">

          </a-form-item>
        </a-form>
      </div>

      <div class="gb_settings_btn">
        <a-button type="primary" @click="update">修改信息</a-button>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import dayjs from "dayjs";
import {getFormatDate} from "@/utils/date"

const createDate=ref(dayjs('2023-06-06','YYYY-MM-DD'))

const state = reactive({
  "title": "FixPng个人博客",
  "slogan": "倪半仙",
  "slogan_en": "FIXPNG",
  "bei_an": "粤ICP备2021010654号-3",
  "version": "1.0.0",
  created_at: "",
  "qq_image": "http://www.fixpng.com/static/my/img/footer/qq.png",
  "wechat_image": "http://www.fixpng.com/static/my/img/footer/wechat.png",

  "name": "FixPng",
  "job": "运维开发",
  "addr": "广东广州",
  "email": "897491068@qq.com",

  "web": "http://www.fixpng.com/",
  "bilibili_url": "https://space.bilibili.com/359151217",
  "gitee_url": "https://gitee.com/fixpng",
  "github_url": "https://github.com/fixpng/"
})

function update() {
  //对时间转换
  state.created_at=getFormatDate(createDate.value.toDate())
  console.log()
}

</script>

<style lang="scss">
.gvb_settings_bg {
  background-color: var(--card_bg);
  min-height: calc(100vh - 130px);
  border-radius: 5px;
  display: flex;
  justify-content: center;

  .gvb_settings_box {
    margin-top: 20px;
    width: 1000px;
  }

  .gvb_settings_head {
    font-size: 18px;
    display: flex;
    align-items: center;

    &::before {
      width: 4px;
      height: 23px;
      display: inline-block;
      content: "";
      margin-right: 5px;
      background-color: var(--active);
    }
  }

  .gvb_setting_body {
    margin-top: 10px;
  }
}

</style>