<script setup>
import {onMounted, ref, nextTick} from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import {Link} from '@inertiajs/vue3';

const showingNavigationDropdown = ref(false);

const search = ref('');
const iconFocused = ref(false);  // Variable pour changer d'icône

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const initLoading = ref(true);
const loading = ref(false);
const data = ref([]);
const list = ref([]);
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
    list.value = data.value.concat(
        [...new Array(count)].map(() => ({
            loading: true,
            name: {},
            picture: {},
        })),
    );
    fetch(fakeDataUrl)
        .then(res => res.json())
        .then(res => {
            const newData = data.value.concat(res.results);
            loading.value = false;
            data.value = newData;
            list.value = newData;
            nextTick(() => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
};
const value1 = ref('');
const isMaxRows = ref(false);
const handleInput = (event) => {
    const textarea = event.target;
    const maxScrollHeight = parseFloat(window.getComputedStyle(textarea).lineHeight) * 3;

    // Met à jour isMaxRows basé sur scrollHeight
    isMaxRows.value = textarea.scrollHeight >= maxScrollHeight;
};

const isMicrophone = ref(false);
const isCameraVideo = ref(false);

const toggleCameraVideo = () => {
    isCameraVideo.value = !isCameraVideo.value;
};
const toggleIcon = () => {
    isMicrophone.value = !isMicrophone.value;
};
</script>

<template>
    <!--    <Head :title="title"/>-->
<!--    <a-layout class="min-h-screen bg-emerald-500">-->
<!--        <a-layout-sider :width="80" class="p-0 h-full min-h-screen hidden md:flex">-->
<!--            <a-menu mode="vertical" theme="light" class="!bg-emerald-500 !border-none">-->
<!--                <div class="h-full min-h-screen flex flex-col justify-between items-center pt-4">-->
<!--                    <div>-->
<!--                        <a-tooltip title="Discusion" placement="right">-->
<!--                            <a-menu-item key="discusion" class="menu-item">-->

<!--                                <Link>-->
<!--                                    <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-5"/>-->
<!--                                </Link>-->

<!--                            </a-menu-item>-->
<!--                        </a-tooltip>-->

<!--                        <a-tooltip title="Discusion" placement="right">-->
<!--                            <a-menu-item key="discusion" class="menu-item">-->

<!--                                <Link>-->
<!--                                    <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-5"/>-->
<!--                                </Link>-->

<!--                            </a-menu-item>-->
<!--                        </a-tooltip>-->

<!--                        <a-menu-item key="status" class="menu-item">-->
<!--                            <Link>-->
<!--                                <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-5"/>-->
<!--                            </Link>-->
<!--                        </a-menu-item>-->
<!--                        <a-menu-item key="chaine" class="menu-item">-->
<!--                            <Link>-->
<!--                                <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-5"/>-->
<!--                            </Link>-->
<!--                        </a-menu-item>-->
<!--                        <a-menu-item key="communaute" class="menu-item">-->
<!--                            <Link>-->
<!--                                <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-5"/>-->
<!--                            </Link>-->
<!--                        </a-menu-item>-->
<!--                    </div>-->

<!--                    &lt;!&ndash; Bottom avatar &ndash;&gt;-->
<!--                    <div class="mb-4">-->
<!--                        <a-menu-item key="settings" class="menu-item">-->
<!--                            <Link>-->
<!--                                <font-awesome-icon icon="fa-solid fa-cog" class="!me-0 !size-5"/>-->
<!--                            </Link>-->
<!--                        </a-menu-item>-->
<!--                        <a-menu-item key="settings" class="menu-item">-->
<!--                            <Link>-->
<!--                                <a-avatar size="large" class="flex items-center justify-center bg-red-600">-->
<!--                                    <template #icon>-->
<!--                                        <font-awesome-icon icon="fa-solid fa-user" class="!me-0"/>-->
<!--                                    </template>-->
<!--                                </a-avatar>-->
<!--                            </Link>-->
<!--                        </a-menu-item>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </a-menu>-->
<!--        </a-layout-sider>-->

<!--        <a-layout-content class="flex p-0 lg:rounded-l-[40px] overflow-hidden">-->

<!--            <div class="flex flex-col justify-between w-[700px] relative h-full min-h-screen border border-r-gray-200  md:rounded-none overflow-hidden">-->
<!--                <a-layout-header class="!bg-white !px-8 pt-6 !h-32 !leading-none space-y-3">-->
<!--                    <div class="flex items-center justify-between">-->
<!--                        <a-typography-title :level="3" class="!m-0">Discussions</a-typography-title>-->
<!--                        <a-space size="small">-->
<!--                            <a-tooltip title="Nouvelle discussion">-->
<!--                                <a-button shape="circle" class="border-none text-gray-400">-->
<!--                                    <font-awesome-icon icon="fa-solid fa-pen-to-square" class="!me-0"/>-->
<!--                                </a-button>-->
<!--                            </a-tooltip>-->
<!--                            <a-dropdown :trigger="['click']" placement="bottomRight" arrow>-->
<!--                                <a-button class="!px-0 border-none text-gray-400">-->
<!--                                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="!me-0"/>-->
<!--                                </a-button>-->
<!--                                <template #overlay>-->
<!--                                    <a-menu>-->
<!--                                        <a-menu-item>-->
<!--                                            <a href="javascript:;">1st menu item</a>-->
<!--                                        </a-menu-item>-->
<!--                                        <a-menu-item>-->
<!--                                            <a href="javascript:;">2nd menu item</a>-->
<!--                                        </a-menu-item>-->
<!--                                        <a-menu-item>-->
<!--                                            <a href="javascript:;">3rd menu item</a>-->
<!--                                        </a-menu-item>-->
<!--                                    </a-menu>-->
<!--                                </template>-->
<!--                            </a-dropdown>-->
<!--                        </a-space>-->
<!--                    </div>-->
<!--                    <a-input v-model:value="search" @focus="iconFocused = true"-->
<!--                             @blur="iconFocused = false" @change="reload" size="large" type="default"-->
<!--                             placeholder="Search..." class="min-w-80 !rounded-full">-->
<!--                        <template #prefix>-->
<!--                            <font-awesome-icon-->
<!--                                :icon="iconFocused ? 'fa-solid fa-arrow-right-long' : 'fa-solid fa-search'"-->
<!--                                style="color: rgba(0, 0, 0, 0.45)"-->
<!--                                :class="[ iconFocused ? 'rotate-180  !text-green-600' : 'rotate-0',-->
<!--                                    'transition-transform duration-500 ease-in-out !me-0 !size-4 px-2']"/>-->
<!--                        </template>-->
<!--                    </a-input>-->
<!--                </a-layout-header>-->

<!--                <a-layout-content class="!bg-white">-->
<!--                    <a-list-->
<!--                        class="demo-loadmore-list py-0 h-full max-h-[78vh] overflow-y-auto main-scrool"-->
<!--                        :loading="initLoading"-->
<!--                        item-layout="horizontal"-->
<!--                        :data-source="list"-->
<!--                    >-->
<!--                        <template #loadMore>-->
<!--                            <div-->
<!--                                v-if="!initLoading && !loading"-->
<!--                                :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"-->
<!--                            >-->
<!--                                <a-button @click="onLoadMore">loading more</a-button>-->
<!--                            </div>-->
<!--                        </template>-->
<!--                        <template #renderItem="{ item }">-->
<!--                            <a-list-item>-->
<!--                                <template #actions>-->
<!--                                    <a key="list-loadmore-edit">10:57</a>-->
<!--                                </template>-->
<!--                                <a-skeleton avatar :title="false" :loading="!!item.loading" active>-->
<!--                                    <a-list-item-meta-->
<!--                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"-->
<!--                                    >-->
<!--                                        <template #title>-->
<!--                                            <a href="https://www.antdv.com/">{{ item.name.last }}</a>-->
<!--                                        </template>-->
<!--                                        <template #avatar>-->
<!--                                            <a-avatar :src="item.picture.large" size="large"/>-->
<!--                                        </template>-->
<!--                                    </a-list-item-meta>-->

<!--                                </a-skeleton>-->
<!--                            </a-list-item>-->
<!--                        </template>-->
<!--                    </a-list>-->
<!--                </a-layout-content>-->

<!--                <a-layout-footer class="!bg-white border border-t-gray-200 !py-4">-->
<!--                    <a-space align="center" size="middle" direction="horizontal" class="hidden md:flex">-->
<!--                        <a-tooltip title="search">-->
<!--                            <a-button type="primary" shape="circle">-->
<!--                                <font-awesome-icon icon="fa-solid fa-cog" class="!me-0"/>-->
<!--                            </a-button>-->
<!--                        </a-tooltip>-->
<!--                        <a-typography-title :level="4" class="!m-0">h4. Ant Design Vue</a-typography-title>-->
<!--                    </a-space>-->

<!--                    <a-flex class="justify-between items-center gap-4 py-2 md:hidden">-->
<!--                        <a-tooltip title="search">-->
<!--                            <a-button type="primary" shape="circle">-->
<!--                                <font-awesome-icon icon="fa-solid fa-cog" class="!me-0"/>-->
<!--                            </a-button>-->
<!--                        </a-tooltip>-->
<!--                        <a-tooltip title="search">-->
<!--                            <a-button type="primary" shape="circle">-->
<!--                                <font-awesome-icon icon="fa-solid fa-cog" class="!me-0"/>-->
<!--                            </a-button>-->
<!--                        </a-tooltip>-->
<!--                        <a-tooltip title="search">-->
<!--                            <a-button type="primary" shape="circle">-->
<!--                                <font-awesome-icon icon="fa-solid fa-cog" class="!me-0"/>-->
<!--                            </a-button>-->
<!--                        </a-tooltip>-->
<!--                        <a-tooltip title="search">-->
<!--                            <a-button type="primary" shape="circle">-->
<!--                                <font-awesome-icon icon="fa-solid fa-cog" class="!me-0"/>-->
<!--                            </a-button>-->
<!--                        </a-tooltip>-->
<!--                    </a-flex>-->
<!--                </a-layout-footer>-->
<!--            </div>-->

<!--            <div class="relative mx-auto w-full w-screen-xl flex flex-col justify-between">-->

<!--                <div class="w-full bg-white !px-5 py-4">-->
<!--                    <a-flex class="justify-between items-center">-->
<!--                        <a-space align="center" size="middle" direction="horizontal">-->
<!--                            <div class="relative">-->
<!--                                <a-avatar :size="48" class="relative flex items-center justify-center bg-red-600">-->
<!--                                    <template #icon>-->
<!--                                        <font-awesome-icon icon="fa-solid fa-user" class="!me-0"/>-->
<!--                                    </template>-->
<!--                                </a-avatar>-->
<!--                                <div-->
<!--                                    class="absolute bottom-0 right-0 rounded-full  border-2 border-white bg-[#31A24C] h-4 w-4 z-10"></div>-->
<!--                            </div>-->

<!--                            <div class="!gap-0">-->
<!--                                <a-typography-title :level="5" class="!m-0">FLASMON Jamé</a-typography-title>-->
<!--                                <a-typography-title :level="5" class="!m-0 !font-normal !text-[14px] !text-gray-500">En-->
<!--                                    ligne-->
<!--                                </a-typography-title>-->
<!--                            </div>-->
<!--                        </a-space>-->

<!--                        <a-space>-->
<!--                            <a-tooltip title="Passer un appel vocal">-->
<!--                                <a-button shape="circle" class="border-none text-gray-400">-->
<!--                                    <font-awesome-icon icon="fa-solid fa-phone" class="!me-0"/>-->
<!--                                </a-button>-->
<!--                            </a-tooltip>-->

<!--                            <a-tooltip title="Lance un appel vidéo" placement="topRight">-->
<!--                                <a-button @click="toggleCameraVideo" shape="circle" class="border-none text-gray-400">-->
<!--                                    <font-awesome-icon-->
<!--                                        :icon="isCameraVideo ? 'fa-solid fa-video' : 'fa-solid fa-video-slash'"-->
<!--                                        :class="{'text-gray-400': !isCameraVideo, 'text-green-500': isCameraVideo}"-->
<!--                                        class="!me-0"/>-->
<!--                                </a-button>-->
<!--                            </a-tooltip>-->

<!--                            <a-tooltip title="search">-->
<!--                                <a-button shape="circle" class="border-none text-gray-400">-->
<!--                                    <font-awesome-icon icon="fa-solid fa-ellipsis" class="!me-0"/>-->
<!--                                </a-button>-->
<!--                            </a-tooltip>-->
<!--                        </a-space>-->
<!--                    </a-flex>-->
<!--                </div>-->

<!--                <div class="!bg-[#EFEAE2]  chat-content h-full">-->
<!--                    <div class="chatBx main-scrool">-->
<!--                        <div class="msg msg-me">-->
<!--                            <p>Hi <br> <span>12:15</span></p>-->
<!--                        </div>-->
<!--                        <div class="msg msg-frnd">-->
<!--                            <p>Hello <br> <span>12:15</span></p>-->
<!--                        </div>-->

<!--                        &lt;!&ndash; repeat 8X  &ndash;&gt;-->
<!--                        <div class="msg msg-me">-->
<!--                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, tempora. <br>-->
<!--                                <span>12:15</span>-->
<!--                            </p>-->
<!--                        </div>-->
<!--                        <div class="msg msg-frnd">-->
<!--                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br> <span>12:15</span></p>-->
<!--                        </div>-->

<!--                        <div class="msg msg-me">-->
<!--                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt error, similique-->
<!--                                voluptatem-->
<!--                                mollitia illo totam? <br>-->
<!--                                <span>12:15</span>-->
<!--                            </p>-->
<!--                        </div>-->
<!--                        <div class="msg msg-frnd">-->
<!--                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptate ipsam blanditiis!-->
<!--                                <br>-->
<!--                                <span>12:15</span>-->
<!--                            </p>-->
<!--                        </div>-->

<!--                        <div class="msg msg-me">-->
<!--                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia placeat modi praesentium-->
<!--                                exercitationem reiciendis repudiandae velit eum harum maxime voluptatum.<br>-->
<!--                                <span>12:15</span>-->
<!--                            </p>-->
<!--                        </div>-->
<!--                        <div class="msg msg-frnd">-->
<!--                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, accusamus recusandae-->
<!--                                iusto-->
<!--                                inventore esse quae. <br>-->
<!--                                <span>12:15</span>-->
<!--                            </p>-->
<!--                        </div>-->

<!--                        <div class="msg msg-me">-->
<!--                            <p>Ok <br> <span>12:15</span></p>-->
<!--                        </div>-->
<!--                        <div class="msg msg-frnd">-->
<!--                            <p>Thank You <br> <span>12:15</span></p>-->
<!--                        </div>-->

<!--                        <div class="msg msg-me">-->
<!--                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, tempora. <br>-->
<!--                                <span>12:15</span>-->
<!--                            </p>-->
<!--                        </div>-->
<!--                        <div class="msg msg-frnd">-->
<!--                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br> <span>12:15</span></p>-->
<!--                        </div>-->

<!--                        <div class="msg msg-me">-->
<!--                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt error, similique-->
<!--                                voluptatem-->
<!--                                mollitia illo totam? <br>-->
<!--                                <span>12:15</span>-->
<!--                            </p>-->
<!--                        </div>-->
<!--                        <div class="msg msg-frnd">-->
<!--                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptate ipsam blanditiis!-->
<!--                                <br>-->
<!--                                <span>12:15</span>-->
<!--                            </p>-->
<!--                        </div>-->

<!--                        <div class="msg msg-me">-->
<!--                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia placeat modi praesentium-->
<!--                                exercitationem reiciendis repudiandae velit eum harum maxime voluptatum.<br>-->
<!--                                <span>12:15</span>-->
<!--                            </p>-->
<!--                        </div>-->
<!--                        <div class="msg msg-frnd">-->
<!--                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, accusamus recusandae-->
<!--                                iusto-->
<!--                                inventore esse quae. <br>-->
<!--                                <span>12:15</span>-->
<!--                            </p>-->
<!--                        </div>-->
<!--                    </div >-->
<!--                </div>-->

<!--                <div class="absolute z-50 left-0 bottom-0 bg-white px-8 py-4 w-full">-->
<!--                    <div class="flex items-center justify-between gap-4">-->
<!--                        <a-tooltip title="search">-->
<!--                            <a-button type="primary" shape="circle">-->
<!--                                <font-awesome-icon icon="fa-solid fa-plus" class="!me-0"/>-->
<!--                            </a-button>-->
<!--                        </a-tooltip>-->
<!--                        <a-tooltip title="search">-->
<!--                            <a-button type="primary" shape="circle">-->
<!--                                <font-awesome-icon icon="fa-solid fa-cog" class="!me-0"/>-->
<!--                            </a-button>-->
<!--                        </a-tooltip>-->
<!--                        <a-textarea-->
<!--                            v-model:value="value1"-->
<!--                            placeholder="Type a message..."-->
<!--                            :class="[-->
<!--                                                (isMaxRows && value1) ? 'rounded-md' : 'rounded-full',-->
<!--                                                'customer-input !bg-gray-100 message-input flex items-center justify-center transition-all duration-300'-->
<!--                                                ]"-->
<!--                            :auto-size="{ maxRows: 4 }"-->
<!--                            class="px-4 py-2"-->
<!--                            @input="handleInput"-->
<!--                        />-->
<!--                        <a-tooltip title="Appuyer su Entrée pour envoyer" placement="topRight" v-if="value1.length > 0">-->
<!--                            <a-button shape="circle" class="border-none">-->
<!--                                <font-awesome-icon icon="fa-solid fa-paper-plane" class="!me-0 text-primary"/>-->
<!--                            </a-button>-->
<!--                        </a-tooltip>-->
<!--                        <a-tooltip title="Microphone" v-else>-->
<!--                            <a-button shape="circle" @click="toggleIcon" class="border-none">-->
<!--                                <font-awesome-icon-->
<!--                                    :icon="isMicrophone ? 'fa-solid fa-microphone' : 'fa-solid fa-microphone-slash'"-->
<!--                                    :class="{'text-gray-500': !isMicrophone, 'text-green-500': isMicrophone}"-->
<!--                                    class="!me-0 !size-6"/>-->
<!--                            </a-button>-->
<!--                        </a-tooltip>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </a-layout-content>-->
<!--    </a-layout>-->
</template>
<style>

