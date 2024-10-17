<template>
    <a-layout-footer class="!px-4 !py-4 !bg-[#F0F2F5]">
        <transition name="slide-reply" mode="out-in" appear>
            <div v-if="EventReply.state.isVisible" class="flex items-center justify-between gap-4">
                <div
                    class="flex-col gap-1 w-full pl-4 py-2 bg-[#C7D9FE] border-l-4 border-l-[#0456FE] mb-2 rounded-lg">
                    <span class="font-medium text-[#0456FE]">FLASMON Jamé</span>
                    <p class="relative">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officia placeat modi praesentium exercitationem reiciendis
                        repudiandae velit eum harum maxime voluptatum.
                    </p>
                </div>
                <a-button @click="hideFooter" shape="circle"
                          class="border-none text-gray-400 shadow-none !bg-transparent">
                    <font-awesome-icon icon="fa-solid fa-xmark" class="!me-0"/>
                </a-button>
            </div>
        </transition>

        <div class="relative flex items-center justify-between gap-4">
            <a-dropdown :trigger="['click']" placement="topLeft" arrow>
                <a-tooltip title="Plus">
                    <a-button type="primary" shape="circle">
                        <font-awesome-icon icon="fa-solid fa-plus" class="!me-0 !size-4"/>
                    </a-button>
                </a-tooltip>
                <template #overlay>
                    <a-menu>
                        <a-menu-item>
                            <a href="javascript:;">
                                <font-awesome-icon icon="fa-solid fa-plus" class="!me-2 !size-4"/>
                                <span class="capitalize">Newsletters</span>
                            </a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">
                                <font-awesome-icon icon="fa-solid fa-video" class="!me-2 !size-4"/>
                                <span class="capitalize">Newsletters</span>
                            </a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">
                                <font-awesome-icon icon="fa-solid fa-plus" class="!me-2 !size-4"/>
                                <span class="capitalize">Newsletters</span>
                            </a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>

            <a-tooltip title="Recherche Emoji">
                <a-button shape="circle" class="border-none text-gray-400 shadow-none !bg-transparent"
                          @click="toggleEmojiPicker">
                    <font-awesome-icon icon="fa-solid fa-face-smile" class="!me-0"/>
                </a-button>
            </a-tooltip>

            <a-textarea
                v-model:value="value1"
                placeholder="Type a message..."
                :class="[
                    (isMaxRows && value1) ? 'rounded-md' : 'rounded-full',
                    'customer-input !bg-white message-input flex items-center justify-center transition-all duration-300 main-scrool'
                ]"
                :auto-size="{ maxRows: 4 }"
                class="px-4 py-2"
                @input="handleInput"
            />

            <a-tooltip title="Appuyer su Entrée pour envoyer" placement="topRight" v-if="value1.length > 0">
                <a-button shape="circle" class="border-none !shadow-none !bg-transparent">
                    <font-awesome-icon icon="fa-solid fa-paper-plane" class="!me-0 text-primary"/>
                </a-button>
            </a-tooltip>

            <a-tooltip title="Microphone" v-else>
                <a-button shape="circle" @click="toggleIcon" class="border-none !bg-transparent">
                    <font-awesome-icon
                        :icon="isMicrophone ? 'fa-solid fa-microphone' : 'fa-solid fa-microphone-slash'"
                        :class="{'text-gray-500': !isMicrophone, 'text-green-500': isMicrophone}"
                        class="!me-0 !size-6"/>
                </a-button>
            </a-tooltip>

            <!-- Emoji Picker -->
            <div v-if="showEmojiPicker" class="absolute bottom-full left-0 z-50">
                <EmojiPicker :native="true" :group-names="groupNames" @select="onSelectEmoji"
                             class="custom-emoji-picker"/>
            </div>
        </div>
    </a-layout-footer>
</template>

<script setup>
import {ref} from "vue";
import EmojiPicker from 'vue3-emoji-picker';
import {EventReply} from "@/Layouts/eventReply.js";

const value1 = ref('');
const isMaxRows = ref(false);
const isMicrophone = ref(false);
const showEmojiPicker = ref(false);

// Hide footer message
const hideFooter = () => {
    EventReply.hide();
};

// Toggle emoji picker display
const toggleEmojiPicker = () => {
    showEmojiPicker.value = !showEmojiPicker.value;
};

// Define emoji groups and their default names
const groupNames = {
    smileys_people: "Smiles & People",
    animals_nature: "Animals & Nature",
    food_drink: "Food & Drink",
    activities: "Activities",
    travel_places: "Travel places",
    objects: "Objects",
    symbols: "Symbols",
    flags: "Flags"
};

const handleInput = (event) => {
    const textarea = event.target;
    const maxScrollHeight = parseFloat(window.getComputedStyle(textarea).lineHeight) * 3;
    isMaxRows.value = textarea.scrollHeight >= maxScrollHeight;
};

const toggleIcon = () => {
    isMicrophone.value = !isMicrophone.value;
};

const onSelectEmoji = (emoji) => {
    value1.value += emoji.i;
};

</script>

<style>
.slide-reply-enter-active,
.slide-reply-leave-active {
    transition: all 300ms ease-out;
}

.slide-reply-enter-from,
.slide-reply-leave-to {
    opacity: 0;
    transform: translateY(50px);
}

.v3-emoji-picker .v3-header .v3-groups .v3-group span img {
    width: 24px;
    height: 24px;
    transition: transform 0.2s;
}

/* Hover effect for emoji images */
.v3-emoji-picker .v3-header .v3-groups .v3-group span img:hover {
    transform: scale(1.2);
    filter: brightness(1.2);

}

/* Optional: Style the group titles */
.v3-emoji-picker .v3-header .v3-groups .v3-group span {
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
}

.custom-emoji-picker .v3-search input {
    border-radius: 30px !important;
    padding: 14px 12px;
}
</style>
