<!--用户管理-用户列表-->
<template>
  <div class="gvb_container">
    <a-modal v-model:visible="data.modalVisible" title="添加用户" @ok="handleOk">
      <a-form
          :model="formState"
          name="basic"
          ref="formRef"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
          autocomplete="off"
      >
        <a-form-item label="用户名" name="user_name" has-feedback :rules="[{ required: true, message: '请输入用户名' ,trigger:'blur'}]">
          <a-input v-model:value="formState.user_name" placeholder="用户名"/>
        </a-form-item>

        <a-form-item label="昵称" name="nick_name" has-feedback :rules="[{ required: true, message: '请输入昵称' ,trigger:'blur'}]">
          <a-input v-model:value="formState.nick_name" placeholder="昵称"/>
        </a-form-item>

        <a-form-item label="密码" name="password" has-feedback
                     :rules="[{ required: true, message: '请输入密码' ,trigger:'blur'}]">
          <a-input-password v-model:value="formState.password" placeholder="密码"/>
        </a-form-item>

        <a-form-item label="确认密码" name="re_password" has-feedback
                     :rules="[{ required: true, message: '请再次确认密码' },{validator:validateRePassword,message: '两次密码不一致',trigger:'blur'}]">
          <a-input-password v-model:value="formState.re_password" placeholder="确认密码"/>
        </a-form-item>

        <a-form-item label="权限" name="role" :rules="[{ required: true, message: '请选择权限' ,trigger:'blur'}]">
          <a-select
              v-model:value="formState.role"
              style="width: 200px"
              :options="roleOptions"
          ></a-select>
        </a-form-item>


      </a-form>
    </a-modal>

    <div class="gvb_search">
      <a-input-search
          placeholder="搜索用户昵称"
          style="width: 200px"
      />
    </div>
    <div class="gvb_actions">
      <a-button type="primary" @click="data.modalVisible = true">添加</a-button>
      <a-button type="danger" @click="removeBatch" v-if="data.selectedRowKeys.length">批量删除</a-button>
    </div>
    <div class="gvb_tables">

      <a-table :columns="data.columns"
               :row-selection="{
                selectedRowKeys: data.selectedRowKeys,
                onChange: onSelectChange }"
               :pagination="false"
               :row-key="data.id"
               :data-source="data.list">
        <template #bodyCell="{ column,record }">
          <template v-if="column.key === 'avatar'">
            <img class="gvb_table_avatar" :src="record.avatar" alt="">
          </template>
          <template v-if="column.key === 'created_at'">
            <span>{{ getFormatDate(record.created_at) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <a-button class="gvb_table_action update" type="primary">编辑</a-button>
            <a-button class="gvb_table_action delete" type="danger">删除</a-button>
          </template>
        </template>
      </a-table>

    </div>
    <div class="gvb_pages">
      <a-pagination
          show-less-items
          v-model:current="page.page"
          v-model:page-size="page.limit"
          :total="data.count"
          :show-total="total => `共 ${total} 条`"
      />
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {getFormatDate} from "@/utils/date";
import {userListApi} from "@/api/user_api"

const page = reactive({
  page: 1,
  limit: 10
})

const formRef = ref(null)

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

// 二次密码校验
let validateRePassword = async (_rule, value) => {
  console.log(value)
  if (value === '') {
    return Promise.reject('Please input the password again');
  } else if (value !== formState.password) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};

const formState = reactive({
  user_name: "",
  nick_name: "",
  password: "",
  re_password: "",
  role: undefined
})

console.log("user_list", import.meta.env)

const data = reactive({
  columns: [
    {title: 'id', dataIndex: 'id', key: 'id'},
    {title: '昵称', dataIndex: 'nick_name', key: 'nick_name'},
    {title: '头像', dataIndex: 'avatar', key: 'avatar'},
    {title: '邮箱', dataIndex: 'email', key: 'email'},
    {title: '角色', dataIndex: 'role', key: 'role'},
    {title: '注册来源', dataIndex: 'sign_status', key: 'sign_status'},
    {title: 'ip', dataIndex: 'ip', key: 'ip'},
    {title: '地址', dataIndex: 'addr', key: 'addr'},
    {title: '注册时间', dataIndex: 'created_at', key: 'created_at'},
    {title: '操作', dataIndex: 'action', key: 'action'},
  ],
  list: [],
  selectedRowKeys: [],
  count: 0,
  modalVisible: false,
})

// 选择用户id
function onSelectChange(selectedKeys) {
  data.selectedRowKeys = selectedKeys
}

function removeBatch() {
  console.log(data.selectedKeys)
}

// 获取用户列表
async function getData() {
  let res = await userListApi({})
  data.list = res.data.list
  data.count = res.data.count
}

async function handleOk() {
  try {
    await formRef.value.validate()
    // 发登录请求
    console.log(formState)
  } catch (e) {
  }
}

getData()

</script>

<style lang="scss">
.gvb_container {
  background-color: white;

  .gvb_search {
    padding: 10px;
    border-bottom: 1px solid var(--bg);
  }

  .gvb_actions {
    padding: 10px;

    .ant-btn {
      margin-right: 10px;
    }
  }

  .gvb_tables {
    padding: 10px;
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