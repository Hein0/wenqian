<template>

    <div class="bc" style="height: 100%">

        <div class="bc">

            <!--头部-->
            <van-nav-bar
                    title="搜索商品"
                    left-text="返回"
                    right-text="搜索"
                    left-arrow
                    @click-right="onClickRight"
                    @click-left="onClickLeft"></van-nav-bar>
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
            <!--搜索 end-->

            <!--出来商品-->
            <van-tabs @click="tabSearch" sticky>
                <van-tab v-for="(t,index) in tab" :key="index" :title="t.name">

                    <van-list
                            v-model="t.loading"
                            :finished="t.finished"
                            finished-text="我也是有底线的"
                            @load="onLoad"
                    >
                        <orange-goods-sell
                                v-for="(i,index) in t.data"
                                :key="index"
                                :image="i.itempic"
                                :title="i.itemtitle"
                                :price="i.itemendprice"
                                :originalPrice="i.itemprice"
                                :payment="i.itemsale"
                                :to='"/goods?id=" + i.itemid'
                        ></orange-goods-sell>
                    </van-list>

                </van-tab>
            </van-tabs>

            <orange-up></orange-up>

        </div>

    </div>

</template>

<script>

    import {queue} from "../../static/queue";

    export default {
        name: "SearchGoods",
        created() {
            this.isFirstEnter = true;
        },

        beforeRouteEnter(to, from, next) {
            if (from.name === 'goods') {
                to.meta.isBack = true;
                //判断是从哪个路由过来的，
                //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
            }
            next();
        },
        activated() {
            if (!this.$route.meta.isBack || this.isFirstEnter) {
                this.tab[this.tagIndex].data = [];
                this.keyword = this.$route.query.keyword;
                this.getData(this.tagIndex, this.tab[this.tagIndex].total);
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack = false;
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter = false;
        },
        data() {
            return {
                keyword: '',
                tab: [
                    {name: '销量', loading: true, finished: false, position: 2, total: 0, data: []},
                    {name: '综合', loading: true, finished: false, position: 0, total: 0, data: []},
                    {name: '最新', loading: true, finished: false, position: 1, total: 0, data: []},
                    {name: '价格', loading: true, finished: false, position: 4, total: 0, data: []},
                ],
                tagIndex: 0,
                localKeyword: 'orange-tyh-keyword',
                min_id: 1,
                tb_p: 1,
                position:2,
                isFirstEnter: false // 是否第一次进入，默认false
            }
        },
        methods: {
            onClickLeft() {
                window.history.go(-1);
            },
            onClickRight() {
                this.$router.push({path: "/search/main"});
            },
            onSearch() { //搜索按钮触发
                try {
                    queue.insert({
                        key: this.localKeyword,
                        value: {keyword: this.keyword},
                        capacityNum: 20,
                    });
                } catch (e) {
                    console.log(e);
                }
                this.getData(this.tagIndex, 1);
            },
            tabSearch(index, title) { //点击标签，换标签触发
                this.tagIndex = index;
                this.position = this.tab[index].position;
                this.min_id = 1;
                this.tb_p = 1;
                this.tab[this.tagIndex].total = 1;
                this.getData(this.tagIndex, 1);
            },
            onLoad() { //继续加载数据事件
                this.tab[this.tagIndex].total += 1;
                this.getData(this.tagIndex, this.tab[this.tagIndex].total);
            },
            getData(index, page) {
                this.$axios.get('/api/supersearch/apikey/Hein/keyword/' + this.keyword + '/back/20/sort/' + this.position + '/min_id/' + this.min_id + '/tb_p/' + this.tb_p, {}).then((rsp) => {
                    if (rsp.data.code == 1) {
                        if (page == 1) {
                            this.tab[index].data = [];
                        }
                        this.min_id = rsp.data.min_id;
                        this.tb_p = rsp.data.tb_p;
                        for (let i = 0; i < rsp.data.data.length; i++) {
                            this.tab[index].data.push(rsp.data.data[i]);
                        }
                        this.tab[index].loading = false;
                    } else {
                        this.tab[index].loading = false;
                        this.tab[index].finished = true;
                        this.$alert.notifyNoData(rsp.data.msg);
                    }

                }).catch((e) => {
                    this.$alert.dialogUnknown(e);
                });

            },
        }
    }
</script>

<style scoped>

</style>
