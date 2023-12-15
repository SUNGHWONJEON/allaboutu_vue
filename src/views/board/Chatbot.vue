<template>
    <div>
        <!-- <iframe
            :src="gradioChatbotURL"
            width="480"
            height="720"
            frameborder="0"
        ></iframe> -->
        <object
            :data="gradioChatbotURL"
            width="800"
            height="800"
            type="text/html"
        ></object>
    </div>
</template>

<script>
export default {
    name: "Chatbot",
    data() {
        return {
            gradioChatbotURL: "https://5f2be82b9a2f249373.gradio.live/",
        };
    },
};
</script>

<style scoped>
</style>