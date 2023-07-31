<template>
  <footer class="gvb_footer">
    <div class="left">
      <p class="thank">Thank For</p>
      <p class="info">
        <img src="/static/footer/ali.png" alt="">
        <span>阿里云服务器</span>
        <img src="/static/footer/ali.png" alt="">
        <span>阿里云SSL证书</span>
        <img src="/static/footer/qiniu.png" alt="">
        <span>七牛云存储</span>
      </p>
      <p class="version">
        <span>version</span>
        <span>1.0.0</span>
      </p>
      <p>建站日期：2023-07-10</p>
      <p class="beian">
        <img src="/static/footer/badges.png" alt="">
        <a href="https://beian.miit.gov.cn/">粤ICP备2021010654号-3</a>
      </p>
    </div>
    <div class="right">
      <div class="my_info">
        <div class="qq" title="我的QQ">
          <a href="tencent://message/?uin=897491068&Site=&Menu=yes" title="向我咨询">
            <img class="show_img" src="/static/footer/qq.jpg" alt="">
            <img class="img" src="/static/footer/qq_icon.svg" alt="">
          </a>
        </div>
        <div class="wechat" title="我的微信">
          <img class="show_img" src="/static/footer/wechat.jpg" alt="">
          <img class="img" src="/static/footer/wexin_icon.svg" alt="">
        </div>
<!--        <div title="我的哔哩哔哩">-->
<!--          <a href="https://space.bilibili.com/" target="_blank">-->
<!--            <img class="img" src="/static/footer/bilibili_icon.svg" alt="">-->
<!--          </a>-->
<!--        </div>-->
        <div title="gitee">
          <a href="https://gitee.com/fixpng" target="_blank">
            <img class="img" src="/static/footer/gitee_icon.svg" alt="">
          </a>
        </div>
        <div title="GitHub">
          <a href="https://github.com/fixpng/" target="_blank">
            <img class="img" src="/static/footer/github_icon.svg" alt="">
          </a>

        </div>
      </div>
      <p>
        <span>联系邮箱：897491068@qq.com</span>
      </p>
    </div>
  </footer>
</template>

<script setup>

</script>

<style lang="scss">
// 底部信息栏
.gvb_footer {
  display: flex;
  padding: 25px 0;
  width: 100%;
  background-color: var(--card_bg);

  .left, .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
  }

  p {
    margin-bottom: 10px;
    font-size: 14px;

    &:last-child {
      margin-bottom: 0;
    }
    a{
      color: var(--text);
    }

  }

  .thank {
    color: #26c6da;
    font-size: 20px;
  }

  .info {
    display: flex;

    span {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }

    img {
      width: 20px;
      margin-right: 5px;
    }
  }

  .version {
    color: white;
    display: flex;

    span {
      padding: 5px 10px;
    }

    span:first-child {
      background-color: #ff9800;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    span:last-child {
      background-color: #26c6da;
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    }
  }

  .beian {
    display: flex;

    img {
      width: 20px;
      margin-right: 5px;
    }
  }

  .my_info {
    display: flex;
    margin-bottom: 10px;

    > div {
      margin-right: 20px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }

    .img {
      width: 30px;
    }

    .qq, .wechat {
      position: relative;

      .show_img {
        opacity: 0;
        position: absolute;
        border: 1px #f0eeee solid;
        width: 63px;
        left: -14px;
        top: -10px;
        transition: all 0.6s;
      }

      &:hover {
        .show_img {
          opacity: 1;
          top: -69px;
        }

      }
    }
  }

}
</style>
