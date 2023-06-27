<template>
  <div>

    <GVBTable
        :columns="data.columns"
        base-url="/api/comments_all"
        like-title="搜索评论内容"
        ref="gvbTable"
        default-delete
    >
      <template #add>
        <a-button type="primary">添加</a-button>
      </template>
      <template #edit="{record}">
      </template>
      <template #cell="{column, record,index}">

        <template v-if="column.key === 'article_banner'">
          <img :src="record.article_banner" alt="" height="60" style="border-radius: 5px">
        </template>
      </template>
      <template #delete="{record}">
        <a-popconfirm
            title="是否确定删除?"
            ok-text="删除"
            cancel-text="取消"
            @confirm="commentRemove(record)"
        >
          <a-button class="gvb_table_action delete" type="primary" danger>删除</a-button>
        </a-popconfirm>
      </template>

    </GVBTable>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import GVBTable from "@/components/admin/gvb_table.vue"
import {useRouter} from "vue-router";
import {commentRemoveApi} from "@/api/comment_api";

const router = useRouter()
const gvbTable = ref(null)

const data = reactive({
  list: [{
    "id": 3,
    "created_at": "2023-05-03T20:09:08.31+08:00",
    "article_title": "",
    "article_banner": "",
    "parent_comment_id": null,
    "content": "hello",
    "digg_count": 0,
    "comment_count": 0,
    "user_nick_name": "zhangsan"
  }],
  columns: [
    {title: 'id', dataIndex: 'id', key: 'id'},
    {title: '文章标题', dataIndex: 'article_title', key: 'article_title'},
    {title: '文章封面', dataIndex: 'article_banner', key: 'article_banner'},
    {title: '父评论id', dataIndex: 'parent_comment_id', key: 'parent_comment_id'},
    {title: '评论内容', dataIndex: 'content', key: 'content'},
    {title: '点赞数', dataIndex: 'digg_count', key: 'digg_count'},
    {title: '评论数', dataIndex: 'comment_count', key: 'comment_count'},
    {title: '评论人昵称', dataIndex: 'user_nick_name', key: 'user_nick_name'},
    {title: '评论时间', dataIndex: 'created_at', key: 'created_at'},
    {title: '操作', dataIndex: 'action', key: 'action'},
  ],
})

async function commentRemove(record){
 let res = await commentRemoveApi(record.id)
  if (res.code){
    messsge.error(res.msg)
    return
  }
  messsge.success(res.msg)
  gvbTable.value.ExportList()
  return
}

</script>

<style lang="scss">
.gvb_article_data {
  display: grid;
  grid-template-columns: repeat(2, 0fr);
  grid-row-gap: 5px;
  justify-items: self-start;
}

.gvb_article_abstract {
  font-size: 10px;
  max-width: 13rem;
  overflow-x: hidden;
  //display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
}


.gvb_article_tags {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  //grid-column-gap: 5px;
  grid-row-gap: 5px;
  justify-items: self-start;
}

.gvb_article_title {
  font-size: 13px;
  max-width: 14rem;
  display: inline-block;

  em {
    color: #fc7a23;
  }
}
</style>