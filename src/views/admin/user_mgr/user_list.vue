<!--用户管理-用户列表-->
<template>
  <div>
    <a-modal v-model:visible="data.modalVisible" title="添加用户" @ok="handleOk">
      <a-form
          :model="formState"
          name="basic"
          ref="formRef"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
          autocomplete="off"
      >
        <a-form-item label="用户名" name="user_name" has-feedback
                     :rules="[{ required: true, message: '请输入用户名' ,trigger:'blur'}]">
          <a-input v-model:value="formState.user_name" placeholder="用户名"/>
        </a-form-item>

        <a-form-item label="昵称" name="nick_name" has-feedback
                     :rules="[{ required: true, message: '请输入昵称' ,trigger:'blur'}]">
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
    <a-modal v-model:visible="data.modalUpdateVisible" title="编辑用户" @ok="update">
      <a-form
          :model="formUpdateState"
          name="basic"
          ref="formRef"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
          autocomplete="off"
      >
        <a-form-item label="昵称" name="nick_name" has-feedback
                     :rules="[{ required: true, message: '请输入昵称' ,trigger:'blur'}]">
          <a-input v-model:value="formUpdateState.nick_name" placeholder="昵称"/>
        </a-form-item>

        <a-form-item label="权限" name="role" :rules="[{ required: true, message: '请选择权限' ,trigger:'blur'}]">
          <a-select
              v-model:value="formUpdateState.role"
              style="width: 200px"
              :options="roleOptions"
              placeholder="请选择权限"
          ></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <GVBTable
        @delete="removeBatch"
        :columns="data.columns"
        base-url="/api/users"
        like-title="搜索用户昵称"
        ref="gvbTable"
        :page-size="5"
    >
      <template #add>
        <a-button type="primary" @click="data.modalVisible =true">添加</a-button>
      </template>
      <template #edit="{record}">
        <a-button class="gvb_table_action update" @click="updateModel(record)" type="primary">编辑</a-button>
      </template>
      <template #delete="{record}">
        <a-button class="gvb_table_action update" @click="userRemove(record)" type="danger">删除</a-button>
      </template>
      <template #cell="{column,record}">
        <template v-if="column.key === 'avatar'">
          <img class="gvb_table_avatar" :src="record.avatar" alt="">
        </template>
      </template>
      <template #filters>
        <a-select
            class="gvb_select"
            v-model:value="filter"
            style="width: 200px"
            allowClear
            @change="onFilter"
            :options="roleOptions"
            placeholder="选择权限"
        ></a-select>
      </template>
    </GVBTable>
  </div>
</template>

<script setup>
import GVBTable from "@/components/admin/gvb_table.vue";
import {userCreateApi, userUpdateUserRoleApi,userRemoveBatchApi} from "@/api/user_api";
import {message} from "ant-design-vue";
import {reactive, ref} from "vue";

// 表单ref
const formRef = ref(null)
const gvbTable = ref(null)
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
}, {
  value: 4,
  label: "黑名单"
}]
const _formState = {
  user_name: "",
  password: "",
  re_password: "",
  nick_name: "",
  role: 2,
}
const formState = reactive({
  user_name: "",
  password: "",
  re_password: "",
  nick_name: "",
  role: 2,
})
const formUpdateState = reactive({
  nick_name: "",
  role: undefined,
  user_id: 0,
})

const filter = ref(undefined)

function onFilter() {
  // console.log(filter.value)
  gvbTable.value.ExportList({role: filter.value})
}

// 验证密码和确认密码是否一致
let validateRePassword = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password again');
  } else if (value !== formState.password) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};

//默认参数
const data = reactive({
  modalVisible: false, // 创建用户的modal
  modalUpdateVisible: false,// 编辑用户的modal
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
  ], // 列参数
})

// 批量删除
async function removeBatch(userIdList) {
    let res = await userRemoveBatchApi(userIdList)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  gvbTable.value.ExportList() // 更新完成刷新列表页
}


// 删除单个用户
async function userRemove(record) {
  let user_id = record.id
  let res = await userRemoveBatchApi([user_id])
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  gvbTable.value.ExportList() // 更新完成刷新列表页
}

function updateModel(record) {
  data.modalUpdateVisible = true
  // 将用户的信息赋值
  formUpdateState.user_id = record.id
  formUpdateState.nick_name = record.nick_name
  formUpdateState.role = record.role
}

// 创建用户
async function handleOk() {
  try {
    await formRef.value.validate()
  } catch (e) {
    return
  }

    // 发登录请求
    // console.log(formState)
    let res = await userCreateApi(formState)
    if (res.code) {
      message.error(res.msg)
      return
    }
    message.success(res.msg)
    data.modalVisible = false
    Object.assign(formState, _formState)
    formRef.value.clearValidate()
  gvbTable.value.ExportList() // 更新完成刷新列表页
}

// 更新用户
async function update() {
  console.log(formUpdateState)
  let res = await userUpdateUserRoleApi(formUpdateState)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  gvbTable.value.ExportList() // 更新完成刷新列表页
}


</script>

<style lang="scss">

</style>