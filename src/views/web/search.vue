<template>
  <div class="base_view search_view">
    <GVBNav is_show></GVBNav>
    <div class="gvb_base_container">
      <div class="gvb_inner_container">
        <div class="gvb_search_head">
          <div class="gvb_search_slogn">
            枫枫知道|搜索
          </div>
          <div class="gvb_search_ipt">
            <a-input
                placeholder="搜索你想要的内容"
                v-model:value="data.query.key"
                @keydown.enter="search"
            ></a-input>
          </div>
          <div class="gvb_search_btn">
            <a-button type="primary" @click="search">搜索</a-button>
          </div>
        </div>
        <div class="gvb_search_action">
          <div class="gvb_search_order">
            <span :class="{active: data.query.sort === ''}" @click="checkOrder('')">综合排序</span>
            <span :class="{active: data.query.sort === 'created_at asc'}"
                  @click="checkOrder('created_at asc')">最早发布</span>
            <span :class="{active: data.query.sort === 'created_at desc'}"
                  @click="checkOrder('created_at desc')">最新发布</span>
            <span :class="{active: data.query.sort === 'look_count desc'}"
                  @click="checkOrder('look_count desc')">最多浏览</span>
            <span :class="{active: data.query.sort === 'digg_count desc'}"
                  @click="checkOrder('digg_count desc')">最多点赞</span>
            <span :class="{active: data.query.sort === 'comment_count desc'}"
                  @click="checkOrder('comment_count desc')">最多评论</span>
            <span :class="{active: data.query.sort === 'collects_count desc'}"
                  @click="checkOrder('collects_count desc')">最多收藏</span>
          </div>
          <div class="gvb_search_tags">
            <span :class="{active: data.query.tag ===''}" @click="checkTag('')">全部标签</span>
            <span
                :class="{active: data.query.tag ===item.tag}"
                @click="checkTag(item.tag)"
                v-for="(item, index) in data.tag_list"
                :key="index">{{ item.tag }}</span>
          </div>
        </div>
        <div class="gvb_search_result">
          <div class="gvb_search_result_item"
               v-for="(item, index) in data.article_list"
               :key="index">
            <a :href="item.id" target="_blank" class="img">
              <img :src="item.banner_url" alt="">
            </a>
            <div class="info">
              <div class="title">
                <a :href="item.id" target="_blank" v-html="item.title"></a>
              </div>
              <div class="icon">
                <span v-if="data.query.sort === 'digg_count desc'"><i class="fa fa-thumbs-up"></i>{{ item.digg_count }}</span>
                <span v-else-if="data.query.sort === 'comment_count desc'"><i class="fa fa-comments"
                ></i>{{ item.comment_count }}</span>
                <span v-else-if="data.query.sort === 'collects_count desc'"><i class="fa fa-star-o"
                ></i>{{ item.collects_count }}</span>
                <span v-else><i class="fa fa-eye"></i>{{ item.look_count }}</span>
                <span><i class="fa fa-clock"></i>{{ getFormatDate(item.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="node_article_list" v-if="data.article_list.length === 0">
          <a-empty :image="data.simpleImage"/>
        </div>
        <div class="gvb_search_page">
          <a-pagination
              class="article_list_page"
              v-model:current="data.query.page"
              hideOnSinglePage
              :total="data.total"
              @change="pageChange"
              :show-total="total => `共 ${total} 篇`"
          />
        </div>
      </div>
    </div>
    <GVBFooter></GVBFooter>
  </div>
</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue"
import GVBFooter from "@/components/gvb_footer.vue"
import {reactive} from "vue";
import {getArticleListApi} from "@/api/article_api";
import {getFormatDate} from "@/utils/date";
import {Empty} from 'ant-design-vue';
import {getTagArticleListApi} from "@/api/tag_api";

const data = reactive({
  query: {
    key: "",
    page: 1,
    limit: 10,
    sort: "",
    tag: "",
  },
  total: 20,
  tag_list: [
    {"tag": "python", "count": 8},
    {"tag": "golang", "count": 8},
    {"tag": "前端", "count": 8},
  ],
  article_list: [{
    "abstract": "我的信息\n\n\n\n<template>\n  <div class=\"gvb_user_info_bg\">\n    <div class=\"gvb_user_info_view\">\n      <div ",
    "banner_id": 14,
    "banner_url": "/uploads/file/235920pM89Q.jpg",
    "category": "后台课程",
    "collects_count": 1,
    "comment_count": 0,
    "created_at": "2023-07-11 00:45:16",
    "digg_count": 0,
    "id": "2iBpzIYBenTVo4BRkquV",
    "link": "",
    "look_count": 0,
    "source": "",
    "tags": [
      "前端"
    ],
    "title": "个人中心",
    "updated_at": "2023-07-11 00:45:16",
    "user_avatar": "/uploads/avatar/default.png",
    "user_id": 2,
    "user_nick_name": "zhangsan"
  }],
  simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
})

// 选择不同的排序
function checkOrder(order) {
  data.query.sort = order
  getData()
}

// 选择不同的标签
function checkTag(tag) {
  data.query.tag = tag
  getData()
}

// 分页
function pageChange() {
  getData()
}

// 搜索
function search() {
  data.query.page = 1
  getData()
}

// 获取数据
async function getData() {
  let res = await getArticleListApi(data.query)
  data.article_list = res.data.list
  data.total = res.data.count
}

// 获取标签数据
async function getTagList() {
  let res = await getTagArticleListApi()
  data.tag_list = res.data.list
}

getData()
getTagList()
</script>

<style lang="scss">
.search_view {
  .gvb_base_container {
    .gvb_inner_container {
      margin-top: 100px;
    }
  }

  .gvb_search_head {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    .gvb_search_slogn {
      width: 10%;
      font-size: 16px;
    }

    .gvb_search_ipt {
      width: 30%;
      margin: 0 20px;

      .ant-input {
        width: 100%;
      }
    }

    .gvb_search_btn {
      width: 10%;
    }
  }

  .gvb_search_action {
    border-top: 1px solid #e2e2e2;
    padding: 20px 0;
    border-bottom: 1px solid #e2e2e2;

    span {
      padding: 3px 6px;
      color: var(--text);
      cursor: pointer;
      font-size: 14px;
      margin-right: 20px;
    }

    span.active {
      background-color: var(--active);
      color: white;
      border-radius: 5px;
    }

    .gvb_search_order {
      margin-bottom: 10px;
    }
  }

  .gvb_search_result {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    margin-top: 20px;
    margin-bottom: 20px;

    .gvb_search_result_item {
      border: 1px solid var(--bg_darken);
      border-radius: 5px;
      overflow: hidden;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        .img img {
          transform: scale(1.1);
        }
      }

      > a {
        display: block;
        width: 100%;
        height: 100px;
        overflow: hidden;


        img {
          width: 100%;
          height: 100%;
          transition: all 0.3s;
          object-fit: cover;
        }
      }

      .info {
        padding: 8px;
        color: #777;

        .title {
          margin-bottom: 5px;
          height: 43px;

          em {
            color: red;
            margin-right: 2px;
          }
        }

        .icon {
          font-size: 13px;
          display: flex;
          justify-content: space-between;

          i {
            margin-right: 5px;
          }
        }

        a {
          color: var(--text);
        }
      }
    }
  }

  .node_article_list {
    min-height: 300px;
  }

  .gvb_search_page {
    text-align: center;
  }
}

</style>