<template>
    <div class="spinner-div">
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    </div>
</template>

<script>
export default ({
})
</script>

<style scoped>
.spinner-div {
    z-index: 9999999;
}
.spinner-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: calc(50% - 35px);
    left: calc(50% - 25px);
}
.spinner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #e0e0e0;
    border-bottom: 5px solid #d161fd;
    animation: spin 1s linear infinite;
    position: relative;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>