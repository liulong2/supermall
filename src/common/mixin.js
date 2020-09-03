import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,300);

    //监听item图片加载完成
    this.itemImgListener = () =>{
      // this.$refs.scroll.refresh()
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    console.log("zzzzzzzzzzzzzz")
    console.log("zzzzzzzzzzzzzz")
  }
}
