<!--用户管理-用户列表-->
<template>
  <div class="gvb_container">
    <div class="gvb_search">
      <a-input-search
          placeholder="搜索用户昵称"
          v-model:value="page.key"
          style="width: 200px"
          @search="onSearch"
      />
      <a-select
          class="gvb_select"
          v-model:value="page.role"
          style="width: 200px"
          allowClear
          @change="onSearch"
          :options="roleOptions"
          placeholder="选择权限"
      ></a-select>
      <div class="gvb_refresh">
        <a-button title="刷新本页" @click="refresh"><i class="fa fa-refresh"></i></a-button>
      </div>
    </div>
    <div class="gvb_actions">
      <slot name="add">
        <a-button type="primary" @click="addModal">添加</a-button>
      </slot>
      <slot name="batchRemove">
        <a-button type="danger" @click="removeBatch" v-if="data.selectedRowKeys.length">批量删除</a-button>
      </slot>
    </div>


    <div class="gvb_tables">
      <a-spin :spinning="data.spinning" tip="加载中..." :delay="300">
        <a-table :columns="props.columns"
                 :row-selection="{
                selectedRowKeys: data.selectedRowKeys,
                onChange: onSelectChange }"
                 :pagination="false"
                 row-key="id"
                 :data-source="data.list">
          <template #bodyCell="{ column,record }">
            <template v-if="column.key === 'avatar'">
              <img class="gvb_table_avatar" :src="record.avatar" alt="">
            </template>
            <template v-if="column.key === 'created_at'">
              <span>{{ getFormatDate(record.created_at) }}</span>
            </template>
            <template v-if="column.key === 'action'">
              <slot name="edit" v-bind="{column,record }">
                <a-button class="gvb_table_action update" @click="updateModel(record)" type="primary">编辑</a-button>
              </slot>
              <slot name="delete" v-bind="{column,record }">
                 <a-popconfirm
                  title="是否确定删除?"
                  ok-text="删除"
                  cancel-text="取消"
                  @confirm="userRemove(record.id)"
              >
                <a-button class="gvb_table_action delete" type="danger">删除</a-button>
              </a-popconfirm>
              </slot>

            </template>
          </template>
        </a-table>
      </a-spin>
    </div>
    <div class="gvb_pages">
      <a-pagination
          show-less-items
          v-model:current="page.page"
          v-model:page-size="page.limit"
          @change="pageChange"
          :total="data.count"
          :show-total="total => `共 ${total} 条`"
      />
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {getFormatDate} from "@/utils/date";
import {message} from "ant-design-vue";
import {baseListApi} from "@/api/base_api";

//删除功能渲染
const emits = defineEmits(["delete"])
const props = defineProps({
  columns:{
    type:Array
  },
  baseUrl:{
    type:String
  }
})

// 分页
const page = reactive({
  page: 1,
  limit: 5,
  key: "",
  role: undefined
})
// 用户权限映射
const roleOptions = [{
  value: 1,
  label: "管理员"
}, {
  value: 2,
  label: "用户"
}, {
  value: 3,
  label: "游客"
}]


//默认参数
const data = reactive({

  list: [], // 数据
  selectedRowKeys: [], // 选择的id列表
  count: 0, // 总数
  spinning: true, // 默认是在加载中
})


// 添加用户的modal
function addModal() {
  data.modalVisible = true
}

// 选择复选框
function onSelectChange(selectedKeys) {
  data.selectedRowKeys = selectedKeys
}

// 获取列表页数据
async function getData() {
  data.spinning = true
  let res = await baseListApi(props.baseUrl,page)
  data.list = res.data.list
  data.count = res.data.count
  data.spinning = false
}

// 分页
function pageChange(page, limit) {
  getData()
}

// 更新用户的模态框函数
function updateModel(record) {
  data.modalUpdateVisible = true
}

// 删除单个用户
async function userRemove(user_id) {
  emits("delete", [user_id])
}

// 批量删除
async function removeBatch() {
  emits("delete", data.selectedRowKeys)
}

// 刷新
function refresh() {
  message.success("刷新成功")
  // location.reload()
  getData()
}

function onSearch() {
  page.key = page.key.trim()
  page.page = 1
  getData()
}

// 重新加载
getData()
</script>

<style lang="scss">
.gvb_container {
  background-color: var(--card_bg);

  .gvb_search {
    padding: 10px;
    border-bottom: 1px solid var(--bg);
    position: relative;

    .gvb_select {
      margin-left: 10px;
    }

    .gvb_refresh {
      position: absolute;
      right: 10px;
      top: 10px;

      i {
        color: var(--text);
      }
    }
  }

  .gvb_actions {
    padding: 10px;

    .ant-btn {
      margin-right: 10px;
    }
  }

  .gvb_tables {
    padding: 0 10px 10px 10px;
  }

  .gvb_pages {
    display: flex;
    justify-content: center;
    padding: 10px;
    margin-bottom: 10px;
  }

  .gvb_table_avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .gvb_table_action.update {
    margin-right: 10px;
  }

}
</style>