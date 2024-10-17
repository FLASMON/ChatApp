<template>
    <a-layout class="!m-0 !p-0 !bg-gradient-to-t !from-[#0456FE] !to-[#684BE2] w-full h-full min-h-screen !overflow-hidden">
        <Sidebar class="hidden md:block"></Sidebar>
        <div class="py-4 w-[450px] bg-white rounded-none lg:rounded-l-[30px]">
            <div class="flex flex-col h-full">
                <!-- En-tête de la section discussions -->
                <div class="flex items-center justify-between px-6">
                    <a-typography-title :level="3" class="!m-0">Discussions</a-typography-title>
                    <a-space size="small">
                        <a-tooltip title="Nouvelle discussion">
                            <a-button shape="circle" class="border-none text-gray-400 !shadow-none !bg-transparent">
                                <font-awesome-icon icon="fa-solid fa-pen-to-square" class="!me-0"/>
                            </a-button>
                        </a-tooltip>
                        <a-dropdown :trigger="['click']" placement="bottomRight" arrow>
                            <a-button class="!px-0 border-none text-gray-400 !shadow-none  !bg-transparent">
                                <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="!me-0"/>
                            </a-button>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>
                                        <a href="javascript:;">1st menu item</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a href="javascript:;">2nd menu item</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a href="javascript:;">3rd menu item</a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </a-space>
                </div>

                <!-- Barre de recherche -->
                <div class="my-4 px-6 custom-search">
                    <a-input v-model:value="search" @focus="iconFocused = true"
                             @blur="iconFocused = false" @change="reload" size="large" type="default"
                             placeholder="Rechercher..." class="min-w-80 !rounded-full !bg-[#F0F2F5]">
                        <template #prefix>
                            <font-awesome-icon
                                :icon="iconFocused ? 'fa-solid fa-arrow-right-long' : 'fa-solid fa-search'"
                                style="color: rgba(0, 0, 0, 0.45)"
                                :class="[ iconFocused ? 'rotate-180 !text-[#0456FE]' : 'rotate-0',
                                'transition-transform duration-500 ease-in-out !me-0 !size-4 px-2']"/>
                        </template>
                    </a-input>
                </div>

                <!-- Liste Chat avec défilement -->
                <div class="flex-1 overflow-y-auto max-h-[850px]">
                    <a-list
                        class="demo-loadmore-list py-0 max-h-full overflow-y-auto main-scrool"
                        :loading="initLoading"
                        item-layout="horizontal"
                        :data-source="list"
                    >
                        <template #loadMore>
                            <div v-if="!initLoading && !loading" class="text-center my-4">
                                <a-button @click="onLoadMore" class="bg-blue-500 text-white hover:bg-blue-600">
                                    Loading more
                                </a-button>
                            </div>
                        </template>
                        <template #renderItem="{ item }">
                            <a-list-item   :class="{ 'bg-blue-100': selectedItem && selectedItem.id === item.id }"
                                           @click="selectItem(item)"
                            >
                                <template #actions>
                                    <div class="flex flex-col justify-center items-center gap-2">
                                        <a key="list-loadmore-edit">10:57</a>
                                        <a-badge count="15" color="#52c41a"/>
                                    </div>

                                </template>
                                <a-skeleton avatar :title="false" :loading="!!item.loading" active>
                                    <a-list-item-meta
                                    >
                                        <template #description>
                                            <span class="line-clamp-2 ">
                                                Ant Design, a design language for background applications, is refined by Ant UED Team
                                            </span>
                                        </template>
                                        <template #title>
                                            <a href="https://www.antdv.com/">{{ item.name.last }}</a>
                                        </template>
                                        <template #avatar>
                                            <a-avatar :src="item.picture.large" size="large"/>
                                        </template>
                                    </a-list-item-meta>
                                </a-skeleton>
                            </a-list-item>
                        </template>
                    </a-list>
                </div>
            </div>
        </div>
        <a-layout>
            <HeaderMessage></HeaderMessage>
            <a-layout-content class="relative !bg-[#EFEAE2] h-96 overflow-y-auto main-scrool" ref="scrollContainer">
