<template>
  <div>
    <GVBArticleModal
        v-if="data.editVisible"
        v-model:visible="data.editVisible"
        :state="data.state"
        @ok="editArticleOK">
    </GVBArticleModal>
    <GVBTable
        :columns="data.columns"
        base-url="/api/articles"
        :list="data.list"
        like-title="搜索文章标题"
        ref="gvbTable"
        default-delete
    >
      <template #add>
        <a-button type="primary" @click="addArticle">添加</a-button>
      </template>
      <template #edit="{record}">
        <a-button type="primary" @click="showEditArticleModal(record)">编辑</a-button>
      </template>
      <template #cell="{column, record,index}">
        <template v-if="column.key === 'index'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.key === 'title'">
          <span class="gvb_article_title" v-html="record.title"></span>
        </template>
        <template v-if="column.key === 'banner_url'">
          <img :src="record.banner_url" alt="" height="60" style="border-radius: 5px">
        </template>
        <template v-if="column.key === 'data'">
          <div class="gvb_article_data">
            <span><i class="fa fa-eye"></i>{{ record.look_count }}</span>
            <a-divider type="vertical"/>
            <span><i class="fa fa-thumbs-o-up"></i>{{ record.digg_count }}</span>
            <a-divider type="vertical"/>
            <span><i class="fa fa-comment-o"></i>{{ record.comment_count }}</span>
            <a-divider type="vertical"/>
            <span><i class="fa fa-star-o"></i>{{ record.collects_count }}</span>
          </div>
        </template>
        <template v-if="column.key ==='abstract'">
          <div class="gvb_article_abstract">{{ record.abstract }}</div>
        </template>
        <template v-if="column.key === 'tags'">
          <div class="gvb_article_tags">
            <a-tag :color="getColor(i)" v-for="(item,i) in record.tags" :key="i">{{ item }}</a-tag>
          </div>
        </template>
      </template>

      <template #filters>
        <a-select
            class="gvb_select"
            v-model:value="tag"
            style="width: 200px"
            allowClear
            @change="onFilter"
            :options="data.tagOptions"
            placeholder="筛选文章标签"
        ></a-select>
        <a-select
            class="gvb_select"
            v-model:value="category"
            style="width: 200px"
            allowClear
            @change="onFilter"
            :options="data.categoryOptions"
            placeholder="筛选文章分类"
        ></a-select>
      </template>
    </GVBTable>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {getCategoryListApi,updateArticleApi} from "@/api/article_api";
import GVBTable from "@/components/admin/gvb_table.vue"
import {getTagNameListApi} from "@/api/tag_api";
import {useRouter} from "vue-router";
import {useStore} from "@/stores/store";
import {message} from "ant-design-vue";
import GVBArticleModal from "@/components/admin/gvb_article_modal.vue";

const store = useStore()
const router = useRouter()
const tag = ref(null)
const category = ref(null)
const gvbTable = ref(null)
const data = reactive({
  list: [{
    "abstract": "这是一条a'a'aaaa请求",
    "banner_id": 1,
    "banner_url": "uploads/file/checken_logo.png",
    "category": "python",
    "collects_count": 0,
    "comment_count": 0,
    "created_at": "2023-05-03 15:00:32",
    "digg_count": 0,
    "id": "aWRp4IcBBgJj1CYJpMIt",
    "look_count": 0,
    "tags": [
      "python",
      "后端",
      "前端",
      "python",
      "后端",
      "前端"
    ],
    "title": "python测试2",
    "updated_at": "2023-05-03 15:00:32",
    "user_avatar": "/uploads/avatar/default.jpg",
    "user_id": 2,
    "user_nick_name": "zhangsan"
  }],
  columns: [
    // {title: 'id', dataIndex: 'id', key: 'id'},
    {title: 'Index', dataIndex: 'index', key: 'index'},
    {title: '文章标题', dataIndex: 'title', key: 'title'},
    {title: '文章分类', dataIndex: 'category', key: 'category'},
    {title: '文章简介', dataIndex: 'abstract', key: 'abstract'},
    {title: '作者', dataIndex: 'user_nick_name', key: 'user_nick_name'},
    {title: '封面', dataIndex: 'banner_url', key: 'banner_url'},
    {title: '文章数据', dataIndex: 'data', key: 'data'},
    // {title: '浏览量', dataIndex: 'look_count', key: 'look_count'},
    // {title: '点赞', dataIndex: 'digg_count', key: 'digg_count'},
    // {title: '评论', dataIndex: 'comment_count', key: 'comment_count'},
    // {title: '收藏', dataIndex: 'collects_count', key: 'collects_count'},
    {title: '标签', dataIndex: 'tags', key: 'tags'},
    {title: '发布时间', dataIndex: 'created_at', key: 'created_at'},
    {title: '操作', dataIndex: 'action', key: 'action'},
  ],
  tagOptions: [],
  categoryOptions: [],
  editVisible: false,
  state: {
    title: "",
    abstract: "",
    banner_id: null,
    category: "",
    link: "",
    source: "",
    tags: [],
  },
  editID:"",
})

function showEditArticleModal(record) {
  data.state.title = record.title
  data.state.abstract = record.abstract
  data.state.banner_id = record.banner_id
  data.state.category = record.category
  data.state.link = record.link
  data.state.source = record.source
  data.state.tags = record.tags
  data.editID = record.id
  data.editVisible = true
}

const colorList = ["red", "blue", "green", "purple", "cyan", "orange", "pink"]

// 标签颜色函数
function getColor(index) {
  return colorList[index]
}

async function editArticleOK(state) {
  let res  = await updateArticleApi(data.editID,state)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  data.editVisible = false
  gvbTable.value.ExportList()
}

function addArticle() {
  router.push({
    name: "add_article"
  })
  store.addTab({
    "name": "add_article",
    "title": "添加文章"
  })
}

function onFilter() {
  gvbTable.value.ExportList({tag: tag.value, key: category.value})
}

async function getData() {
  let res = await getTagNameListApi()
  data.tagOptions = res.data
  let c = await getCategoryListApi()
  data.categoryOptions = c.data
}

getData()

</script>

<style lang="scss">
.gvb_article_data {
  span {
    i {
      margin-right: 3px;
    }
  }
}

.gvb_article_abstract {
  max-width: 12rem;
  overflow-x: hidden;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
}


.gvb_article_tags {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  justify-items: self-start;
}

.gvb_article_title {
  max-width: 16rem;
  display: inline-block;

  em {
    color: #fc7a23;
  }
}
</style>