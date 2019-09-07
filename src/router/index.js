import Vue from 'vue'
import Router from 'vue-router'

// 登录模块
const LoginIndex = r => require.ensure([], () => r(require('@/pages/login/index')), 'LoginIndex')
const Login = r => require.ensure([], () => r(require('@/pages/login/login')), 'Login')
const Register = r => require.ensure([], () => r(require('@/pages/login/register')), 'Register')
const Protocol = r => require.ensure([], () => r(require('@/pages/login/protocol')), 'Protocol');


const Index = r => require.ensure([], () => r(require('@/pages/index/index')), 'Index');

// 首页
const HomeIndex = r => require.ensure([], () => r(require('@/pages/index/home/index')), 'HomeIndex');
const SamePost = r => require.ensure([], () => r(require('@/pages/index/home/same-post')), 'SamePost');
const Location = r => require.ensure([], () => r(require('@/pages/index/home/location')), 'Location');
const Contact = r => require.ensure([], () => r(require('@/pages/index/home/contact')), 'Contact');


const homeHome = r => require.ensure([], () => r(require('@/pages/index/home/home')), 'homeHome');
const Attention = r => require.ensure([], () => r(require('@/pages/index/home/Attention')), 'Attention');
const Hot = r => require.ensure([], () => r(require('@/pages/index/home/Hot')), 'Hot');
const DynamicDetails = r => require.ensure([], () => r(require('@/pages/index/home/DynamicDetails')), 'DynamicDetails');
const Report = r => require.ensure([], () => r(require('@/pages/index/home/Report')), 'Report');
const WorldChat = r => require.ensure([], () => r(require('@/pages/index/home/WorldChat')), 'WorldChat');
const SunriseAlliance = r => require.ensure([], () => r(require('@/pages/index/home/SunriseAlliance')), 'SunriseAlliance');
const CityWide = r => require.ensure([], () => r(require('@/pages/index/home/CityWide')), 'CityWide');
const Autodyne = r => require.ensure([], () => r(require('@/pages/index/home/Autodyne')), 'Autodyne');
const ElectricSyllables = r => require.ensure([], () => r(require('@/pages/index/home/ElectricSyllables')), 'ElectricSyllables');

// 发现
const Discover = r => require.ensure([], () => r(require('@/pages/index/discover/discover')), 'Discover');
// 消息
const MessageIndex = r => require.ensure([], () => r(require('@/pages/index/message/index')), 'MessageIndex');
const Message = r => require.ensure([], () => r(require('@/pages/index/message/message')), 'Message');
const Comment = r => require.ensure([], () => r(require('@/pages/index/message/comment')), 'Comment');
const AtMe = r => require.ensure([], () => r(require('@/pages/index/message/atMe')), 'AtMe');
const Good = r => require.ensure([], () => r(require('@/pages/index/message/good')), 'Good');
const MessageWishpers = r => require.ensure([], () => r(require('@/pages/index/message/wishpers')), 'MessageWishpers');
const MessageSystemNotification = r => require.ensure([], () => r(require('@/pages/index/message/systemNotification')), 'MessageSystemNotification');

// 我的
// const MyIndex = r => require.ensure([], () => r(require('@/pages/index/my/index')), 'MyIndex');
// const My = r => require.ensure([], () => r(require('@/pages/index/my/my')), 'My');
// const AccountInfo = r => require.ensure([], () => r(require('@/pages/index/my/account-info')), 'AccountInfo');
// const Setting = r => require.ensure([], () => r(require('@/pages/index/my/setting')), 'Setting');
// const FllowList = r => require.ensure([], () => r(require('@/pages/index/my/follow-list')), 'FllowList');
// const Vip = r => require.ensure([], () => r(require('@/pages/index/my/vip')), 'Vip');


