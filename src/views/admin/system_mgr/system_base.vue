<template>
  <div class="gvb_settings_bg">
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
    <!--<router-view/>-->
  </div>
</template>


<style>
.gvb_settings_bg {
  background-color: var(--card_bg);
  min-height: calc(100vh - 130px);
  border-radius: 5px;
  display: flex;
  justify-content: center;
}
</style>