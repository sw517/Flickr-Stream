<template>
    <div>{{ photo.title }}</div>
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
                };
            },
        },
    },
}
</script>

<style lang="scss">

</style>