const AboutMeIndex = r => require.ensure([], () => r(require('@/pages/index/my/about-me/index')), 'AboutMeIndex');
const AboutMeCoverImage = r => require.ensure([], () => r(require('@/pages/index/my/about-me/cover-image')), 'AboutMeCoverImage');
const AccountInfoIndex = r => require.ensure([], () => r(require('@/pages/index/my/account-info/index')), 'AccountInfoIndex');
const AccountInfoSetting = r => require.ensure([], () => r(require('@/pages/index/my/account-info/setting')), 'AccountInfoSetting');
const AccountInfoRecharge = r => require.ensure([], () => r(require('@/pages/index/my/account-info/recharge')), 'AccountInfoRecharge');
const AccountInfoWallet = r => require.ensure([], () => r(require('@/pages/index/my/account-info/wallet')), 'AccountInfoWallet');
const AccountInfoCashOut = r => require.ensure([], () => r(require('@/pages/index/my/account-info/cashOut')), 'AccountInfoCashOut');
const PhoneAuthentication = r => require.ensure([], () => r(require('@/pages/index/my/account-info/phone')), 'PhoneAuthentication');
const FollowListIndex = r => require.ensure([], () => r(require('@/pages/index/my/follow-list/index')), 'FollowListIndex');
const MemberIndex = r => require.ensure([], () => r(require('@/pages/index/my/member/index')), 'MemberIndex');
const DiscoverIndex = r => require.ensure([], () => r(require('@/pages/index/my/discover/index')), 'DiscoverIndex');
const Authentication = r => require.ensure([], () => r(require('@/pages/index/my/authentication/index')), 'Authentication');
const VideoAuthentication = r => require.ensure([], () => r(require('@/pages/index/my/authentication/video')), 'VideoAuthentication');
const VehicleAuthentication = r => require.ensure([], () => r(require('@/pages/index/my/authentication/vehicle')), 'VehicleAuthentication');
const IDAuthentication = r => require.ensure([], () => r(require('@/pages/index/my/authentication/ID')), 'IDAuthentication');
const IdentityAuthentication = r => require.ensure([], () => r(require('@/pages/index/my/authentication/identity')), 'IdentityAuthentication');
const SunriseIndex = r => require.ensure([], () => r(require('@/pages/index/my/sunrise/index')), 'SunriseIndex');
const SunriseLearnMore = r => require.ensure([], () => r(require('@/pages/index/my/sunrise/learnMore')), 'SunriseLearnMore');
const SunriseRecruit = r => require.ensure([], () => r(require('@/pages/index/my/sunrise/recruit')), 'SunriseRecruit');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginIndex',
      component: LoginIndex,
      redirect: 'login',
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
          meta: {
            title: '登录'
          }
        },
        {
          path: 'register',
          name: 'register',
          component: Register,
          meta: {
            title: '注册'
          }
        },
        {
          path: 'protocol',
          component: Protocol,
          meta: {
            title: '用户服务协议'
          }
        },
      ]
    },

    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'home',
          component: HomeIndex,
          children: [
            {
              path: 'homeHome',
              name: 'homeHome',
              component: homeHome,
              redirect: 'homeHome/attention',
              children: [{
                path: 'attention',
                component: Attention,
                meta: { keepAlive: true }
              },
              {
                path: 'hot',
                component: Hot,
                meta: { keepAlive: true }
              }
              ]
            },
            {
              path: 'samePost',
              component: SamePost
            },
            {
              path: 'location',
              component: Location,
              name: 'location'
            },
            {
              path: 'contact',
              component: Contact,
              name: 'contact'
            }
          ]
        },
        {
          path: 'discover',
          component: Discover,
          meta: { keepAlive: true },
        },
        {
          path: 'messageIndex',
          component: MessageIndex,
          children: [
            {
              path: 'message',
              component: Message,
              meta: { keepAlive: true ,title: '消息'},
            },
            {
              path: 'comment',
              component: Comment,
              meta: {title: '评论'}
            },
            {
              path: 'atMe',
              component: AtMe,
              meta: {title: '@我'}
            },
            {
              path: 'good',
              component: Good,
              meta: {title: '点赞'}
            },
            {
              path: 'systemNotification',
              name: 'MessageSystemNotification',
              component: MessageSystemNotification,
              meta: {title: '系统通知'}
            },
            {
              path: 'wishpers',
              name: 'MessageWishpers',
              component: MessageWishpers,
              meta: {title: '悄悄话'}
            },
          ]
        },

        {
          path: 'dynamic-details',
          component: DynamicDetails,
        },
        {
          path: 'report',
          component: Report,
        },
        {
          path: 'worldchat',
          component: WorldChat,
        },
        {
          path: 'sunrise-alliance',
          component: SunriseAlliance
        },
        {
          path: 'city-wide',
          component: CityWide
        },
        {
          path: 'autodyne',
          component: Autodyne
        },
        {
          path: 'electric-syllables',
          component: ElectricSyllables
        },

        {
          path: 'aboutMe',
          name: 'AboutMe',
          component: AboutMeIndex,
          meta: { keepAlive: true ,title: '我的'},
        },
        {
          path: 'accountInfo',
          name: 'AccountInfoIndex',
          component: AccountInfoIndex,
          meta: {title: '账号资料'}
        },
        {
          path: 'accountSetting',
          name: 'AccountInfoSetting',
          component: AccountInfoSetting,
          meta: {title: '设置'}
        },
        {
          path: 'followList',
          name: 'FollowListIndex',
          component: FollowListIndex,
          meta: {title: '关注列表'}
        },
        {
          path: 'member',
          name: 'MemberIndex',
          component: MemberIndex,
          meta: {title: '我的会员'}
        },
        {
          path: 'discover',
          name: 'DiscoverIndex',
          component: DiscoverIndex,
          meta: {title: '发现'}
        },
        {
          path: 'recharge',
          name: 'AccountInfoRecharge',
          component: AccountInfoRecharge,
          meta: {title: '充值'}
        },
        {
          path: 'wallet',
          name: 'AccountInfoWallet',
          component: AccountInfoWallet,
          meta: {title: '我的钱包'}
        },
        {
          path: 'videoAuthentication',
          name: 'VideoAuthentication',
          component: VideoAuthentication,
          meta: {title: '视频认证'}
        },
        {
          path: 'cashOut',
          name: 'AccountInfoCashOut',
          component: AccountInfoCashOut,
          meta: {title: '提现'}
        },

        {
          path: 'contact',
          name: 'Contact',
          component: Contact,
          meta: {title: '联系人'}
        },
        {
          path: 'vehicleAuthentication',
          name: 'VehicleAuthentication',
          component: VehicleAuthentication,
          meta: {title: '车辆认证'}
        },

        {
          path: 'coverImage',
          name: 'AboutMeCoverImage',
          component: AboutMeCoverImage,
          meta: {title: '精选照片'}
        },
        {
          path: 'authentication',
          name: 'Authentication',
          component: Authentication,
          meta: {title: '身份认证'}
        },
        {
          path: 'phoneAuthentication',
          name: 'PhoneAuthentication',
          component: PhoneAuthentication,
          meta: {title: '手机认证'}
        },
        {
          path: 'sunrise',
          name: 'SunriseIndex',
          component: SunriseIndex,
          meta: {title: '日出联盟'}
        },
        {
          path: 'sunriseLearnMore',
          name: 'SunriseLearnMore',
          component: SunriseLearnMore,
          meta: {title: '日出联盟'}
        },
        {
          path: 'sunriseRecruit',
          name: 'SunriseRecruit',
          component: SunriseRecruit,
          meta: {title: '我的推广'}
        },
        {
          path: 'IDAuthentication',
          name: 'IDAuthentication',
          component: IDAuthentication,
          meta: {title: '身份认证'}
        },
        {
          path: 'IdentityAuthentication',
          name: 'IdentityAuthentication',
          component: IdentityAuthentication,
          meta: {title: '身份标识'}
        }
        // {
        //   path: 'myindex',
        //   component: MyIndex,
        //   children: [
        //     {
        //       path: 'my',
        //       component: My,
        //       meta: { keepAlive: true },
        //     },
        //     {
        //       path: 'accountInfo',
        //       name: 'accountInfo',
        //       component: AccountInfo
        //     },
        //     {
        //       path: 'setting',
        //       name: 'setting',
        //       component: Setting
        //     },
        //     {
        //       path: 'fllowList',
        //       name: 'fllowList',
        //       component: FllowList
        //     },
        //     {
        //       path: 'vip',
        //       name: 'vip',
        //       component: Vip
        //     }
        //   ]
        // }
      ]
    }
  ]
})
