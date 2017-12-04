<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[index]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from  '../star/star.vue';

  export default {
    name: 'header',
    props: {//父组件传数据给子组件
      seller: {
        type: Object
      }
    },
    components: {
      'v-star' : star
    },
    data(){
      return {
        detailShow: false
      };
    },
    methods:{
      showDetail() {
         this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    position: relative;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  .header .content-wrapper {
    position: relative;
    padding: 0.48rem 0.24rem 0.36rem 0.48rem;
    font-size: 0;
  }

  .content-wrapper .avatar {
    display: inline-block;
  }

  .content-wrapper .content {
    display: inline-block;
    font-size: 0.28rem;
    margin-left: 0.32rem;
  }

  .avatar img {
    display: inline-block;
    width: 1.28rem;
    height: 1.28rem;
  }

  .content .title {
    margin: 0.04rem 0 0.16rem 0;
  }

  .content .brand {
    display: inline-block;
    vertical-align: top;
    width: 0.6rem;
    height: 0.36rem;
    background: url("brand@2x.png");
    background-repeat: no-repeat;
    background-size: contain;
  }

  .content .name {
    margin-left: 0.12rem;
    font-size: 0.32rem;
    line-height: 0.36rem;
    font-weight: bold;
  }

  .content .description {
    margin-bottom: 0.2rem;
    line-height: 0.24rem;
    font-size: 0.24rem;
  }

  /*定义icon*/
  .support .icon {
    display: inline-block;
    vertical-align: top;
    width: 0.24rem;
    height: 0.24rem;
    margin-left: 0.08rem;
    background-size: contain !important;
    background-repeat: no-repeat !important;
  }

   .decrease {
    background: url("decrease_1@2x.png");
  }

   .discount {
    background: url("discount_1@2x.png");
  }

   .guarantee {
    background: url("guarantee_1@2x.png");
  }

   .invoice {
    background: url("invoice_1@2x.png");
  }

   .special {
    background: url("special_1@2x.png");
  }

  .support .text {
    line-height: 0.24rem;
    font-size: 0.2rem;
    vertical-align: top;
  }

  .support-count {
    position: absolute;
    right: 0.24rem;
    bottom: 0.36rem;
    padding: 0 0.16rem;
    height: 0.48rem;
    line-height: 0.48rem;
    border-radius: 0.28rem;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .support-count .count {
    font-size: 0.2rem
  }

  .support-count .icon-keyboard_arrow_right {
    margin-left: 0.04rem;
    line-height: 0.48rem;
    font-size: 0.2rem;
  }

  .bulletin-wrapper {
    position: relative;
    height: 0.56rem;
    line-height: 0.56rem;
    padding: 0 0.44rem 0 0.24rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);
    /*font-size: 0;*/
  }

  .bulletin-wrapper .bulletin-title {
    margin-top: 0.14rem;
    vertical-align: top;
    display: inline-block;
    width: 0.44rem;
    height: 0.24rem;
    background: url("bulletin@2x.png");
    background-size: contain;
    background-repeat: no-repeat;
  }

  .bulletin-wrapper .bulletin-text {
    vertical-align: top;
    margin: 0 0.08rem;
    font-size: 0.2rem;
  }

  .bulletin-wrapper .icon-keyboard_arrow_right {
    position: absolute;
    top: 0.08rem;
    right: 0.24rem;
    margin-left: 0.04rem;
    line-height: 0.48rem;
    font-size: 0.2rem;
  }

  .header .background img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(10px);
  }

  .header .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7,17,0,0.8);
    backdrop-filter: blur(10px);/*仅支持苹果*/
  }
  /*vue的过度属性*/
   .fade-enter-active,.fade-leave-active{
     transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
    background-color: rgba(7,17,0,0);
  }

  .detail .detail-wrapper{
    width: 100%;
    min-height: 100%;
  }
  .detail .detail-wrapper .detail-main{
    margin-top: 1.28rem;
    padding-bottom: 1.28rem;
    width: 100%;
  }
  .header .clearfix{
    display: inline-block;
  }
  .header .clearfix :after{
    display: block;
    content: ".";
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
  .header .icon-close{
    position: relative;
    display: inherit;
    width: 0.64rem;
    height: 0.64rem;
    margin: -1.28rem auto 0 auto;
    clear: both;
    font-size: 0.64rem;
  }
  .detail-main .name{
    line-height: 0.32rem;
    text-align: center;
    font-size: 0.32rem;
    font-weight: 700;
  }
  .star-wrapper{
    margin-top: 0.36rem;
    padding: 0.04rem 0;
    text-align: center;
  }

  .detail-wrapper .title{
    display: flex;
    width: 80%;
    margin: 0.56rem auto 0.48rem auto;
  }
  .title .line{
    flex: 1;
    position: relative;
    top: -0.12rem;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .title .text{
    padding: 0 0.24rem;
    font-weight: 700;
    font-size: 0.28rem;
  }
  .detail-wrapper .bulletin{
    width: 80%;
    margin: 0 auto;
    padding: 0 0.24rem;
    line-height: 0.48rem;
    font-size: 0.24rem;
  }
  .supports{
    width: 80%;
    margin: 0 auto;
  }
  .supports .support-item{
    padding: 0 0.24rem;
    margin-bottom: 0.24rem;
    font-size: 0;
  }
  .supports .support-item:last-child{
    margin-bottom: 0;
  }
  .supports .icon{
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    vertical-align: top;
    margin-right: 0.24rem;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .supports .text{
    font-size: 0.24rem;
    line-height: 0.32rem;
  }
</style>
