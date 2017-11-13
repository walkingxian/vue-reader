<template>
    <transition name="slide-right">
        <div class="catelog-panel" v-show="catelog_panel">

                <div class="catelog-nav">
                    <i class="iconfont icon-fanhui" @click="hideCatelogPanel"></i>
                    <span>目录</span>
                </div>
                <div class="catelog-content">
                    <ul>
                        <li v-for="(item, index) in chapterCatelog" @click="jumpTo(index)">
                            {{index+1}}. {{item}}
                        </li>
                    </ul>
                </div>

        </div>
    </transition>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        props: {
            chapterCatelog: {
                type: Array
            }
        },
        computed: {
            ...mapState([
                'catelog_panel'
            ])
        },
        methods: {
            jumpTo(index) {
                this.$store.dispatch('curChapter', index + 1);
                this.hideCatelogPanel();
                this.$store.state.showNav = false;
                document.body.scrollTop = 0;
            },
            hideCatelogPanel() {
                this.$store.state.catelog_panel = false
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~stylus/iconfont.styl";
    @import "~stylus/mixin.styl";
    slide-right()
    .catelog-panel
        position: fixed
        left: 0
        top: 0
        bottom: 0
        right: 50px
        z-index: 1000
        overflow-x:hidden
        .catelog-nav
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 50px
            line-height: 50px
            text-align: center
            font-size: 20px
            color: #ed424b
            border-bottom: 1px solid #ed424b
            background-color: #fff
            .iconfont
                position: absolute
                display: inline-block
                left: 10px
            span
                margin-right: 5px
        .catelog-content
            position: absolute
            top: 0
            left: 0
            right: 0
            bottom: 0
            overflow-y: scroll
            background-color: #fff
            margin-top: 50px
            ul
                padding: 0 15px
            li
                color: #333
                height: 50px
                line-height: 50px
                border-bottom: 1px solid #ccc
                no-wrap()
</style>