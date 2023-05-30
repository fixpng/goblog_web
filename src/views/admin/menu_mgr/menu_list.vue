<template>
  <div>

    <GVBTable
        :columns="data.columns"
        base-url="/api/menus"
        like-title="搜索菜单名称"
        ref="gvbTable"
        default-delete
    >
      <template #add>
        <a-button type="primary">添加</a-button>
      </template>
      <template #edit="{record}">
        <a-button type="primary">编辑</a-button>
      </template>
      <template #cell="{column, record}">
        <template v-if="column.key==='abstract'">
          <span v-for="(item ,index) in record.abstract" :key="index">{{ item }}</span>
        </template>
        <template v-if="column.key==='banners'">
          <img v-for="item in record.banners" :key="item.id" src="item.path" height="40"
               style="border-radius: 9px; margin-right: 5px">
        </template>

      </template>
    </GVBTable>
  </div>

</template>

<script setup>
import GVBTable from "@/components/admin/gvb_table.vue"
import {reactive, ref} from "vue";

const gvbTable = ref(null)
const formRef = ref(null)
const editID = ref(0)
const data = reactive({
  columns: [
    {title: 'id', dataIndex: 'id', key: 'id'},
    {title: '菜单标题', dataIndex: 'title', key: 'title'},
    {title: '路径', dataIndex: 'path', key: 'path'},
    {title: 'slogan', dataIndex: 'slogan', key: 'slogan'},
    {title: '介绍', dataIndex: 'abstract', key: 'abstract'},
    {title: '介绍切换时间', dataIndex: 'abstract_time', key: 'abstract_time'},
    {title: 'banner切换时间', dataIndex: 'banner_time', key: 'banner_time'},
    {title: '排序', dataIndex: 'sort', key: 'sort'},
    {title: 'banner', dataIndex: 'banners', key: 'banners'},
    {title: '发布时间', dataIndex: 'created_at', key: 'created_at'},
    {title: '操作', dataIndex: 'action', key: 'action'},
  ],
  visible: false,
  modalVisible: false,
  fileList: []
})

</script>