<template>
    <div v-on:click.self="$emit('onModalClose')" @keyup.esc="$emit('onModalClose')" tabindex="0" class="overlay" :class="{active: isActive}">
        <div class="modal">
            <a @click.prevent="$emit('onModalClose')" class="modal__close">Close</a>
            <div class="modal__image-container">
                <img :src="imgSrc" alt="photo.title" class="modal__image">
            </div>
            <a :href="photoUrl || imgSrc" target="_blank" class="modal__view-link">View Original Image</a>
            <div class="modal__details">
                <div class="modal__title">{{ photo.title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageModal',
    props: {
        isActive: {
            type: Boolean,
            required: true,
            default: false,
        },
        photo: {
            type: Object,
            required: true,
            default() {
                return {
                    title: '',
                    farm: '',
                    server: '',
                    id: '',
                    originalformat: 'jpg',
                };
            },
        },
        photoUrl: {
            type: String,
            required: false,
            default: '',
        },
    },
    computed: {
        imgSrc() {
            return `https://farm${this.photo.farm}.staticflickr.com/${
                this.photo.server
            }/${this.photo.id}_${this.photo.secret}.${
                this.photo.originalformat
            }`;
        },
    },
};
</script>

<style lang="scss">
.overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    color: #fff;

    &.active {
        display: flex;
        justify-content: center;

        .modal {
            display: flex;
        }
    }
}
.modal {
    display: none;
    flex-direction: column;
    height: 100%;
    padding: 1rem;

    &__close {
        color: #fff;
        text-align: center;
        padding: 1rem;
        display: block;
        cursor: pointer;
    }

    &__image {
        max-height: 50vh;
        max-width: 100%;
    }

    &__view-link {
        color: #fff;
        margin-top: 1rem;
    }

    &__details {
        overflow: auto;
        flex-grow: 1;
        margin-top: 1rem;
        font-style: italic;
    }
}
</style>
