<template>
  <div>
    <a-modal :title="title" v-model:visible="visible" class="gvb_chat_modal" width="40%">
      <div class="gvb_chat_body">
        <div class="message" v-for="(item,index) in data.record_list" :key="index">
          <div :class="{me:item.is_me}">
            <div class="avatar">
              <img :src="item.send_user_avatar" alt="">
            </div>
            <div class="message-main">
              <div class="message-user">{{ item.send_user_nick_name }}</div>
              <div class="message-content">
                <div class="content">
                  <div class="txt-message"> {{ item.content }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <a-textarea
            v-model:value="state.content"
            placeholder="开始你们的聊天（ctrl+enter 发送消息）"
            :auto-size="{ minRows: 4, maxRows: 6 }"
            @keydown.ctrl.enter="applyMessage"
        />
      </template>
    </a-modal>
    <GVBTable :columns="data.columns"
              base-url="/api/messages"
              like-title="搜索"
              ref="gvbTable"
              :is-edit="false"
              :is-add="false"
              :is-delete="false"
              :is-select="false"
              default-delete>

      <template #cell="{column,record}">
        <template v-if="column.key ==='send_user'">
          <img :src="record.send_user_avatar" height="40" style="border-radius: 50%" alt="">
          <span style="margin-left: 1rem">{{ record.send_user_nick_name }}</span>
        </template>
        <template v-if="column.key ==='rev_user'">
          <img :src="record.rev_user_avatar" height="40" style="border-radius: 50%" alt="">
          <span style="margin-left: 1rem">{{ record.rev_user_nick_name }}</span>
        </template>
      </template>

      <template #edit="{record}">
        <a-button type="primary" @click="applyModal(record)"> 回复</a-button>
      </template>
    </GVBTable>
  </div>
</template>

<script setup>
import GVBTable from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
import {message} from "ant-design-vue";
import {useStore} from "@/stores/store";
import {getMessageRecordApi, messageApi} from "@/api/user_center_api";

const store = useStore()
const data = reactive({
  list: [{
    "send_user_id": 2,
    "send_user_nick_name": "zhangsan",
    "send_user_avatar": "/uploads/avatar/default.jpg",
    "rev_user_id": 1,
    "rev_user_nick_name": "admin",
    "rev_user_avatar": "/uploads/avatar/default.jpg",
    "content": "test1111",
    "created_at": "2023-06-01T23:26:35.899+08:00",
    "message_count": 1
  }],
  columns: [
    // {title: 'id', dataIndex: 'id', key: 'id'},
    {title: '发送人', dataIndex: 'send_user', key: 'send_user'},
    // {title: '发送人', dataIndex: 'send_user_nick_name', key: 'send_user_nick_name'},
    // {title: '发送人头像', dataIndex: 'send_user_avatar', key: 'send_user_avatar'},
    {title: '接收人', dataIndex: 'rev_user', key: 'rev_user'},
    // {title: '接收人', dataIndex: 'rev_user_nick_name', key: 'rev_user_nick_name'},
    // {title: '接收人头像', dataIndex: 'rev_user_avatar', key: 'rev_user_avatar'},
    {title: '消息总数', dataIndex: 'message_count', key: 'message_count'},
    {title: '最新消息内容', dataIndex: 'content', key: 'content'},
    {title: '最新消息时间', dataIndex: 'created_at', key: 'created_at'},
    {title: '操作', dataIndex: "action", key: "action"}
  ],
  record_list: [],
})

const state = reactive({
  content: "",
  rev_user_id: null,
  send_user_id: store.userInfo.user_id,
})
const visible = ref(false)
const title = ref("")

async function applyModal(record) {
  // 判断发送方和接收方哪一个是自己
  let user_id = null
  if (record.send_user_id === store.userInfo.user_id) {
    // 我是发送方
    title.value = `与${record.rev_user_nick_name}的聊天`
    user_id = record.rev_user_id
  }
  if (record.rev_user_id === store.userInfo.user_id) {
    // 我是接收方
    title.value = `与${record.send_user_nick_name}的聊天`
    user_id = record.send_user_id
  }
  visible.value = true
  state.rev_user_id = user_id

  await getMessageRecordList(user_id)
}

async function getMessageRecordList(user_id) {
  let res = await getMessageRecordApi(user_id)
  let record_list = []
  for (const r of res.data) {
    // 判断发送方是不是自己
    if (r.send_user_id === store.userInfo.user_id) {
      r.is_me = true
    }
    record_list.push(r)
  }
  data.record_list = record_list
}

async function applyMessage() {
  if (state.content.trim() === "") {
    message.error("请输入聊天内容")
    return
  }
  let res = await messageApi(state)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  await getMessageRecordList(state.rev_user_id)
  state.content =""
}

</script>

<style lang="scss">
.gvb_chat_modal {
  .ant-modal-body {
    padding: 0;
  }
}

.gvb_chat_body {
  max-height: 60vh;
  overflow-y: auto;
  padding: 20px;

  // 滚动条样式优化
  &::-webkit-scrollbar {
    width: 8px
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--slider_bg);
  }
  &::-webkit-scrollbar-button {
    background-color: transparent;
  }

  .message {
    margin-bottom: 20px;

    > div {
      display: flex;

      .avatar {
        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
      }

      .message-main {
        margin-left: 20px;

        .message-content {
          margin-top: 5px;

          .txt-message {
            background-color: var(--card_boder);
            padding: 10px;
            position: relative;
            width: fit-content;
            min-height: 41px;
            white-space: pre;
            border-radius: 15%;
          }

          .txt-message::before {
            content: "";
            display: block;
            position: absolute;
            left: -32px;
            top: 6px;
            border-width: 10px 20px;
            border-style: solid;
            border-color: transparent var(--card_boder) transparent transparent;
          }


        }
      }
    }

    > .me {
      justify-content: right;
      flex-direction: row-reverse;


      .message-main {
        .message-content {
          .txt-message::before {
            right: -31px;
            left: inherit;
            top: 6px;
            border-width: 10px 20px;
            border-style: solid;
            border-color: transparent transparent transparent var(--card_boder);
          }
        }
      }
    }

  }
}
</style>