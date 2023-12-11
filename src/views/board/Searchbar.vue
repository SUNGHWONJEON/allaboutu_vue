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
    methods: {
        search() {
            const search_value = this.search_key;

            if (search_value === "") {
                alert("검색어를 입력하세요");
                return;
            }

            this.$router.push({
                name: "BoardSearch",
                params: {
                    keyword: this.search_key,
                },
            });
        },
    },
};
</script>

<style>
.board-searchbar {
    /* position: fixed; */
    top: 400px;
    left: calc(50% + 250px);
    display: flex;
    flex-direction: row;
}

.board-searchbar input {
    width: 260px;
    height: 40px;
    border: 1px solid gray;
    padding: 0 10px;
}

.board-searchbar button {
    height: 40px;
    border: 1px solid #e2e2e2;
    background: #eee;
    border-radius: 5px;
    margin-left: 10px;
    padding: 0 10px;
}
</style>