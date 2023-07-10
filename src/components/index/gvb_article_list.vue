<template>
  <div class="article_list_view">
    <div class="title">
      <h2>博客文章</h2>
      <div :class="{search:true, show: data.show}">
        <a-input ref="searchIpt" @change="searchChange" v-model:value="data.search.key" placeholder="搜索文章"/>
        <div class="search_btn" @click="showSearchIpt">
          <i class="fa fa-search"></i>
        </div>
      </div>

    </div>
    <div class="body">
      <ul class="article_list_ul">
        <li v-for="item in data.article_list" :key="item.id">
          <div class="left">
            <div>
              <img alt="" :src="item.banner_url">
            </div>
          </div>
          <div class="right">
            <h2>
              <a :href="'article/'+item.id" class="" v-html="item.title"></a>
            </h2>
            <p>{{ item.abstract }}</p>
            <div class="article_info">
              <span><a-tag color="red">{{ item.category }}</a-tag></span>
              <span><i class="fa fa-clock-o"></i>{{ getFormatDate(item.created_at) }}</span>
              <span><i class="fa fa-thumbs-up"></i>{{ item.digg_count }}</span>
              <span><i class="fa fa-eye"></i>{{ item.look_count }}</span>
              <span><i class="fa fa-comments"></i>{{ item.comment_count }}</span>
              <span><i class="fa fa-star-o"></i>{{ item.collects_count }}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="node_article_list" v-if="data.article_list.length === 0">
        <a-empty :image="data.simpleImage"/>
      </div>

      <a-pagination
          class="article_list_page"
          v-model:current="data.search.page"
          hideOnSinglePage
          :total="data.total"
          @change="pageChange"
          :show-total="total => `共 ${total} 篇`"
      />
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import {getFormatDate} from "@/utils/date";
import {getArticleListApi} from "@/api/article_api";
import {debounce} from "@/utils/utils";
import {Empty} from 'ant-design-vue';
import {useStore} from "@/stores/store";

const store = useStore()

watch(()=>store.tag, ()=>{
  data.search.tag = store.tag
  getData()
})

const data = reactive({
  article_list: [
    {
      "abstract": "我的信息\n\n\n\n<template>\n  <div class=\"gvb_user_info_bg\">\n    <div class=\"gvb_user_info_view\">\n      <div ",
      "banner_id": 14,
      "banner_url": "/uploads/file/235920pM89Q.jpg",
      "category": "后台课程",
      "collects_count": 1,
      "comment_count": 0,
      "created_at": "2023-03-11 00:45:16",
      "digg_count": 0,
      "id": "2iBpzIYBenTVo4BRkquV",
      "link": "",
      "look_count": 0,
      "source": "",
      "tags": [
        "前端"
      ],
      "title": "个人中心",
      "updated_at": "2023-03-11 00:45:16",
      "user_avatar": "/uploads/avatar/default.png",
      "user_id": 2,
      "user_nick_name": "zhangsan"
    },
  ],
  total: 0,
  search: {
    key: "",
    page: 1,
    limit: 10,
    sort: "",
    tag: "",
  },
  show: false,
  simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
})

const searchIpt = ref(null)

// 点击搜索按钮
function showSearchIpt() {
  data.show = !data.show
  if (data.show) {
    searchIpt.value.focus()
  }
}

// 搜索
function searchChange() {
  debounce(getData, 500, false)

}

// 获取数据
async function getData() {
  let res = await getArticleListApi(data.search)
  data.article_list = res.data.list
  data.total = res.data.count
}

watch(()=>store.tag, ()=>{
  data.search.tag = store.tag
  getData()
})

function pageChange() {
  getData()
}

getData()

</script>

<style lang="scss">
.article_list_view {

  > .title {
    padding: 20px 20px 10px 20px;
    display: flex;
    align-items: center;
    border-radius: 5px 5px 0 0;
    background-color: var(--card_bg);

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: var(--h2);
    }

    .search {
      margin-left: 10px;
      display: flex;
      align-items: center;

      .ant-input {
        width: 0;
        padding: 0;
        border-width: 0;
      }

      .search_btn {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        margin-left: 0;
      }
    }

    .search.show {
      //width: 0;

      .ant-input {
        width: 100%;
        padding: 4px 11px;
        border-width: 1px;
      }

      .search_btn {
        border-radius: 0 5px 5px 0;
        margin-left: -1px;
      }
    }

  }

  > .body {
    .article_list_ul {
      li {
        display: flex;
        background-color: var(--card_bg);
        border-radius: 5px;
        margin-bottom: 20px;
        transition: all 0.3s;

        &:first-child {
          border-radius: 0 0 5px 5px;
          margin-top: 1px;
        }

        &:not(&:first-child):hover {
          transform: translateY(-10px);
          box-shadow: 0 0 10px #0000001a
        }

        .left {
          width: 30%;
          padding: 20px 10px 20px 20px;

          > div {
            width: 100%;
            border-radius: 5px;
            overflow: hidden;

            img {
              width: 100%;
              transition: all .3s;
              display: block;

              &:hover {
                transform: scale(1.05);
              }
            }
          }

        }

        .right {
          width: 70%;
          padding: 20px 20px 20px 10px;
          display: flex;
          flex-direction: column;
          align-items: baseline;
          justify-content: space-between;

          h2 {
            font-size: 23px;
            font-weight: 600;

            a {
              color: #555;
              em{
                color: red;
                margin-right: 5px;
              }
            }
          }

          p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 10px;
            color: var(--text);
          }

          .article_info {

            span {
              margin-right: 10px;
              display: inline-flex;
              align-items: center;

              i {
                margin-right: 5px;
                font-size: 17px;
              }
            }
          }

        }
      }
    }

    .node_article_list {
      background-color: white;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      margin-top: 1px;

      .ant-empty {
        margin: 0;
      }

    }

    .article_list_page {
      text-align: center;


    }
  }

}
</style>