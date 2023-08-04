<template>
  <div class="base_view article_view">
    <GVBNav></GVBNav>
    <div style="height: 600px">
      <GVBBanner
          :url="data.banner_url"
          :slogan="data.title"
          :abstract="data.abstract"
          is-article
          v-if="data.title !== ''"
      ></GVBBanner>
    </div>

    <div class="gvb_base_container">
      <div class="gvb_inner_container">
        <div class="go_top_box" style="position:absolute; top: 640px; "></div>
        <article>
          <div class="article_head">
            <h2>{{ data.title }} <i v-if="store.userInfo.role === 1" class="fa fa-edit" @click="goEditArticle"></i></h2>
            <div class="info">
              <span class="date">发布时间：{{ getFormatDate(data.created_at) }}</span>
              <span>作者：{{ data.user_nick_name }}</span>
            </div>
            <div class="tag">
              <i title="文章标签" class="fa fa-tags"></i>
              <a-tag color="red" v-for="item in data.tags">{{ item }}</a-tag>
            </div>

          </div>
          <div class="article_content">
            <MdPreview
                :previewOnly="true"
                v-model="data.content"
                :theme="theme"
                :editorId="data.id"
            />
          </div>
          <div class="article_on_the">
            <div class="article_on_the_inner">
              <a href="#">上一篇</a>
              <a href="#">下一篇</a>
            </div>
          </div>
          <div class="article_comment_to">
            <div class="title">分享您的伟论</div>
            <div class="body">
              <a-textarea
                  class="article_comment_ipt"
                  v-model:value="commentData.content"
                  :auto-size="{ minRows: 6, maxRows: 6 }"
                  @keydown.ctrl.enter="addComment"
                  placeholder="请输入文章评论"></a-textarea>
              <a-button class="add_comment_btn" @click="addComment" type="primary">发布</a-button>
            </div>
            <div class="comment_footer">
              <span>{{ data.look_count }}</span> 次浏览，
              <span>{{ data.comment_count }}</span> 条评论
            </div>
          </div>
          <GVBArticleCommentList style='margin-top: 20px'></GVBArticleCommentList>
        </article>
        <aside>
          <div class="article_user_info">
            <div class="user_info_avatar">
              <img :src="data.user_avatar" alt="">
            </div>
            <div class="user_info_info">
              <div class="user_name">
                {{ data.user_nick_name }}
              </div>
              <div class="user_abstract">
                艰苦朴素的打工仔
              </div>
            </div>
            <div class="user_link">
              <a href="#"><i class="fa fa-github-square"></i></a>
            </div>
            <div class="article_data">
              <div class="item"><span>{{ data.look_count }}</span><span>浏览</span></div>
              <div class="item"><span>{{ data.collects_count }}</span><span>收藏</span></div>
              <div class="item"><span>{{ data.digg_count }}</span><span>点赞</span></div>
              <div class="item"><span>{{ data.comment_count }}</span><span>评论</span></div>
            </div>
          </div>
          <div class="article_directory_action" ref="article_directory" :style="slideStyle">
            <div class="article_directory">
              <div class="title">
                文章目录
              </div>
              <div class="body">
                <MdCatalog
                    ref="articlePreview"
                    :editorId="data.id"
                    :scroll-element="scrollElement"
                    :theme="theme"
                    :scroll-element-offset-top="80"
                    :offsetTop="100"
                />
              </div>
            </div>
            <div class="article_action">
              <div :class="{item:true,active: data.is_digg}" @click="goArticleDigg">
                <svg class="gvb_icon" aria-hidden="true" style="font-size: 22px">
                  <use xlink:href="#icon-dianzan"></use>
                </svg>
              </div>
              <div :class="{item:true,active: !data.is_collect}" @click="goArticleCollect">
                <svg class="gvb_icon" aria-hidden="true" style="font-size: 22px">
                  <use xlink:href="#icon-shoucang"></use>
                </svg>
              </div>
              <div class="item" @click="goTop">
                <svg class="gvb_icon" aria-hidden="true" style="font-size: 22px;color: #76bdbd">
                  <use xlink:href="#icon-huidaodingbu"></use>
                </svg>
              </div>
              <div class="item" @click="goComment">
                <svg class="gvb_icon" aria-hidden="true" style="font-size: 22px">
                  <use xlink:href="#icon-icon_pinglun"></use>
                </svg>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
    <GVBFooter></GVBFooter>
  </div>

