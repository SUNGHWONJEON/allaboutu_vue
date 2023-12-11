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
        const query = this.$route.query.keyword;
        console.log('query : ', query);
        if(query == undefined || query == null) {
            this.search_key = '';
            console.log('undefinedundefinedundefinedundefinedundefined')
        }
        else {
            this.search_key = decodeURIComponent(query);
        }
        
        console.log('this.search_key : ', this.search_key);
    },
    methods: {
        search() {
            const search_value = this.search_key;
            
            if (search_value === "") {
                alert("검색어를 입력하세요");
                return;
            }

            this.$router.push({
                name: "BoardSearch",
                query: {
                    keyword: encodeURIComponent(this.search_key),
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/board.scss';
</style>