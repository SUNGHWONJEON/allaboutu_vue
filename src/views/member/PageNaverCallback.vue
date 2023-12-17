<template>
    <div></div>
</template>

<script>
import { fn } from "moment";
export default {
    name: "PageNaverCallback",
    data() {
        return {
            code: "",
            state: "",
        };
    },
    mounted() {
        console.log("Naver Callback Page 열림");
        console.log("callback data :");
        console.log("code = " + this.$route.query.code);
        this.code = this.$route.query.code;
        console.log("state = " + this.$route.query.state);
        this.state = this.$route.query.state;

        this.$axios
            .get("/auth/social/naver", {
                params: {
                    code: this.code,
                    state: this.state,
                },
            })
            .then((res) => {
                console.log("accessToken 요청 보냄");
                console.log("response : ");
                const member = res.data;
                console.log(member);

                if (member.userNum == null) {
                    // 가입되지 않은 아이디인 경우
                    if (
                        confirm(
                            "가입되지 않은 네이버 아이디입니다. 회원가입하시겠습니까?"
                        )
                    ) {
                        let memberInfo = {
                            userId: member.userId,
                            userName: member.userName,
                            userPwd: member.userPwd,
                            userEmail: member.userEmail,
                            userGender: member.userGender,
                            userBirth: new Date(),
                            userPhone: member.userPhone,
                            enrollType: member.enrollType,
                        };

                        this.$axios
                            .post("/signup", JSON.stringify(memberInfo), {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                            .then((res) => {
                                // 회원가입 성공 시 로그인 요청
                                this.fnLogin(member);
                            })
                            .catch((err) => {
                                alert("회원가입 실패. 관리자에게 문의하세요.");
                                console.error(err);
                            });
                    } else {
                        this.$router.push("/login");
                    }
                } else {
                    // 가입된 아이디인 경우
                    this.fnLogin(member);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    },
    methods: {
        fnLogin(member) {
            this.$axios
                .post("/auth/login", {
                    userId: member.userId,
                    userPwd: member.userPwd,
                })
                .then((res) => {
                    console.log(res);
                    sessionStorage.setItem("accessToken", res.data.accessToken);
                    sessionStorage.setItem("refreshToken", res.data.refreshToken);
                    sessionStorage.setItem("userId", member.userId);
                    this.$router.push("/");
                })
                .catch((err) => {
                    console.error(err);
                    alert("로그인에 실패하였습니다. 관리자에게 문의하세요.");
                });
        },
    },
};
</script>

<style>
</style>