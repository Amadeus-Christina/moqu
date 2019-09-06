<template>
  <div class="location">
    <header>
      <div class="location-header">
        <img src="../../../../static/images/home/search.png" />
        <input placeholder="搜索附近地址" v-model="searchAddress.input" />
      </div>
      <div class="now-postion">
        <p>当前定位</p>
        <section class="location-list-item">
          <img :src="locationII" class="location-icon" />
          <div v-text="nowLocation.address" @click="confirmAddress(nowLocation)"></div>
          <span class="repostion" @click="relocation">重新定位</span>
        </section>
      </div>
    </header>
    <div class="location-list">
      <!-- <section class="location-list-item border-bottom">
        <img :src="locationI" class="location-icon" />
        <div v-text="nowCity"></div>
        <img src="../../../../static/images/home/forII.png" class="select-icon" />
      </section>-->
      <section
        class="location-list-item border-bottom"
        v-for="(item,index) in nearAddress"
        :key="index"
        @click="chooseAddress(item,index)"
      >
        <img :src="active==index?locationI:locationII" class="location-icon" />
        <div :class="active==index?'d2cd':''">
          {{item.address}}
          <p>{{item.name}}</p>
        </div>
        <img
          v-if="active==index"
          src="../../../../static/images/home/forII.png"
          class="select-icon"
        />
      </section>
    </div>
  </div>
</template>
<script>
import locationI from "#/home/location.png";
import locationII from "#/home/locationII.png";
import { findPeriphery } from "@/api/home/index";
import { getCurrentCityName, getLocation } from "@/utils/baiduMap.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      locationI,
      locationII,
      locationList: [],
      nowLocation: "",
      nowCity: "",
      searchAddress: {
        input: "",
        timer: null
      },
      lat: "",
      lng: "",
      nearAddress: [],
      active: ""
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.relocation();
    });
  },
  watch: {
    "searchAddress.input": {
      handler(value) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.search();
        }, 1000);
      },
      deep: true
    }
  },
  computed: {
    ...mapState(["positioning"])
  },
  methods: {
    ...mapMutations(["POSTIONING"]),
    // 确认定位
    confirmAddress(nowLocation) {
      console.log(nowLocation);
      this.POSTIONING(nowLocation);
      console.log(this.nowLocation);
      this.$router.go(-1);
    },
    // 点击选择地址
    chooseAddress(item, index) {
      if (index) {
        this.active = index;
      }
      this.POSTIONING(item);
      this.$router.go(-1);
    },
    // 重新定位
    async relocation() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中..."
      });
      this.searchAddress.input = "";
      let mapPostion = await this.getMapPostion();
      this.lat = mapPostion.center.lat;
      this.lng = mapPostion.center.lng;
      let address = await this.getAddress(mapPostion);
      console.log(mapPostion);
      console.log(address);
      this.nowLocation = address;
      this.nowCity = mapPostion.name;
      // this.nearAddress = [
      //   {
      //     address: this.nowCity
      //   }
      // ];
      this.$toast.clear();
    },
    // 获取定位
    getMapPostion() {
      return new Promise(resolve => {
        getCurrentCityName().then(res => {
          resolve(res);
        });
      });
    },
    // 经纬度逆解析地址
    getAddress(mapPostion) {
      return new Promise(resolve => {
        getLocation(mapPostion.center.lng, mapPostion.center.lat).then(res => {
          resolve(res);
        });
      });
    },
    // 搜索地址
    search() {
      let { lat, lng, nowLocation, searchAddress } = this;
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中..."
      });
      findPeriphery(lng, lat, nowLocation.address, searchAddress.input).then(
        res => {
          console.log(res);
          if (res.code == 200) {
            this.nearAddress = [...res.data];
            console.log(this.nearAddress);
            this.$toast.clear();
          } else {
            this.$toast(res.msg);
          }
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.location {
  font-size: 0.28rem;
  height: 100%;
  background: #f7f7f7;
  > header {
    background: white;
    height: 2.19rem;
    margin-top: 0.3rem;
    box-sizing: border-box;
    .location-header {
      width: 6.9rem;
      margin: 0 auto;
      height: 0.66rem;
      background: #f7f7f7;
      border-radius: 0.18rem;
      padding: 0.16rem 0.2rem;
      box-sizing: border-box;
      display: flex;
      > img {
        width: 0.34rem;
      }
      > input {
        font-size: 0.24rem;
        flex: 1;
        background: transparent;
        padding-left: 0.3rem;
      }
    }
    .now-postion {
      > p {
        margin-top: 0.2rem;
        padding-left: 0.3rem;
      }
    }
  }
  .location-icon {
    width: 0.34rem;
    height: 0.34rem;
  }
  .location-list {
    background: #fff;
    margin-top: 0.2rem;
  }
  .location-list-item {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0.3rem 0.3rem 0.2rem;
    box-sizing: border-box;
    .select-icon {
      width: 0.34rem;
      height: 0.25rem;
      margin-right: 0.3rem;
      // position: absolute;
      // right: 0.31rem;
      // top: 0.38rem;
    }
    > div {
      width: 5.66rem;
      margin-left: 0.3rem;
      // flex: 1;
    }
    .repostion {
      color: #23d2cd;
      position: absolute;
      right: 0.3rem;
      top: 0.3rem;
    }
    .d2cd {
      color: #23d2cd;
    }
  }
}
</style>