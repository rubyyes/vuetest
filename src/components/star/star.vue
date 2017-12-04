<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGHT = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    name : 'v-star',
    props:{//数据属性
       size:{
         type: Number
       },
       score:{
         type: Number
       }
    },
    computed:{//计算属性
      starType(){
        return 'star-' + this.size
      },
      itemClasses(){
        let result = [];
        let score = Math.floor(this.score*2)/2;
        let hasdDecimal = score % 1 !== 0;
        let interger = Math.floor(score);
        for (let i=0;i<interger;i++){
          result.push(CLS_ON);
        }
        if (hasdDecimal){
          result.push(CLS_HALF);
        }
        while (result.length < LENGHT){
          result.push(CLS_OFF)
        }
        return result;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .star{
    font-size: 0;
  }
  .star .star-item{
     display: inline-block;
     background-repeat: no-repeat;
  }
  .star-item :last-child{
    margin-right: 0;
  }
  .star-48 .on{
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.44rem;
    background: url("star48_on@2x.png");
    background-size: 0.4rem 0.4rem;
  }
  .star-48 .off{
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.44rem;
    background: url("star48_off@2x.png");
    background-size: 0.4rem 0.4rem;
  }
  .star-48 .half{
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.44rem;
    background: url("star48_half@2x.png");
    background-size: 0.4rem 0.4rem;
  }
  .star-36 .on{
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.44rem;
    background: url("star36_on@2x.png");
    background-size: 0.3rem 0.3rem;
  }
  .star-36 .off{
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.44rem;
    background: url("star36_off@2x.png");
    background-size: 0.3rem 0.3rem;
  }
  .star-36 .half{
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.44rem;
    background: url("star36_half@2x.png");
    background-size: 0.3rem 0.3rem;
  }
</style>