</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue"
import GVBBanner from "@/components/gvb_banner.vue"
import GVBFooter from "@/components/gvb_footer.vue"
import {useRoute, useRouter} from "vue-router";
import {reactive, ref, watch, onMounted} from "vue";
import {message} from "ant-design-vue";
import {getFormatDate} from "@/utils/date";
import {MdCatalog, MdPreview} from "md-editor-v3";
import "md-editor-v3/lib/style.css"
import {useStore} from "@/stores/store";
import {articleDiggApi, articleCollectApi, getArticleDetailApi} from "@/api/article_api";
import {commentCreateApi} from "@/api/comment_api";
import GVBArticleCommentList from "@/components/gvb_article_comment_list.vue";
import {roll} from "@/utils/roll";

const scrollElement = document.documentElement;
const article_directory = ref(null)
const route = useRoute()
const router = useRouter()
const store = useStore()
const slide_top = ref()
const slideStyle = reactive({
  position: "inherit",
  width: "auto",
  top: "60px"
})
const theme = ref("dark")
watch(() => store.theme, (themeVal) => {
  theme.value = themeVal ? "" : "dark"
}, {immediate: true}) // 初始化就执行回调

const data = reactive({
  abstract: "",
  banner_id: 0,
  banner_url: "",
  category: "",
  collects_count: 0,
  comment_count: 0,
  content: "",
  created_at: "",
  digg_count: 0,
  id: "",
  keyword: "",
  link: "",
  look_count: 0,
  source: "",
  tags: [],
  title: "",
  updated_at: "",
  user_avatar: "",
  user_id: 0,
  user_nick_name: "",
  is_collect: false, // 用户是否收藏文章
  is_digg: false
})

// 去编辑文章
function goEditArticle() {
  router.push({
    name: "edit_article",
    params: {
      id: route.params.id
    },
    query: {
      redirect_url: "/article/" + route.params.id
    }
  })
}


// 发布评论的参数
const commentData = reactive({
  article_id: route.params.id,
  content: "",
  parent_comment_id: null
})


async function addComment() {
  if (store.userInfo.role === 0) {
    message.warn("请登陆后发布评论")
    return
  }

  if (commentData.content.trim() === "") {
    message.warn("评论内容不可为空")
    return
  }
  let res = await commentCreateApi(commentData)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  commentData.content = ""
}

