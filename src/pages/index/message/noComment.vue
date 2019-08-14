<template>
  <div class="container">
    <img class="container-img" src="/static/images/message/nocontent.png" alt="无评论"/>
    <div class="text">还没有消息哦～</div>
  </div>
</template>
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {}
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
<script>
</script>
<style scoped lang="less">
  .container{
    height: 3rem;
    width: 2.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1.5rem;
    margin-left: -1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .container-img {
      max-width: 2rem;
    }
    .text {
      font-size: 0.24rem;
      color: #B5B5B5;
    }
  }
</style>
