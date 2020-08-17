<template>
    <div class="recommend">
      <div v-for="item in recommdes" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "RecommendView",
      props: {
          recommdes: {
            type: Array,
            default() {
              return [];
            }
          }
      }
    }
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px;
    border-bottom: 10px solid #eeeeee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img {
    height: 80px;
    width: 80px;
    margin-bottom: 10px;
  }
</style>
