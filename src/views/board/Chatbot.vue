<template>
    <div>
        <iframe :src="gradioChatbotURL" width="480" height="720" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    name: "Chatbot",
    data() {
        return {
            gradioChatbotURL: "https://1bd2635eec965871ba.gradio.live",
        };
    },
}
</script>

<style scoped>
    
</style>