<template>
  <div class="fillcontain">
    <router-view></router-view>
    <tabBar v-if="tabbarShow"></tabBar>
  </div>
</template>
<script>
import tabBar from "@/components/TabBar";
export default {
  components: {
    tabBar
  },
  data() {
    return {
      tabbarShow: true
    };
  },
  methods: {},
  created() {
    if (this.$route.meta.keepAlive) {
      this.tabbarShow = true;
    } else {
      this.tabbarShow = false;
    }
  }
};
</script>

