<template>

    <div>

        <div
             style="float: left;width: 49%;background-color: #fff;margin-top: 4px;margin-right: 2px" @click="open()">
            <div style="padding: .3em .3em .3em;position: relative">
                <img :src="image"
                width="100%" height="180px" style="border-radius: 5px;"/>
                <van-tag v-if="bottomTag != null" type="danger" style="position: absolute;bottom:0;right:0">
                    {{ bottomTag }}
                </van-tag>
                <van-tag v-if="topTag != null" size="large" type="danger" style="position: absolute;top:0;left:0">
                    {{ topTag }}
                </van-tag>
            </div>
            <div style="text-align: center;">
                <a class="twolist-hidden" style="height: 45px;font-size: 12px;margin-right: 2px;margin-left: 2px">
                    {{ title }}
                </a>
                <div class="twolist-hidden" style="padding: .3em .3em .3em .3em;color: red;display: flex;flex-direction: row;justify-content: center">
                    <van-tag v-if="priceTag != null" size="large" type="danger" style="margin-right: 6px;margin-bottom: 6px">
                        {{ priceTag }}
                    </van-tag>
                    <div v-if="price != null" style="margin-top: 2px;">
                        <span v-if="ratio == null">¥{{ price }}</span>
                        <span v-if="ratio != null" style="font-size: 15px"><s>¥{{ price }}</s></span>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "orange-goods-card",
        props:[
            "bottomTag","topTag","title","price","ratio","priceTag","image","to"
        ],
        methods: {
            open() {
                this.$router.push({ path: this.to });
            },
        }
    }
</script>

<style scoped>
    .twolist-hidden {
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }
</style>
