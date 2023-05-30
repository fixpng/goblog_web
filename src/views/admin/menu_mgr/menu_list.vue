<template>
  <div>

    <a-modal :title="editID ? '编辑菜单' : '添加菜单'" v-model:visible="data.visible" @ok="handleOK"
    >
      <a-form
          :model="state"
          name="basic"
          ref="formRef"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
      >
        <a-form-item label="菜单名称" name="title" has-feedback
                     :rules="[{ required: true, message: '请输入菜单名称' ,trigger: 'blur'}]">
          <a-input v-model:value="state.title" placeholder="菜单名称"/>
        </a-form-item>
        <a-form-item label="菜单路径" name="path" has-feedback
                     :rules="[{ required: true, message: '请输入菜单路径' ,trigger: 'blur'}]">
          <a-input v-model:value="state.path" placeholder="菜单路径"/>
        </a-form-item>
        <a-form-item label="slogan" name="slogan" has-feedback>
          <a-input v-model:value="state.slogan" placeholder="slogan"/>
        </a-form-item>
        <a-form-item label="菜单简介" name="abstract" has-feedback>
          <a-textarea
              v-model:value="state_abstract"
              placeholder="菜单简介,多个简介用换行分隔"
              :auto-size="{ minRows: 2, maxRows: 5 }"
          />
        </a-form-item>
        <a-form-item label="banner时间" name="banner_time" has-feedback>
          <a-input-number v-model:value="state.banner_time" placeholder="banner时间"/>
        </a-form-item>
        <a-form-item label="简介时间" name="abstract_time" has-feedback>
          <a-input-number v-model:value="state.abstract_time" placeholder="简介时间"/>
        </a-form-item>
        <a-form-item label="序号" name="sort" has-feedback>
          <a-input-number v-model:value="state.sort" placeholder="序号"/>
        </a-form-item>

        <a-form-item label="banner选择">
          <a-select
              ref="select"
              v-model:value="bannerIDList"
              placeholder="选择banner"
              mode="multiple"
              @change="bannerChange"
          >
            <a-select-option :value="item.id" v-for="item in data.imageNameList" :key="item.id">
              <img :src="item.path" alt="" height="30" style="border-radius: 5px; margin-right: 10px">
              <span>{{ item.name }}</span>
            </a-select-option>
            <template #tagRender="{ value: val, label, closable, onClose, option }">
              <img :src="getLabel(label)" height="30" style="border-radius: 5px; margin-right: 5px"/>
            </template>
          </a-select>
        </a-form-item>

      </a-form>

    </a-modal>

    <GVBTable
        :columns="data.columns"
        base-url="/api/menus"
        like-title="搜索菜单名称"
        ref="gvbTable"
        default-delete
    >
      <template #add>
        <a-button type="primary" @click="addMenu">添加</a-button>
      </template>
      <template #edit="{record}">
        <a-button type="primary" @click="updateModal(record)">编辑</a-button>
      </template>
      <template #cell="{column, record}">
        <template v-if="column.key === 'abstract'">
          <div v-for="(item, index) in record.abstract" :key="index">{{ item }}</div>
        </template>
        <template v-if="column.key === 'banners'">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); grid-column-gap: 5px; grid-row-gap: 5px">
            <img v-for="item in record.banners" :key="item.id" :src="item.path" height="40"
                 style="border-radius: 5px;">
          </div>

        </template>

      </template>
    </GVBTable>
  </div>

</template>

<script setup>
import GVBTable from "@/components/admin/gvb_table.vue"
import {reactive, ref} from "vue";
import {imageNameListApi} from "@/api/image_api";
import {createMenuApi, updateMenuApi} from "@/api/menu_api";
import {message} from "ant-design-vue";

const state_abstract = ref("")
const bannerIDList = ref([])
const _state = {
  abstract_time: 7,
  banner_time: 7,
  path: "",
  slogan: "",
  sort: 0,
  title: "",
  abstract: [],
  image_sort_list: []
}
const state = reactive({
  abstract_time: 7,
  banner_time: 7,
  path: "",
  slogan: "",
  sort: 0,
  title: "",
  abstract: [],
  image_sort_list: []
})
const formRef = ref(null)

// 获取图片数据
async function getData() {
  let res = await imageNameListApi()
  data.imageNameList = res.data
}

// 选中之后的回显
function getLabel(label) {
  return label[0].props.src
}
// 添加菜单，更新菜单
async function handleOK() {
  try {
    formRef.value.validate()
  } catch (e) {
    return
  }
  state.abstract = state_abstract.value.split("\n")
  let res

  if (editID.value) {
    res = await updateMenuApi(editID.value, state)
  } else {
    res = await createMenuApi(state)
  }

  if (res.code) {
    message.error(res.msg)
    return
  }
  state_abstract.value = ""
  bannerIDList.value = []
  data.visible = false
  message.success(res.msg)
  gvbTable.value.ExportList()
  return
}

// 选择菜单图片
function bannerChange(idList) {
  state.image_sort_list = []
  for (let i = 0; i < idList.length; i++) {
    state.image_sort_list.push({
      image_id: idList[i],
      sort: i
    })
  }

}

getData()
const gvbTable = ref(null)
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
  imageNameList: []
})

function addMenu() {
  editID.value = 0
  data.visible = true
  Object.assign(state, _state)
}

function updateModal(record) {
  editID.value = record.id
  state.abstract_time = record.abstract_time
  state.banner_time = record.banner_time
  state.path = record.path
  state.slogan = record.slogan
  state.sort = record.sort
  state.title = record.title

  state.abstract = record.abstract
  state_abstract.value = record.abstract.join("\n")

  bannerIDList.value = []
  state.image_sort_list = []
  for (let i = 0; i < record.banners.length; i++) {
    bannerIDList.value.push(record.banners[i].id)
    state.image_sort_list.push({
      image_id: record.banners[i].id,
      sort: i
    })
  }
  data.visible = true
}

</script>