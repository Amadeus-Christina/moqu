<template>
  <div class="follow-button" :class="{ 'green' :  (showView == 'follower') && (following == false)}">
    <span v-if="showView === 'follow'">
      <span v-if = 'isFollower === true'>互相关注</span>
      <span v-else>取消关注</span>
    </span>
    <span v-else>
      <span v-if = 'following === true'>互相关注</span>
      <span v-else>关注</span>
    </span>
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
  props: ["showView","following","isFollower"],
  computed: {},
  watch: {},
  methods: {
  },
  mounted () {
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {},
  updated() {
  }
}
</script>
<style scoped lang="less">
  .follow-button{
    width: 1.28rem;
    height: 0.5rem;
    background-color: #BCBCBCFF;
    border-radius: 0.25rem;
    color: #ffffff;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.5rem;
  }
  .green {
    background: #23D2CDFF;
  }
</style>
