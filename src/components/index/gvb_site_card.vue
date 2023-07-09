<template>

  <GVBCCard title="站点信息" class="site_card">
    <div><b>建站时间</b><span>2026年12月06日</span></div>
    <div><b>网站程序</b><span>Vue3+Gin</span></div>
    <div><b>运行时间</b><span>106天15时1分24秒</span></div>
    <div><b>总访问量</b><span>856235</span></div>
    <div><b>博客文章</b><span>17</span></div>
    <div>
      <b>联系我</b>
      <div class="my_image">
        <div class="qq_image">
          <img src="http://www.fixpng.com/static/my/img/footer/qq.png" alt="">
          <span>我的QQ</span>
        </div>
        <div class="wechat_image">
          <img src="http://www.fixpng.com/static/my/img/footer/wechat.png" alt="">
          <span>我的微信</span>
        </div>
      </div>

    </div>
  </GVBCCard>
</template>

<script setup>
import GVBCCard from "@/components/gvb_card.vue"
import {reactive} from "vue";

const data = reactive({
  date: "",
  look_count: 2003412,
  article_count: 45,
  qq_url: "",
  wechat_url: ""
})

</script>

<style lang="scss">
.site_card {
  .body {
    > div {
      font-size: 16px;
      margin-bottom: 8px;

      b {
        margin-right: 5px;

        &::after {
          content: ":";
        }
      }
    }

    .my_image {
      display: flex;
      margin-top: 10px;
      justify-content: space-around;

      > div {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
}
</style>