<template>
  <div class="gvb_banner">
    <div class="gvb_title">
      <h1>{{ data.slogan }}</h1>
      <div class="slogan">
        <template v-if="props.isArticle">
          <p>{{ props.abstract }}</p>
        </template>
        <template v-else>
          <VueTyped
              v-if="data.abstract.length"
              :strings="data.abstract"
              :loop="true"
              :startDelay="300"
              :typeSpeed="100"
              :backSpeed="50">
            <span class="typing"></span>
          </VueTyped>
        </template>

      </div>
    </div>
    <a-carousel autoplay :autoplaySpeed="data.banner_time * 1000" class="gvb_banner_carousel">
      <div class="dynamic_banner" v-for="item in data.banners" :key="item.id">
        <img :src="item.path" alt="">
      </div>
    </a-carousel>
  </div>
</template>

<script setup>
import VueTyped from 'vue3typed/libs/typed/index.vue';
import {reactive} from "vue";
import {getMenuDetailApi} from "@/api/menu_api";
import {useRoute} from "vue-router";

const route = useRoute()
const props = defineProps({
  // 对应文章的背景图
  url: {
    type: String
  },
  // 对应文章标题
  slogan: {
    type: String,
  },
  // 对应文章简介
  abstract: {
    type: String,
  },
  isArticle: {
    type: Boolean,
    default: false
  }
})

const data = reactive({
  slogan: "",
  abstract: [],
  abstract_time: 6,
  banner_time: 6,
  banners: [],
})

async function getData() {
  if (!props.isArticle) {
    let res = await getMenuDetailApi(route.path)
    data.slogan = res.data.slogan
    data.abstract = res.data.abstract
    data.abstract_time = res.data.abstract_time
    data.banner_time = res.data.banner_time
    data.banners = res.data.banners
    return
  }
  data.slogan = props.slogan
  data.abstract = [props.abstract]
  data.banners = [{
    id: 1,
    path: props.url,
  }]
}

getData()


</script>

<style lang="scss">


.gvb_banner {
  height: 100%;
  width: 100%;
  background-color: var(--card_bg);
  //overflow: hidden;
  position: relative;

  .gvb_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    color: white;

    h1 {
      font-size: 30px;
      font-weight: 400;
      text-align: center;
      color: white;
    }

    .slogan {
      font-size: 18px;
      text-align: center;
    }
  }

  .gvb_banner_carousel {
    height: 700px;

    .dynamic_banner {
      height: 700px;

      img {
        width: 100%;
        //height: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }
}
</style>