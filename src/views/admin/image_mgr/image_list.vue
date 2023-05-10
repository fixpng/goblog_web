<!--用户管理-用户列表-->
<template>
  <div>
    <a-modal title="编辑图片" v-model:visible="data.modalVisible" @ok="update">
      <a-form
          :model="updateState"
          name="basic"
          ref="formRef"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
          autocomplete="off"
      >
        <a-form-item label="文件名称" name="name" has-feedback
                     :rules="[{ required: true, message: '请输入文件名' ,trigger:'blur'}]">
          <a-input v-model:value="updateState.name" placeholder="用户名"/>
        </a-form-item>
        <a-form-item label="图片预览">
          <img :src="updateState.path" height="80" style="border-radius: 5px" alt="">
        </a-form-item>
      </a-form>
    </a-modal>

    <GVBTable
        @delete="Delete"
        :columns="data.columns"
        base-url="/api/images"
        like-title="搜索图片名称"
        ref="gvbTable"
        :page-size="5"
    >
      <template #add>

      </template>
      <template #edit="{record}">
        <a-button type="primary" @click="updateModel(record)">编辑</a-button>
      </template>
      <template #cell="{column,record}">
        <template v-if="column.key === 'path'">
          <img :src="record.path" alt="" height="60" stype="border-radius: 5px">
        </template>
      </template>
    </GVBTable>
  </div>

</template>

<script setup>
import GVBTable from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
import {imageRenameApi} from "@/api/image_api";

const gvbTable = ref(null)
const formRef = ref(null)

//默认参数
const data = reactive({
  columns: [
    {title: 'id', dataIndex: 'id', key: 'id'},
    {title: '图片名称', dataIndex: 'name', key: 'name'},
    {title: '路径', dataIndex: 'path', key: 'path'},
    {title: '类型', dataIndex: 'image_type', key: 'image_type'},
    {title: '上传时间', dataIndex: 'created_at', key: 'created_at'},
    {title: '操作', dataIndex: 'action', key: 'action'},
  ], // 列参数
  modalVisible: false
})

function Delete(idList) {
}

const updateState = reactive({
  id: 0,
  name: "",
  path: ""
})

function updateModel(record) {
  data.modalVisible = true
  updateState.id = record.id
  updateState.name = record.name
  updateState.path = record.path
}

async function update() {
  try {
    await formRef.value.validate()
    let res = await imageRenameApi(updateState)
    if (res.code){
      message.error(res.msg)
      return
    }
    message.success(res.msg)
    data.modalVisible =false
    gvbTable.value.ExportList() // 更新完成刷新列表页
  } catch (e) {

  }
}

</script>