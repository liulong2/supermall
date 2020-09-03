<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="detailImgLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
        <good-list :goods="recommends"></good-list>
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
      }
    },
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
