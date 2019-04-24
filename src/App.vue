<template>
  <div id="app">
    <h2>Flickr Stream</h2>
    <searchInput v-on:submitSearchRequest="getSearchRequest" />
    <div class="gallery">
      <PhotoCard v-for="photo in photos" :key="photo.id" v-on:onPhotoClick="setModalImage" :photo="photo"></PhotoCard>
    </div>
	<div class="loading">Loading more images...</div>
	<ImageModal v-on:onModalClose="toggleModal" :isActive="modalIsActive" :photo="modalPhoto" :photoUrl="modalPhotoUrl" />
  </div>
</template>

<script>
import PhotoCard from './components/PhotoCard.vue';
import SearchInput from './components/SearchInput.vue';
import ImageModal from './components/ImageModal.vue';
import flickr from './api/flickr.js';
import debounce from 'lodash.debounce';

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
            modalPhotoUrl: '',
            modalIsActive: false,
            searchValue: '',
            apiRequest: {
                lastMethod: '',
                pageCount: 1,
                options: {},
            },
        };
    },
    mounted() {
        flickr.sendRequest('getRecent').then(response => {
            const responseObject = response.data.photos.photo;
            this.photos = responseObject;
        });
        this.apiRequest.lastMethod = 'getRecent';
        this.apiRequest.pageCount++;
        this.$nextTick(this.getScrollPosition());
    },
    methods: {
        getSearchRequest(value) {
            flickr
                .sendRequest('search', {
                    tags: value,
                })
                .then(response => {
                    const responseObject = response.data.photos.photo;
                    this.photos = responseObject;
                });
            this.apiRequest.lastMethod = 'search';
            this.apiRequest.pageCount = 1;
            this.apiRequest.options = { tags: value };
        },
        loadMore() {
            flickr
                .sendRequest(this.apiRequest.lastMethod, {
                    ...this.apiRequest.options,
                    page: this.apiRequest.pageCount,
                })
                .then(response => {
                    console.log(response);
                    const responseObject = response.data.photos.photo;
                    this.photos.push(...responseObject);
                });
        },
        getScrollPosition() {
            window.addEventListener(
                'scroll',
                debounce(() => {
                    if (
                        window.scrollY + window.innerHeight >=
                        document.body.clientHeight
                    ) {
                        console.log('bottom of page');
                        this.loadMore();
                    }
                }, 1000)
            );
        },
        setModalImage(photo) {
            this.modalPhoto = photo;
            flickr
                .sendRequest('getSizes', { photo_id: photo.id })
                .then(response => {
                    const responseObject = response.data.sizes.size;
                    const originalSizeIndex = Object.keys(responseObject).find(
                        size => {
                            return responseObject[size].label === 'Original';
                        }
                    );
                    if (originalSizeIndex) {
                        this.modalPhotoUrl =
                            responseObject[originalSizeIndex].url;
                    } else {
                        this.modalPhotoUrl = '';
                    }
                });
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
    padding: 60px 1rem;
}
.gallery {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1rem;
}

.loading {
    text-align: center;
}

a {
    text-decoration: none;
    color: #000;

    &:hover {
        text-decoration: underline;
    }
}
</style>