<!--                <div class="absolute bg-cover bg-center h-full" style="background-image: url('/img/Texture.jpg');"></div>-->

                <div class="chat-content h-full max-h-screen">
                    <div class="chatBx main-scrool">
                        <div class="msg msg-me">
                            <div class="flex items-center btn-msg">
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button @click="showFooter" shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-reply" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-face-smile" class="!me-0 !size-4"/>
                                </a-button>
                            </div>
                            <p>Hi <br> <span>12:15</span></p>
                        </div>
                        <div class="msg msg-frnd">
                            <div class="mr-1 relative flex !place-items-end bottom-2">
                                <a-avatar :size="28" class="flex items-center justify-center bg-gray-300">
                                    <template #icon>
                                        <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-4"/>
                                    </template>
                                </a-avatar>
                            </div>
                            <p>Hello <br> <span>12:15</span></p>
                            <div class="flex items-center btn-msg">
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-face-smile" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button @click="showFooter" shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-reply" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="!me-0 !size-4"/>
                                </a-button>
                            </div>
                        </div>

                        <!-- repeat 8X  -->
                        <div class="msg msg-me">
                            <div class="flex items-center btn-msg">
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button @click="showFooter" shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-reply" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-face-smile" class="!me-0 !size-4"/>
                                </a-button>
                            </div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, tempora. <br>
                                <span>12:15</span>
                            </p>

                        </div>
                        <div class="msg msg-frnd">
                            <div class="mr-1 relative flex !place-items-end bottom-2">
                                <!--                                <a-avatar :src="item.picture.large" size="large"/>-->
                                <a-avatar :size="28" class="flex items-center justify-center bg-gray-300">
                                    <template #icon>
                                        <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-4"/>
                                    </template>
                                </a-avatar>
                            </div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br> <span>12:15</span>
                            </p>
                            <div class="flex items-center btn-msg">
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-face-smile" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button @click="showFooter" shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-reply" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="!me-0 !size-4"/>
                                </a-button>
                            </div>

                        </div>

                        <div class="msg msg-me">
                            <div class="flex items-center btn-msg">
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button @click="showFooter" shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-reply" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-face-smile" class="!me-0 !size-4"/>
                                </a-button>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt error,
                                similique
                                voluptatem
                                mollitia illo totam? <br>
                                <span>12:15</span>
                            </p>
                        </div>
                        <div class="msg msg-frnd">
                            <div class="mr-1 relative flex !place-items-end bottom-2">
                                <a-avatar :size="28" class="flex items-center justify-center bg-gray-300">
                                    <template #icon>
                                        <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-4"/>
                                    </template>
                                </a-avatar>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptate ipsam
                                blanditiis!
                                <br>
                                <span>12:15</span>
                            </p>
                            <div class="flex items-center btn-msg">
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-face-smile" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button @click="showFooter" shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-reply" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="!me-0 !size-4"/>
                                </a-button>
                            </div>
                        </div>

                        <div class="msg msg-me">
                            <div class="flex items-center btn-msg">
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button @click="showFooter" shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-reply" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-face-smile" class="!me-0 !size-4"/>
                                </a-button>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia placeat modi
                                praesentium
                                exercitationem reiciendis repudiandae velit eum harum maxime voluptatum.<br>
                                <span>12:15</span>
                            </p>
                        </div>
                        <div class="msg msg-frnd">
                            <div class="mr-1 relative flex !place-items-end bottom-2">
                                <a-avatar :size="28" class="flex items-center justify-center bg-gray-300">
                                    <template #icon>
                                        <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-4"/>
                                    </template>
                                </a-avatar>
                            </div>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, accusamus
                                recusandae
                                iusto
                                inventore esse quae. <br>
                                <div class="flex gap-1">
                                    <span class="capitalize">24 septembre</span> <span>12:15</span>
                                </div>
                            </p>
                            <div class="flex items-center btn-msg">
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button @click="showFooter" shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-reply" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-face-smile" class="!me-0 !size-4"/>
                                </a-button>
                            </div>
                        </div>

                        <div class="msg msg-me">
                            <div class="flex items-center btn-msg">
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button @click="showFooter" shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-reply" class="!me-0 !size-4"/>
                                </a-button>
                                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent">
                                    <font-awesome-icon icon="fa-solid fa-face-smile" class="!me-0 !size-4"/>
                                </a-button>
                            </div>
                            <p>Ok <br> <span>12:15</span></p>
                        </div>
                    </div>
                </div>
            </a-layout-content>
            <FooterMessage></FooterMessage>
        </a-layout>
    </a-layout>
