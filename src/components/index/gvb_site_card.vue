<template>

  <GVBCCard title="站点信息" class="site_card">
    <div><b>建站时间</b><span>{{ getFormatDate(store.siteInfo.created_at, 'zh') }}</span></div>
    <div><b>网站程序</b><span>Vue3+Gin</span></div>
    <div><b>运行时间</b><span>{{ data.diffDate }}</span></div>
    <div><b>总访问量</b><span>12345</span></div>
    <div><b>博客文章</b><span>{{ data.article_count }}</span></div>
<!--    <div>-->
<!--      <b>联系我</b>-->
<!--      <div class="my_image">-->
<!--        <div class="qq_image">-->
<!--          <img :src="store.siteInfo.qq_image" alt="">-->
<!--          <span>我的QQ</span>-->
<!--        </div>-->
<!--        <div class="wechat_image">-->
<!--          <img :src="store.siteInfo.wechat_image" alt="">-->
<!--          <span>我的微信</span>-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->
  </GVBCCard>
</template>

<script setup>
import GVBCCard from "@/components/gvb_card.vue"
import {reactive} from "vue";
import {useStore} from "@/stores/store";
import {getFormatDate} from "@/utils/date";
import {onMounted} from "vue";
import {getSumDataApi} from "@/api/data_api";

const store = useStore()
store.loadSiteInfo()
const data = reactive({
  date: "",
  look_count: 2003412,
  article_count: 45,
  qq_url: "",
  wechat_url: "",
  diffDate: ""
})

// 动态获取一个时间戳距离现在的年月日时分秒
function getTimeStamp() {
  let date = store.siteInfo.created_at
  let oldDate = new Date(date).getTime()
  let newDate = new Date().getTime()
  let _day = (newDate - oldDate) / 1000 / (60 * 60 * 24)
  let day = parseInt(_day)
  let h = parseInt((_day - day) * 24)
  let m = parseInt((_day - day - h / 24) * 24 * 60)
  let s = parseInt((_day - day - h / 24 - m / 24 / 60) * 24 * 60 * 60)
  data.diffDate = `${day}天${h}时${m}分${s}秒`
}

async function getData() {
  let res = await getSumDataApi()
  data.article_count = res.data.article_count
}

getData()
onMounted(() => {
  getTimeStamp()
  setInterval(getTimeStamp, 1000)
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