<template style="background: white">

    <div class="bc" style="height: 100%;background: white">

        <div class="bc">

            <!--头部-->
            <van-nav-bar
                    title="超级搜"
            />
            <!--头部 end-->

            <!--搜索-->
            <van-search
                    v-model="keyword"
                    placeholder="宝贝标题/关键字 （如：女装/男装）"
                    show-action
                    @search="onSearch"
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>

            <!--            <div style="background: white;text-align: center;font-size: 14px;padding-top: 8px;color: #999999">复制淘宝商品名称粘贴在上方输入框中搜索优惠券</div>-->
            <!--搜索 end-->

            <!--最近搜索-->
            <van-row type="flex" justify="center" style="padding-top: 10px;background: white;">
                <van-col span="10" style="display: flex;align-items: center">
                    <span style="font-size: 15px;color: #232326">最近搜索</span>
                </van-col>
                <van-col span="10" style="display: flex;align-items: center;justify-content: flex-end;">
                    <van-icon name="delete" @click="deleteKeyword()"/>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center" style="background: white">
                <van-col span="20">
                    <van-tag v-for="(i,index) in recentKeyword" :key="index"
                             @click="tagSearch(i.keyword)"
                             size="large"
                             type="danger" style="margin-left: 10px;margin-top: 10px">
                        {{ i.keyword }}
                    </van-tag>
                </van-col>
            </van-row>
            <!--最近搜索 end-->

            <!--热门搜索-->
            <van-row type="flex" justify="center" style="padding-top: 20px;background: white">
                <van-col span="20" style="display: flex;align-items: center">
                    <span style="font-size: 15px;color: #232326">热门搜索</span>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center" style="background: white">
                <van-col span="20">
                    <van-tag v-for="(i,index) in hotKeyword" :key="index"
                             @click="tagSearch(i.keyword)"
                             size="large"
                             type="danger" style="margin-left: 10px;margin-top: 10px">
                        {{ i.keyword }}
                    </van-tag>
                </van-col>
            </van-row>
            <!--热门搜索 end-->

        </div>
        <!--        <van-row type="flex" justify="space-around">-->
        <!--            <van-col span="24" style="text-align: center">-->
        <!--                <img src="../../static/img/like.jpg"-->
        <!--                     width="100%" height="100%">-->
        <!--            </van-col>-->
        <!--        </van-row>-->

        <!--        <van-row type="flex" justify="space-around">-->
        <!--            <van-col span="24" style="text-align: center">-->
        <!--                <img src="../../static/img/like.jpg"-->
        <!--                     width="100%" height="100%">-->
        <!--            </van-col>-->
        <!--        </van-row>-->

        <div style="text-align: center;font-size: 18px;padding-top: 30px;padding-bottom:8px;color: orange">今日值得买</div>
        <orange-goods-card
                v-for="(i,index) in item_info"
                :key="'e' + index"
                :topTag='"限时抢" + i.couponmoney+"元券"'
                :title="i.itemtitle"
                :image="i.itempic"
                :price="i.itemprice"
                :priceTag="i.itemendprice"
                :ratio="true"
                :to='"/goods?id=" + i.itemid'
                style="margin-top: 10px"
        ></orange-goods-card>
        <div class="footer">
            <orange-footer></orange-footer>
        </div>
        <orange-up></orange-up>

    </div>

</template>

<script>

    import {queue} from "../../static/queue";

    export default {
        name: "Search",
        data() {
            return {
                hotKeyword: [],
                recentKeyword: [],
                keyword: '',
                localKeyword: 'orange-tyh-keyword',
                item_info: [], //今日值得买数据
                isFirstEnter: false // 是否第一次进入，默认false
            }
        },
        created() {
            this.isFirstEnter = true;
        },
        beforeRouteEnter(to, from, next) {
            if (from.name === 'searchGoods') {
                to.meta.isBack = true;
                //判断是从哪个路由过来的，
                //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
            }
            next();
        },
        activated() {
            if (this.$route.meta.isBack || this.isFirstEnter) {
                try {
                    this.recentKeyword = queue.get(this.localKeyword);
                } catch (e) {
                    console.log(e);
                }
                this.keyword = '';
                this.$axios.get('/api/hot_key/apikey/Hein').then((rsp) => {
                    if (rsp.data.code === 1) {
                        this.hotKeyword = [];
                        for (let i = 0; i < rsp.data.data.length; i++) {
                            this.hotKeyword.push(rsp.data.data[i]);
                            if (i === 20) {
                                break;
                            }
                        }
                    } else {
                        this.$alert.notifyNoData(rsp.data.msg);
                    }

                }).catch((e) => {
                    this.$alert.dialogUnknown(e);
                });
                this.$axios.get('/api/get_free_shipping_data/apikey/Hein/min_id/1/back/20/cat_id/0').then((rsp) => {
                    if (rsp.data.code === 1) {
                        this.item_info = rsp.data.data;
                    } else {
                        this.$alert.notifyNoData(rsp.data.msg);
                    }

                }).catch((e) => {
                    this.$alert.dialogUnknown(e);
                });
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack = false;
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter = false;

        },

        methods: {
            onSearch() {
                if (this.keyword === '') {
                    this.keyword = '网红'
                }
                try {
                    queue.insert({
                        key: this.localKeyword,
                        value: {
                            keyword: this.keyword
                        },
                        capacityNum: 20, //队列容量
                    });
                } catch (e) {
                    console.log(e);
                }
                this.$router.push({path: "/search/goods?keyword=" + this.keyword});
            },
            tagSearch(keyword) {
                this.$router.push({path: "/search/goods?keyword=" + keyword});
            },
            deleteKeyword() { //清空最近搜索的关键词
                this.recentKeyword = [];
                queue.remove(this.localKeyword);
            },
        }
    }

</script>

<style scoped>
</style>
