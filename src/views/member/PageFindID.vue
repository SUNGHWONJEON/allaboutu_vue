<template>
    <div class="main-wrapper">
        <div class="main-containers">
            <div class="contents-boxes">
                <v-card elevation="0">
                    <v-card-text>
                        <span> 아이디 찾기 </span>
                        <v-form class="pt-3" @submit.prevent="BtnContinue">
                            <v-text-field
                                prepend-inner-icon="mdi-email"
                                name="login"
                                label="Email"
                                type="text"
                                v-model="userEmail"
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
    name: "PageFindId",
    methods: {
        BtnContinue() {
            if (this.userEmail == "") {
                alert("이메일을 입력해주세요.");
                return;
            }

            this.$axios
                .get("/member/findId", {
                    params: {
                        userEmail: this.userEmail,
                    },
                })
                .then((res) => {
                    alert("회원님의 아이디는 " + res.data + " 입니다.");
                    opener.location.replace('/login');
                    window.close();
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