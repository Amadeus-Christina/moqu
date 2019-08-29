import Vue from 'vue'
import Router from 'vue-router'

const Login = r =>require.ensure([],()=>r(require('@/pages/login/index')),'Login');
const Index = r => require.ensure([], () => r(require('@/pages/index/index')), 'Index');
const MessageIndex = r => require.ensure([], () => r(require('@/pages/index/message/index')), 'MessageIndex');
const MessageComment = r => require.ensure([], () => r(require('@/pages/index/message/comment')), 'MessageComment');
const MessageAtMe = r => require.ensure([], () => r(require('@/pages/index/message/atMe')), 'MessageAtMe');
const MessageGood = r => require.ensure([], () => r(require('@/pages/index/message/good')), 'MessageGood');
const MessageWishpers = r => require.ensure([], () => r(require('@/pages/index/message/wishpers')), 'MessageWishpers');
const MessageSystemNotification = r => require.ensure([], () => r(require('@/pages/index/message/systemNotification')), 'MessageSystemNotification');
const AboutMeIndex = r => require.ensure([], () => r(require('@/pages/index/about-me/index')), 'AboutMeIndex');
const AboutMeCoverImage = r => require.ensure([], () => r(require('@/pages/index/about-me/cover-image')), 'AboutMeCoverImage');
const AccountInfoIndex = r => require.ensure([], () => r(require('@/pages/index/account-info/index')), 'AccountInfoIndex');
const AccountInfoSetting = r => require.ensure([], () => r(require('@/pages/index/account-info/setting')), 'AccountInfoSetting');
const AccountInfoRecharge = r => require.ensure([], () => r(require('@/pages/index/account-info/recharge')), 'AccountInfoRecharge');
const AccountInfoWallet = r => require.ensure([], () => r(require('@/pages/index/account-info/wallet')), 'AccountInfoWallet');
const AccountInfoCashOut = r => require.ensure([], () => r(require('@/pages/index/account-info/cashOut')), 'AccountInfoCashOut');
const FollowListIndex = r => require.ensure([], () => r(require('@/pages/index/follow-list/index')), 'FollowListIndex');
const MemberIndex = r => require.ensure([], () => r(require('@/pages/index/member/index')), 'MemberIndex');
const DiscoverIndex = r => require.ensure([], () => r(require('@/pages/index/discover/index')), 'DiscoverIndex');
const Authentication = r => require.ensure([], () => r(require('@/pages/index/authentication/index')), 'Authentication');
const VideoAuthentication = r => require.ensure([], () => r(require('@/pages/index/authentication/video')), 'VideoAuthentication');
const Contact = r => require.ensure([], () => r(require('@/pages/index/contact')), 'Contact');
const VehicleAuthentication = r => require.ensure([], () => r(require('@/pages/index/authentication/vehicle')), 'VehicleAuthentication');
const PhoneAuthentication = r => require.ensure([], () => r(require('@/pages/index/account-info/phone')), 'PhoneAuthentication');
const SunriseIndex = r => require.ensure([], () => r(require('@/pages/index/sunrise/index')), 'SunriseIndex');
const SunriseLearnMore = r => require.ensure([], () => r(require('@/pages/index/sunrise/learnMore')), 'SunriseLearnMore');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'message',
          name: 'MessageIndex',
          component: MessageIndex
        },
        {
          path: 'comment',
          name: 'MessageComment',
          component: MessageComment
        },
        {
          path: 'atMe',
          name: 'MessageAtMe',
          component: MessageAtMe
        },
        {
          path: 'good',
          name: 'Good',
          component: MessageGood
        },
        {
          path: 'aboutMe',
          name: 'AboutMe',
          component: AboutMeIndex
        },
        {
          path: 'accountInfo',
          name: 'AccountInfoIndex',
          component: AccountInfoIndex
        },
        {
          path: 'accountSetting',
          name: 'AccountInfoSetting',
          component: AccountInfoSetting
        },
        {
          path: 'followList',
          name: 'FollowListIndex',
          component: FollowListIndex
        },
        {
          path: 'member',
          name: 'MemberIndex',
          component: MemberIndex
        },
        {
          path: 'discover',
          name: 'DiscoverIndex',
          component: DiscoverIndex
        },
        {
          path: 'recharge',
          name: 'AccountInfoRecharge',
          component: AccountInfoRecharge
        },
        {
          path: 'wallet',
          name: 'AccountInfoWallet',
          component: AccountInfoWallet
        },
        {
          path: 'videoAuthentication',
          name: 'VideoAuthentication',
          component: VideoAuthentication
        },
        {
          path: 'cashOut',
          name: 'AccountInfoCashOut',
          component: AccountInfoCashOut
        },
        {
          path: 'systemNotification',
          name: 'MessageSystemNotification',
          component: MessageSystemNotification
        },
        {
          path: 'contact',
          name: 'Contact',
          component: Contact
        },
        {
          path: 'vehicleAuthentication',
          name: 'VehicleAuthentication',
          component: VehicleAuthentication
        },
        {
          path: 'wishpers',
          name: 'MessageWishpers',
          component: MessageWishpers
        },
        {
          path: 'coverImage',
          name: 'AboutMeCoverImage',
          component: AboutMeCoverImage
        },
        {
          path: 'authentication',
          name: 'Authentication',
          component: Authentication
        },
        {
          path: 'phoneAuthentication',
          name: 'PhoneAuthentication',
          component: PhoneAuthentication
        },
        {
          path: 'sunrise',
          name: 'SunriseIndex',
          component: SunriseIndex
        },
        {
          path: 'sunriseLearnMore',
          name: 'SunriseLearnMore',
          component: SunriseLearnMore
        }
      ]
    }
  ]
})
