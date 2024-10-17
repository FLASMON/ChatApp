<template>

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


</template>
<script setup>
import {ref} from "vue";

const search = ref('');

</script>
