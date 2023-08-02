<template>
  <div>
    <a-modal title="全文搜索" v-model:visible="visible" class="search_modal" :footer="null" width="40%">
      <div class="search_text_head">
        <a-input-search
            v-model:value="state.key"
            placeholder="输入搜索内容"
            enter-button
            size="large"
            @search="onSearch"
        />
      </div>
      <div class="search_text_body">
        <div class="item" @click="goto(item.slug)" v-for="item in data.list" :key="item.id">
          <div class="search_title">{{ item.title }}</div>
          <div class="search_text" v-html="item.body"></div>
        </div>
      </div>
      <div class="search_text_footer" v-if="data.list.length"> 共搜索到结果 {{ data.total }} 条</div>
    </a-modal>
    <i class="fa fa-search" @click="showModal"></i>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {searchArticleApi} from "@/api/article_api";
import {message} from "ant-design-vue";

const visible = ref(false)

const data = reactive({
  list: [],
  total: 0,
})
const state = reactive({
  key: "",
  limit: 10,
  page: 1,
})


function showModal() {
  visible.value = true
}

function goto(slug) {
  window.open("/article/" + slug, "_blank")
}

async function onSearch() {
  let res = await searchArticleApi(state)
  if (res.code) {
    message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.total = res.data.count
  console.log(data.list)
}

</script>

<style lang="scss">
.search_modal {

  .ant-modal-body {
    padding: 0;
  }

  .search_text_head {
    padding: 10px 20px;
  }

  .search_text_body {
    margin-top: 10px;
    max-height: 50vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #e0dddd
    }

    &::-webkit-scrollbar-button {
      background-color: transparent
    }

    .item {
      padding: 10px 20px;
      cursor: pointer;

      &:hover {
        background-color: var(--bg);
      }

      .search_title {
        font-weight: 700;
        font-size: 16px;
      }

      em {
        color: red;
      }
    }
  }

  .search_text_footer {
    text-align: center;
    padding: 10px 20px;
  }
}
</style>