#side-bar::-webkit-scrollbar {
    @apply !w-[3px];
}

#side-bar .ant-menu-item {
    @apply relative px-3 py-6 m-0 mb-2 w-full rounded-full flex items-center leading-6 text-sm hover:shadow transition-all duration-300;
}

#side-bar .ant-menu-dark .ant-menu-item-selected {
    @apply !bg-primary
}

#side-bar .ant-menu-item a {
    @apply flex items-center rounded-none;
}

#side-bar .ant-menu-item svg,
.svg-inline--fa {
    @apply w-5 h-5 me-3;
}

#side-bar .ant-menu-dark {
    @apply !rounded-none
}

#side-bar .ant-menu-inline .ant-menu-submenu {
    @apply hover:bg-primary rounded-none
}

#side-bar .ant-menu-dark.ant-menu-submenu > .ant-menu {
    @apply !bg-[#1178a3]
}

#side-bar .ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline {
    @apply bg-[#2C3338]
}

#side-bar .ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title {
    @apply !bg-primary hover:bg-primary px-0 py-6 m-0 mx-0 w-full rounded-none
}

#side-bar .ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline .ant-menu-item {
    @apply hover:text-white hover:bg-transparent transition-all duration-300
}

#side-bar .ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline .ant-menu-item.ant-menu-item-selected {
    @apply !bg-transparent
}

.chatBx {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 830px;
    padding: 30px 50px;
    margin: 5px 0;
    overflow-y: auto;

}

.chatBx .msg {
    position: relative;
    display: flex;
    width: 100%;
    margin: 5px 0;
}

.chatBx .msg p {
    position: relative;
    right: 0;
    text-align: right;
    max-width: 65%;
    padding: 12px;
    background: #dcf8c6;
    border-radius: 10px;
    font-size: .9rem;
}

.chatBx .msg p::before {
    content: '';
    position: absolute;
    top: 0;
    right: -10px;
    border-top: 10px solid #dcf8c6;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #dcf8c6;
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

.chatBx .msg-frnd {
    justify-content: flex-start;
}

.chatBx .msg-frnd p {
    background: #fff;
    text-align: left;
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

</style>
