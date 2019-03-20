<template>
    <a href="#" class="photo-card">
        <div class="photo-card__img" :style="imgStyles"></div>
    </a>
</template>

<script>
export default {
    name: "PhotoCard",
    props: {
        photo: {
            type: Object,
            required: true,
            default() {
                return {
                    title: '',
                    farm: '',
                    server: '',
                    id: '',
                };
            },
        },
    },
    computed: {
        imgSrc() {
            return `https://farm${this.photo.farm}.staticflickr.com/${this.photo.server}/${this.photo.id}_${this.photo.secret}.jpg`;
        },
        imgStyles() {
            return {
                backgroundImage: `url(${this.imgSrc}`,
            };
        },
    },
};
</script>

<style lang="scss">
.photo-card {
    flex-basis: 20%;
    max-width: 20%;
    padding: 10px;

    &__img {
        height: 0;
        padding-bottom: 75%;
        background-position: 50%;
    }
}
</style>
