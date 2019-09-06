<template>
  <div class="constellation-icon" :style="{backgroundImage: 'url('+showUrl[0].url+')'}">
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
      constellationGroup : [
        {
          name: '白羊座',
          url:'../../static/images/constellation/TheAries.png'
        },
        {
          name: '金牛座',
          url:'../../static/images/constellation/Taurus.png'
        },
        {
          name: '双子座',
          url:'../../static/images/constellation/Gemini.png'
        },
        {
          name: '巨蟹座',
          url:'../../static/images/constellation/Thecancer.png'
        },
        {
          name: '狮子座',
          url:'../../static/images/constellation/Thelion.png'
        },
        {
          name: '处女座',
          url:'../../static/images/constellation/Avirgin.png'
        },
        {
          name: '天秤座',
          url:'../../static/images/constellation/libra.png'
        },
        {
          name: '天蝎座',
          url:'../../static/images/constellation/Scorpio.png'
        },
        {
          name: '射手座',
          url:'../../static/images/constellation/striker.png'
        },
        {
          name: '魔蝎座',
          url:'../../static/images/constellation/Capricorn.png'
        },
        {
          name: '水瓶座',
          url:'../../static/images/constellation/Aquarius.png'
        },
        {
          name: '双鱼座',
          url:'../../static/images/constellation/Pisces.png'
        }
      ]
    }
  },
  props: ['constellation'],
  computed: {
    showUrl () {
      return this.constellationGroup.filter( item => {
        return item.name == this.constellation
      })
    }
  },
  watch: {},
  methods: {},
  mounted () {},
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .constellation-icon{
    height: 0.4rem;
    width: 0.4rem;
    border-radius: 0.2rem;
    margin-left: 0.2rem;
    background-size: 0.4rem 0.4rem;
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>
