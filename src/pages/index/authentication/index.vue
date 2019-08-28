<template>
  <div class="">
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
            // iconPath: '/static/images/message/replyI.png',
            toPath: '/',
          },
          {
            name: '视频认证',
            // iconPath: '/static/images/message/@I.png',
            toPath: '/index/videoAuthentication',
          },
          {
            name: '车辆认证',
            // iconPath: '/static/images/message/@I.png',
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
</style>
