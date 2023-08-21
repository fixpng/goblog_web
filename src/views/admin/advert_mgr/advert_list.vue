<template>
  <div>
    <a-modal :title="editID ? '编辑广告' : '添加广告'" v-model:visible="data.visible" @ok="handleOK">
      <a-form
          :model="state"
          name="basic"
          ref="formRef"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
      >
        <a-form-item label="广告名称" name="title" has-feedback
                     :rules="[{ required: true, message: '请输入广告名称' ,trigger: 'blur'}]">
          <a-input v-model:value="state.title" placeholder="广告名称"/>
        </a-form-item>
        <a-form-item label="广告链接" name="href" has-feedback
                     :rules="[{ required: true, message: '请输入广告链接' ,trigger: 'blur'}, {validator: checkUrl, message: 'url不合法', trigger: 'blur'}]">
          <a-input v-model:value="state.href" placeholder="广告链接"/>
        </a-form-item>
        <a-form-item label="图片地址" name="images" has-feedback
                     :rules="[{ required: true, message: '请输入图片地址' ,trigger: 'blur'}]">
          <a-input v-model:value="state.images" placeholder="图片地址"/>
        </a-form-item>
        <a-form-item label="是否显示" name="is_show">
          <a-switch v-model:checked="state.is_show"/>
        </a-form-item>
        <a-form-item label="图片预览">
          <img :src="state.images" height="60" style="border-radius: 5px" alt="">
        </a-form-item>
      </a-form>
    </a-modal>

    <GVBTable
        :columns="data.columns"
        base-url="/api/adverts"
        like-title="搜索广告名称"
        ref="gvbTable"
        default-delete
    >
      <template #add>
        <a-button type="primary" @click="addModal">添加</a-button>
      </template>
      <template #edit="{record}">
        <a-button type="primary" @click="updateModal(record)">编辑</a-button>
      </template>
      <template #cell="{column, record}">
        <template v-if="column.key === 'images'">
          <img :src="record.images" alt="" height="60" style="border-radius: 5px">
        </template>
        <template v-if="column.key === 'is_show'">
          <a-tag v-if="record.is_show" color="green">显示</a-tag>
          <a-tag v-else color="red">不显示</a-tag>
        </template>
        <template v-if="column.key === 'href'">
          <a-button type="link" target="_blank" :href="record.href">{{ record.href }}</a-button>
        </template>
      </template>
    </GVBTable>
  </div>

</template>

<script setup>
import GVBTable from "@/components/admin/gvb_table.vue"
import {reactive, ref} from "vue";
import {message} from "ant-design-vue";
import {createAdvertApi, updateAdvertApi} from "@/api/advert_api";

const gvbTable = ref(null)
const formRef = ref(null)
const editID = ref(0)

const _state = {
  href: "",
  images: "",
  is_show: true,
  title: ""
}
const state = reactive({
  href: "",
  images: "",
  is_show: true,
  title: ""
})

let checkUrl = async (_rule, value) => {
  try {
    new URL(value)
    return Promise.resolve()
  } catch (err) {
    return Promise.reject('不合法的url');
  }
};


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

async function handleOK() {
  let res
  console.log(editID)
  if (editID.value !== 0){
    res = await updateAdvertApi(editID.value, state)
  }else {
    res = await createAdvertApi(state)
  }

  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  data.visible = false
  Object.assign(state, _state)
  gvbTable.value.ExportList()
  return
}

function updateModal(record) {
  console.log("update",state)
  editID.value = record.id
  state.title = record.title
  state.href = record.href
  state.images = record.images
  state.is_show = record.is_show
  data.visible = true
}

function addModal() {
  console.log("add",state)
  data.visible = true
  editID.value = 0
  Object.assign(state, _state)
}
</script>