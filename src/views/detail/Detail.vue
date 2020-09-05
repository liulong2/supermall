<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="countScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="detailImgLoad"></detail-goods-info>
        <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <good-list ref="recommend" :goods="recommends"></good-list>
      </scroll>
    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "../../components/content/goods/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodList from "../../components/content/goods/GoodList";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";
  import {itemListenerMixin} from "../../common/mixin";

  export default {
        name: "Detail",
      components: {
        DetailCommentInfo,
        DetailParamInfo,
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        GoodList
      },
    mixins: [itemListenerMixin],
      data() {
        return {
          iid: null,
          topImages: [],
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {},
          commentInfo: {},
          recommends: [],
          // itemImgListener: null
          themeTopYs: [],
          currentIndex: 0
        }
      },
      created() {
          //保存传入的iid
         this.iid = this.$route.params.iid

        //根据ood清秀详细数据
        getDetail(this.iid).then(res => {
          console.log(res);
          const data = res.result
          this.topImages = data.itemInfo.topImages

          //获取商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

          //店铺信息对象
          this.shop = new Shop(data.shopInfo)
          //保存商品的详细数据
          this.detailInfo = data.detailInfo;
          //获取商品参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          //去除评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
/*
          this.$nextTick(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopYs)
          })*/
        }).catch(err => {
          throw err
        })

        getRecommend().then(res =>{
          this.recommends = res.data.list
        })



      },
    methods: {
      detailImgLoad() {
        this.$refs.scroll.refresh()

        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 50)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop -50)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 50)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs)
      },
      titleClick(index) {
        this.currentIndex = index
        console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
      },
      countScroll(position) {
        // console.log(this.currentIndex);
        // console.log(position);
        const positionY = -position.y
        let length = this.themeTopYs.length
        for (let themeTopYsKey = 0; themeTopYsKey < length -1; themeTopYsKey++) {
          if ((this.currentIndex !== themeTopYsKey) && ((themeTopYsKey) < length -1 && positionY >= this.themeTopYs[(themeTopYsKey)]
            && positionY < this.themeTopYs[(themeTopYsKey)+1])) {
            this.currentIndex = themeTopYsKey
            this.$refs.nav.currentIndex = this.currentIndex
          }


         /* if (this.currentIndex !== themeTopYsKey && (((themeTopYsKey) < length -1 && positionY >= this.themeTopYs[(themeTopYsKey)]
            && positionY < this.themeTopYs[(themeTopYsKey)+1]) ||
            ((themeTopYsKey) === length-1 && positionY >= this.themeTopYs[(themeTopYsKey)]))) {
            this.currentIndex = themeTopYsKey
            this.$refs.nav.currentIndex = this.currentIndex
          }*/
        }
      }
    },

  /*  updated() {
          this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs);
    },*/
    mounted() {

      // console.log(1111111)
    },
    //销毁
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
  }
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 11;
  background-color: #ffffff;
  height: 100vh;
}
.detail-nav-bar{
  position: relative;
  z-index: 11;
  background-color: #ffffff;
}
  .content{
    height: calc(100% - 44px);
  }
</style>
