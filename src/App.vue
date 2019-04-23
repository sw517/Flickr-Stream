<template>
  <div id="app">
    <h2>Flickr Stream</h2>
    <searchInput v-on:submitSearchRequest="submitSearchRequest" />
    <div class="gallery">
      <PhotoCard v-for="photo in photos" :key="photo.id" :photo="photo"></PhotoCard>
    </div>
  </div>
</template>

<script>
import PhotoCard from './components/PhotoCard.vue';
import SearchInput from './components/SearchInput.vue';
import flickr from './api/flickr.js';

export default {
    name: 'app',
    components: {
        PhotoCard,
        SearchInput,
    },
    data() {
        return {
            photos: [],
            searchValue: '',
        };
    },
    mounted() {
        flickr.sendRequest('getRecent').then(response => {
            const responseString = response.data.photos.photo;
            this.photos = responseString;
        });
    },
    methods: {
        submitSearchRequest(value) {
            flickr.sendRequest('search', { tags: value }).then(response => {
                const responseString = response.data.photos.photo;
                this.photos = responseString;
            });
        },
    },
};
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
    padding: 0 1rem;
}
.gallery {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1rem;
}
</style>
