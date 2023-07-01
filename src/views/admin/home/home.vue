<template>
  <div>
    <div class="gvb_data_preview">
      <div class="preview_item" v-for="(item,key) in data.sum_data_dict" :key="key">
        <div class="icon">
          <i :class="'iconfont '+ item.icon"></i>
        </div>
        <div class="text">
          <div class="data_title">{{ item.label }}</div>
          <div class="data_sum">{{ item.value }}</div>
        </div>
      </div>
    </div>
    <div class="gvb_data_charts">
      <div class="left">
        <div class="article_calendar">
          <ArticleCalendar :is-title="true"/>
        </div>
      </div>

      <div class="right">
        <div class="week_data">

          <WeekChart/>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import ArticleCalendar from "@/components/charts/article_calendar.vue";
import {useStore} from "@/stores/store";
import WeekChart from "@/components/charts/week_chart.vue";
import {getSumDataApi} from "@/api/data_api";

const store = useStore()

const data = reactive({
  sum_data_dict: {
    user_count: {
      label: "消息总数",
      value: 0,
      icon: "icon-yonghutongji",
    },
    article_count: {
      label: "文章总数",
      value: 0,
      icon: "icon-wenzhang",
    },
    message_count: {
      label: "用户总数",
      value: 0,
      icon: "icon-yonghu",
    },
    chat_group_count: {
      label: "群聊消息",
      value: 0,
      icon: "icon-shuyi_qunliao",
    },
    now_login_count: {
      label: "今日登录",
      value: 0,
      icon: "icon-sinandengluyonghu",
    },
    now_sign_count: {
      label: "今日注册",
      value: 0,
      icon: "icon-zhuce",
    },
  }
})

async function getData() {
  let res = await getSumDataApi()
  for (const resKey in res.data) {
    data.sum_data_dict[resKey].value = res.data[resKey]
  }
}

getData()
</script>

<style lang="scss">
.gvb_data_preview {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 20px;
}

.preview_item {
  display: flex;
  background-color: var(--card_bg);
  border-radius: 5px;
  border: 1px solid var(--card_boder);
  padding: 20px;


  .icon {
    width: 50%;
    display: flex;
    align-items: center;
    margin-left: 30px;


    i {
      font-size: 40px;
      color: var(--active);
    }
  }

  .text {
    width: 40%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 30px;
    color: var(--text);

    .data_sum {
      font-size: 18px;
      //font-weight: 600;
    }

    .data_title {
      font-weight: 550;
    }
  }
}


.gvb_data_charts {
  display: flex;
  margin-top: 20px;

  .left {
    width: 800px;
    margin-right: 20px;
  }

  .right {
    width: calc(100% - 800px);
  }

  .article_calendar {
    background-color: var(--card_bg);
    padding: 10px 20px;
    border: 1px solid var(--card_boder);
    border-radius: 5px;
  }

  .week_data {
    background-color: var(--card_bg);
    padding: 10px 20px;
    border: 1px solid var(--card_boder);
    border-radius: 5px;
  }
}
</style>