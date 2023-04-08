<template>
  <div>
    <div class="gvb_data_preview">
      <div class="preview_item" v-for="(item,index) in data.sum_data_list" :key="index">
        <div class="icon">
          <i :class="'iconfont '+ iconList[index]"></i>
        </div>
        <div class="text">
          <div class="data_title">{{item.label}}</div>
          <div class="data_sum">{{item.value}}</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>

import {reactive} from "vue";


const iconList = [
  "icon-yonghutongji",
  "icon-wenzhang",
  "icon-shuyi_qunliao",
  "icon-sinandengluyonghu",
  "icon-zhuce"
]

const data = reactive({
  sum_data_list: [
    {
      label: "用户总数",
      value: 43,
    },
    {
      label: "文章总数",
      value: 102,
    },
    {
      label: "消息总数",
      value: 66,
    },
    {
      label: "今日登录",
      value: 18,
    },
    {
      label: "今日注册",
      value: 2,
    }
  ]
})

</script>

<style lang="scss">
.gvb_data_preview {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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
      color :var(--active);
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
</style>