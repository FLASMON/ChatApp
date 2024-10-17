<template>
    <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-md !z-[9999]" v-if="isLoading">
        <span class="loader"></span>
    </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {router, usePage} from '@inertiajs/vue3';


const isLoading = ref(false);

router.on('start', () => {
    isLoading.value = true;
});

router.on('finish', () => {
    isLoading.value = false;
});

</script>

<style scoped>
.loader {
    position: relative;
    border: 24px solid;
    border-color:#FF3D00  transparent #FF3D00 transparent;
    animation : rotate 2s linear infinite;
}
.loader:before,
.loader:after {
    content:"";
    display: block;
    border: 24px solid transparent;
    border-left-color: #FF3D00;
    position: absolute;
    left: -24px;
    top: -24px;
    animation: prix 1s infinite ease-in;
    transform-origin: 0% 100%;
}
.loader:before {
    border-color: transparent #FF3D00 transparent transparent;
    transform-origin: 100% 0%;
    animation-delay: 0.5s;
}
@keyframes rotate {
    100% {transform: rotate(360deg)}
}
@keyframes prix {
    20% , 80% {transform: rotate(0)}
    50% {transform: rotate(-90deg)}
}



</style>
