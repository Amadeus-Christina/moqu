<template>
  <div class="select-simulation">
    <div class="select"  @click="openValue">
      <input v-model="value" class="input" type="text" :placeholder=placeholder>
      <img class="img" src="/static/images/account-info/jiantouxia.png" alt="">
    </div>
    <div class="list" v-show="show">
      <ul v-if="isCar">
        <li @click="getvalue(item, index)" v-for="(item, index) in data" :key="index" class="list-item">
          <div class="icon" :style="{backgroundImage: 'url('+item.carMedalUrl+')'}"></div>{{item.carName}}
        </li>
      </ul>
      <ul v-else>
        <li @click="getvalue(item, index)" v-for="(item, index) in data" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    mixins: [],
    name: '',
    data() {
      return {
          show:false,
          value:''
      }
    },
    props: ['data', 'placeholder','isCar'],
    computed: {},
    watch: {},
    methods: {
      openValue(){
          this.show=!this.show;
      },
      getvalue(item, index){
        if (this.isCar) {
          this.value=item.carName;
        } else {
          this.value=item;
        }
          this.show=false;
          this.$emit('selectVal', item)
      }
    },
    mounted() {
    },
    created() {
    },
    filters: {},
    directives: {},
    beforeDestroy() {
    },
    destroyed() {
    }
  }
</script>
<style scoped lang="less">
  .select-simulation{
    ul li{
      list-style: none;
    }
    .select{
      font-size: 0.28rem;
      width: 6rem;
      height: 0.9rem;
      border: 1px solid #E5E5E5;
      border-radius: 0.18rem;
      padding-left: 0.4rem;
      position: relative;
      line-height: 0.85rem;
      .input{
        border: none;
        outline: none;
        width: 90%;
      }
      .img {
        max-height: 0.4rem;
        position: absolute;
        right: 0.4rem;
        top: 0.2rem;
      }
    }
    .list{
      width: 6rem;
      border: 1px solid #cccccc;
      overflow: hidden;
      font-size: 0.28rem;
      border-radius: 0.18rem;
      .list-item{
        display: flex;

      }
      .icon{
        display: inline-block;
        width: 0.9rem;
        height: 0.9rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 0.7rem 0.7rem;
        margin-right: 0.4rem;
      }
    }
    .list ul li{
      width: 100%;
      height: 0.9rem;
      cursor: pointer;
      line-height: 0.9rem;
      padding-left: 0.4rem;
    }
    .list ul li:hover{
      background-color: #cccccc;
    }
  }
</style>
