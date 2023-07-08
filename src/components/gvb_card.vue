<template>
  <div class="gvb_card_view">
    <div class="title">
      <h2>{{ props.title }}</h2>
      <a v-if="props.link_name!==''" :href="props.link">{{ props.link_name }}</a>
    </div>
    <div :class="{body: true, top20: top20}">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  link_name: {
    type: String,
  },
  top20: {
    type: Boolean
  }
})

</script>

<style lang="scss">
.gvb_card_view {


  .title {
    padding: 20px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px 5px 0 0;
    background-color: var(--card_bg);

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: var(--h2);
    }

    a {
      color: var(--text);
    }
  }

  .body {
    border-radius: 0 0 5px 5px;
    background-color: var(--card_bg);
    margin-top: 1px;
    padding: 10px 20px 20px 20px;
  }

  .body.top20 {
    padding: 20px;
  }
}
</style>
