<template>
  <div>

    <a-modal title="上传图片" v-model:visible="data.visible" @ok="uploadComplete">
      <a-upload
          v-model:file-list="data.fileList"
          action="/api/images"
          list-type="picture-card"
          name="images"
          multiple
          :headers="{token: store.userInfo.token}"
      >
        <i class="fa fa-cloud-upload"></i>
        <div style="margin-left: 5px">上传图片</div>
      </a-upload>
    </a-modal>

    <a-modal title="编辑图片" v-model:visible="data.modalVisible" @ok="update">
      <a-form
          :model="updateState"
          name="basic"
          ref="formRef"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
      >
        <a-form-item label="文件名称" name="name" has-feedback
                     :rules="[{ required: true, message: '请输入文件名' ,trigger: 'blur'}]">
          <a-input v-model:value="updateState.name" placeholder="用户名"/>
        </a-form-item>
        <a-form-item label="图片预览">
          <img :src="updateState.path" height="80" style="border-radius: 5px" alt="">
        </a-form-item>
      </a-form>
    </a-modal>

    <GVBTable
        :columns="data.columns"
        base-url="/api/images"
        like-title="搜索图片名称"
        ref="gvbTable"
        default-delete
    >
      <template #add>
        <a-button type="primary" @click="data.visible = true">添加</a-button>
      </template>
      <template #edit="{record}">
        <a-button type="primary" @click="updateModal(record)">编辑</a-button>
      </template>
      <template #cell="{column, record}">
        <template v-if="column.key === 'path'">
          <img :src="record.path" alt="" height="60" style="border-radius: 5px">
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
    {title: '图片名称', dataIndex: 'name', key: 'name'},
    {title: '图片预览', dataIndex: 'path', key: 'path'},
    {title: '类型', dataIndex: 'image_type', key: 'image_type'},
    {title: '上传时间', dataIndex: 'created_at', key: 'created_at'},
    {title: '操作', dataIndex: 'action', key: 'action'},
  ],
  visible: false,
  modalVisible: false,
  fileList: []
})

const updateState = reactive({
  id: 0,
  name: "",
  path: ""
})

// 打开模态框的操作
function updateModal(record) {
  data.modalVisible = true
  updateState.id = record.id
  updateState.name = record.name
  updateState.path = record.path
}

// 修改图片的名称
async function update() {
  try {
    await formRef.value.validate()
    let res = await imageRenameApi(updateState)
    if (res.code) {
      message.error(res.msg)
      return
    }
    message.success(res.msg)
    data.modalVisible = false
    gvbTable.value.ExportList()

  } catch (e) {

  }
}

function uploadComplete(){
  data.visible = false
  gvbTable.value.ExportList()
  data.fileList = []
}
</script>