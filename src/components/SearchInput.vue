<template>
    <div>
        <input v-on:keydown.enter="onSearchInputSubmit" v-model="searchValue" class="search" placeholder="Search images from flickr" type="text">
        <button @click="onSearchInputSubmit" class="btn">Go</button>
    </div>
</template>

<script>
export default {
    name: 'SearchInput',
    data() {
        return {
            searchValue: '',
        };
    },
    methods: {
        onSearchInputSubmit() {
            this.$emit('submitSearchRequest', this.searchValue);
        },
    },
};
</script>

<style lang="scss">
.search {
    width: 200px;
    padding: 0.5rem;
    margin-bottom: 1rem;
}

.btn {
    margin-left: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
}
</style>
