<template>
  <div>

    <GVBTable
        :columns="data.columns"
        base-url="/api/logs"
        like-title="搜索日志名称"
        ref="gvbTable"
        is-add="false"
        is-edit="false"
        default-delete
    >
      <template #cell="{column, record}">
        <template v-if="column.key ==='level'">
          <a-tag :color="levelColor[record.level]">{{ record.level }}</a-tag>
        </template>
      </template>
      <template #filters>
        <a-select
            class="gvb_select"
            v-model:value="level"
            style="width: 200px"
            allowClear
            @change="onFilter"
            :options="levelOptions"
            placeholder="筛选日志等级"
        ></a-select>
      </template>
    </GVBTable>

  </div>

</template>

<script setup>
import GVBTable from "@/components/admin/gvb_table.vue"
import {reactive, ref} from "vue";

const levelColor = {
  "debug": "green",
  "info": "blue",
  "warn": "orange",
  "error": "red",
}

const levelOptions = [
  {label: "debug", value: 1},
  {label: "info", value: 2},
  {label: "warn", value: 3},
  {label: "error", value: 4}
]

const level = ref(undefined)
const gvbTable = ref(null)

function onFilter() {
  gvbTable.value.ExportList({level: level.value})
}


const data = reactive({
  columns: [
    {title: 'id', dataIndex: 'id', key: 'id'},
    {title: 'ip', dataIndex: 'ip', key: 'ip'},
    {title: '地址', dataIndex: 'addr', key: 'addr'},
    {title: '用户id', dataIndex: 'user_id', key: 'user_id'},
    {title: '等级', dataIndex: 'level', key: 'level'},
    {title: '内容', dataIndex: 'content', key: 'content'},
    {title: '日志时间', dataIndex: 'created_at', key: 'created_at'},
    {title: '操作', dataIndex: 'action', key: 'action'},
  ],
})

</script>