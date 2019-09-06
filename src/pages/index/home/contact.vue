<template>
  <div class="wrap">
    <div class="search-wrap">
      <div class="input-group">
        <i class="icon"></i>
        <input type="text" class="input" placeholder="请输入要查询的联系人" v-model="searchCondition.input" />
      </div>
    </div>
    <div class="result-text" v-show="result.length>0">搜索结果</div>
    <contact-item :result="result" @clickItem="childClickItem" />
  </div>
</template>
<script>
import contactItem from "@/components/contactItem";
import { searchUserOrPost } from "@/api/home/index";
import { pureNumber } from "@/utils/main";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    contactItem
  },
  mixins: [],
  name: "",
  data() {
    return {
      result: [],
      searchCondition: {
        input: ""
        // timer: null
      }
    };
  },
  computed: {
    ...mapState(["call"])
  },
  watch: {
    "searchCondition.input": {
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
  methods: {
    ...mapMutations(["CALL"]),
    // 搜索附近
    search() {
      // this.searchCondition = e.target.value;
      let { searchCondition } = this;
      if (!searchCondition.input) {
        this.result = [];
        return;
      }
      if (!pureNumber(searchCondition.input)) {
        searchUserOrPost(searchCondition.input).then(res => {
          if (res.code == 200) {
            this.result = res.data;
          } else {
            this.$toast(res.msg);
          }
        });
      } else {
        this.result = [
          {
            realNickName: searchCondition.input
          }
        ];
      }
    },
    // 点击那个帖子
    childClickItem(index) {
      this.CALL(
        this.call +
          `<a mz="${this.result[index].userId}" tz="${
            this.result[index].realNickName
          }" contenteditable="${false}"  style="color:#4a79ab" > @ ${
            this.result[index].realNickName
          } </a>` +
          " "
      );
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped lang="less">
.wrap {
  height: 100%;
  background-color: #f7f7f7;
}
.search-wrap {
  height: 1.26rem;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  .input-group {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .icon {
      width: 0.35rem;
      height: 0.35rem;
      background-image: url("../../../../static/images/home/search.png");
      background-size: 0.35rem;
      position: absolute;
      left: 0.2rem;
    }
    .input {
      height: 0.66rem;
      width: 6.9rem;
      font-size: 0.24rem;
      background-color: #f7f7f7;
      border-radius: 0.18rem;
      padding-left: 0.84rem;
    }
  }
}
.result-text {
  color: #b5b5b5;
  font-size: 0.24rem;
  height: 0.54rem;
  line-height: 0.54rem;
  margin-left: 0.5rem;
}
</style>
