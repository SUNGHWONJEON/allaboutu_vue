<template>
    <div></div>
</template>

<script>
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
                    if (confirm("가입되지 않은 네이버 아이디입니다. 회원가입하시겠습니까?")) {
                        let memberInfo = {
                            userId: member.userId,
                            userName: member.userName,
                            userPwd: member.userPwd,
                            userEmail: member.userEmail,
                            userGender: member.userGender,
                            userBirth: new Date(),
                            userPhone: member.userPhone,
                        };
                        console.log('memberInfo : ');
                        console.log(memberInfo);

                        this.$axios
                            .post("/signup", JSON.stringify(memberInfo), {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                            .then((res) => {
                                alert("회원가입 성공!");
                                this.$router.push("/");
                            })
                            .catch((err) => {
                                alert("회원가입 실패!");
                                console.error(err);
                                this.$router.push("/");
                            });
                    } else {
                        this.$router.push("/login");
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });
    },
};
</script>

<style>
</style>