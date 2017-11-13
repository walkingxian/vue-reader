<template>
    <transition name="slide-down">
        <div class="back-nav">
            <a @click="back">
                <i class="iconfont icon-fanhui"></i>
                <slot></slot>
            </a>
        </div>
    </transition>
</template>

<script>
    export default {
        methods: {
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
    @import "~stylus/iconfont.styl"
    @import "~stylus/mixin.styl"
    slide-down()
    .back-nav
        height: 50px
        width: 100%
        line-height: 50px
        font-size: 18px
        padding-left: 20px
</style>