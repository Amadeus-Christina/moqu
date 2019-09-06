<template>
  <div class="register">
    <section class="over-screen z-index" v-if="modals">
      <div class="shadow over-screen" @click="closeModals"></div>
      <div class="shadow-content z-index">
        <div v-if="sexButton">
          <section class="shadow-header dashed-bottom">性别选择</section>
          <section class="sex-box">
            <img :src="men" class="sex-icon" />
            <img :src="woman" class="sex-icon" />
          </section>
          <van-radio-group class="sex-box-radio" v-model="sexRadio">
            <van-radio name="1" checked-color="#41CAC0"></van-radio>
            <van-radio name="2" checked-color="#FF648F"></van-radio>
          </van-radio-group>
        </div>
        <div v-else>
          <section class="shadow-header">{{selectList.title}}</section>
          <section class="shadow-list">
            <span
              v-for="(item,index) in selectList.nameArray"
              :key="index"
              @click="selectNickName(index)"
              :class="active[modalsNum]==index?'select-active':''"
            >{{item.value}}</span>
          </section>
        </div>
        <section class="shadow-button">
          <button class="red" @click="closeModals">取消</button>
          <button class="blue-light" @click="sureModals(selectList.count)">确定</button>
        </section>
      </div>
    </section>
    <i class="skip" v-if="!edit" @click="$router.push('/index/home/homeHome/attention')">跳过</i>
    <div class="avatar">
      <section>
        <img :src="avatar" alt class="avatar-img" />
        <img
          v-if="edit"
          src="../../../static/images/login/Theeditor.png"
          class="avatar-edit"
          @click="editAvatar"
        />
        <input type="file" name="file" multiple="multiple">
      </section>
    </div>
    <div class="nick-name">
      <section class="select" v-for="(item,index) in nickName" :key="index">
        <span>{{item.value}}</span>
        <div>
          <img :src="choose" alt @click="openModals(index)" />
        </div>
      </section>
    </div>
    <p>*匿名昵称仅限匿名展示</p>
    <div class="input-shadow">
      <input type="text" placeholder="请输入昵称" @input="fieldNickName" :value="fieldName" />
    </div>
    <div class="input-shadow" @click="openModals(2)">
      <p class="select-style" v-show="sex">{{sex}}</p>
      <p class="bc" v-show="!sex">请选择性别</p>
      <i>
        <img :src="choose" />
      </i>
    </div>
    <div class="input-shadow">
      <p class="select-style" v-show="age">{{age}}</p>
      <p class="bc" v-show="!age">请选择出生日期</p>
      <i>
        <img :src="choose" @click="pickAge" />
      </i>
    </div>
    <div class="input-shadow" @click="openModals(3)">
      <p class="select-style" v-show="constellation">{{constellation}}</p>
      <p class="bc" v-show="!constellation">请选择星座</p>
      <i>
        <img :src="choose" />
      </i>
    </div>
    <div class="introduce">
      <textarea placeholder="个人简介(限150字)" maxlength="150" @input="filedTextArea" :value="filedArea"></textarea>
    </div>
    <div class="protocol" v-if="!edit">
      <van-checkbox class v-model="radioChecked" checked-color="#68E0CF" icon-size="15"></van-checkbox>
      <p>
        我已阅读并同意
        <span class="blue" @click="$router.push('/protocol')">《用户协议服务》</span>
      </p>
    </div>
    <button class="confirm sure" @click="sureMessage">确认</button>
    <!-- 时间选择器 -->
    <van-popup v-model="datetimePicker" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmDate"
        @cancel="datetimePicker=false"
      />
    </van-popup>
  </div>
</template>
<script>
import choose from "#/login/choose.png";
import men from "#/login/men.png";
import manOn from "#/login/man_on.png";
import woman from "#/login/woman.png";
import womanOn from "#/login/woman_on.png";
// import Anonymouscomments from "#/mock/Anonymouscomments.png";

