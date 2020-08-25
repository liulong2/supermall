<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll" :pull-up-load="true" >
<!--        @pullingUp="loadMore"-->
        <home-swiper :banners="banners" />
        <recommend-view :recommdes="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control"
                     :titles="['流行','新款','精选']"
                     @tabClick="tabClick"></tab-control>
        <good-list :goods = "showGoods"></good-list>

      </scroll>
      <back-top @click.native="backClick" v-show="isShow"></back-top>
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
         isShow: false
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

      const refresh = this.debounce(this.$refs.scroll.refresh,500);

      //监听item图片加载完成
      this.$bus.$on('itemImageLoad',() =>{
        // this.$refs.scroll.refresh()
        refresh()
      })
    },
    methods: {
          debounce(func, delay) {
            let timer = null
            return (...args) =>{
              if (timer) clearTimeout(timer)
              timer = setTimeout(() => {
                func.apply(this, args)
              }, delay)
            }
          },

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
          },
      backClick() {
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position) {
        // console.log(position);

          this.isShow =  position.y <= -900

      },
      /*loadMore() {
        console.log('上拉加载');
        this.getHomeGoodsMe(this.currentType)
      },*/
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

          // this.$refs.scroll.finishPullUp()
        })/*.catch(err => {
        throw err
      })*/
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;

    position: relative;
  }


  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
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
</style>