async function getData() {
  let res = await getArticleDetailApi(route.params.id)
  if (res.code) {
    message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

// 滚动监听
function scroll() {
  let scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop
  if (scrollTop >= slide_top.value) {
    slideStyle.position = "fixed"
  } else {
    slideStyle.position = "inherit"
  }

}


// 文章点赞
async function goArticleDigg() {
  let res = await articleDiggApi(data.id)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  data.is_digg = true
  data.digg_count++
  setTimeout(() => {
    data.is_digg = false
  }, 1000)

}


// 文章收藏
async function goArticleCollect() {
  if (store.userInfo.role === 0) {
    message.warn("请登陆后收藏文章")
    return
  }

  let res = await articleCollectApi(data.id)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  // 判断是收藏还是取消收藏
  data.is_collect = !data.is_collect

}


onMounted(() => {
  // slide的高度
  slide_top.value = article_directory.value.offsetTop - 38

  // slide的定宽，设置fixed的时候，必须要设置宽度，不然会塌陷
  slideStyle.width = article_directory.value.scrollWidth + "px"
  let articlePreview = document.querySelector(".md-editor-preview")

  window.addEventListener("scroll", scroll)

  // 设置目录的最大可展示范围
  setTimeout(() => {
    let mh = articlePreview.scrollHeight
    let ah = document.documentElement.offsetHeight
    let rh = ah - 500  // 500 就是总高度减去不可显示的高度
    if (mh >= rh) {

    }
    document.querySelector(".article_directory .body").style.maxHeight = rh + "px"
  }, 100)

  let hash = route.hash
  if (hash === "") {
    return
  }
  setTimeout(() => {
    // 标签跳转，二次滚动
    let dom = document.querySelector(hash)
    let top = dom.getBoundingRect().top
    roll(top - 80)
  }, 100)

})


// 去评论
function goComment() {
  scrollIntoView(".article_comment_ipt")
  setTimeout(() => {
    // 选中评论框
    document.querySelector(".article_comment_ipt").focus()
  }, 800)

}

// 回到顶部
function goTop() {
  scrollIntoView(".go_top_box")
}


function scrollIntoView(traget) {
  const tragetElem = document.querySelector(traget);
  const tragetElemPostition = tragetElem.offsetTop;

  // 判断是否支持新特性
  if (
      typeof window.getComputedStyle(document.body).scrollBehavior ==
      "undefined"
  ) {
    // 当前滚动高度
    let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动step方法
    const step = function () {
      // 距离目标滚动距离
      let distance = tragetElemPostition - scrollTop;

      // 目标需要滚动的距离，也就是只走全部距离的五分之一
      scrollTop = scrollTop + distance / 5;
      if (Math.abs(distance) < 1) {
        window.scrollTo(0, tragetElemPostition);
      } else {
        window.scrollTo(0, scrollTop);
        setTimeout(step, 20);
      }
    };
    step();
  } else {
    tragetElem.scrollIntoView({
      behavior: "smooth",
      inline: "nearest"
    });
  }
}


getData()

</script>


<style lang="scss">
.base_view {
  background-color: var(--bg);

  .gvb_base_container {
    display: flex;
    justify-content: center;
  }
}

.article_view {
  .gvb_inner_container {
    display: flex;
    justify-content: space-between;
    min-height: auto;
    width: 1400px;
    margin-top: 120px;
    margin-bottom: 20px;

    > article {
      width: calc(100% - 300px);

      .article_head {
        padding: 20px 0 10px 0;
        background-color: var(--card_bg);
        border-radius: 5px 5px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
          font-weight: 700;
        }

        .info {
          margin: 5px 0;

          .date {
            margin-right: 20px;
          }
        }

        .tag {
          display: flex;
          align-items: center;

          .fa-tags {
            margin-right: 10px;
          }
        }
      }

      .article_content {
        min-height: 100px;
        background-color: var(--card_bg);
        margin-top: 1px;
        padding: 10px 20px;

        .md-editor {
          background-color: var(--card_bg);
        }

        .default-theme img {
          padding: 0;
          border: none;
          border-radius: 0;
        }
      }

      .article_on_the {
        padding: 20px;
        background-color: var(--card_bg);
        border-radius: 0 0 5px 5px;

        .article_on_the_inner {
          display: flex;
          padding-top: 10px;
          justify-content: space-between;
          border-top: 1px solid var(--bg);
        }
      }

      .article_comment_to {
        margin-top: 20px;
        background-color: var(--card_bg);
        padding: 20px;
        border-radius: 5px;

        .title {
          font-size: 16px;
          font-weight: 600;
          border-bottom: 1px solid var(--bg);
          padding-bottom: 10px;
        }

        .body {
          margin-top: 10px;
          position: relative;


          .ant-input {
            border-radius: 5px;
          }

          .add_comment_btn {
            position: absolute;
            right: 10px;
            bottom: 10px;
          }
        }

        .comment_footer {
          margin-top: 10px;

          span {
            color: #ff9800;
          }

        }
      }
    }

    > aside {
      width: 280px;

      .article_user_info {
        background-color: var(--card_bg);
        border-radius: 5px;
        padding: 20px;

        .user_info_avatar {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;

          img {
            display: block;
            width: 70px;
            height: 70px;
            border-radius: 50%;
          }
        }

        .user_info_info {
          display: flex;
          flex-direction: column;
          align-items: center;

          .user_name {
            font-size: 18px;
            font-weight: 700;
          }

          .user_abstract {
            color: var(--text);
          }
        }

        .user_link {
          display: flex;
          margin: 20px 0;
          display: flex;
          justify-content: center;

          a {
            margin-right: 20px;
            color: var(--text);

            &:last-child {
              margin-right: 0;
            }

            i {
              font-size: 28px;
            }
          }
        }

        .article_data {
          display: grid;
          grid-template-columns: repeat(4, 1fr);

          .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

          }

        }

      }

      .article_directory_action {
        margin-top: 20px;
      }

      .article_directory {
        padding: 20px;
        border-radius: 5px;
        background-color: var(--card_bg);

        .title {
          font-size: 16px;
          font-weight: 600;
          border-bottom: 1px solid var(--bg);
          padding-bottom: 10px;
          margin-bottom: 10px;
        }

        .body {
          max-height: 200px;
          overflow-y: auto;
          overflow-x: hidden;
          display: grid;
          grid-row-gap: 10px;

          &::-webkit-scrollbar {
            width: 8px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 0;
            background-color: transparent;
          }

          &::-webkit-scrollbar-button {
            background-color: transparent;
            height: 5px;
          }

          &:hover {
            &::-webkit-scrollbar-thumb {
              background-color: var(--bg);
            }

            &::-webkit-scrollbar-button {
              background-color: var(--bg);
            }
          }
        }

      }

      .gvb_icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }


    }

    .article_action {
      margin-top: 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 10px;

      .item {
        background-color: var(--card_bg);
        padding: 10px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:first-child {
          border-radius: 5px 0 0 5px;
        }

        &:last-child {
          border-radius: 0 5px 5px 0;
        }

        i {
          font-size: 18px;
        }
      }

      .item.active {
        color: gray;
      }
    }
  }
}


.md-editor-catalog-active > span {
  color: #d1ca3d;
}

</style>