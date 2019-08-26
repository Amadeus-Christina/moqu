<template>
  <div class="medal-item">
    <img :src='item.medalUrl' alt="">
    {{item.medalName}}
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
  props: ['item'],
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
  .medal-item{
    display: inline-block;
    padding: 0.3rem 0 0 0.3rem;
    line-height: 0.28rem;
  }
  img{
    max-height: 0.28rem;
    margin-right: 0.05rem;
  }
</style>
