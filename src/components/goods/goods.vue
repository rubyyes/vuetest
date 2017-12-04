<template>
  <div class="goods">
    <div class="menu-warpper" ref="menuWarpper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item"
            :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" :class="classMap[index]" class="icon"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-warpper" ref="foodWarpper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="sellectFood(food,$event)" v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="contcontrol-wrapper">
                  <!--@自定义名字一般为调用子组件方法-->
                  <v-cartcontrol @cartadd="cartadd" :food="food"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart ref="shopcart"  :sellectFoods="sellectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
    <v-food :food="vFood" ref="food"></v-food>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import food from '../food/food.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  export default {
    name: 'goods',
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        foods:[],
        vFood:[]
      }
    },
    components: {
      'v-shopcart': shopcart,
      'v-cartcontrol': cartcontrol,
      'v-food': food
    },
    props: {
      seller: {
        type: Object
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      sellectFoods(){
        let foods = [];
        this.goods.forEach((good)=>{
            good.foods.forEach((food)=>{
              if (food.count){
                  foods.push(food);
              }
            });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      axios.get('./api/goods')
        .then(response => {
          this.goods = response.data.seller;
          //判断是否已经插入数据
          this.$nextTick(() => {
            this.initScroll();
            this.calculateHeight();
          });
          console.log(this);
        })
        .catch(error => {
          console.log(error);
          alert('网络错误，不可访问');
        });
    },
    methods: {
      cartadd(el){
        //调用子组件方法
        this.$refs.shopcart.drop(el);
      },
      selectMenu(index, event) {//左侧点击方法
        //PC端重复点击bug修复
        if (event.composed) {
          return;
        }
        let foodList = this.$refs.foodWarpper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        // scrollToElement是BScroll里的方法
        this.footScroll.scrollToElement(el, 300);
      },
      sellectFood(food,event){
        //PC端重复点击bug修复
        if (event.composed) {
          return;
        }
        console.log(food);
        this.vFood = food;
        this.$refs.food.show();
      },
      initScroll() {
        console.log(this.$refs);
        //BScroll插件创建滚动
        this.meunScroll = new BScroll(this.$refs.menuWarpper, {
          click: true
        });
        this.footScroll = new BScroll(this.$refs.foodWarpper, {
          click: true,
          probeType: 3
        });
        //算出footScroll滑动Y轴距离
        this.footScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      calculateHeight() {
        let foodList = this.$refs.foodWarpper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
        console.log(this.listHeight);
      }
    },
    mounted(){//监听函数
    },
    beforeCreate(){//组件创建前
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

  .goods {
    display: flex;
    position: absolute;
    top: 3.54rem;
    bottom: 0.92rem;
    width: 100%;
    overflow: hidden;
  }

  /*左侧*/
  .goods .menu-warpper {
    flex: 0 0 1.6rem;
    width: 1.6rem;
    background-color: #f3f5f7;
  }

  .menu-warpper .menu-item {
    display: table;
    width: 1.12rem;
    min-height: 1.08rem;
    line-height: 0.28rem;
    padding: 0 0.24rem;
  }

  .menu-warpper .icon {
    display: inline-block;
    vertical-align: top;
    width: 0.24rem;
    height: 0.24rem;
    margin-left: 0.04rem;
    background-size: contain !important;
    background-repeat: no-repeat !important;
  }

  .menu-warpper .text {
    display: table-cell;
    font-size: 0.24rem;
    vertical-align: middle;
    border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
  }

  .menu-warpper .current {
    position: relative;
    z-index: 10;
    margin-top: -0.02rem;
    background: #fff;
    font-weight: 700;
  }

  .menu-warpper .current .text {

  }

  /*右侧*/
  .goods .food-warpper {
    flex: 1;
  }

  .food-warpper .title {
    padding-left: 0.28rem;
    height: 0.52rem;
    line-height: 0.52rem;
    border-left: 0.04rem solid #d9dde1;
    font-size: 0.24rem;
    color: rgb(147, 153, 159);
    background-color: #f3f5f7;
  }

  .food-warpper .food-item {
    position: relative;
    display: flex;
    margin: 0.36rem;
    border-bottom: 0.01rem solid rgba(1, 17, 27, 0.1);
    padding-bottom: 0.36rem;
  }

  .food-warpper .food-item:last-child {
    border-bottom: none;
  }

  .food-warpper .icon {
    flex: 0 0 1.14rem;
    margin-right: 0.2rem;
  }

  .food-warpper .icon img {
    width: 1.14rem;
  }

  .food-warpper .content {
    flex: 1;
  }

  .food-warpper .content .name {
    margin: 0.04rem 0 0.16rem 0;
    height: 0.28rem;
    line-height: 0.28rem;
    font-size: 0.28rem;
    color: rgb(7, 17, 27);
  }

  .food-warpper .content .desc, .food-warpper .content .extra {
    line-height: 0.2rem;
    font-size: 0.2rem;
    color: rgb(147, 153, 159);
  }

  .food-warpper .content .desc {
    margin-bottom: 0.16rem;
    line-height: 0.24rem;
  }

  .food-warpper .content .extra {
    line-height: 0.2rem;
  }

  .food-warpper .content .count {
    margin-right: 0.2rem;
  }

  .food-warpper .price {
    font-weight: 700;
    line-height: 0.48rem;
  }

  .food-warpper .now {
    margin-right: 0.16rem;
    font-size: 0.28rem;
    color: rgb(240, 20, 20);
  }

  .food-warpper .old {
    text-decoration: line-through;
    font-size: 0.2rem;
    color: #999;
  }

  .contcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
  }
</style>
