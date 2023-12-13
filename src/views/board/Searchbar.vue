<template>
    <div class="board-searchbar">
        <input
            type="text"
            v-model="search_key"
            @keyup.enter="search"
            placeholder="검색어를 입력하세요"
        />
        <button @click="search">검색</button>
    </div>
</template>

<script>
export default {
    name: "Searchbar",
    data() {
        return {
            search_key: "",
        };
    },
    mounted() {
        const query = this.$route.params.keyword;
        if(query == undefined || query == null) {
            this.search_key = '';
        }
        else {
            this.search_key = decodeURIComponent(query);
        }
    },
    methods: {
        search() {
            const search_value = this.search_key;
            
            if (search_value === "") {
                alert("검색어를 입력하세요");
                return;
            }

            this.$router.push('/board/search/' + this.search_key
                // {
                // name: "BoardSearch",
                // params: {
                //     // keyword: encodeURIComponent(this.search_key),
                //     keyword: this.search_key,
                // },
            );
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/board.scss';
</style>