<template>
  <a-modal title="完善文章信息" @cancel="dialogShow" v-model:visible="props.visible" @ok="okHandler">
    <a-form
        :model="data"
        name="basic"
        ref="formRef"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
    >
      <a-form-item label="文章标题" name="title" has-feedback
                   :rules="[{ required: true, message: '请输入文章标题' ,trigger: 'blur'}]">
        <a-input v-model:value="data.title" placeholder="文章标题"/>
      </a-form-item>
      <a-form-item label="文章简介">
        <a-textarea v-model:value="data.abstract" :auto-size="{ minRows:2,maxRows:5}" placeholder="文章简介"/>
      </a-form-item>
      <a-form-item label="文章分类">
        <a-auto-complete
            v-model:value="data.category"
            :options="initData.categoryList"
            style="width: 100%"
            placeholder="文章分类"
        />
      </a-form-item>
      <a-form-item label="文章标签">
        <a-select
            class="gvb_select"
            v-model:value="data.tags"
            allowClear
            mode="tags"
            :options="initData.tagList"
            placeholder="文章标签"
        ></a-select>
      </a-form-item>
      <a-form-item label="文章封面">
        <a-select
            ref="select"
            v-model:value="data.banner_id"
            placeholder="选择banner"
        >
          <a-select-option :value="item.id" v-for="item in initData.bannerList" :key="item.id">
            <img :src="item.path" alt="" height="30" style="border-radius: 5px; margin-right: 10px">
            <span>{{ item.name }}</span>
          </a-select-option>
          <template #tagRender="{ value: val, label, closable, onClose, option }">
            <img :src="getLabel(label)" height="30" style="border-radius: 5px; margin-right: 5px"/>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item label="原文地址">
        <a-input v-model:value="data.link" placeholder="原文地址"/>
      </a-form-item>
      <a-form-item label="文章来源">
        <a-input v-model:value="data.source" placeholder="文章来源"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import {reactive, ref} from "vue";
import {getTagNameListApi} from "@/api/tag_api";
import {getCategoryListApi} from "@/api/article_api";
import {imageNameListApi} from "@/api/image_api";

const initData = reactive({
  tagList: [],
  categoryList: [],
  bannerList: [],
})
const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  },
  state: {
    type: Object,
    default: {
      content: "",
      title: "",
      abstract: "",
      banner_id: null,
      category: "",
      link: "",
      source: "",
      tags: [],
    }
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  initDataState: {
    type: Object,
    default: {
      tagOption: [],
      categoryOptions: [],
      imageOptions: [],
    }
  }
})
const data = reactive({
  title: "",
  abstract: "",
  banner_id: null,
  category: "",
  link: "",
  source: "",
  tags: [],
})
const formRef = ref(null)

// 选中之后的回显
function getLabel(label) {
  return label[0].props.src
}

async function getData() {
  if (!props.isEdit) {
    // 添加文章
    let t1 = await getTagNameListApi()
    initData.tagList = t1.data
    let t2 = await getCategoryListApi()
    initData.categoryList = t2.data
    let t3 = await imageNameListApi()
    const list = t3.data
    initData.bannerList = list
    // 随机选一张图做封面，向下取整
    const banner = list[Math.floor(Math.random() * list.length)]
    data.banner_id = banner.id
  }
  if (props.isEdit) {
    // 编辑文章
    initData.tagList = props.initDataState.tagOption
    initData.categoryList = props.initDataState.categoryOptions
    initData.bannerList = props.initDataState.imageOptions
    Object.assign(data, props.state)
  }
}

getData()

const emit = defineEmits(['update:visible', "ok"])
// 组件自己关闭修改父组件传来的值
const dialogShow = () => {
  emit('update:visible', false)
}

function okHandler() {
  // 文章正文不能为空
  try {
    formRef.value.validate()
  } catch (e) {
    return
  }
  emit('ok', data)
}

</script>

<style scoped>

</style>