<template>
    <a-layout-content class="!bg-[#EFEAE2] h-96 overflow-y-auto main-scrool">
        <div class="chat-content h-full max-h-screen">
            <div class="chatBx main-scrool">
                <div class="msg msg-me">
                    <p>Hi <br> <span>12:15</span></p>
                </div>
                <div class="msg msg-frnd">
                    <p>Hello <br> <span>12:15</span></p>
                </div>

                <!-- repeat 8X  -->
                <div class="msg msg-me">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, tempora. <br>
                        <span>12:15</span>
                    </p>
                </div>
                <div class="msg msg-frnd">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br> <span>12:15</span>
                    </p>
                </div>

                <div class="msg msg-me">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt error,
                        similique
                        voluptatem
                        mollitia illo totam? <br>
                        <span>12:15</span>
                    </p>
                </div>
                <div class="msg msg-frnd">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptate ipsam
                        blanditiis!
                        <br>
                        <span>12:15</span>
                    </p>
                </div>

                <div class="msg msg-me">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia placeat modi
                        praesentium
                        exercitationem reiciendis repudiandae velit eum harum maxime voluptatum.<br>
                        <span>12:15</span>
                    </p>
                </div>
                <div class="msg msg-frnd">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, accusamus
                        recusandae
                        iusto
                        inventore esse quae. <br>
                        <span>12:15</span>
                    </p>
                </div>

                <div class="msg msg-me">
                    <p>Ok <br> <span>12:15</span></p>
                </div>
                <div class="msg msg-frnd">
                    <p>Thank You <br> <span>12:15</span></p>
                </div>

                <div class="msg msg-me">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, tempora. <br>
                        <span>12:15</span>
                    </p>
                </div>
                <div class="msg msg-frnd">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br> <span>12:15</span>
                    </p>
                </div>

                <div class="msg msg-me">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt error,
                        similique
                        voluptatem
                        mollitia illo totam? <br>
                        <span>12:15</span>
                    </p>
                </div>
                <div class="msg msg-frnd">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptate ipsam
                        blanditiis!
                        <br>
                        <span>12:15</span>
                    </p>
                </div>

                <div class="msg msg-me">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia placeat modi
                        praesentium
                        exercitationem reiciendis repudiandae velit eum harum maxime voluptatum.<br>
                        <span>12:15</span>
                    </p>
                </div>
                <div class="msg msg-frnd">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, accusamus
                        recusandae
                        iusto
                        inventore esse quae. <br>
                        <span>12:15</span>
                    </p>
                </div>
            </div>
        </div>
    </a-layout-content>
</template>
<script setup>

</script>
<style>

.chatBx {
    position: relative;
    width: 100%;
    padding: 30px 50px;
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
    text-align: left;
    max-width: 65%;
    padding: 12px;
    background: #D9FDD3;
    border-radius: 10px;
    font-size: .9rem;
}

.chatBx .msg p::before {
    content: '';
    position: absolute;
    top: 0;
    right: -10px;
    border-top: 10px solid #D9FDD3;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #D9FDD3;
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
