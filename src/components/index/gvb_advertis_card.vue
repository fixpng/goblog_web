<template>
  <GVBCCard title="牛皮藓" class="advert_card">
    <a-carousel arrows autoplay :autoplaySpeed="3000" class="advert_carousel">
      <div class="advert_image" v-for="item in data.advert_list" :key="item.id">
        <a :href="item.href" target="_blank"><img :src="item.images" alt=""></a>
      </div>
      <template #prevArrow>
        <div class="default_slick-arrow" style="left: 10px">
          <i class="fa fa-chevron-circle-left carousel_icon"></i>
        </div>
      </template>
      <template #nextArrow>
        <div class="default_slick-arrow" style="right: 10px;">
          <i class="fa fa-chevron-circle-right carousel_icon"></i>
        </div>
      </template>
    </a-carousel>
  </GVBCCard>
</template>

<script setup>
import GVBCCard from "@/components/gvb_card.vue"
import {reactive} from "vue";
import {getAdvertListApi} from "@/api/advert_api";

const data = reactive({
  advert_list: [
    {
      id: 1,
      href: "",
      images: "",
    }
  ]
})

async function getData(){
  let res = await getAdvertListApi({limit:4})
  data.advert_list = res.data.list
}
getData()

</script>

<style lang="scss">
.advert_carousel {
  height: 200px;

  .default_slick-arrow {
    z-index: 10;
  }

  .default_slick-arrow:before {
    display: none;
  }

  .carousel_icon {
    color: white;
    font-size: 20px;
  }

  .advert_image {
    height: 200px;


    img {
      height: 100%;
      object-fit: cover;
      display: block;
      width: 100%;
    }

  }
}
</style>