<template>
    <div class="cody_insert">
        <select>
            <option v-for="from in formList" :key="from" :value="from.id">
                {{ form.text }}
            </option>
        </select>

        <input />

    </div>
</template>
<script>

export default ({
    data() {
        return {
            formList: [
                {text: '1 삼각체형', id: 1},
                {text: '2 모래시계형', id: 2},
                {text: '3 둥근체형', id: 3},
                {text: '4 사각체형', id: 4},
                {text: '5 역삼각체형', id: 5}
            ]
        }
    },
})
</script>
