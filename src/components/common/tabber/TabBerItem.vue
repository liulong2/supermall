<template>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActivity"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-acitvity"></slot></div>
      <div :style="actiityColor"><slot  name="item-text"></slot></div>

      <!--<img src="../../assets/img/tabbar/1.jpg" alt="">
      <div>首页</div>-->
    </div>
</template>

<script>
    export default {
        name: "TabBerItem",
        props: {
            path: String,
            activityColor: {
              type: String,
              default:'red'
            }
        },
      data() {
        return{
          // isAcitvity: true
        }
      },
      computed: {
          isActivity() {
            return this.$route.path.indexOf(this.path) !== -1
          },
        actiityColor() {
            return this.isActivity ?  {color: this.activityColor} : {}
        }

      },
        methods: {
            itemClick() {
                this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .activity{
    color: red;
  }
</style>
