<template>
    <div class="cody-box">
        <div class="cody-mainbox">
            <div class="cody-main-img">

            </div>
        </div>
        <div class="cody-goodsbox">
            <div class="cody-goods">
                
            </div>
        </div>
    </div>
</template>

<script>
export default ({
    data() {
        return {
            codyList : []
        }
    },
    mounted() {
        //코디 불러오기
        this.$axios.get('/cody')
        .then((res) => {
            this.codyList = res.data.codyList;
        }).catch((err) => {
            console.log(err);
        });
    },
})
</script>

<style scoped>
@import '@/assets/scss/cody.scss';
</style>