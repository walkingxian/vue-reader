<template>
  <div class="reader">
    <!--加载等待-->
    <loading v-if="loading"></loading>
    <!--头部导航栏-->
    <back-nav class="reader-header" v-show="showNav">
        <span class="nav-title" @click="clearNavShow">返回书架</span>
    </back-nav>
    <pull-down>
      <!--阅读器主题部分-->
      <div class="read-content" v-show="!loading"
        :class="[bg_night?'bg_night': '', 'bg_color_'+ bg_color]"
        :style="{fontSize:font_size+'px'}"
        ref="reader">

        <h4 class="chapter-title">{{ book.title }}</h4>
        <div class="chapterContent">
          <p v-for="(item,index) in book.content" :key="index">{{item}}</p>
        </div>
        <ul class="tab">
          <li @click.stop="prevChapter">上一章</li>
          <li @click.stop="nextChapter">下一章</li>
        </ul>
      </div>
    </pull-down>
      <!--点击触发导航栏-->
      <div class="click-mask" @click.stop="clickNav"></div>
      <!--目录面板-->
      <catelog-panel :chapterCatelog="chapterCatelog"></catelog-panel>
      <!--目录弹出时遮罩层-->
      <catelog-cover :class="{hide:!catelog_panel}"></catelog-cover>
      <!--字体、背景面板-->
      <font-panel></font-panel>
      <!--底部导航栏-->
      <reader-footer v-show="showNav"></reader-footer>

  </div>
</template>

<script>
  import BackNav from 'components/BackNav'
  import Loading from 'components/Loading'
  import ReaderFooter from 'components/Reader/ReaderFooter'
  import CatelogPanel from 'components/Reader/CatelogPanel'
  import CatelogCover from 'components/Reader/CatelogCover'
  import FontPanel from 'components/Reader/FontPanel'
  import PullDown from 'components/PullDown'
  import Store from '../store/local.js'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        book: {},
        booksReadInfo: {},
        chapterCatelog: []
      }
    },
    computed: {
      ...mapState([
        'showNav', 'curChapter', 'catelog_panel', 'font_size', 'bg_color', 'bg_night','loading','font_panel'
      ]),
      catelogLength() {
        return this.chapterCatelog.length;
      }
    },
    components: {
      BackNav,
      ReaderFooter,
      Loading,
      CatelogPanel,
      CatelogCover,
      FontPanel,
      PullDown
    },
    created() {
      // 判断是否存储了阅读器夜间模式
      if(Store.fetch('bg_night')) {
        this.$store.state.bg_nignt = Store.fetch('bg_night');
      }
      //获取章节信息
      this.getChapterCatelog();
      // 获取阅读进度
      const localBookReaderInfo = Store.fetch('bookreaderinfo')
      let id = this.$route.params.id;
      // 当前书籍以前读过并有阅读进度
      if (localBookReaderInfo && localBookReaderInfo[id]) {
        this.booksReadInfo = localBookReaderInfo;
        this.getBooks(id, this.booksReadInfo[id].chapter);
        this.$store.dispatch('curChapter', this.booksReadInfo[id].chapter);
      }else { //没有该书籍信息
          this.getBooks(id, 1);
          this.$store.dispatch('curChapter', 1);
          this.saveBooksInfo();
      }
    },
    methods:{
      getBooks(id, chapter) {
        this.$store.state.loading = true
        this.$http.get(`http://39.108.14.248:3333/book?book=${id}&id=${chapter}`)
          .then((res) => {
            this.$store.dispatch('toggleLoading')
            this.book = res.data
            this.book.content = res.data.content.split('-')
          })
      },
      getChapterCatelog() {
        var that = this;
        this.$http.get(`http://39.108.14.248:3333/titles?id=${this.$route.params.id}`).then(res => {
                  that.chapterCatelog = res.data.titles.split('-');
                })
      },
      saveBooksInfo() {
        //调用local.js中封装的fetch保存每本小说阅读进度
        let id = this.$route.params.id;
        this.booksReadInfo[id] = {
          book: id,
          chapter: this.curChapter
        }
        Store.save('bookreaderinfo', this.booksReadInfo);
      },
      prevChapter() {
        this.$store.dispatch('prevChapter');
      },
      // 下一章
      nextChapter() {
        this.$store.dispatch('nextChapter', this.catelogLength)
      },
      // 切换导航栏
      clickNav() {
        this.$store.dispatch('toggleNav')
        this.$store.state.font_panel = false
      },
      //返回书架时，应该隐藏导航栏
      clearNavShow(){
        this.$store.state.showNav = false
        this.$store.state.font_panel = false
      }
    },
    watch:{
      curChapter(val, oldVal) {
        this.saveBooksInfo();
        this.getBooks(this.$route.params.id, val);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/variable.styl"
  @import "~stylus/iconfont.styl"
  .reader
    width: 100%
    min-height: 736px;
    background: $color-reader-bg-1
    .reader-header
      background: rgba(0, 0, 0, 0.8)
      position: fixed
      top: 0
      left: 0
      line-height: 50px
      z-index: 100
      span
        color: #fff
    .read-content
      background: $color-reader-bg-1
      color: #333
      line-height: 31px
      padding: 15px
      z-index: 1
      &.bg_night
        background-color: $color-reader-bg-night !important
      &.bg_color_1
        background-color: #e9dfc7 // 杏仁黄
      &.bg_color_2
        background-color: #EAEAEF // 极光灰
      &.bg_color_3
        background-color: #FDE6E0 // 极光灰
      &.bg_color_4
        background-color: #DCE2F1 // 极光灰
      &.bg_color_5
        background-color: #EAEAEF // 极光灰
      &.bg_color_6
        background-color: #FFF2E2 // 极光灰
      .chapter-title
        font-size: 24px
        color: #333
        border-bottom: 1px solid #333
        letter-spacing: 2px
        padding-bottom: 10px
        margin-bottom: 20px
      p
        text-indent: 2em
        margin: 0.5em 0
        letter-spacing: 0
        line-height: 24px

      .tab
        height: 34px
        margin: 15px auto
        line-height: 34px
        border-radius: 8px
        border: 1px solid  $color-reader-bg-1
        background: #333
        opacity: 0, 9
        font-size: 12px
        li
          display: inline-block
          width: 49%
          border-right: 1px solid #999
          text-align: center
          color: #fff
          &:nth-child(2)
            border-right: none
    .read-content[bg='1']
      background: $color-reader-bg-1
    .read-content[bg='2']
      background: $color-reader-bg-2
    .read-content[bg='3']
      background: $color-reader-bg-3
    .read-content[bg='4']
      background: $color-reader-bg-4
    .read-content[bg='5']
      background: $color-reader-bg-5
    .read-content[bg='6']
      background: $color-reader-bg-6
    .read-content[night='true']
      background: $color-reader-bg-night

  .click-mask
    position fixed
    width: 100%;
    height: 55%
    top: 15%

</style>
