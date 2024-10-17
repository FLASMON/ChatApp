<template>
    <a-layout-sider  id="side-bar" width="80" class="relative items-center justify-center !h-full !bg-transparent hidden lg:flex">
        <a-menu
            :selectedKeys="selectedKeys"
            mode="vertical"
            :openKeys="openKeys"


             theme="light" class="!bg-transparent !border-0">
            <div class="h-full min-h-screen flex flex-col justify-between items-center pt-4">
                <div>
                    <a-tooltip title="Discusion" placement="right">
                        <a-menu-item key="discusion" class="menu-item">
                            <Link>
                                <font-awesome-icon icon="fa-solid fa-comments" class="!me-0 !size-8"/>
                            </Link>
                        </a-menu-item>
                    </a-tooltip>
                    <a-tooltip title="Status" placement="right">
                        <a-menu-item key="status" class="menu-item">
                            <Link>
                                <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-5"/>
                            </Link>
                        </a-menu-item>
                    </a-tooltip>
                    <a-tooltip title="Chaine" placement="right">
                        <a-menu-item key="chaine" class="menu-item">
                            <Link>
                                <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-5"/>
                            </Link>
                        </a-menu-item>
                    </a-tooltip>
                    <a-tooltip title="Communaute" placement="right">
                        <a-menu-item key="communaute" class="menu-item">
                            <Link>
                                <font-awesome-icon icon="fa-solid fa-user" class="!me-0 !size-5"/>
                            </Link>
                        </a-menu-item>
                    </a-tooltip>
                </div>

                <!-- Bottom avatar -->
                <div class="mb-4">
                    <a-tooltip title="Settings" placement="right">
                        <a-menu-item key="settings" class="menu-item">
                            <Link>
                                <font-awesome-icon icon="fa-solid fa-cog" class="!me-0 !size-5"/>
                            </Link>
                        </a-menu-item>
                    </a-tooltip>
                    <a-tooltip title="Profil" placement="right">
                        <a-menu-item key="settings" class="menu-item">
                            <Link>
                                <a-avatar :size="48" class="flex items-center justify-center bg-gray-300">
                                    <template #icon>
                                        <font-awesome-icon icon="fa-solid fa-user" class="!me-0"/>
                                    </template>
                                </a-avatar>
                            </Link>
                        </a-menu-item>
                    </a-tooltip>
                </div>
            </div>
        </a-menu>
    </a-layout-sider>
</template>
<script setup>
import {Link} from "@inertiajs/vue3";

const props = defineProps({
    selectedKeys: {
        type: Array,
        default: [],
    },

    openKeys: {
        type: String,
        default: "",
    },
});
</script>
<style>

#side-bar::-webkit-scrollbar {
    @apply !w-[3px];
}

#side-bar .ant-menu-item {
    @apply relative h-10 w-10 m-0 mb-1 text-white  rounded-full  flex items-center justify-center leading-6 text-sm hover:shadow transition-all duration-300;
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

</style>
