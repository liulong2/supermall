<template>
  <tab-ber>
    <tab-ber-item  path="/home" >
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-acitvity" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-ber-item>
    <tab-ber-item path="/category" >
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-acitvity" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-ber-item>
    <tab-ber-item path="/cart" >
      <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="">
      <img slot="item-icon-acitvity" src="~assets/img/tabbar/cart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-ber-item>
    <tab-ber-item path="/profile">
      <img  slot="item-icon"  src="~assets/img/tabbar/profile.svg" alt="">
      <img  slot="item-icon-acitvity" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-ber-item>
  </tab-ber>
</template>

<script>
  import TabBer from "components/common/tabber/TabBer";
  import TabBerItem from "components/common/tabber/TabBerItem";
    export default {
        name: "MainTabBar",
      components: {
          TabBer,
          TabBerItem
      }
    }
</script>

<style scoped>

</style>
