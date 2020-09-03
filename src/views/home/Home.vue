<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControlNew" class="tab-control" v-show="isTabFixed"></tab-control>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore" >

        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
        <recommend-view :recommdes="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl"></tab-control>
        <good-list :goods = "showGoods"></good-list>

      </scroll>
      <back-top @click.native="backClicks" v-show="isShow"></back-top>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import GoodList from "../../components/content/goods/GoodList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGood} from "network/home";
  import {debounce} from "../../common/utils";
  import {itemListenerMixin} from "../../common/mixin";


  export default {
        name: "Home",
      components: {
          NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodList,
        Scroll,
        BackTop
      },
    mixins: [itemListenerMixin],
    data() {
       return {
         banners: [],
         recommends: [],
         goods: {
           'pop': {page: 0,list: []},
           'new': {page: 0,list: []},
           'sell': {page: 0,list: []}
         },
         currentType: 'pop',
         isShow: false,
         tabOffsetTop: 0,
         isTabFixed: false,
         saveY: 0,
         // itemImgListener: null
       }
    },
    created() {
      this.getHomeMultidataMe()
      this.getHomeGoodsMe('pop')
      this.getHomeGoodsMe('new')
      this.getHomeGoodsMe('sell')


    },
    computed: {
         showGoods() {
           return this.goods[this.currentType].list
         }
    },
    mounted() {

      /*const refresh = debounce(this.$refs.scroll.refresh,300);

      //监听item图片加载完成
      this.itemImgListener = () =>{
        // this.$refs.scroll.refresh()
        refresh()
      }
      this.$bus.$on('itemImageLoad',this.itemImgListener)*/

    },
    activated() {
      // console.log(this.saveY);
      this.$refs.scroll.scrollTo(0,this.saveY,100)
      this.$refs.scroll.refresh()
    },
    deactivated() {
          //保存y值
      this.saveY = this.$refs.scroll.getScrollY()
      //取消全局时间的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods: {


          /**
           * 事件监听
           * */
      tabClick(index) {
            switch (index) {
              case 0:
                this.currentType = 'pop'
                    break
              case 1:
                this.currentType = 'new'
                    break
              case 2:
                this.currentType = 'sell'
            }
            this.$refs.tabControlNew.currentIndex = index
            this.$refs.tabControl.currentIndex = index
          },
      backClicks() {
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position) {
        // console.log(position);
          //判断是否显示
          this.isShow =  position.y <= -900

        //判断是是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('上拉加载');
        this.getHomeGoodsMe(this.currentType)
      },
          /**
           * 网络请求方法
           * */
      getHomeMultidataMe() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoodsMe(type) {
        const page = this.goods[type].page + 1
        getHomeGood(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          // console.log(this.goods[type].list);
          this.goods[type].page += 1
          // this.$refs.scroll.refresh()
          this.$refs.scroll.finishPullUp()
        })/*.catch(err => {
        throw err
      })*/
      },
      swiperImageLoad() {
        //  获得tabControl的offsetTop
        // console.log(this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop);
        //因为图片是异步加载的所以要等轮播图加载完,才能计算offsettop(到顶部的高度)
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      }

    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;

    position: relative;
  }


  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;*/

    z-index: 9;
  }
  /*todo 使用定位执行宽带确定*/
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/
  .tab-control {
    /*display: none;*/
    position: relative;
    z-index: 9;
  }
</style>
