<template>
  <transition name="hold">
    <div v-show="showFlag" class="food" ref="food">
      <div>
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
          </div>
          <div class="cartcontrol-wrapper">
            <v-cartcontrol @cartadd="cartadd"  :food="food"></v-cartcontrol>
          </div>
          <div @click="addFrist(food,$event)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
        </div>
        <v-split v-show="food.info"></v-split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <v-split></v-split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <v-ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"
           :ratings="food.ratings"></v-ratingselect>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from  'vue';
  import cartcontrol from  '../cartcontrol/cartcontrol.vue';
  import split from '../split/split.vue';
  import ratingselect from  '../ratingselect/ratingselect.vue';
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    data(){
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    props: {
      food: {
        default(){
          return [];
        }
      }
    },
    components:{
      'v-cartcontrol': cartcontrol,
      'v-split' : split,
      'v-ratingselect' : ratingselect
    },
    methods: {
      cartadd(el){
        //调用goods的子组件方法
        this.$parent.cartadd(el);
      },
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          this.foodScroll();
        });
      },
      hide() {
        this.showFlag = false;
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.Scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.Scroll.refresh();
        });
      },
      foodScroll() {
        //避免多次绑定scroll
        if (!this.Scroll) {
          console.log('第一次');
          this.Scroll = new BScroll(this.$refs.food, {
            click: true,
            probeType: 3
          });
        } else {
          this.Scroll.refresh();
        }
      },
      addFrist(food,event){
        //PC端重复点击bug修复
        if (event.composed) {
          return;
        }
        //this.food.count = 1;
        //调用父组件方法
        console.log(event.offsetY);
        let data = {};
        data.offsetX = event.offsetX;
        data.offsetY = window.innerHeight+event.offsetY-65;
        this.$parent.cartadd(data);
        Vue.set(this.food,'count',1);
      }
    },
    created() {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0.96rem;
    z-index: 30;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
  }
  .food-content{
    position: relative;
  }
  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }

  .image-header img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .back {
    position: absolute;
    top: 0.2rem;
    left: 0;
  }

  .icon-arrow_lift {
    display: block;
    padding: 0.2rem;
    font-size: 0.4rem;
    color: #eee;
  }

  .content {
    padding: 0.36rem;
  }

  .title {
    line-height: 0.28rem;
    margin-bottom: 0.16rem;
    font-size: 0.28rem;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }

  .detail {
    margin-bottom: 0.36rem;
    line-height: 0.2rem;
    font-size: 0;
  }

  .sell-count, .rating {
    font-size: 0.2rem;
    color: rgb(147, 153, 159);
  }

  .sell-count {
    margin-right: 0.24rem;
  }

  .price {
    font-weight: 700;
    line-height: 0.48rem;
  }

  .now {
    margin-right: 0.16rem;
    font-size: 0.28rem;
    color: rgb(240, 20, 20);
  }

  .old {
    text-decoration: line-through;
    font-size: 0.2rem;
    color: #999;
  }
  .cartcontrol-wrapper{
    position: absolute;
    right: 0.24rem;
    bottom: 0.24rem;
  }
  .buy{
    position: absolute;
    right: 0.36rem;
    bottom: 0.36rem;
    z-index: 10;
    height: 0.48rem;
    line-height: 0.48rem;
    padding: 0 0.24rem;
    /*box-sizing这个属性代表padiing也属于长度宽度内*/
    box-sizing: border-box;
    border-radius: 0.24rem;
    font-size: 10px;
    color: #fff;
    background: rgb(0,160,220);
  }
  .info{
    padding: 0.36rem;
  }
  .info .title{
    line-height: 0.28rem;
    margin-bottom: 0.32rem;
    font-size: 0.28rem;
    color: rgb(7,17,27);
  }
  .info .text{
    line-height: 0.48rem;
    padding: 0 0.16rem;
    color: rgb(77,85,93);
  }
  .rating{
    padding-top: 0.36rem;
  }
  .rating .title{
    line-height: 0.28rem;
    margin-left: 0.36rem;
    font-size: 0.28rem;
    color: rgb(7,17,27);
  }
    /*vue的过度属性 */
  .hold-enter-active, .hold-leave-active {
    transition: all .5s;
  }

  .hold-enter, .hold-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    opacity: 0;
    transform: translate3d(7.5rem, 0, 0)
  }

  .hold-enter, .hold-leave-to {
    opacity: 0;
  }
</style>
