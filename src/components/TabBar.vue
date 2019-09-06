<template>
  <div>
    <div v-if="active==2">
      <section class="shadow over-screen" @click="active=''"></section>
      <section class="release animated bounceInUp">
        <div v-for="(item,index) in release" :key="index" @click="selectItem(item)">
          <img :src="item.icon" />
          <p>{{item.title}}</p>
        </div>
      </section>
    </div>
    <van-tabbar v-if="tabbar" v-model="active" style="z-index: 5;height:1.1rem" replace route>
      <van-tabbar-item
        v-for="(item,index) in tabBarArray"
        :key="index"
        class="tab-item"
        :to="item.to"
      >
        <div v-if="index!==2" class="icon">
          <i class="img-mode">
            <img :src="active===index?item.activeIcon:item.icon" />
          </i>
          <p :class="active===index?'title title-active':'title'">{{item.title}}</p>
        </div>
        <div v-else class="different-icon">
          <img :src="item.icon" :class="active===index?'different-icon-active':''" />
        </div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import home from "#/tabbar/home.png";
import homeOn from "#/tabbar/home_on.png";
import found from "#/tabbar/found.png";
import foundOn from "#/tabbar/found_on.png";
import release from "#/tabbar/release.png";
import message from "#/tabbar/message.png";
import messageOn from "#/tabbar/message_on.png";
import me from "#/tabbar/me.png";
import meOn from "#/tabbar/me_on.png";
import city from "#/tabbar/city.png";
import takephoto from "#/tabbar/takephoto.png";
import chat from "#/tabbar/chat.png";
import Sunrisealliance from "#/tabbar/Sunrisealliance.png";
import Electricsyllables from "#/tabbar/Electricsyllables.png";

export default {
  data() {
    return {
      active: 0,
      release: [
        {
          icon: city,
          title: "同城",
          postPlate: 1
        },
        {
          icon: takephoto,
          title: "自拍",
          postPlate: 2
        },
        {
          icon: chat,
          title: "世界聊天"
        },
        {
          icon: Sunrisealliance,
          title: "日出联盟",
          postPlate: 3
        },
        {
          icon: Electricsyllables,
          title: "电音节",
          postPlate: 4
        }
      ],
      tabBarArray: [
        {
          title: "首页",
          icon: home,
          activeIcon: homeOn,
          to: "/index/home/homeHome/attention"
        },
        {
          title: "发现",
          icon: found,
          activeIcon: foundOn,
          to: "/index/discover"
        },
        {
          title: "",
          icon: release,
          activeIcon: ""
        },
        {
          title: "消息",
          icon: message,
          activeIcon: messageOn,
          to: "/index/messageIndex/message"
        },
        {
          title: "我的",
          icon: me,
          activeIcon: meOn,
          to: "/index/aboutMe"
        }
      ],
      tabbar: true
    };
  },
  methods: {
    selectItem(item) {
      this.active = "";
      this.$router.push({
        path: "/index/home/samePost",
        query: {
          postPlate: item.postPlate
        }
      });
    }
  },
  watch: {
    $route(route) {
      if (route.meta.keepAlive) {
        this.tabbar = true;
      } else {
        this.tabbar = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.shadow {
  z-index: 2;
  background: rgba(0, 0, 0, 0.3);
}
.release {
  width: 100%;
  position: fixed;
  z-index: 5;
  bottom: 1.4rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.4rem;
  box-sizing: border-box;
  font-size: 0.24rem;
  text-align: center;
  > div {
    > p {
      margin-top: 0.19rem;
    }
  }
  img {
    // width: 0.87rem;
    height: 0.87rem;
  }
}
.tab-item {
  text-align: center;
  .icon {
    .img-mode {
      display: block;
      overflow: hidden;
      margin: 0 auto;
      position: relative;
      > img {
        max-width: 100%;
        height: 0.49rem;
      }
    }
    .title {
      margin-top: 0.11rem;
      color: #5c5c5c;
      font-family: PingFangSC-Medium;
      font-weight: 500;
    }
    .title-active {
      color: #23d2cd;
    }
  }
  .different-icon {
    position: relative;
    z-index: 10;
    top: -0.3rem;
    left: 0rem;
    > img {
      height: 1.5rem;
    }
    .different-icon-active {
      transform: rotateZ(-45deg);
      transition: 0.2s;
    }
  }
}
</style>