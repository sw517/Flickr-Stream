<template>
    <div class="photo-card">
        <a class="photo-card__inner">
            <div class="photo-card__img" :style="imgStyles"></div>
            <div v-if="photo.title" class="photo-card__title"><span>{{ photo.title }}</span></div>
        </a>
    </div>
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
    padding: .5rem;

    &__inner {
        position: relative;
        display: block;
        text-decoration: none;
        overflow: hidden;
        cursor: pointer;

        &:hover .photo-card__title {
            transform: translateY(0);
        }
    }

    &__img {
        height: 0;
        padding-bottom: 75%;
        background-position: 50%;
    }

    &__title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        transform: translateY(100%);
        transition: transform ease .6s;
        background: rgba(255, 255, 255, .8);
        color: #000;
        padding: 20px 10px;
        word-break: break-all;
    }
}
</style>
