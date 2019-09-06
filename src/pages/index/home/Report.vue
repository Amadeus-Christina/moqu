<template>
  <div>
    <van-radio-group v-model="radio" :border="false">
      <van-cell-group>
        <van-cell
          v-for="(item,index) in reportTypeList"
          :key="index"
          :title="item.reportValue"
          clickable
          @click="radio = index"
          :center="true"
        >
          <van-radio slot="right-icon" :name="index">
            <img
              slot="icon"
              slot-scope="props"
              :src="props.checked ? icon.active : icon.inactive"
              class="pic-size"
            />
          </van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
   
    <div class="sub-btn-box">
      <div class="sub-btn" @click.stop="clickSubmit">
        <p>提交</p>
      </div>
    </div>
  </div>
</template>

<script>
import { RadioGroup, Radio } from "vant";
import { Cell, CellGroup } from "vant";
import { getFindReportType, getReportPost } from "@/api/home/home";
export default {
  data() {
    return {
      radio: 1,
      icon: {
        inactive: "../../../../static/images/ForumPosts/Nottochoose.png",
        active: "../../../../static/images/ForumPosts/Theselected.png"
      },
      reportTypeList: [],
      postId: null
    };
  },
  components: {},
  methods: {
    clickSubmit() {
          let {postId} = this.$route.query;
      getReportPost(1, postId, this.reportTypeList[this.radio].reportValue)
        .then(res => {
          console.log(res);
          if(res.code==200){
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {

    getFindReportType()
      .then(res => {
        console.log(res);
        this.reportTypeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
// 更改单选框样式开始
.van-cell {
  padding: 0.3rem;
}
.van-cell__title {
  text-align: center;
  span {
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(181, 181, 181, 1);
  }
}
.van-cell:not(:last-child)::after {
  display: none;
}
.van-radio__icon--round .van-icon {
  background: #e2e2e2 c;
}
.van-radio__icon--checked .van-icon {
  background-color: #68e0cf !important;
  color: #fff !important;
  border-color: #68e0cf !important;
}
.pic-size {
  width: 0.3rem;
  height: 0.3rem;
}
// 更改单选框样式结束
.sub-btn-box {
  padding: 0 0.55rem;
  position: fixed;
  bottom: 0.1rem;
}
.sub-btn {
  background: url("../../../../static/images/ForumPosts/button.png");
  background-size: cover;
  width: 6.4rem;
  height: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 0.32rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
