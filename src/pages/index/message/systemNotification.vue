<template>
  <div class="sys-msg fillcontain">
    <sys-note :msg="message" class="fillcontain"/>
  </div>
</template>
<script>
import sysNote from '@/components/systemNotificationItem'
import {queryMySystemInfo} from '@/api/message/index.js'
export default {
  components: {
    sysNote
  },
  mixins: [],
  name: '',
  data () {
    return {
      message: []
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    getMessage() {
      queryMySystemInfo(this.$store.state.userInfo.userId).then(res => {
        if (res.code == 200) {
          this.message = res.data
          console.log('sys',res.data)
        }
      })
    }
  },
  mounted () {
    this.getMessage()
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .sys-msg{
    background: #F7F7F7;
  }
</style>
