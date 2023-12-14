<template>
    <div class="main-wrapper">
        <div class="main-containers">
            <div class="contents-boxes">
                <v-card elevation="0">
                    <v-card-text>
                        <span> 아이디 찾기 </span>
                        <v-form class="pt-3">
                            <v-text-field
                                prepend-inner-icon="mdi-account"
                                name="login"
                                label="Email"
                                type="text"
                                v-model="email"
                                outlined
                            >
                            </v-text-field>
                            <v-btn
                                color="black"
                                block
                                x-large
                                dark
                                @click="BtnContinue()"
                                >
                                Continue
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageFindID",
    data() {
        return {
            loginId: "",
            phone: "",
        };
    },
    methods: {
        BtnContinue() {
            this.$axios.post("/member/findId", {
                params: {
                    email: this.email,
                },
            })
            .then((res) => {
                alert("입력하신 이메일로 아이디가 발송되었습니다.");
                window.location = "/login";
            })
            .catch((err) => {
                alert("입력하신 이메일로 가입된 아이디가 없습니다.");
            });
        },
    },
};
</script>

<style lang="scss">
.navi-bar {
    display: none;
}
</style>