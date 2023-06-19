<template>
  <div>
    <GVBArticleList base-url="/api/articles?is_user=true"></GVBArticleList>
  </div>
</template>

<script setup>
import GVBArticleList from "@/components/admin/gvb_article_list.vue";
</script>
