<template>
  <div class="check-button" :class="{check: isChecked}">
    <div class="icon-selector" >
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>

  </div>
</template>

<script>
    export default {
        name: "CheckButton",
      props: {
          isChecked: {
            type: Boolean,
            default: false
          }
      }
    }
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border: 1px solid #a3a3a5;
}
  .check {
    background-color: red;
    border: 1px solid red;
  }
</style>
