<template>
  <div class="">
    <vehicle-title @show="show" :show="showView"/>
    <documents v-if="showView === 'documents'" :carId="carAuthenticationId"/>
    <vehicle-manage v-else @again="again" />
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
      showView: 'documents',
      carAuthenticationId: null
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    // 更改展示的页面
    show (data) {
      this.showView = data
    },
    // 重新申请认证
    again(carAuthenticationId) {
      this.showView = 'documents'
      this.carAuthenticationId = carAuthenticationId
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
