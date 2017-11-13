<template>
  <div class="recommend">
    <h3 class="title">
      {{ title }}
    </h3>
    <div class="list">
      <ul class="list-item">
          <router-link  v-for="(book,index) in booklist" :key="index" :to="{path:'/bookdetail/'+book.id}" tag="li" class="book">
            <div class="book-img">
              <img :src="book.images" @error="loadImage($event)" alt="">
            </div>
            <p class="book-name">{{ book.name }}</p>
            <p class="book-auther">{{ book.author }}</p>
          </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['booklist', 'title'],
    methods: {
      loadImage(e) {
        e.target.parentNode.classList.add("error");
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/mixin.styl"
  .recommend
    booklist-item()
    .title
      title-style()
    .list
    .list-item
      position: relative
      overflow-x: auto
      overflow-y: hidden
      white-space: nowrap
      .book
        display: inline-block
        margin: 2px 8px
        width: 100px
        font-size 14px
        .book-img
          img-error()
          width: 100%
          height: 125px
          img
            width: 100%
            height: 125px
        p
          no-wrap()
          margin: 3px 0
        .book-name
          font-size: 16px
        .book-auther
          font-size: 14px
          color: #ccc
</style>
