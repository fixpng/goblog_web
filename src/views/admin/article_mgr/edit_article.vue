<template>
  <div>
    <GVBEditor v-model:content="content" @onSave="onSave"></GVBEditor>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import GVBEditor from "@/components/admin/gvb_editor.vue";
import {ref} from "vue"
import {getArticleContentApi, updateArticleApi} from "@/api/article_api";
import {message} from "ant-design-vue";
import {useStore} from "@/stores/store";

const route = useRoute()
const store = useStore()
const router = useRouter()
const content = ref("")

async function getData() {
  let res = await getArticleContentApi(route.params.id)
  content.value = res.data
}

getData()


async function onSave() {
  // 调用更新接口
  if (content.value.trim() === "") {
    message.error("文章内容不能为空")
    return
  }
  let res = await updateArticleApi(route.params.id, {content: content.value})
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)

  let url = route.query.redirect_url
  if (url === undefined) {
    // 先切换到文章列表
    router.push({
      name: "article_list"
    })
  }else {
     router.push(url)
  }

  // 删除编辑文章的tab
  store.removeTab({name: "edit_article"})
  return

}
</script>

<style scoped>

</style>