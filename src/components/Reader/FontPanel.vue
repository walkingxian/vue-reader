<template>
  <div class="top-nav-pannel font-container" id="font-container" v-show="font_panel">
    <div class="child-mod">
      <span>字号</span>
      <button id="large-font" class="spe-button" @click="add">
        大
      </button>
      <button id="small-font" class="spe-button" @click="decrease" style="margin-left:10px;">
        小
      </button>
    </div>

    <div class="child-mod" id="bk-container">
      <span>背景</span>
      <div class="bk-container" :class="{'bk-container-current':bg_color==index+1}" v-for="(item,index) in 6">
        <div class="color_btn" @click="changeColor(index)"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import Store from '../../store/local'
  export default {
    computed: {
      ...mapState([
        'bg_color', 'font_size','font_panel'
      ])
    },
    created() {
      if (Store.fetch('font_size')) {
        // 如果有则将字号大小赋给$store.state，在mounted中调用
        this.$store.state.font_size = Store.fetch('font_size');
      }
      // 判断是否存储了阅读器颜色
      if (Store.fetch('bg_color')) {
        this.$store.state.bg_color = Store.fetch('bg_color');
      }
    },
    methods: {
      //点击修改bg_color，父组件可根据bg_color的值更改自定义属性bg_color，达到修改背景色的目的
      changeColor(index) {
        this.$store.state.bg_color = index + 1;
        Store.save('bg_color', index + 1);
      },
      add() {
        this.$store.dispatch('fontSizeAdd')
        Store.save('font_size', this.font_size);
      },
      decrease() {
        this.$store.dispatch('fontSizeDecrease')
        Store.save('font_size', this.font_size)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/variable.styl"
  @import "~stylus/mixin.styl"
  .top-nav-pannel
    position: fixed
    bottom: 70px
    height: 135px
    width: 100%
    color: #fff
    font-size: 14px
    z-index: 10000
    background-color: rgba(0,0,0,.8)
    button
      background: none
      border: 1px solid #8c8c8c
      padding: 5px 40px
      color: #fff
      display: inline-block
      border-radius: 16px
      &:focus
        outline: none
    .child-mod
      padding: 5px 20px
      margin-top: 15px
      & > span:first-child
        margin-right: 20px
    .bk-container
      position: relative
      height: 30px
      width: 30px
      border-radius: 15px
      display: inline-block
      vertical-align: -14px
      margin-left: 10px
      border: 1px solid transparent
      .color_btn
        height: 30px
        width: 30px
        border-radius: 15px
      &:nth-child(2) .color_btn
        background: $color-reader-bg-1
      &:nth-child(3) .color_btn
        background: $color-reader-bg-2
      &:nth-child(4) .color_btn
        background: $color-reader-bg-3
      &:nth-child(5) .color_btn
        background: $color-reader-bg-4
      &:nth-child(6) .color_btn
        background: $color-reader-bg-5
      &:nth-child(7) .color_btn
        background: $color-reader-bg-6
    .bk-container-current
      border: 1px #ff7800 solid

</style>