<template>
  <div id="app">
    <h2>Flickr Stream</h2>
    <searchInput v-on:submitSearchRequest="submitSearchRequest" />
    <div class="gallery">
      <PhotoCard v-for="photo in photos" :key="photo.id" v-on:onPhotoClick="setModalImage" :photo="photo"></PhotoCard>
    </div>
	<ImageModal v-on:onModalClose="toggleModal" :isActive="modalIsActive" :photo="modalPhoto" />
  </div>
</template>

<script>
import PhotoCard from './components/PhotoCard.vue';
import SearchInput from './components/SearchInput.vue';
import ImageModal from './components/ImageModal.vue';
import flickr from './api/flickr.js';

export default {
    name: 'app',
    components: {
        PhotoCard,
        SearchInput,
        ImageModal,
    },
    data() {
        return {
            photos: [],
            modalPhoto: {},
            searchValue: '',
            modalIsActive: false,
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
        setModalImage(photo) {
            this.modalPhoto = photo;
            this.toggleModal();
        },
        toggleModal() {
            this.modalIsActive = !this.modalIsActive;
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

a {
    text-decoration: none;
    color: #000;

    &:hover {
        text-decoration: underline;
    }
}
</style>
