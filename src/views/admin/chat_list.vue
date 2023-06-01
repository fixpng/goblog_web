<template>
  <div>

    <GVBTable
        :columns="data.columns"
        base-url="/api/chat_groups_records"
        like-title="搜索消息名称"
        ref="gvbTable"
        :is-add="false"
        :is-edit="false"
        :is-delete="false"
        default-delete
    >
      <template #cell="{column, record}">
        <template v-if="column.key === 'avatar'">
          <img :src="'/' + record.avatar" alt="" v-if="record.avatar !== ''"
               style="width: 30px;height: 30px;border-radius: 50%">
        </template>
        <template v-if="column.key === 'is_group'">
          <a-tag v-if="record.is_group" color="blue">群消息</a-tag>
          <a-tag v-else color="red">系统消息</a-tag>
        </template>
        <template v-if="column.key === 'msg_type'">
          <span color="blue">{{  chatTypeDict[record.msg_type] }}</span>
        </template>
      </template>
      <template #filters>

      </template>
    </GVBTable>

  </div>

</template>

<script setup>
import GVBTable from "@/components/admin/gvb_table.vue"
import {reactive, ref} from "vue";

const level = ref(undefined)
const gvbTable = ref(null)

/*
  InRoomMsg  ctype.MsgType = 1 // 进入聊天室
  TextMsg    ctype.MsgType = 2 // 发文本消息
  ImageMsg   ctype.MsgType = 3 // 图片消息
  VoiceMsg   ctype.MsgType = 4 // 语音消息
  VideoMsg   ctype.MsgType = 5 // 视频消息
  SystemMsg  ctype.MsgType = 6 // 系统消息
  OutRoomMsg ctype.MsgType = 7 // 退出聊天室
 */

const chatTypeDict = {
  1: "进入聊天室",
  2: "文本消息",
  3: "图片消息",
  4: "语音消息",
  5: "视频消息",
  6: "系统消息",
  7: "退出聊天室",
}

function onFilter() {
  gvbTable.value.ExportList({level: level.value})
}


const data = reactive({
  columns: [
    {title: 'id', dataIndex: 'id', key: 'id'},
    {title: '昵称', dataIndex: 'nick_name', key: 'nick_name'},
    {title: '头像', dataIndex: 'avatar', key: 'avatar'},
    {title: '内容', dataIndex: 'content', key: 'content'},
    {title: '是否是群聊', dataIndex: 'is_group', key: 'is_group'},
    {title: '消息类型', dataIndex: 'msg_type', key: 'msg_type'},
    {title: '日志时间', dataIndex: 'created_at', key: 'created_at'},
  ],
})
</script>