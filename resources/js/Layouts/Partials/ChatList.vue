<template>
    <div class="flex-1 overflow-y-auto max-h-[800px]">
        <a-list
            class="demo-loadmore-list py-0 max-h-full overflow-y-auto main-scrool"
            item-layout="horizontal"

        >
            <template #loadMore>
                <div
                    v-if="!initLoading && !loading"

                >
                    <a-button @click="onLoadMore">loading more</a-button>
                </div>
            </template>
            <template #renderItem="{ item }">
                <a-list-item>
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
</template>
<script setup>

</script>
