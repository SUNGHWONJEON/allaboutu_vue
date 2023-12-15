<template>
    <div class="main-wrapper">
        <div class="main-containers">
            <div class="contents-boxes">
                <v-card elevation="0">
                    <v-card-text>
                        <span> 비밀번호 찾기 </span>
                        <!-- 아이디 & 이메일 입력란 -->
                        <v-text-field
                            prepend-inner-icon="mdi-identifier"
                            name="userID"
                            label="ID"
                            type="text"
                            v-model="userId"
                            outlined
                            :disabled="isTextFieldDisabled"
                        ></v-text-field>
                        <v-text-field
                            prepend-inner-icon="mdi-email"
                            name="userEmail"
                            label="Email"
                            type="text"
                            v-model="userEmail"
                            outlined
                            @keyup.enter="BtnContinue()"
                            :disabled="isTextFieldDisabled"
                        ></v-text-field>

                        <!-- 인증번호 입력란 -->
                        <v-text-field
                            prepend-inner-icon="mdi-key"
                            name="verificationCode"
                            label="인증 코드"
                            type="text"
                            v-model="verificationCode"
                            outlined
                            @keyup.enter="verifyCode()"
                            v-if="isTextFieldDisabled"
                        >
                            <template v-slot:append>
                                <div
                                    class="timer"
                                    :class="{
                                        expired: remainingTime === '00:00',
                                    }"
                                >
                                    {{ remainingTime }}
                                </div>
                            </template>
                        </v-text-field>

                        <!-- 버튼 -->
                        <v-btn
                            v-if="!isTextFieldDisabled"
                            color="black"
                            block
                            x-large
                            dark
                            @click="BtnContinue()"
                        >
                            Continue
                        </v-btn>
                        <v-btn
                            v-if="isTextFieldDisabled"
                            color="black"
                            block
                            x-large
                            dark
                            @click="verifyCode"
                        >
                            Verify Code
                        </v-btn>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageFindPwd",
    data() {
        return {
            userId: "",
            userEmail: "",
            verificationCode: "",
            isTextFieldDisabled: false,
            remainingTime: "00:00",
            issuedAt: "",
            expiredAt: "",
        };
    },
    methods: {
        BtnContinue() {
            if (!this.userId || !this.userEmail) {
                alert("ID와 Email을 모두 입력하세요.");
                return;
            }

            this.$axios
                .post("/member/findPwd", {
                    userId: this.userId,
                    userEmail: this.userEmail,
                })
                .then((res) => {
                    alert(
                        "발송완료! 입력하신 이메일로 인증번호를 발송했습니다."
                    );
                    this.isTextFieldDisabled = true;
                    this.issuedAt = new Date(res.data);
                    this.expiredAt = new Date();
                    this.expiredAt.setMinutes(this.issuedAt.getMinutes() + 10); // 10분 뒤 만료
                    this.startTimer();

                    this.$axios
                        .post("/member/sendMail", {
                            userId: this.userId,
                            userEmail: this.userEmail,
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    alert(
                        "해당하는 회원 정보가 없습니다. 입력하신 정보를 확인해주세요."
                    );
                });
        },
        startTimer() {
            const timerInterval = 1000;
            let timer;

            const updateTimer = () => {
                const now = new Date();
                const timeDiff = this.expiredAt - now;

                if (timeDiff <= 0) {
                    // 만료 시간이 지났을 때 원하는 로직 수행
                    this.$axios.patch('/member/expireCode', {
                        userId: this.userId,
                        userEmail: this.userEmail,
                    }).catch((err) => {
                        console.log(err);
                    });
                    this.remainingTime = "00:00";
                    clearInterval(timer);
                } else {
                    const minutes = Math.floor(timeDiff / (1000 * 60));
                    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                    this.remainingTime = `${String(minutes).padStart(
                        2,
                        "0"
                    )}:${String(seconds).padStart(2, "0")}`;
                }
            };

            updateTimer(); // 초기값 설정

            timer = setInterval(updateTimer, timerInterval);
        },
        verifyCode() {
            if (!this.verificationCode) {
                alert("인증번호를 입력하세요.");
                return;
            }

            this.$axios
                .post("/member/verifyCode", {
                    userId: this.userId,
                    userEmail: this.userEmail,
                    verificationCode: this.verificationCode,
                    issuedAt: this.issuedAt,
                })
                .then((res) => {
                    console.log(res.data);
                    if (res.data) {
                        alert("인증 성공!");
                        this.$router.push({
                            name: "PageChangePwd",
                            query: {
                                userId: this.userId,
                                userEmail: this.userEmail,
                            },
                        });
                    } else {
                        alert("인증 실패!");
                    }
                });
        },
    },
};
</script>

<style lang="scss">
.navi-bar {
    display: none;
}

.timer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
}

.expired {
    color: red;
}
</style>