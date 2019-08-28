<template>
  <div class="">
    <follow-title @show="show"/>
    <div v-if="attentionList !== undefined && attentionList.length > 0 ">
      <div v-if="showView ===  'follow'" class="follow-group" v-for="(item,index) in attentionList" :key="index">
        <follow-item :followUserInfo="item" :showView="showView"/>
      </div>
    </div>
    <div v-if="showView ===  'follow' && (attentionList == undefined || attentionList.length <= 0)">
      <blank-data :message="'目前还没有关注'"/>
    </div>
    <div v-if="fansList !== undefined && fansList.length > 0 ">
      <div v-if="showView ===  'follower'" class="follow-group" v-for="(item,index) in fansList" :key="index">
        <follow-item :followUserInfo="item" :showView="showView"/>
      </div>
    </div>
    <div v-if="showView ===  'follower' && (fansList == undefined || fansList.length <= 0)">
      <blank-data :message="'目前还没有粉丝'"/>
    </div>
  </div>
</template>
<script>
import followTitle from '@/components/FollowTitle'
import followItem from '@/components/FollowItem'
import blankData from '@/components/BlankData'
import {myAttention, myFans} from '@/api/my/follow.js'
export default {
  components: {
    followTitle,
    followItem,
    blankData
  },
  mixins: [],
  name: '',
  data () {
    return {
      showView: 'follow',
      attentionList: [],
      fansList:[]
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    // 更改展示的页面
    show (data) {
      this.showView = data
      this.getAttention()
      this.getFans()
    },
    // 获取关注列表
    getAttention() {
      myAttention(this.$store.state.userInfo.userId).then(res => {
        if (res.code == 200){
          this.attentionList = res.data
          console.log('Attention',res.data)
        } else {
          console.log(res.msg)
        }
      })
    },
    // 获取粉丝列表
    getFans() {
      myFans(this.$store.state.userInfo.userId).then(res => {
        if (res.code == 200){
          this.fansList = res.data
          console.log("fans",res.data)
        } else {
          console.log(res.msg)
        }
      })
    }
  },
  mounted () {
    this.getAttention()
    this.getFans()
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
