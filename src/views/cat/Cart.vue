<template>
    <div class="cart">
      <nav-bar class="nav-bar">
        <template v-slot:center>
          <div >购物车({{cartLength}})</div>
        </template>
      </nav-bar>
<!--      //商品列表-->
      <cart-list></cart-list>
<!--      底部汇总-->
      <CartBottomBar></CartBottomBar>
    </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from "vuex"

    export default {
        name: "Cart",
      components: {
          NavBar,
        CartList,
        CartBottomBar
      },
      computed: {
        ...mapGetters(['cartLength'])
      }
    }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #ffffff;
  font-weight: 700;
}
</style>
