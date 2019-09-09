<template>
  <div class="fillcontain">
    <item-list :itemInfo="itemList"/>
  </div>
</template>
<script>
  import itemList from '@/components/ItemList'
  export default {
    components: {
      itemList
    },
    mixins: [],
    name: '',
    data () {
      return {
        itemList:[
          {
            name: '身份认证',
            toPath: '/index/IDAuthentication',
          },
          {
            name: '身份标识',
            toPath: '/index/identityAuthentication',
          },
          {
            name: '视频认证',
            toPath: '/index/videoAuthentication',
          },
          {
            name: '车辆认证',
            toPath: '/index/vehicleAuthentication',
          }
        ]
      }
    },
    props: {},
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
    destroyed () {}
  }
</script>
<style scoped lang="less">
  .fillcontain{
    background: #ffffff;
  }
</style>
