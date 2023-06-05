<template>
  <div>

    <GVBTable
        :columns="data.columns"
        base-url="/api/articles/tags"
        like-title="搜索标签名称"
        ref="gvbTable"
        :is-add="false"
        :is-edit="false"
        :is-delete="false"
        default-delete
    >
      <template #cell="{column, record}">
        <template v-if="column.key === 'article_id_list'">
          <div v-for="(item , index) in record.article_id_list" :key="index">{{item}}</div>
        </template>
      </template>
      <template #filters>

      </template>
    </GVBTable>

  </div>

</template>

<script setup>
import GVBTable from "@/components/admin/gvb_table.vue"
import {reactive, ref} from "vue";

const gvbTable = ref(null)
/*
 {
        "tag": "后端",
        "count": 4,
        "article_id_list": [
          "golang测试",
          "golang测试2",
        ],
        "created_at": "2023-04-28 01:01:45"
      }

 */

const data = reactive({
  columns: [
    {title: '标签', dataIndex: 'tag', key: 'tag'},
    {title: '文章个数', dataIndex: 'count', key: 'count'},
    {title: '文章列表', dataIndex: 'article_id_list', key: 'article_id_list'},
    {title: '创建时间', dataIndex: 'created_at', key: 'created_at'},
  ],
})
</script>