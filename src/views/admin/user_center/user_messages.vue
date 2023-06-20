<template>
  <div>
    <a-modal :title="title" v-model:visible="visible">

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
import {useStore} from "@/stores/store";
import {getMessageRecordApi} from "@/api/user_center_api";

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
  ]

})

const visible = ref(true)
const title = ref("")

async function applyModal(record) {
  // 与某某聊天
  // 找到谁是对方
  // 判断发送方和接收方哪一个不是自己
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
  // let res = await getMessageRecordApi(user_id)
  // console.log(res.data)
}


</script>

<style scoped>

</style>