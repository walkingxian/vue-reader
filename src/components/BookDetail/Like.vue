<template>
    <div class="like">
        <router-link class="like-item" :to="{path:'/bookdetail/'+bookDetail.id}" tag="div">
            <div class="like-img">
                <img :src="bookDetail.images" @error="loadImage($event)" alt=""/>
            </div>
            <p>{{bookDetail.name}}</p>
        </router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bookDetail: {}
            }
        },
        props: {
            like:{
                type: String,
                required: true
            }
        },
        created() {
            this.getBookDetail(this.like);
        },
        methods: {
            getBookDetail(id) {
                this.$http.get(`http://39.108.14.248:3333/booklist?id=${id}`).then(res=>{
                    this.bookDetail = res.data
                })
            },
            loadImage(e) {
                e.target.parentNode.classList.add("error");
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~stylus/mixin.styl";
    .like
        height: 170px
        margin: 5px
    .like-item
        flex: 1
        .like-img
            height: 140px
            img-error()
            img
                width: 100%
                height: 100%
                &[src=""]
                    opacity: 0
    p
        no-wrap()
        height: 30px
        line-height: 30px
        font-size: 18px
</style>