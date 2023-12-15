<template>
    <div class="main-wrapper">
        <div class="main-containers">
            <div class="contents-boxes">
                <v-card elevation="0">
                    <v-card-text>
                        <v-form class="pt-3" @submit.prevent="BtnContinue">
                            <!-- 새 비밀번호 입력란 -->
                            <v-text-field
                                prepend-inner-icon="mdi-lock-plus"
                                name="userID"
                                label="새 비밀번호"
                                type="password"
                                v-model="newPwd"
                                outlined
                                @keyup.enter="BtnContinue()"
                                :disabled="isTextFieldDisabled"
                            ></v-text-field>
                            <v-text-field
                                prepend-inner-icon="mdi-lock-check"
                                name="userEmail"
                                label="새 비밀번호 확인"
                                type="password"
                                v-model="newPwd2"
                                outlined
                                @keyup.enter="BtnContinue()"
                                :disabled="isTextFieldDisabled"
                            ></v-text-field>

                            <!-- 버튼 -->
                            <v-btn
                                v-if="!isTextFieldDisabled"
                                color="black"
                                block
                                x-large
                                dark
                                @click="BtnContinue()"
                            >
                                Reset Password
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
    name: "PageChangePwd",
    data() {
        return {
            userId: "",
            userEmail: "",
            newPwd: "",
            newPwd2: "",
            isTextFieldDisabled: false,
        };
    },
    mounted() {
        this.userId = this.$route.query.userId;
        this.userEmail = this.$route.query.userEmail;
    },
    BtnContinue() {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/g;
        
        if (this.newPwd == "") {
            alert("새 비밀번호를 입력해주세요.");
            return;
        }
        if (this.newPwd2 == "") {
            alert("새 비밀번호 확인을 입력해주세요.");
            return;
        }
        if (this.newPwd != this.newPwd2) {
            alert("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        if (!passwordRegex.test(this.newPwd)) {
            alert("비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
            return;
        }

        this.$axios
            .patch("/member/changePwd", {
                userId: this.userId,
                userEmail: this.userEmail,
                userPwd: this.newPwd,
            })
            .then((res) => {
                alert("비밀번호가 변경되었습니다.");
                this.$router.push({
                    path: "/login",
                });
            })
            .catch((err) => {
                alert("비밀번호 변경에 실패하였습니다.");
            });
    },
};
</script>

<style>
</style>