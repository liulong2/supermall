<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar class="bar"></main-tab-bar>

  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabber/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
.bar {
  z-index: 10;
}
</style>
