<template>
  <div class="">
    <vehicle-title @show="show"/>
    <documents v-if="showView === 'documents'"/>
    <vehicle-manage v-else />
  </div>
</template>
<script>
import vehicleTitle from '@/components/VehicleTitle'
import documents from '@/components/Documents'
import vehicleManage from '@/components/VehicleManage'
export default {
  components: {
    vehicleTitle,
    documents,
    vehicleManage
  },
  mixins: [],
  name: '',
  data () {
    return {
      showView: 'documents'
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    // 更改展示的页面
    show (data) {
      this.showView = data
    }
  },
  mounted () {},
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
</style>
