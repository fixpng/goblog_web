<template>
  <div class="gvb_banner">
    <div class="gvb_title">
      <h1>众神眷恋的幻想乡</h1>
      <div class="slogan">
        <p>天寒地冻路远马亡又何妨</p>
      </div>
    </div>
    <a-carousel autoplay :autoplaySpeed="5000" class="gvb_banner_carousel">
      <div class="dynamic_banner">
        <img src="src/assets/images/login_bg_light.jpg">
      </div>
      <div class="dynamic_banner">
        <img src="src/assets/images/login_bg_black.jpg">
      </div>
    </a-carousel>
  </div>
</template>

<script setup>


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
    .slogan{
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
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }
}
</style>