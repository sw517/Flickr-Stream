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
    name: 'PhotoCard',
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
            return `https://farm${this.photo.farm}.staticflickr.com/${
                this.photo.server
            }/${this.photo.id}_${this.photo.secret}.jpg`;
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
    padding: 0.5rem;
    width: 100%;

    @media (min-width: 768px) {
        flex-basis: calc(100% / 3);
        max-width: calc(100% / 3);
    }

    @media (min-width: 1024px) {
        flex-basis: 20%;
        max-width: 20%;
    }

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
        background-color: #f3f3f3;
        padding-bottom: 75%;
        background-position: 50%;
        background-repeat: no-repeat;
    }

    &__title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        transform: translateY(100%);
        transition: transform ease 0.6s;
        background: rgba(255, 255, 255, 0.8);
        color: #000;
        padding: 0.75rem;
        word-break: break-all;

        span {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
