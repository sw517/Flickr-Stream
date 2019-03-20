<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="gallery">
      <PhotoCard v-for="photo in photos" :key="photo.id" :photo="photo"></PhotoCard>
    </div>
  </div>
</template>

<script>
import PhotoCard from './components/PhotoCard.vue'
import { default as flickr } from './api/flickr.js';

export default {
  name: 'app',
  components: {
    PhotoCard
  },
  data() {
    return {
      photos: [],
    }
  },
  mounted() {
    flickr.getRecent().then((response) => {
      const responseString = response.data.photos.photo;
      this.photos = responseString;
    });
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
}
</style>