import { jsGetAge, pureNumber } from "@/utils/main.js";
import { userRegistration, queryAnonymous } from "@/api/login/index.js";
import {upload} from "@/api/index/index"
import { resolve } from "q";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      choose,
      men,
      manOn,
      woman,
      womanOn,
      avatar: "",
      radioChecked: false,
      nickName: ["直男", "烈烈龙"],
      selectList: [],
      nickName1: {
        count: 1,
        title: "匿名选择",
        nameArray: []
      },
      nickName2: {
        count: 2,
        title: "匿名选择二",
        nameArray: [
          "敖烈",
          "九月",
          "大士",
          "杨戬",
          "哪吒",
          "白泽",
          "玉兔",
          "刑天"
        ]
      },
      constellation: "",
      constellationList: {
        count: 3,
        title: "星座选择",
        nameArray: [
          {
            value: "白羊座"
          },
          {
            value: "金牛座"
          },
          {
            value: "双子座"
          },
          {
            value: "巨蟹座"
          },
          {
            value: "狮子座"
          },
          {
            value: "处女座"
          },
          {
            value: "天秤座"
          },
          {
            value: "天蝎座"
          },
          {
            value: "射手座"
          },
          {
            value: "摩羯座"
          },
          {
            value: "水瓶座"
          },
          {
            value: "双鱼座"
          }
        ]
      },
      active: [0, 1, 0],
      modalsNum: "",
      modals: false,
      sex: "",
      sexButton: false,
      sexRadio: "1",
      minDate: new Date(1955, 10, 1),
      maxDate: new Date(2119, 10, 1),
      currentDate: new Date(1997, 10, 1),
      datetimePicker: false,
      age: "",
      fieldName: "",
      filedArea: "",
      edit: false
    };
  },
  async created() {
    let { edit } = this.$route.query;
    this.edit = edit;
    if (edit) {
      // 修改
      console.log(this.userInfo);
      let { userInfo } = this;
      console.log(userInfo.adjectiveName, userInfo.anonymous);
      this.nickName1.nameArray = await this.findNickName(0);
      this.nickName2.nameArray = await this.findNickName(1);
      this.avatar = userInfo.headImg;
      this.nickName = [
        { anonymousId: userInfo.adjectiveId, value: userInfo.adjectiveName },
        { anonymousId: userInfo.nameId, value: userInfo.anonymous }
      ];
      this.fieldName = userInfo.realNickName;
      this.sex = userInfo.sex == 1 ? "男" : "女";
      this.age = userInfo.age;
      this.constellation = userInfo.constellation;
      this.filedArea = userInfo.personInformation;
    } else {
      // 注册
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中..."
      });
      this.nickName1.nameArray = await this.findNickName(0);
      this.nickName2.nameArray = await this.findNickName(1);
      this.avatar = this.nickName2.nameArray[0].headImage;
      this.nickName = [
        this.nickName1.nameArray[0],
        this.nickName2.nameArray[0]
      ];
      this.$toast.clear();
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    // 选择哪个名字
    selectNickName(index) {
      let { modalsNum } = this;
      console.log(modalsNum);
      this.$set(this.active, modalsNum, index);
    },
    // 关闭弹出框
    closeModals() {
      this.modals = false;
    },
    // 打开弹出框
    openModals(index) {
      let { nickName1, nickName2, constellationList } = this;
      this.sexButton = false;
      if (index == 0) {
        this.selectList = nickName1;
      } else if (index == 1) {
        this.selectList = nickName2;
      } else if (index == 3) {
        this.selectList = constellationList;
      } else {
        this.sexButton = true;
        this.selectList = "";
      }
      this.modalsNum = index;
      this.modals = true;
    },
    // 弹出框的确定
    sureModals(count) {
      console.log(count);
      console.log(sexButton);
      let { selectList, active, sexButton, sexRadio, modalsNum } = this;
      if (sexButton) {
        sexRadio == 1 ? (this.sex = "男") : (this.sex = "女");
        this.closeModals();
        return;
      }
      if (count == 3) {
        this.constellation = selectList.nameArray[active[modalsNum]].value;
      } else {
        if (count == 2) {
          this.avatar = selectList.nameArray[active[modalsNum]].headImage;
        }
        this.$set(
          this.nickName,
          count - 1,
          selectList.nameArray[active[modalsNum]]
        );
      }
      this.closeModals();
    },
    // 选择年龄
    pickAge() {
      this.datetimePicker = true;
    },
    // 确认时间
    confirmDate(value) {
      var date = new Date(value);
      let birthday =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      let age = jsGetAge(birthday);
      this.age = age;
      this.datetimePicker = false;
    },
    // 输入昵称
    fieldNickName(e) {
      this.fieldName = e.target.value;
    },
    // 输入个人简介
    filedTextArea(e) {
      console.log(e.target.value);
      this.filedArea = e.target.value;
    },
    // 修改头像
    editAvatar() {
      // return
      // let formData = new FormData();
      // upload(this.formData).then(res=>{
      //   console.log(res)
      // })
    },
    // 确认信息
    async sureMessage() {
      let {
        nickName,
        fieldName,
        sex,
        age,
        constellation,
        filedArea,
        radioChecked,
        edit
      } = this;
      if (edit) {
        console.log(nickName)
        console.log("完善信息");
        return;
      }
      if (fieldName && sex && age && constellation && filedArea) {
        if (pureNumber(fieldName)) {
          this.$toast({
            message: "昵称不能是纯数字"
          });
          return;
        }
        if (!radioChecked) {
          this.$toast({
            message: "请同意用户协议服务"
          });
          return;
        }
        let informationSuccess = await this.perfectInformation(
          fieldName,
          sex,
          age,
          constellation,
          filedArea,
          nickName[0].anonymousId,
          nickName[1].anonymousId,
          nickName[1].headImage
        );
        console.log(informationSuccess);
        if (informationSuccess) {
          // console.log("跳入首页");
          this.$router.push("/index/home/homeHome/attention");
        }
      } else {
        this.$toast({
          message: "请填写所有信息"
        });
      }
    },
    // 调用完善信息接口
    perfectInformation(
      realNickName,
      sex,
      age,
      constellation,
      personInformation,
      adjectiveId,
      nameId,
      headImg,
      userId = 1
    ) {
      return new Promise(resolve => {
        userRegistration(
          realNickName,
          sex,
          age,
          constellation,
          personInformation,
          adjectiveId,
          nameId,
          headImg,
          userId
        ).then(res => {
          if (res.code == 200) {
            resolve(true);
          } else {
            this.$toast(res.msg);
          }
        });
      });
    },
    // 查询匿名信息
    findNickName(id) {
      return new Promise(reslove => {
        queryAnonymous(id).then(res => {
          if (res.code == 200) {
            reslove(res.data);
          } else {
            this.$toast(res.msg);
          }
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.register {
  background: #ffffff;
  font-size: 0.28rem;
  padding-bottom: 0.5rem;
  position: relative;
  .shadow-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 6rem;
    padding: 0.3rem 0;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px 0.02rem 0.2rem 0px #9c9c9c;
    border-radius: 0.1rem;
    .sex-box {
      width: 3.4rem;
      margin: 0.15rem auto 0;
      display: flex;
      justify-content: space-between;
      .sex-icon {
        width: 1rem;
      }
    }
    .sex-box-radio {
      width: 2.8rem;
      margin: 0.2rem auto 0;
      display: flex;
      justify-content: space-between;
    }
    .shadow-header {
      font-size: 0.3rem;
      text-align: center;
      font-weight: 600;
      margin-top: 0.3rem;
      padding-bottom: 0.3rem;
    }
    .shadow-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0 0 0 0.3rem;
      box-sizing: border-box;
      > span {
        display: block;
        width: 1.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border-radius: 0.1rem;
        border: 1px solid rgba(188, 188, 188, 0.5);
        text-align: center;
        margin: 0.3rem 0.3rem 0 0;
        color: #bcbcbc;
      }
      .select-active {
        border: 1px solid #64e0dc;
        color: #64e0dc;
      }
    }
    .shadow-button {
      width: 4rem;
      margin: 0.3rem auto 0;
      display: flex;
      justify-content: space-between;
      font-size: 0.28rem;
      > button {
        width: 1.6rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        background: white;
      }
      .red {
        border: 1px solid #fe493c;
        color: #fe493c;
      }
      .blue-light {
        border: 1px solid #64e0dc;
        color: #64e0dc;
      }
    }
  }
  .skip {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    font-size: 0.28rem;
    width: 1.02rem;
    height: 0.51rem;
    border: 1px solid #64e0dc;
    color: #64e0dc;
    border-radius: 0.26rem;
    text-align: center;
    line-height: 0.51rem;
  }
  .avatar {
    padding-top: 0.47rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    > section {
      position: relative;
      .avatar-img {
        width: 1.44rem;
        display: block;
        margin: 0 auto;
      }
      .avatar-edit {
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
  .nick-name {
    display: flex;
    justify-content: center;
    margin-top: 0.46rem;
    .select {
      width: 2.8rem;
      height: 0.9rem;
      background: #ffffff;
      box-shadow: 0px 0px 0.2rem 0px rgba(213, 213, 213, 0.4);
      border-radius: 0.45rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.28rem;
      color: #444444;
      > span {
        display: inline-block;
        margin-left: 0.4rem;
      }
      > div {
        width: 0.9rem;
        border-left: 1px solid #e3e3e3;
        img {
          width: 0.26rem;
          display: block;
          margin: 0 auto;
        }
      }
    }
    .select:nth-of-type(2) {
      margin-left: 0.4rem;
    }
  }
  > p {
    font-size: 0.24rem;
    // margin: 0.2rem 0 0 0.99rem;
    color: #bdbdbd;
    width: 6rem;
    margin: 0.2rem auto;
  }
  .input-shadow {
    position: relative;
    width: 6rem;
    height: 0.9rem;
    margin: 0.4rem auto 0;
    display: flex;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 0px 0.2rem 0px rgba(213, 213, 213, 0.4);
    border-radius: 0.45rem;
    > input {
      margin-left: 0.4rem;
      flex: 1;
    }
    img {
      position: absolute;
      right: 0.32rem;
      right: 0.37rem;
      width: 0.28rem;
    }
    > p {
      margin-left: 0.4rem;
    }
  }
  .input-shadow:nth-of-type(1) {
    margin-top: 0.3rem;
  }
  .introduce {
    width: 6rem;
    margin: 0.4rem auto 0;
    height: 2.48rem;
    background: #ffffff;
    box-shadow: 0px 0px 0.3rem 0px rgba(213, 213, 213, 0.4);
    border-radius: 0.1rem;
    > textarea {
      width: 100%;
      height: 100%;
      padding: 0.25rem 0.4rem;
      box-sizing: border-box;
    }
  }
  .protocol {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.6rem;
    color: #dbdbdb;
    > p {
      margin-left: 0.2rem;
    }
    .blue {
      color: #209cff;
    }
  }
  .confirm {
    margin-top: 0.4rem;
  }
  .select-style {
    color: #444444;
  }
  .datetime-picker {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
<style lang="less" >
.protocol {
  .van-checkbox {
    .van-checkbox__icon .van-icon {
      color: #fff;
      background-color: #e2e2e2;
      border-color: #e2e2e2;
    }
  }
}
</style>