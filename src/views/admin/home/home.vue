<template>
  <div>
    <div class="gvb_data_preview">
      <div class="preview_item">
        <div class="icon">
          <i class="iconfont icon-16"></i>
        </div>
        <div class="text">
          <div class="data_title">用户总数</div>
          <div class="data_sum">16</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>

import {reactive} from "vue";


const iconList = []

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
  background-color: white;
  border-radius: 5px;
  border: 1px solid #e2e2e2;
  padding: 20px;

  .icon {
    width: 60%;
    display: flex;
    align-items: center;

    i {
      font-size: 40px;
    }
  }

  .text {
    width: 40%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .data_sum {
      font-size: 18px;
    }

    .data_title {
      color: var(--text);
    }
  }
}
</style>