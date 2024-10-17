<template>
    <a-config-provider :theme="AntdvTheme">
        <div class="text-gray-800">
            <slot></slot>
        </div>
    </a-config-provider>

    <Loader></Loader>
</template>

<script setup>
import AntdvTheme from "../Theme/antdv-theme"
import {usePage} from "@inertiajs/vue3";
import {watch} from "vue";
import {message} from "ant-design-vue";
import Loader from "@/Components/Loader.vue";

const page = usePage();
watch(
    () => page.props.message,
    (data) => {
        if (data.success) {
            message.success(data.success);
        }
        if (data.error) {
            message.error(data.error);
        }
    }
);
</script>
