<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="(item,index) in tabBarArray"
        :key="index"
        :icon="item.icon"
      >
      {{item.title}}
      
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="setting-o">发现</van-tabbar-item>
      <van-tabbar-item class="icon">
        <div class="different-icon">
          <img src="http://39.98.171.198/wx-imgs/hedelai/img/bg-vipCard@2x.png" />
        </div>
      </van-tabbar-item>
      <van-tabbar-item icon="search">消息</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>-->
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      tabBarArray: [
        {
          title: "首页",
          icon: "setting-o"
        },
        {
          title: "首页",
          icon: "setting-o"
        },
        {
          title: "首页",
          icon: "setting-o"
        },
        {
          title: "首页",
          icon: "setting-o"
        },
        {
          title: "首页",
          icon: "setting-o"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.icon {
  position: relative;
  .different-icon {
    position: absolute;
    top: -0.8rem;
    left: 0.2rem;
    > img {
      width: 0.96rem;
      height: 0.96rem;
    }
  }
}
</style>