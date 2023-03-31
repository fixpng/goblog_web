<template>
  <div class="gvb_admin">
    <aside>
      <div>

      </div>
    </aside>
    <div class="main">
      <header>
        <div class="left">
          <a-breadcrumb>
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item><a href="#">个人中心</a></a-breadcrumb-item>
            <a-breadcrumb-item><a href="#">用户列表</a></a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="right">
          <div class="icon_actions">
            <i class="fa fa-home"></i>
            <i class="fa fa-moon-o"></i>
            <i class="fa fa-sun-o"></i>
            <i class="fa fa-arrows-alt"></i>
          </div>
          <div class="avatar">
            <img src="https://inews.gtimg.com/newsapp_bt/0/9680744080/641" alt="">
          </div>
          <div class="drop_menu">
            <a-dropdown :placement="bottomRight">
              <a class="ant-dropdown-link" @click.prevent>
                茜茜bb
                <i class="fa fa-angle-down"></i>
              </a>
              <template #overlay>
                <a-menu @click="menuClick">
                  <a-menu-item key="user_center">
                    <a href="javascript:;">个人中心</a>
                  </a-menu-item>
                  <a-menu-item key="my_messages">
                    <a href="javascript:;">我的消息</a>
                  </a-menu-item>
                  <a-menu-item key="article_list">
                    <a href="javascript:;">文章列表</a>
                  </a-menu-item>
                  <a-menu-item key="logout">
                    <a href="javascript:;">注销退出</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </header>
      <div class="tabs"></div>
      <main></main>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router"

const router = useRouter()

function menuClick({key}) {
  if (key === "logout") {
    console.log("logout")
    return
  }
  router.push({
    name: key
  })
}
</script>

<style lang="scss">
.gvb_admin {
  width: 100%;
  display: flex;

  aside {
    width: 240px;
    height: 100vh;
    background-color: #49514c;
  }

  .main {
    width: calc(100% - 240px);

    header {
      height: 60px;
      background-color: white;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .right {
        display: flex;
        align-items: center;
      }

      .icon_actions {
        margin-right: 20px;

        i {
          margin-left: 10px;
          cursor: pointer;
          font-size: 16px;
          color: var(--text)
        }

        i:hover {
          color: var(--active);
        }
      }

      .avatar {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }

      .drop_menu {
        margin-left: 10px;
      }
    }

    .tabs {
      height: 30px;
      border: 1px solid #f0eeee;
    }

    main {
      background-color: #f0eeee;
      height: calc(100vh - 90px);
    }

  }
}

</style>