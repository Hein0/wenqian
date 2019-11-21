<template>

    <div class="bc" style="height: 100%">

        <div class="orange-home bc">

            <div class="orange-content">
                <!--头部-->
                <orange-search to="/search/main"></orange-search>
                <orange-swipe :images="swipe"></orange-swipe>
                <!--头部 end-->

                <!--分类区-->
                <div style="float: left;width: 20%;display: flex;flex-direction: column;background-color: #fff;padding-bottom: 10px;padding-top: 16px"
                     @click="gridOpen('/home/district?type=1&title=今日上新')">
                    <img src='../../static/img/news.jpg'
                         style="height: 60px;border-radius: 35%;margin-left: 11px;margin-right: 11px"/>
                    <span style="font-size: 10px;text-align: center;color: #999999">今日上新</span>
                </div>
                <div style="float: left;width: 20%;display: flex;flex-direction: column;background-color: #fff;padding-bottom: 10px;padding-top: 16px"
                     @click="gridOpen('/home/district?type=2&title=9.9包邮')">
                    <img src='../../static/img/nine.jpg'
                         style="height: 60px;border-radius: 35%;margin-left: 11px;margin-right: 11px"/>
                    <span style="font-size: 10px;text-align: center;color: #999999">9.9包邮</span>
                </div>
                <div style="float: left;width: 20%;display: flex;flex-direction: column;background-color: #fff;padding-bottom: 10px;padding-top: 16px"
                     @click="gridOpen('/home/district?type=3&title=30元封顶')">
                    <img src='../../static/img/third.jpg'
                         style="height: 60px;border-radius: 35%;margin-left: 11px;margin-right: 11px"/>
                    <span style="font-size: 10px;text-align: center;color: #999999">30元封顶</span>
                </div>
                <div style="float: left;width: 20%;display: flex;flex-direction: column;background-color: #fff;padding-bottom: 10px;padding-top: 16px"
                     @click="gridOpen('/home/district?type=9&title=天猫商品')">
                    <img src='../../static/img/tianmao.jpg'
                         style="height: 60px;border-radius: 35%;margin-left: 11px;margin-right: 11px"/>
                    <span style="font-size: 10px;text-align: center;color: #999999">天猫商品</span>
                </div>
                <div style="float: left;width: 20%;display: flex;flex-direction: column;background-color: #fff;padding-bottom: 10px;padding-top: 16px"
                     @click="gridOpen('/home/district?type=8&title=品牌爆款')">
                    <img src='../../static/img/baokuan.jpg'
                         style="height: 60px;border-radius: 35%;margin-left: 11px;margin-right: 11px"/>
                    <span style="font-size: 10px;text-align: center;color: #999999">品牌爆款</span>
                </div>
                <!--分类区 end-->

                <div style="clear: both"></div>
                <!--聚划算，淘抢购-->
                <div>
                    <div style="float: left;width: 50%;display: flex;flex-direction: column;"
                         @click="gridOpen('/home/district?type=4&title=聚划算')">
                        <img src="../../static/img/juhuasuan.jpg" width="100%" height="100%"/>
                    </div>
                    <div style="float: left;width: 50%;display: flex;flex-direction: column;"
                         @click="gridOpen('/home/district?type=5&title=淘抢购')">
                        <img src="../../static/img/taoqianggou.jpg" width="100%" height="100%"/>
                    </div>
                </div>
                <!--商品推荐-->
                <div style="clear: both;background: white">
                    <div style="font-size: 18px;color: #eb5211;padding-bottom: 8px">
                        <van-row type="flex" justify="center"
                                 style="display: flex;align-items: center;text-align: center">
                            <van-col span="6">
                                <hr>
                            </van-col>
                            <van-col span="10">
                                <span>精选好货</span>
                            </van-col>
                            <van-col span="6">
                                <hr>
                            </van-col>
                        </van-row>
                    </div>
                    <van-tabs @click="choiceCategory" sticky>
                        <van-tab v-for="(name,index) in category" :key="index" :title="name">
                            <van-list
                                    v-model="handpickLoad.loading"
                                    :finished="handpickLoad.finished"
                                    finished-text="我也是有底线的"
                                    @load="handpickOnLoad"
                            >
                                <!--                        <orange-goods-card-->
                                <!--                                v-for="(i,index) in deserver"-->
                                <!--                                :key="'e' + index"-->
                                <!--                                :topTag='"优惠券" + i.couponmoney+"元"'-->
                                <!--                                :title="i.itemtitle"-->
                                <!--                                :image="i.itempic"-->
                                <!--                                :price="i.itemprice"-->
                                <!--                                :priceTag="i.itemendprice"-->
                                <!--                                :ratio="true"-->
                                <!--                                :to='"/goods?id=" + i.itemid'-->
                                <!--                                style="margin-top: 10px"-->
                                <!--                        ></orange-goods-card>-->
                                <orange-goods-sell
                                        v-for="(i,index) in deserver"
                                        :key="index"
                                        :tag='"优惠券" + i.couponmoney+"元"'
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

                </div>

                <orange-technology-footer style="clear: both"></orange-technology-footer>

            </div>

            <orange-up></orange-up>
            <orange-footer></orange-footer>

        </div>

    </div>

