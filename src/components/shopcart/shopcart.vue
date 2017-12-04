<!--购物车组件-->
<template>
  <div class="shopcart">
    <div class="content" >
      <div class="content-left" @click="toggleList">
        <div class="logo-wrapper">
          <transition name="inner"
                      v-on:before-enter="beforeEnter"
                      v-on:enter="enter"
                      v-on:after-enter="afterEnter"
                      v-bind:css="false">
            <div ref="inner" class="inner" v-if="show"></div>
          </transition>
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
      <!--购物车组件-->
      <transition name="hold">
        <div class="shopcart-list" v-show="listshow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listcontent" >
            <ul>
              <li class="food" v-for="food in sellectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!--黑色背景-->
    <transition name="fade">
      <div class="list-mask" v-show="listshow" @click="hidelist"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Velocity from 'velocity-animate';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import bus from '../bus.js'
  export default {
    name : 'shopcart',
    data(){
      return{
        top: 0,
        right: 0,
        show:false,
        fold: true
      };
    },
    components:{
      'v-cartcontrol': cartcontrol
    },
    props:{
      sellectFoods:{
        type: Array,
        default() {
          return [
            {
              price :10, //单价
              count :1   //数量
            }
          ];
        }
      },
      deliveryPrice:{
        type : Number,
        default : 0
      },
      minPrice:{
        type : Number,
        default : 0 //默认值
      }
    },
    computed:{//计算属性
      totalPrice(){
        let total = 0;
        this.sellectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount(){//件数
        let count = 0;
        this.sellectFoods.forEach((food) => {
            count += food.count;
        });
        return count;
      },
      payDesc() {
        if(this.totalPrice === 0){
           return '￥'+this.minPrice+'元起送';
        }else if(this.totalPrice<this.minPrice){
          let diff = this.minPrice - this.totalPrice;
           return '还差￥'+diff+'元起送';
        }else{
          return '去结算';
        }
      },
      payClass(){
        if(this.totalPrice < this.minPrice){
            return 'not-enough';
        }else{
          return 'enough';
        }
      },
      listshow(){//监听计算属性
        if (!this.totalCount){
           this.fold = true;
           return false;
        }
        let show = !this.fold;
        console.log(this.scroll);
        this.$nextTick(()=>{
          //避免多次绑定scroll
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listcontent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
        return show;
      }
    },
    methods:{
      drop(el){
        console.log(el);
        this.top = el.offsetY*-1;
        this.right = el.offsetX+40;
          this.show = !this.show;
      },
      toggleList(){
          if (this.totalCount === 0){
             return;
          }
          this.fold = !this.fold;
      },
      empty(){
        console.log(this.sellectFoods);
        this.sellectFoods.forEach((food) =>{
            food.count =0;
        });
      },
      pay(){
        if (this.totalPrice<this.minPrice){
            return;
        }else{
          alert('支付'+this.totalPrice+'元')
        }
      },
      hidelist(){
        this.fold =true;
      },
      beforeEnter: function (el) {
        el.style.opacity = 1;
        console.log('beforeEnter');
        Velocity(el, {
          right: this.right+'px',
          top: this.top+'px'
        }, {
          duration: 0
        });
      },
      enter: function (el, done) {
        let top = (this.top-30)*-1;
        let right = this.right-20;
        console.log('enter');
        //translateX: right
        Velocity(el, {
          translateY: top
        }, {
          duration: 500,
          easing: [.24,-0.56,.83,-0.34],  //运功模式轨迹
          complete: () => {
            this.show = !this.show;
//            this.$nextTick(()=>{
//              this.scroll = new BScroll(this.$refs.listcontent, {
//                click: true
//              });
//            });
          },
          queue: false  //是否单个运行
        });
        Velocity(el, {
          translateX: right
        }, {
          duration: 500
        });
      },
      afterEnter: function (el) {
        el.style.opacity = 0;
        console.log('afterEnter');
      },
    },
    created(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .shopcart{
     position: fixed;
     left: 0;
     bottom: 0;
     z-index: 50;
     width: 100%;
     height: 0.96rem;
   }
   .shopcart .content{
     display: flex;
     background-color: #141d27;
     font-size: 0;
     color: rgba(255,255,255,0.4);
   }
   .shopcart .content-left{
     flex: 1;
   }
   .content-left .logo-wrapper{
     display: inline-block;
     position: relative;
     top: -0.2rem;
     margin: 0 0.24rem;
     padding: 0.12rem;
     width: 1.12rem;
     height: 1.12rem;
     box-sizing: border-box;
     vertical-align: top;
     border-radius: 50%;
     background-color: #141d27;
   }
   .logo-wrapper .inner{
     position: absolute;
     z-index: 100;
     top: 0.3rem;
     right: 0.35rem;
     width: 0.42rem;
     height: 0.42rem;
     border-radius: 50%;
     background-color: rgb(0,160,220);
   }
   .logo-wrapper .num{
     position: absolute;
     top: 0;
     right: 0;
     width: 0.48rem;
     height: 0.32rem;
     line-height: 0.32rem;
     text-align: center;
     border-radius: 0.32rem;
     font-size: 0.18rem;
     font-weight: 700;
     color: #fff;
     background-color: rgb(240,20,20);
     box-shadow: 0 0.08rem 0.16rem 0 rgba(0,0,0,0.4);
   }
   .logo-wrapper .logo{
     text-align: center;
     width: 100%;
     height: 100%;
     border-radius: 50%;
     background-color: #2b343c;
   }
   .logo-wrapper i{
     line-height: 0.88rem;
     font-size: 0.48rem;
     color: #80858a;
   }
   .logo-wrapper .highlight{
     background: rgb(1,160,220);
     color: #fff;
   }
   .content-left .price{
     display: inline-block;
     margin-top: 0.24rem;
     vertical-align: top;
     line-height: 0.48rem;
     padding-right: 0.24rem;
     box-sizing: border-box;
     border-right: 1px solid rgba(255,255,255,0.1);
     font-size: 0.32rem;
     font-weight: 700;
   }
   .content-left .highlight{
     color: #fff;
   }
   .content-left .desc{
     display: inline-block;
     vertical-align: top;
     line-height: 0.48rem;
     margin: 0.24rem;
     font-size: 0.2rem;
   }
   .shopcart .content-right{
     flex: 0 0 2.1rem;
     width: 2.1rem;
   }
   .content-right .pay{
     height: 0.96rem;
     line-height: 0.96rem;
     text-align: center;
     font-size: 0.24rem;
     font-weight: 700;
     background-color: #2b333b;
   }
   .content-right .not-enough{
     background-color: #2b333b;
   }
   .content-right .enough{
     background-color: #00b43c;
     color: #fff;
   }
   .ball-container .ball{
     position: fixed;
     left: 0.64rem;
     bottom: 0.44rem;
     z-index: 200;
   }
   .ball-container .inner{
     width: 0.32rem;
     height: 0.32rem;
     border-radius: 50%;
     background: rgb(0,160,220);
     transition: all 0.4s;
   }
   /*购物车列表*/
   .shopcart-list {
     position: absolute;
     left: 0;
     bottom: 0.96rem;
     z-index: -1;
     width: 100%;
     color: #666;
     font-size: 0.28rem;
   }
   .shopcart-list .list-header{
     height: 0.8rem;
     line-height: 0.8rem;
     padding: 0 0.36rem;
     background-color: #f3f5f7;
     border-bottom: 1px solid rgba(7,17,27,0.1);
   }
   .list-header .title{
     float: left;
     font-size: 0.28rem;
     color: rgb(7,17,27);
   }
   .list-header .empty{
     float: right;
     font-size: 0.24rem;
     color: rgb(1,160,220);
   }
   .shopcart-list .list-content{
     padding: 0 0.36rem;
     max-height: 4.34rem;
     overflow: hidden;
     background: #fff;
   }
   .list-content .food{
     position: relative;
     padding: 12px 0;
     box-sizing: border-box;
     border-bottom: 0.01rem solid rgba(7,17,27,0.1);
   }
   .list-content .name{
     line-height: 0.48rem;
     font-size: 0.28rem;
     color: rgb(7,17,27);
   }
   .list-content .price{
     position: absolute;
     right: 1.8rem;
     bottom: 0.24rem;
     line-height: 0.48rem;
     font-size: 0.28rem;
     font-weight: 700;
     color: rgb(240,20,20);
   }
   .list-content .cartcontrol-wrapper{
     position: absolute;
     right: 0;
     bottom: 0.12rem;
   }
   .shopcart .list-mask{
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     z-index: -2;
     background-color: rgba(7,17,27,0.6);
   }
   /*vue的过度属性 */
   .hold-enter-active,.hold-leave-active{
     transition: all .5s;
   }
   .hold-enter, .hold-leave-to /* .fade-leave-active in below version 2.1.8 */ {
     opacity: 0;
     transform: translate3d(0, 1rem, 0px)
   }
   .hold-enter, .hold-leave-to{
     opacity: 0;
   }
   /*vue的过度属性*/
   .fade-enter-active,.fade-leave-active{
     transition: opacity .5s;
   }
   .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
     opacity: 0;
     background-color: rgba(7,17,0,0);
   }
</style>
