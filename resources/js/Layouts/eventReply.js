// src/eventBus.js
import { reactive } from 'vue';

const state = reactive({
    isVisible: false,
});

const show = () => {
    state.isVisible = true;
};

const hide = () => {
    state.isVisible = false;
};

export const EventReply = {
    state,
    show,
    hide,
};
