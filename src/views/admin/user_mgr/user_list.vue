<template>
  <div class="gvb_container">
    <div class="gvb_search">
      <a-input-search
          placeholder="input search text"
          style="width: 200px"
      />
    </div>
    <div class="gvb_actions">
      <a-button type="primary">Primary Button</a-button>
      <a-button>Default Button</a-button>
    </div>
    <div class="gvb_tables">

      <a-table :columns="data.columns" :pagination="false" :data-source="data.list">

      </a-table>

    </div>
    <div class="gvb_pages">
      <a-pagination
          show-less-items
          v-model:current="page.page"
          v-model:page-size="page.limit"
          :total="85"
          :show-total="total => `共 ${total} 条`"
      />
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";

const page = reactive({
  page:1,
  limit:10
})


const data = reactive({
  columns: [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
    }
  ],
  list: [
    {
      name: "茜茜",
      age: 18,
      data: "2023-04-09 04-09-00"
    }
  ]
})
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
  .gvb_pages{
display:flex;
    justify-content: center;
    padding: 10px;
    margin-bottom: 10px;
  }

}

</style>