</template>

<script>
    export default {
        name: "Home",
        mounted() {
            //this.menuFixed('tabs');

        },
        data() {
            return {
                handpickLoad: {
                    loading: false,
                    finished: false,
                    total: 0,
                },
                min_id: 1,
                swipe: [ //轮播大图
                    {
                        src: require('../../../src/assets/chaozhi.jpg'),
                        to: '/home/brand',
                    },
                    {
                        src: require('../../../src/assets/daren.jpg'),
                        to: '/talent',
                    },
                ],

                category: [
                    '热门',
                    '百变穿搭',
                    '时尚潮男',
                    '舒适好物',
                    '美妆达人',
                    '魅力配饰',
                    '步履不停',
                    '包罗万象',
                    '萌娃驾到',
                    '宝妈神器',
                    '居家好物',
                    '吃货专区',
                    '数码达人',
                    '用电能手',
                    '其他',
                    '伴你前行',
                    '学习娱乐',
                    '萌宠世界',
                ],
                deserver: [], //今日值得买数据
                cat_id: 0,
                grid: [
                    {
                        name: '今日上新',
                        imageUrl: '/static/img/3.jpg',
                        toUrl: '',
                    },
                    {
                        name: '9.9包邮',
                        imageUrl: 'https://x.dscmall.cn/storage/data/gallery_album/108/original_img/108_P_1536792341842.png',
                        toUrl: '/home/district?type=2',
                    },
                    {
                        name: '30元封顶',
                        imageUrl: 'https://x.dscmall.cn/storage/data/gallery_album/108/original_img/108_P_1536792341842.png',
                        toUrl: '/home/district?type=3',
                    },
                    {
                        name: '天猫商品',
                        imageUrl: 'https://x.dscmall.cn/storage/data/gallery_album/108/original_img/108_P_1536792341842.png',
                        toUrl: '/home/district?type=9',
                    },
                    {
                        name: '品牌爆款',
                        imageUrl: 'https://x.dscmall.cn/storage/data/gallery_album/108/original_img/108_P_1536792341842.png',
                        toUrl: '/home/district?type=8',
                    },
                ],
                pretty: [
                    {
                        name: '聚划算',
                        imageUrl: "https://x.dscmall.cn/storage/data/gallery_album/108/original_img/108_P_1536793226579.jpg",
                        toUrl: '/home/district?type=4',
                    },
                    {
                        name: '淘抢购',
                        imageUrl: "https://x.dscmall.cn/storage/data/gallery_album/108/original_img/108_P_1536793228116.jpg",
                        toUrl: '/home/district?type=5',
                    },
                ]
            }
        },
        methods: {

            ///api/column/apikey/Hein/type/9/back/20/min_id/1/sort/9/cid/
            getData(page) {
                this.$axios.get("/api/column/apikey/Hein/type/9/back/20/min_id/" + this.min_id + "/sort/9/cid/" + this.cat_id).then((rsp) => {
                    if (rsp.data.code === 1) {
                        if (page === 1) {
                            this.deserver = [];
                        }
                        if (rsp.data.msg === '暂无数据') {
                            this.handpickLoad.loading = false;
                            this.handpickLoad.finished = true;
                        } else {
                            for (let i = 0; i < rsp.data.data.length; i++) {
                                this.deserver.push(rsp.data.data[i]);
                            }
                            this.min_id = rsp.data.min_id;
                            this.handpickLoad.loading = false;
                            //this.handpickLoad.finished = true;
                        }
                    } else {
                        this.handpickLoad.loading = false;
                        this.handpickLoad.finished = true;
                        this.$alert.notifyNoData(rsp.data.msg);
                    }
                }).catch((e) => {
                    this.handpickLoad.loading = false;
                    this.handpickLoad.finished = true;
                    this.$alert.dialogUnknown(e);
                });
            }
            ,
            gridOpen(to) {
                this.$router.push({path: to});
            }
            ,
            choiceCategory(index, title) { //点击标签，换标签触发
                this.cat_id = index;
                this.getData(1);
            }
            ,
            handpickOnLoad() { //继续加载数据事件
                this.getData(this.handpickLoad.total += 1);
            }
            ,
        }
    }

</script>

<style scoped>
    hr {
        background-color: #eb5211;
        height: 1px;
        border: none;
    }

</style>
