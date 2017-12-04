<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接.  -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <div class="tab-item">
        <router-link to="/goods" class="active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
      <!-- 路由出口 -->
    </div>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view  :seller="seller"></router-view>
    <div class="content" id="content">
    </div>
  </div>
</template>

<script>
  //引用header.vue
  import header from './components/header/header.vue';
  import axios from 'axios';

  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      // Make a request for a user with a given ID 获取接口
      axios.get('./api/seller')
        .then(response => {
          this.seller = response.data.seller;
          console.log(this);
        })
        .catch(error => {
          console.log(error);
          alert('网络错误，不可访问');
        });
    },
    components: {
      'v-header': header
    }
  }


</script>

<style>
  /*vue的过度属性*/
  .fade-enter-active,.fade-leave-active{
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
    background-color: rgba(7,17,0,0);
  }

  #app .tab {
    display: flex;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 0.01rem solid rgba(1, 17, 27, 0.1);
  }

  .tab .tab-item {
    flex: 1;
    text-align: center;
  }

  .tab a {
    width: 100%;
    display: block;
    color: rgb(77, 85, 93);
  }

  .tab .router-link-active {
    color: #f01414;
  }
</style>
