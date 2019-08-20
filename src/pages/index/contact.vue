<template>
  <div class="wrap">
    <div class="search-wrap">
      <div class="input-group">
        <i class="icon"></i>
        <input type="text" class="input" placeholder="请输入要查询的联系人">
      </div>
    </div>
    <div class="result-text">搜索结果</div>
    <contact-item :result="result"/>
  </div>
</template>
<script>
import contactItem from '@/components/contactItem'
export default {
  components: {
    contactItem
  },
  mixins: [],
  name: '',
  data () {
    return {
      result: [
        {
          profile: '/static/images/mock/03.jpg',
          username: '山鬼',
          anonymousUsername: '九月'
        },
        {
          profile: '/static/images/mock/03.jpg',
          username: '山鬼',
          anonymousUsername: '九月'
        },
        {
          profile: '/static/images/mock/03.jpg',
          username: '山鬼',
          anonymousUsername: '九月'
        }
      ]
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {},
  mounted () {},
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .wrap{
    height:100%;
    background-color: #F7F7F7;
  }
  .search-wrap{
    height: 1.26rem;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    .input-group {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .icon {
        width: 0.35rem;
        height: 0.35rem;
        background-image: url("/static/images/search.png");
        background-size: 0.35rem;
        position: absolute;
        left: 0.2rem;
      }
      .input {
        height: 0.66rem;
        width: 6.9rem;
        font-size: 0.24rem;
        background-color: #F7F7F7;
        border-radius: 0.18rem;
        padding-left: 0.84rem;
      }
    }
  }
  .result-text{
    color: #B5B5B5;
    font-size: 0.24rem;
    height: 0.54rem;
    line-height: 0.54rem;
    margin-left: 0.5rem;
  }
</style>
