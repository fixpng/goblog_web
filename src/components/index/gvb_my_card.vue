<template>
  <div class="my_card">
    <div class="title">
      <h2>个人名片</h2>
      <img src="../../../public/images/checken_logo.png" alt="照片是本人">
    </div>
    <div class="footer">
      <p>NAME <span>修图工小倪</span></p>
      <p>JOB <span>打杂</span></p>
      <p>ADDR <span>新日暮里</span></p>
      <p>WEB <a target="_blank" href="http://www.fixpng.com">www.fixpng.com</a></p>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.my_card {
  padding: 20px;
  width: 100%;
  background-color: var(--card_bg);
  border-radius: 5px;
  margin-bottom: 20px;



  .title {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;


    h2 {
      font-size: 20px;
      font-weight: 600;
      color: var(--h2);
      margin-bottom: 10px;
    }

    img {
      position: absolute;
      right: 20px;
      top: 0px;
      height: 140px;
      width: 140px;
    }
  }


  .footer {
    p {
      margin-bottom: 5px;
      color: var(--font_del);

      span {
        color: var(--text);
      }

      a {
        color: var(--active);
      }
    }
  }
}
</style>