</template>
<script setup>
import {onMounted, ref, nextTick} from 'vue';
import Sidebar from "@/Layouts/Partials/Sidebar.vue";
import HeaderMessage from "@/Layouts/Partials/HeaderMessage.vue";
import FooterMessage from "@/Layouts/Partials/FooterMessage.vue";
import {EventReply} from "@/Layouts/eventReply.js";


const search = ref('');
const iconFocused = ref(false);

const count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const initLoading = ref(true);
const loading = ref(false);
const data = ref([]);
const list = ref([]);

// Show footer message
const showFooter = () => {
    EventReply.show();
};

onMounted(() => {
    fetch(fakeDataUrl)
        .then(res => res.json())
        .then(res => {
            initLoading.value = false;
            data.value = res.results;
            list.value = res.results;
        });
});
const onLoadMore = () => {
    loading.value = true;

    // Ajouter des éléments fictifs pour simuler le chargement
    list.value = data.value.concat(
        [...new Array(count)].map(() => ({
            loading: true,
            name: {last: 'Loading...'}, // Initialiser avec des valeurs par défaut
            picture: {large: ''},       // Initialiser l'img à une chaîne vide
        }))
    );

    // Charger de nouvelles données
    fetch(fakeDataUrl)
        .then(res => res.json())
        .then(res => {
            // Concaténer les nouvelles données en s'assurant que chaque entrée a des valeurs par défaut
            const newData = data.value.concat(
                res.results.map(item => ({
                    ...item,
                    name: item.name || {last: 'Unknown'}, // Assurer un nom par défaut
                    picture: item.picture || {large: ''}  // Assurer une img par défaut
                }))
            );

            loading.value = false;
            data.value = newData;
            list.value = newData;

            // Déclencher le redimensionnement de la fenêtre après le rendu
            nextTick(() => {
                window.dispatchEvent(new Event('resize'));
            });
        })
        .catch(err => {
            console.error('Error fetching data:', err);
            loading.value = false; // Assurer l'arrêt du chargement même en cas d'erreur
        });
};

</script>

<style>
.custom-search .ant-input {
    @apply !bg-[#F0F2F5]
}

.chatBx {
    position: relative;
    width: 100%;
    padding: 30px 50px;
    overflow-y: auto;
}

.chatBx .msg {
    @apply relative flex w-full py-0.5
}

.chatBx .msg p {
    position: relative;
    right: 0;
    text-align: left;
    max-width: 65%;
    padding: 12px;
    background: linear-gradient(90deg, #0456FE 0%, #684BE2 90%);
    border-radius: 10px;
    font-size: .9rem;
}

.chatBx .msg p::before {
    content: '';
    position: absolute;
    top: 0;
    right: -10px;
    border-top: 10px solid #684BE2;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #684BE2;
}


.chatBx .msg p span {
    display: block;
    margin-top: 5px;
    font-size: .85rem;
    opacity: .5;
}

.chatBx .msg-me {
    justify-content: flex-end;
}

.chatBx .msg-me p {
    @apply text-white
}

.chatBx .msg-frnd {
    justify-content: flex-start;
}

.chatBx .msg-frnd p {
    background: #fff;
    text-align: left;
}

.chatBx .msg .btn-msg {
    @apply opacity-0 transition-opacity duration-500
}

.chatBx .msg:hover .btn-msg {
    @apply opacity-100
}

.chatBx .msg-frnd p::before {
    content: '';
    position: absolute;
    top: 0;
    right: unset;
    left: -10px;
    border-top: 10px solid #fff;
    border-right: 10px solid #fff;
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
}

.ant-float-btn-group {
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    z-index: 1000 !important;
}

</style>
