<template>

    <div class="bc" style="height: 100%">

        <div class="orange-home bc" style="height: 100%">
            <div class="orange-content" style="display: flex;flex-direction: column">

                <orange-search to="/search/main"></orange-search>

                <div style="flex: auto;display: flex;flex-direction: row">

                    <div style="overflow:auto;margin-bottom: 20px;width: 20%">
                        <van-sidebar :active-key="activeKey" @change="onChange">
                            <van-sidebar-item v-for="(i,index) in category" :key="index"
                                              :title="i.name"></van-sidebar-item>
                        </van-sidebar>
                    </div>

                    <div class="slide" style="flex: auto;overflow:auto;margin-bottom: 20px;width: 80%">

                        <van-row type="flex" justify="center" style="padding-top: 10px">
                            <van-col span="22">

                                <orange-horizontal-piece
                                        style="font-size: 15px;"
                                        title="网红商品">
                                </orange-horizontal-piece>
                                <orange-goods-sell
                                        v-for="(i,index) in goods"
                                        :key="'q' + index"
                                        :image="i.itempic"
                                        :title="i.itemtitle"
                                        :price="i.itemendprice"
                                        :originalPrice="i.itemprice"
                                        :payment="i.itemsale"
                                        :to='"/goods?id=" + i.itemid'
                                ></orange-goods-sell>
                            </van-col>

                        </van-row>
                        <br><br>
                    </div>

                </div>

            </div>

            <orange-footer></orange-footer>

        </div>

    </div>


</template>

<script>

    export default {
        name: "Category",
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
                this.getData();
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack = false;
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter = false;
        },
        data() {
            return {
                isFirstEnter: true,
                keyword: '',
                // 左侧高亮元素的index
                mainActiveIndex: 0,
                // 被选中元素的id
                activeId: 0,
                activeKey: 0,
                //0全部，1女装，2男装，3内衣，4美妆，5配饰，6鞋品，7箱包，8儿童，
                // 9母婴，10居家，11美食，12数码，13家电，14其他，15车品，16文体，17宠物
                category: [
                    {name: '热门抖货'},
                    {name: '百变穿搭'},
                    {name: '时尚潮男'},
                    {name: '舒适好物'},
                    {name: '美妆达人'},
                    {name: '魅力配饰'},
                    {name: '步履不停'},
                    {name: '包罗万象'},
                    {name: '萌娃驾到'},
                    {name: '宝妈神器'},
                    {name: '居家好物'},
                    {name: '吃货专区'},
                    {name: '数码达人'},
                    {name: '用电能手'},
                    {name: '其他'},
                    {name: '伴你前行'},
                    {name: '学习娱乐'},
                    {name: '萌宠世界'},
                ],
                goods: '',
            };
        },
        methods: {
            getData() {
                this.$axios.get('/api/get_trill_data/apikey/maxd/min_id/0/back/20/cat_id/' + this.activeKey).then((rsp) => {
                    if (rsp.data.code == 1) {
                        this.goods = rsp.data.data;
                    } else {
                        this.$alert.notifyNoData(rsp.data.msg);
                    }
                }).catch((e) => {
                    this.$alert.dialogUnknown(e);
                });
            },
            onSearch() {
                alert(this.keyword);
            },
            onChange(key) {
                this.activeKey = key;
                this.getData();
            },
        }
    }

</script>

<style scoped>

</style>
