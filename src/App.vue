<template>
  <div id="app">

    <main-tab-bar class="bar"></main-tab-bar>
    <router-view></router-view>
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
