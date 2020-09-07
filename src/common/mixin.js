import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

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

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    backClicks() {
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }

}
