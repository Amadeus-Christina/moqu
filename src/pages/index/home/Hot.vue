<template>
  <div class="hot-box">
    <div class="hb-notice">
      <ul>
        <router-link tag="li" to="/index/city-wide">
          <img src="../../../../static/images/tabbar/city.png" alt />
          <p>同城</p>
        </router-link>
        <router-link tag="li" to="/index/autodyne">
          <img src="../../../../static/images/tabbar/takephoto.png" alt />
          <p>自拍</p>
        </router-link>
        <router-link tag="li" to="/index/sunrise-alliance">
          <img src="../../../../static/images/tabbar/Sunrisealliance.png" alt />
          <p>日出联盟</p>
        </router-link>
        <router-link tag="li" to="/index/electric-syllables">
          <img src="../../../../static/images/tabbar/Electricsyllables.png" alt />
          <p>电音节</p>
        </router-link>
      </ul>
      <div class="hb-message">
        <div class="hbm-left">
          <!-- <img src alt /> -->
          <p>夜生活</p>
          <p>公告</p>
        </div>
        <div class="hbm-right">
          <van-notice-bar text="严禁违法/低俗/谩骂信息" color="#000" background="#fff" />
        </div>
      </div>
    </div>
    <div ref="wrapper" class="list-wrapper">
      <ul class="ab-post">
        <li v-for=" (item,index) in postList" :key="index">
          <ForumPosts :postItems="item">
            <template v-slot:header>
              <div class="fpt-right">
                <div class="fpt-transpond" @click="moreAndMore(index)">
                  <img src="../../../../static/images/ForumPosts/Moreandmore.png" alt />
                </div>
                <div :class="['more-box',isActive==index&&isActiveShow?'activeShow':'']">
                  <p>我要推广</p>
                  <p @click="goReport($event)" :data-post-id="item.postId">举报</p>
                </div>
              </div>
            </template>
          </ForumPosts>
        </li>
        <van-divider dashed v-if="noMore">暂无更多</van-divider>
      </ul>
    </div>

    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from "@/components/TabBar";
import ForumPosts from "@/components/ForumPosts";
import { getIndexInfo } from "@/api/home/home";
import { Toast } from "vant";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      postList: [],
      isActiveShow: false,
      isActive: Number,
      currentPage: 1,
      pageSize: 4,
      userId: 1,
      count: 0,
      noMore: false,
      starY: 0
    };
  },
  methods: {
    moreAndMore(i) {
      console.log(this.isActive, i);
      if (this.isActive == i) {
        this.isActiveShow = false;
        this.isActive = null;
      } else {
        this.isActiveShow = true;
        this.isActive = i;
      }
    },
    goReport(e) {
      this.$router.push({
        path: "/index/report",
        query: { postId: e.target.dataset.postId }
      });
    },
    loadData() {
      Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0,
        mask: false
      });
      getIndexInfo(this.pageSize, this.currentPage, this.userId)
        .then(res => {
          if (res.code === 200) {
            this.postList = this.postList.concat(res.data.datas);
            Toast.clear();
            this.scroll.refresh();
            this.scroll.finishPullUp();
          }
        })
        .catch(err => {
          Toast("请求失败");
          console.log(err);
        });
    }
  },
  components: {
    tabBar,
    ForumPosts
  },
  created() {
    /**
     * 请求首页数据
     */
    Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 0,
      mask: false
    });
    getIndexInfo(this.pageSize, this.currentPage, this.userId)
      .then(res => {
        if (res.code === 200) {
          this.postList = res.data.datas;
          this.count = res.data.count;
          Toast.clear();
        }
      })
      .catch(err => {
        Toast.clear();
        Toast("请求失败");
        console.log(err);
      });
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        pullUpLoad: {
          threshold: -50 // 在上拉到超过底部 50px 时，触发 pullingUp 事件
        },
        click: true
      });
      this.scroll.on("pullingUp", () => {
        ++this.currentPage;
        if (Math.ceil(this.count / this.pageSize) >= this.currentPage) {
          this.loadData();
        } else {
          this.noMore = true;
        }
      });
    });
  }
};
</script>

<style lang="less" scoped>
.hb-notice {
  padding: 0.3rem;
  width: 6.9rem;
  margin: -1.64rem auto 0.3rem auto;
  background: #fff;
  border-radius: 0.18rem;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
  ul {
    display: flex;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      img {
        width: 0.87rem;
        height: auto;
      }
      p {
        margin-top: 0.2rem;
        font-size: 0.24rem;
        font-weight: 500;
        color: rgba(56, 56, 56, 1);
      }
    }
  }
  .hb-message {
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    .hbm-left {
      display: flex;
      flex-direction: column;

      width: 20%;
      p:nth-of-type(1) {
        font-size: 0.28rem;
        font-family: JZhongYi;
        color: rgba(35, 210, 205, 1);
        font-weight: bold;
      }
      p:nth-of-type(2) {
        font-size: 0.28rem;
        font-family: JZhongYi;
        color: rgba(56, 56, 56, 1);
        font-weight: bold;
      }
    }
    .hbm-right {
      width: 80%;
      height: 0.4rem;
      font-size: 0.28rem;
      font-weight: 500;
      color: rgba(90, 90, 90, 1);
      line-height: 0.4rem;
      padding-left: 0.2rem;
      border-left: 2px solid #e4e4e4;
      .van-notice-bar {
        height: auto;
      }
    }
  }
}
.fpt-right {
  position: relative;
}
.attention-box {
  margin-top: -1.64rem;
}
.more-box {
  position: absolute;
  right: -3rem;
  top: 0.4rem;
  width: 2.6rem;
  height: 1.56rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -0.02rem 0.3rem 0px rgba(0, 0, 0, 0.05);
  border-radius: 0.04rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0.3rem;
  transition: all 0.5s ease-in;
  &.activeShow {
    right: -0.3rem;
  }
  p {
    font-size: 0.24rem;
    font-weight: 500;
    color: rgba(50, 50, 50, 1);
    margin: 0.15rem 0;
  }
}
.list-wrapper {
  height: 100%;
  overflow: hidden;
  ul {
    padding-bottom: 1.1rem;
  }
}
.hot-box {
  height: calc(100% - 2.95rem);
  display: flex;
  flex-direction: column;
}
</style>
