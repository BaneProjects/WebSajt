<template>
  <div v-if="openModal" class="warning-modal" tabindex="0" @keydown.enter="closeModal">
        <div>
            <h2> {{msg}} </h2>
        </div>
        <span class="exit-btn"><button @click="closeModal">X</button></span>
  </div>
</template>

<script>
export default {
    props:['msg', 'openModal'],
    methods:{
        closeModal(){
            this.$emit('closeModal')
        }
    },
    created() {
        let that = this;
        document.addEventListener('keyup', function (e) {
            if (e.keyCode === 27) {
                that.closeModal();
            }
        });
    }
}
</script>

<style scoped>
    .warning-modal{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.438);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .7s ease-in-out;
        z-index: 1000;
    }
    .warning-modal div{
        background: #fff;
        background-image: linear-gradient(to right, #fff, #dcfaec);
        border-radius: 7px;
        padding: 35px;
        box-shadow: 2px 2px 5px #000000c0;
    }
</style>
