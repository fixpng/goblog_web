<template>
  <div>
    <GVBTable
        :columns="data.columns"
        base-url="/api/articles"
        :list="data.list"
        like-title="搜索文章标题"
        ref="gvbTable"
        default-delete
    >
      <template #add>
        <a-button type="primary">添加</a-button>
      </template>
      <template #edit="{record}">
        <a-button type="primary">编辑</a-button>
      </template>
      <template #cell="{column, record,index}">
        <template v-if="column.key === 'index'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.key === 'banner_url'">
          <img :src="'/'+record.banner_url" alt="" height="60" style="border-radius: 5px">
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
    </GVBTable>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import GVBTable from "@/components/admin/gvb_table.vue"

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
  ]
})

const colorList = ["red", "blue", "green", "purple", "cyan", "orange", "pink"]

// 标签颜色函数
function getColor(index) {
  return colorList[index]
}

</script>

<style lang="scss">
.gvb_article_data {
  span {
    i{
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


.gvb_article_tags{
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  justify-items: self-start;
}
</style>