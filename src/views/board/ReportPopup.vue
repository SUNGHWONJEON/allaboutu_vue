<template>
    <transition name="modal" appear>
        <div class="modal modal-overlay" @click.self="$emit('close')">
            <div class="modal-window">
                <div class="modal-content">
                    <h1>신고하기</h1>
                    <select v-model="reportCause">
                        <option value="" disabled selected>신고 사유</option>
                        <option value="욕설">욕설</option>
                        <option value="광고">광고</option>
                        <option value="음란성">음란성</option>
                        <option value="기타">기타</option>
                    </select>
                    <textarea
                        v-model="reportReason"
                        placeholder="신고 내용을 작성해주세요."
                    ></textarea>
                </div>
                <footer class="modal-footer">
                    <slot name="footer">
                        <button @click="$emit('close')">취소</button>
                        <button @click="submitReport">제출</button>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>
  
<script>
export default {
    name: 'ReportPopup',
    data() {
        return {
            reportCause: '',
            reportReason: '',
        }
    },
    props: {
        reportBoardNum: {
            type: Number,
            required: true,
        },
        reportUserNum: {
            type: Number,
            required: true,
        },
    },
    methods: {
        submitReport() {
            if (this.reportCause === '') {
                alert('신고 사유를 선택해주세요.');
                return;
            }
            if (this.reportReason === '') {
                alert('신고 내용을 작성해주세요.');
                return;
            }
            
            const reportData = {
                boardNum: this.reportBoardNum,
                reportUserNum: this.reportUserNum,
                reportCause: this.reportCause,
                reportReason: this.reportReason,
            };
            
            // 게시글 신고
            this.$axios.post('/boards/' + this.reportBoardNum + '/reports', reportData)
                .then(res => {
                    alert('게시글이 신고되었습니다.');
                    this.$emit('close');
                })
                .catch(err => {
                    alert('게시글 신고에 실패하였습니다.');
                    console.log(err);
                });
        },
    },

}
</script>

<style scoped>
select {
    appearance: auto;
}
.modal.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}
.modal-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
}
.modal-content {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.modal-content select {
    border: 1px solid gray;
    border-radius: 5px;
    width: 100%;
    height: 30px;
    text-align: center;
    margin-bottom: 10px;
}
.modal-content textarea {
    border: 1px solid gray;
    border-radius: 5px;
    width: 100%;
    height: 100px;
    text-align: left;
    margin-bottom: 10px;
    resize: none;
}
.modal-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
}
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.4s;
}
.modal-enter-active .modal-window,
.modal-leave-active .modal-window {
    transition: opacity 0.4s, transform 0.4s;
}
.modal-leave-active {
    transition: opacity 0.6s ease 0.4s;
}
.modal-enter,
.modal-leave-to {
    opacity: 0;
}
.modal-enter .modal-window,
.modal-leave-to .modal-window {
    opacity: 0;
    transform: translateY(-20px);
}

.modal-footer button {
    margin-left: 10px;
    /* border-radius: 5px; */
    background: #fff;
    padding: 5px;
}
</style>