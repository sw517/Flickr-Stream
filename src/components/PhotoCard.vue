<template>
    <div class="photo-card" :class="[showInfo ? 'show-info' : 'hide-info']">
        <a @click.prevent="onPhotoClick" class="photo-card__inner">
            <i @click="toggleInfo" class="photo-card__info-icon">i</i>
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
    data() {
        return {
            showInfo: false,
        };
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
    methods: {
        toggleInfo() {
            this.showInfo = !this.showInfo;
        },
        onPhotoClick() {
            this.$emit('onPhotoClick', this.photo);
        },
    },
};
</script>

<style lang="scss">
.photo-card {
    padding: 0.5rem;
    width: 100%;

    &.show-info .photo-card__title {
        transform: translateY(0);
    }

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
        border-radius: 0.25rem;
        overflow: hidden;
        cursor: pointer;

        @media (pointer: fine) {
            &:hover .photo-card__title {
                transform: translateY(0);
            }
        }
    }

    &__info-icon {
        display: none;

        @media (pointer: coarse) {
            position: absolute;
            top: 1rem;
            right: 1rem;
            display: flex;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
            justify-content: center;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 100%;
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
