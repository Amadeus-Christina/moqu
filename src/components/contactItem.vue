<template>
  <div class="">
    <div class="group" v-for="(item,index) in result" :key="index">
      <div class="content">
        <div class="photo" :style="{backgroundImage: 'url('+item.profile+')'}"></div>
        <div class="username">{{item.username}}({{item.anonymousUsername}})</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {}
  },
  props: ['result'],
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
  .group{
    height: 1.4rem;
    background: #ffffff;
    display: flex;
    justify-content: center;
    .content {
      width: 6.9rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #F5F5F5;
      .photo{
        width: 0.8rem;
        height: 0.8rem;
        margin: 0 0.3rem;
        border-radius: 50%;
        background-size: 0.8rem 0.8rem;
      }
      .username{
        color: #323232;
        font-size: 0.28rem;
      }
    }
  }
</style>
