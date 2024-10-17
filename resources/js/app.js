import './bootstrap';
import '../css/app.css';
import './Icons/icons';
import 'vue3-emoji-picker/css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import Layout from "@/Layouts/Layout.vue";
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.vue', {eager: true});
        let page = pages[`./Pages/${name}.vue`];
        page.default.layout = page.default.layout || Layout
        return page;
    },
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .component('font-awesome-icon', FontAwesomeIcon)
            .mount(el);
    },
    // progress: {
    //     color: '#4B5563',
    // },
    progress: false,
});
