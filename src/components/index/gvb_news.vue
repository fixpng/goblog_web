<template>
  <GVBCard title="今日热搜" class="news_card" link_name="查看更多" link="/news">
    <ul>
      <li v-for="item in data.news_list" :key="item.index">
        <span class="index">{{ item.index }}</span>
        <a :href="item.link"
           target="_blank">{{ item.title }}</a>
        <span class="num">{{ item.hotValue }}</span>
      </li>
    </ul>
  </GVBCard>
</template>

<script setup>
import GVBCard from "@/components/gvb_card.vue";
import {venDor} from "@/utils/vendor";
import {getNewsApi} from "@/api/news_api";
import {reactive} from "vue";


async function getData() {
  let e = new Date;
  e.toUTCString();
  const t = e.getTime().toString();
  let signaturekey = venDor.AES.encrypt(t, "itab1314").toString()
  const header = {
    version: "1.0.0",  // 版本随便写
    signaturekey: signaturekey,
  }
  let res = await getNewsApi("Jb0vmloB1G", 8, header)
  if (res.code || res.data.length === 0) {
    return
  }
  data.news_list = res.data
}


const data = reactive({
  news_list: [{
    index: '1',
    title: '兰亭序',
    hotValue: '综艺 3641701',
    link: 'https://s.weibo.com/weibo?q=%E5%85%B0%E4%BA%AD%E5%BA%8F'
  }]
})

getData()
</script>

<style lang="scss">
.news_card {
  .body {
    ul {
      list-style: none;

      li {
        display: flex;
        font-size: 14px;
        margin-bottom: 10px;
        align-items: start;

        &:nth-child(1) {
          .index {
            background-color: #fe2d46;
            color: white;
          }
        }

        &:nth-child(2) {
          .index {
            background-color: #ff6600;
            color: white;
          }
        }

        &:nth-child(3) {
          .index {
            background-color: #faa90e;
            color: white;
          }
        }

        .index {
          width: 20px;
          height: 20px;
          border-radius: 5px;
          color: var(--text);
          background-color: var(--bg_darken);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 20px;
        }

        a {
          width: 77%;
          color: var(--text);
          transition: all 0.2s;

          &:hover {
            color: #3a8ee6;
          }
        }

        .num {
          width: 20%;
          display: flex;
          justify-content: right;
        }
      }
    }
  }
}


</style>