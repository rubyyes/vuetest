<template>
  <div class="cartcontrol">
     <transition name="move">
       <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"
            @click.stop.prevent="decreaseCart"></div>
     </transition>
    <transition name="count">
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    </transition>
     <div class="cart-add icon-add_circle" @click.stop.prevent="addCard"></div>
     <div class="inner"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
      data(){
        return {
          foods : {
            count : 0
          }
        }
      },
      props:{
        food:{
          default(){
            return [];
          }
        }
      },
      methods:{
        //添加商品方法
        addCard(event){
          if (event.composed) {
            return;
          }
          if (!this.food.count){
            // vue数据内部添加方法
            Vue.set(this.food,'count',1)
          }else{
            this.food.count++;
          }
          //调用动画
          this.$nextTick(() => {
            console.log(event.offsetY);
            let data = {};
            data.offsetX = event.offsetX;
            data.offsetY = window.innerHeight+event.offsetY-65;
            this.$emit('cartadd', data);
          });
        },
        //减少商品方法
        decreaseCart(event){
          if (event.composed) {
            return;
          }
          if (!this.food.count){
            Vue.set(this.food,'count',1)
          }else{
            this.food.count--;
          }
        }
      },
      created () {
//        this.$on('cart-add', (text) => {
//          alert(text)
//        })
      }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cartcontrol{
    position: relative;
    font-size: 0;
  }
   .cart-decrease,.cart-count,.cart-add{
     display: inline-block;
   }
  .cart-count{
     vertical-align: top;
    width: 0.24rem;
    padding-top: 0.12rem;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.2rem;
    color: rgb(147,153,159);
  }
  .cart-decrease,.cart-add{
    position: relative;
    padding: 0.12rem;
   line-height: 0.48rem;
    font-size: 0.48rem;
    color: rgb(0,160,220);
  }
  /*vue的过度属性 */
  .move-enter-active,.move-leave-active,.count-enter-active,.count-leave-active{
    transition: all .5s;
  }
  .move-enter, .move-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
    transform:  translateX(0.6rem) rotate(360deg);
  }
  .count-enter, .count-leave-to{
    opacity: 0;
  }
</style>
