<template>
    <a-layout-header class="!bg-[#F0F2F5] !px-5">
        <a-flex class="justify-between items-center">
            <a-space align="center" size="small" direction="horizontal">
                <div class="block md:hidden">
                    <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                        <font-awesome-icon icon="fa-solid fa-arrow-left-long" class="!me-0 !size-4"/>
                    </a-button>
                </div>
                <div class="relative">
                    <a-avatar :size="48" class="relative flex items-center justify-center bg-gray-300">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-user" class="!me-0"/>
                        </template>
                    </a-avatar>
                    <div
                        class="absolute bottom-1 right-0 rounded-full  border-2 border-white bg-[#31A24C] h-3.5 w-3.5 z-10"></div>
                </div>

                <div class="!gap-0">
                    <a-typography-title :level="5" class="!m-0">FLASMON Jamé</a-typography-title>
                    <a-typography-title :level="5" class="!m-0 !font-normal !text-[13px] !text-gray-500">
                        En ligne <span>il y a 3h</span>
                    </a-typography-title>
                </div>
            </a-space>

            <a-space>
                <transition name="slide-search" appear>
                    <a-form-item  name="name" v-if="searchActive" class="mx-auto my-auto">
                        <a-input  autocomplete="off" size="large" placeholder="Rechercher..." class="min-w-96 !rounded-full">
                            <template #prefix>
                                <font-awesome-icon icon="fa-solid fa-search" style="color: rgba(0, 0, 0, 0.5)" class="!size-4 !me-2 !text-gray-200"/>
                            </template>
                        </a-input>
                    </a-form-item>
                </transition>
                <a-tooltip title="Recherche un message">
                    <a-button @click="toggleSearchInput" shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                        <font-awesome-icon icon="fa-solid fa-search" class="!me-0"/>
                    </a-button>
                </a-tooltip>
                <a-tooltip title="Passer un appel vocal">
                    <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                        <font-awesome-icon icon="fa-solid fa-phone" class="!me-0"/>
                    </a-button>
                </a-tooltip>

                <a-tooltip title="Lance un appel vidéo" placement="topRight">
                    <a-button @click="toggleCameraVideo" shape="circle"
                              class="border-none text-gray-400 shadow-none !bg-transparent">
                        <font-awesome-icon
                            :icon="isCameraVideo ? 'fa-solid fa-video' : 'fa-solid fa-video-slash'"
                            :class="{'text-gray-400': !isCameraVideo, 'text-green-500': isCameraVideo}"
                            class="!me-0"/>
                    </a-button>
                </a-tooltip>

                <a-tooltip title="search">
                    <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                        <font-awesome-icon icon="fa-solid fa-ellipsis" class="!me-0"/>
                    </a-button>
                </a-tooltip>
            </a-space>
        </a-flex>
    </a-layout-header>
</template>
<script setup>
import {ref} from "vue";

const isCameraVideo = ref(false);

const toggleCameraVideo = () => {
    isCameraVideo.value = !isCameraVideo.value;
};

const searchActive = ref(false);

// Toggle search input visibility
const toggleSearchInput = () => {
    searchActive.value = !searchActive.value;
};

</script>
<style>
.slide-search-enter-active,
.slide-search-leave-active {
    transition: all 600ms ease-out;
}

.slide-search-enter-from,
.slide-search-leave-to {
    opacity: 0;
    transform: translateX(50px);
}
</style>
