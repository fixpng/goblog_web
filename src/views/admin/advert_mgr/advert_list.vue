<template>
  <div>

    <GVBTable
        :columns="data.columns"
        base-url="/api/adverts"
        like-title="搜索广告名称"
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
        <template v-if="column.key === 'advert'">
          <img :src="record.images" alt="" height="60" style="border-radius: 5px">
        </template>
        <template v-if="column.key === 'is_show'">
          <a-tag v-if="record.is_show" color="green">显示</a-tag>
          <a-tag v-else color="red">不显示</a-tag>
        </template>
        <template v-if="column.key === 'href'">
          <a-button type="link" target="_blank" :href="record.href">{{record.href}}</a-button>
        </template>
      </template>
    </GVBTable>

  </div>

</template>

<script setup>
import GVBTable from "@/components/admin/gvb_table.vue"
import {reactive, ref} from "vue";
import {imageRenameApi} from "@/api/image_api";
import {message} from "ant-design-vue";
import {useStore} from "@/stores/store";

const store = useStore()
const gvbTable = ref(null)
const formRef = ref(null)
const data = reactive({
  columns: [
    {title: 'id', dataIndex: 'id', key: 'id'},
    {title: '广告标题', dataIndex: 'title', key: 'title'},
    {title: '图片路径', dataIndex: 'images', key: 'images'},
    {title: '跳转地址', dataIndex: 'href', key: 'href'},
    {title: '是否显示', dataIndex: 'is_show', key: 'is_show'},
    {title: '添加时间', dataIndex: 'created_at', key: 'created_at'},
    {title: '操作', dataIndex: 'action', key: 'action'},
  ],
  visible: false,
  modalVisible: false,
  fileList: []
})


</script>