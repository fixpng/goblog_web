<template>
  <div class="gvb_login_bg">
    <div class="gvb_login_container">
      <div class="gvb_login_main">
        <div class="gvb_login_head">用户登录</div>
        <div class="gvb_login_form">
          <div class="gvb_login_form_item">
            <a-input placeholder="用户名">
              <template #prefix><i class="fa fa-user-o"></i></template>
            </a-input>
          </div>
          <div class="gvb_login_form_item">
            <a-input type="password" placeholder="密码">
              <template #prefix><i class="fa fa-key"></i></template>
            </a-input>
          </div>
          <div class="gvb_login_form_item">
            <a-button type="primary">登录</a-button>
          </div>
        </div>
        <div class="gvb_login_other">第三方登录</div>
        <div class="gvb_login_other_icons">
          <img src="src/assets/icon/qq_logo.png" class="gvb_login_other_icon" alt="">
          <img src="src/assets/icon/qq_logo.png" class="gvb_login_other_icon" alt="">
          <img src="src/assets/icon/qq_logo.png" class="gvb_login_other_icon" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss">
.gvb_login_bg {
  background: url("@/assets/images/login_bg_light.jpg") 50%/cover no-repeat;
  width: 100%;
  height: 100vh;

}

.gvb_login_container {
  position: fixed;
  text-align: center;
  border-radius: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 490px;
  height: 303px;
  background-color: rgba(white, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;

  .gvb_login_main {
    width: 70%;

    .gvb_login_head {
      font-size: 20px;
      font-weight: 600;
      color: var(--active);
      text-align: center;
      margin-bottom: 12px;
    }

    .gvb_login_form {
      .gvb_login_form_item {
        margin-bottom: 12px;

        .ant-btn {
          width: 100%;
        }
      }
    }

    .gvb_login_other {

      font-size: 14px;
      color: #666;
      display: flex;
      justify-content: center;
      align-items: center;

      &::before {
        width: 34%;
        height: 1px;
        background-color: #666;
        display: inline-block;
        content: "";
        margin-right: 5px;
      }

      &::after {
        width: 34%;
        height: 1px;
        background-color: #666;
        display: inline-block;
        content: "";
        margin-left: 5px;
      }
    }

    .gvb_login_other_icons {
      margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;

      .gvb_login_other_icon {
        width: 40px;
        height: 40px;
        cursor: pointer;
        margin-right: 10px;

        &:last-child{
          margin-right: 0;
        }
      }
    }
  }

}

</style>