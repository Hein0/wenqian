<template>


    <div class="bc" style="height: 100%">

        <div class="orange-home bc">

            <div class="orange-content">

                <!--头部-->
                <van-nav-bar title="商品详情"
                             left-text="返回"
                             right-text="首页"
                             left-arrow
                             @click-left="onClickLeft"
                             @click-right="onClickRight"
                ></van-nav-bar>

                <!--图片展示-->
                <div style="height:375px">
                    <van-swipe :autoplay="3000" style="background-color: #fff">
                        <van-swipe-item v-for="(image, index) in details.images" :key="index">
                            <img :src="image" width="100%" height="375px"/>
                        </van-swipe-item>
                        <!--                    <van-swipe-item>-->
                        <!--                        <img :src="details.images"-->
                        <!--                             width="100%" height="375px" alt=""/>-->
                        <!--                    </van-swipe-item>-->
                    </van-swipe>
                </div>


                <!--商品标题区-->
                <div style="padding: .5em 1em 0 1em;background-color: #fff">
                    <div>
                        <span style="color: red;font-size: 20px;font-weight: 600">
                            ¥{{ details.itemendprice }}
                        </span>
                        <span style="color: #999999">
                            (券后价格)
                        </span>
                    </div>
                </div>
                <div style="padding: 0 5em 0 1em;background-color: #fff;position: relative">
                    <span style="font-weight: 600">
                        {{ details.itemtitle }}
                    </span>
                </div>
                <van-row type="flex" style="background-color: #fff;padding: 10px 0 10px 0">
                    <van-col span="1"></van-col>
                    <van-col span="7">
                        <span style="color: darkgray;font-size: 13px">在售价{{ details.itemprice }}元</span>
                    </van-col>
                    <van-col span="8" style="text-align: center">
                        <span style="color: darkgray;font-size: 13px">券金额{{ details.couponmoney }}元</span>
                    </van-col>
                    <van-col span="7" style="text-align: right">
                        <span style="color: darkgray;font-size: 13px">月销{{ details.itemsale }}</span>
                    </van-col>
                    <van-col span="1"></van-col>
                </van-row>
                <!--商品标题区 end-->

                <!--推荐语-->
                <van-panel title="商品简介" desc="" status="">
                    <van-row type="flex" justify="center">
                        <van-col span="20" style="padding: 5px 0 5px 0">
                            <span style="font-size: 15px;color: #999999">{{ details.itemdesc }}</span>
                        </van-col>
                    </van-row>
                </van-panel>

                <!--使用教程-->
                <van-panel title="优惠劵使用简介" desc="" status="">
                    <van-row type="flex" justify="center">
                        <van-col span="20" style="padding: 5px 0 5px 0">
                            <span style="font-size: 15px;color: #999999">
                                点击立即领券按钮，复制淘口令打开【手机淘宝】即可领取优惠券购买
                            </span>
                        </van-col>
                    </van-row>
                </van-panel>

                <!--                &lt;!&ndash;猜你喜欢&ndash;&gt;-->
                <!--                <van-row type="flex" justify="space-around">-->
                <!--                    <van-col span="24" style="text-align: center">-->
                <!--                        <img src="../../static/img/like.jpg"-->
                <!--                             width="100%" height="100%">-->
                <!--                    </van-col>-->
                <!--                </van-row>-->
                <!--                <orange-goods-card-->
                <!--                        v-for="(i,ind) in like"-->
                <!--                        :key="'e' + ind"-->
                <!--                        :topTag='"优惠劵金额" + i.couponmoney'-->
                <!--                        :title="i.itemtitle"-->
                <!--                        :image="i.itempic"-->
                <!--                        :price="i.itemprice"-->
                <!--                        :priceTag="i.itemendprice"-->
                <!--                        :ratio="true"-->
                <!--                        :to='"../goods?id=" + i.itemid'-->
                <!--                        style="margin-top: 10px"-->
                <!--                ></orange-goods-card>-->

                <van-actionsheet v-if="share" title="分享商品">
                    <van-row type="flex" justify="center">
                        <van-col span="24" style="text-align: center;justify-content: center;align-items: center">
                            <div id="qrcode" style="display: inline"></div>
                        </van-col>
                    </van-row>
                    <van-row type="flex" justify="center">
                        <van-col span="24" style="text-align: center;justify-content: center;align-items: center">
                            <span style="font-size: 15px;color: #999999">长按图片，保存二维码</span>
                        </van-col>
                    </van-row>
                </van-actionsheet>

                <van-popup v-model="showWei" position="bottom" title="淘口令购买">
                    <van-row type="flex" justify="center">
                        <van-col span="24"
                                 style="text-align: center;justify-content: center;align-items: center;margin-top:16px">
                            <span style="font-size: 15px;color: red">复制淘口令打开【手机淘宝】即可领取优惠券购买</span>
                        </van-col>
                    </van-row>
                    <van-row type="flex" justify="center">
                        <van-col span="24"
                                 style="text-align: center;justify-content: center;align-items: center;height:100px">
                            <div id="target"
                                 style="margin-top: 20px;padding: 10px;border:1px dashed #FF3C00;margin-left: 50px;margin-right: 50px;">
                                {{api}}
                            </div>
                        </van-col>
                    </van-row>
                    <van-row type="flex" justify="center">
                        <van-col span="24"
                                 style="text-align: center;justify-content: center;align-items: center;margin-bottom:16px">
                            <span style="font-size: 12px;color: #999999">(若一键复制失败，请长按文字手动复制)</span>
                        </van-col>
                    </van-row>
                    <div style="text-align: center;margin-bottom: 30px">
                        <button style="background: #FF3C00;color: white;border: 1px solid #FF3C00; border-radius: 16px;font-size: 16px"
                                class="copy" id="copyBtn" data-clipboard-action="copy" data-clipboard-target="#target"
                                @click="copyPolicyNo">一键复制
                        </button>
                    </div>


                </van-popup>

                <van-popup v-model="shareFriend" position="bottom" title="优惠券分享">
                    <van-row type="flex" justify="center">
                        <van-col span="24"
                                 style="text-align: center;justify-content: center;align-items: center;margin-top:16px">
                            <span style="font-size: 15px;color: red">点击一键复制发送给好友</span>
                        </van-col>
                    </van-row>
                    <van-row type="flex" justify="center">
                        <van-col span="40"
                                 style="text-align: left;justify-content: center;align-items: center;height:100%">
                            <div id="targeta"
                                 style="margin-top: 20px;font-size:14px;padding: 10px;border:1px dashed #FF3C00;margin-left: 50px;margin-right: 50px;">
                                {{details.itemtitle}}
                                <br>
                                在售价：{{details.itemprice}}元
                                <br>
                                券后价：{{details.itemendprice}}元
                                <br>
                                {{details.itemdesc}}
                                <br>
                                详情链接：{{location}}
                                <br>
                                复zhi这条【{{api}}】打开【手机Tao宝】即可抢购
                            </div>
                        </van-col>
                    </van-row>
                    <van-row type="flex" justify="center">
                        <van-col span="24"
                                 style="text-align: center;justify-content: center;align-items: center;margin-bottom:16px">
                            <span style="font-size: 12px;color: #999999">(若一键复制失败，请长按文字手动复制)</span>
                        </van-col>
                    </van-row>
                    <div style="text-align: center;margin-bottom: 30px">
                        <button style="background: #FF3C00;color: white;border: 1px solid #FF3C00; border-radius: 16px;font-size: 16px"
                                class="copy" id="copyBtn1" data-clipboard-action="copy" data-clipboard-target="#targeta"
                                @click="copyPolicyNo1">一键复制
                        </button>
                    </div>


                </van-popup>


                <orange-technology-footer style="clear: both"></orange-technology-footer>

            </div>

            <!--底部-->
            <div class="orange-footer">
                <van-goods-action>
                    <van-goods-action-icon
                            :icon="collect.icon"
                            :text="collect.name"
                            @click="clickCollect()"></van-goods-action-icon>
                    <van-goods-action-button
                            @click="shareT()"
                            type="warning"
                            text="分享给好友"></van-goods-action-button>
                    <van-goods-action-button
                            @click="btv()"
                            type="danger"
                            text="立即领券"></van-goods-action-button>
                </van-goods-action>
            </div>
            <!--底部 end-->

        </div>
        <div id="shareit" v-if="show_share">
            <img class="arrow" src="../../static/img/jiant.png">
            <a href="#" id="follow">点击右上角按钮，点击在浏览器打开</a>
        </div>
    </div>

</template>

<script>

    import QRCode from 'qrcodejs2'
    import '../../static/jquery-1.9.1.min.js'
    import config from '../../static/config'
    import {queue} from "../../static/queue";
    import Clipboard from 'clipboard'

    export default {
        name: "Details",
        mounted() {
            this.$axios.get('/api/item_detail/apikey/Hein/itemid/' + this.$route.query.id).then((rsp) => {
                if (rsp.data.code == 1) {
                    rsp.data.data.itemId = rsp.data.data.itemid;
                    if (rsp.data.data.taobao_image && rsp.data.data.taobao_image.length > 0) {
                        rsp.data.data.images = rsp.data.data.taobao_image.split(',');
                    } else {
                        rsp.data.data.images = [];
                        rsp.data.data.images.push(rsp.data.data.itempic);
                    }
                    this.details = rsp.data.data;
                    console.error(this.details);
                    try {
                        let isExist = queue.isExist(this.collectKey, rsp.data.data.itemId);
                        if (isExist == true) {
                            this.collect.name = "已收藏";
                            this.collect.icon = "star";
                            this.collect.isCollect = true;
                        } else {
                            this.collect.name = "收藏";
                            this.collect.icon = "star-o";
                            this.collect.isCollect = false;
                        }
                        isExist = queue.isExist(this.footprintKey, rsp.data.data.itemId);
                        if (isExist == false) {
                            queue.insert({
                                key: this.footprintKey,
                                value: this.details,
                            });
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    // this.$axios.get('/api/get_similar_info/apikey/Hein/itemid/' + this.details.itemid).then((rsp) => {
                    //     if (rsp.data.code == 1) {
                    //         this.like = rsp.data.data;
                    //     } else {
                    //         this.$alert.notifyNoData(rsp.data.msg);
                    //     }
                    //
                    // }).catch((e) => {
                    //     this.$alert.dialogUnknown(e);
                    // });

                } else {
                    this.$alert.notifyNoData(rsp.data.msg);
                }

            }).catch((e) => {
                this.$alert.dialogUnknown(e);
            });

        },
        data() {
            return {
                shareFriend: false,
                show_share: false,
                location: window.location.href,
                share: false,
                isPageLoadComplete: 0, //页面是否加载完成 0.正在加载 1.加载失败 2.加载完毕 ...
                details: [],
                showWei: false,
                api: window.location.href,
                like: '',
                collect: {
                    icon: 'star-o',
                    name: '收藏',
                    isCollect: false,
                },
                footprintKey: 'orange-tyh-footprint',
                collectKey: 'orange-tyh-collect',
            }
        },
        methods: {
            clickCollect() { //收藏
                if (this.collect.isCollect == true) {
                    queue.removeItem(this.collectKey, [this.details.itemId]);
                    this.collect.name = "收藏";
                    this.collect.icon = "star-o";
                    this.collect.isCollect = false;
                } else {
                    queue.insert({
                        key: this.collectKey,
                        value: this.details,
                    });
                    this.collect.name = "已收藏";
                    this.collect.icon = "star";
                    this.collect.isCollect = true;
                }
            },
            onClickLeft() {
                window.history.go(-1);
            },
            onClickRight() {
                this.$router.push({path: "/"});
            },
            openShare() {
                this.share = true;
                this.$nextTick(function () {
                    if ($("#qrcode").children("img").length < 1) { //检测dom是否存在
                        new QRCode(document.getElementById('qrcode'), {
                            text: window.location.href,
                            width: 200,
                            height: 200,
                        });
                        setInterval(function () { //让图片居中
                            $("#qrcode").children("img").css("display", "inline");
                        }, 50);
                    }
                });
            },
            openTb: function () {
                if (config.isWeiXin()) {
                    if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
                        document.addEventListener('WeixinJSBridgeReady', ready, false)
                    } else {
                        if (window.__wxjs_environment === 'miniprogram') {
                            // this.$toast('很抱歉小程序中无法打开淘宝链接请打开外部浏览器访问 www.qiqiandu.com');
                            this.showWei = true;
                        } else {
                            this.show_share = true;
                        }
                    }
                } else {
                    this.$dialog.alert({
                        message: '链接将跳转淘宝，商品详情看完，觉得满意返回本页面点击立即领券按钮进行领券'
                    }).then(() => {
                        location.assign('http://detail.m.tmall.com/item.htm?id=' + this.details.itemid);
                    });
                }
            },
            copyPolicyNo() {
                var clipboard = new Clipboard('#copyBtn');
                clipboard.on('success', function (e) {
                    alert("复制成功,打开【手机淘宝】即可领取优惠券购买");
                    e.clearSelection();
                });
            },
            copyPolicyNo1() {
                var clipboard = new Clipboard('#copyBtn1');
                clipboard.on('success', function (e) {
                    alert("复制成功,请直接发送给你的朋友");
                    e.clearSelection();
                });
            },
			// 分享
            shareT() {
                // this.shareFriend = true;
                this.$toast('正在加载数据，请耐心等待...');
                let fromData = new FormData();
                fromData.append('itemid', this.$route.query.id);
                fromData.append('apikey', config.apikey);
                fromData.append('pid', config.pid);
                fromData.append('tb_name', config.tb_name);
                this.$axios.post('/api/ratesurl', fromData).then((rsp) => {
                    if (rsp.data.code == 1) {
                        // location.assign(rsp.data.data.coupon_click_url);
                        this.$axios.post('/tao/taobao/tbwd', {
                            "appKey": config.taobao_key,
                            "appSecret": config.taobao_secret,
                            "logo": this.details.itempic,
                            "text": this.details.itemtitle,
                            "url": rsp.data.data.coupon_click_url
                        }).then((rsp) => {
                            if (rsp.data) {
                                this.api = rsp.data.tbk_tpwd_create_response.data.model;
                                this.shareFriend = true;
                            } else {
                                this.$alert.notifyNoData();
                            }
                        }).catch((e) => {
                            this.$alert.dialogUnknown(e);
                        });
                    } else {
                        this.$alert.notifyNoData();
                    }
                }).catch((e) => {
                    this.$alert.dialogUnknown(e);
                });
            },
            errorShow(url) {
                if (config.isWeiXin()) {
                    if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
                        document.addEventListener('WeixinJSBridgeReady', ready, false)
                    } else {
                        this.show_share = true;
                    }
                } else {

                    location.assign(url)
                }
            },
			//领券
            btv() { 
                if (config.isWeiXin()) {
                    if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
                        document.addEventListener('WeixinJSBridgeReady', ready, false)
                    } else {
                        if (window.__wxjs_environment === 'miniprogram') {
                            // this.$toast('很抱歉小程序中无法打开淘宝链接请打开外部浏览器访问 www.qiqiandu.com');
                            // this.showWei = true;
                            var client = new ApiClient({
                                'appkey':config.taobao_key,
                                'appsecret':config.taobao_secret,
                                'url':'http://gw.api.taobao.com/router/rest'
                            });
                
                            client.executeWithHeader('taobao.tbk.tpwd.create',
                                {
                                    'text':'ffffffffffffff',
                                    'url':"https://uland.taobao.com/coupon/edetail?e=cl8JLc5GmDVD6TM1M2v5Gycdtv8tinp%2BgfTc9fpq7nUCsHqIcdDRdp6%2B1vjUuirw41ZzjSbmUlAb%2FC9mV7o9YE328fa5dSO8GyW%2B9l4dctD0pRrjipOmj%2Bdth9k8bqqSHKTgBzHkoM7XTQC0vfau6E%2F9Zk7cDx8UPY2GSU4OeGccr%2FxnN7Ts%2F10ZxroIJU7s&traceId=0b15050e15640210237725780e&union_lens=lensId:0b015dd6_0c10_16c26eae4c8_e40f&xId=n9ACMMdhoOEjwy80MqiaeDSXPtrSgu83YtUL1zgLpIjFADO8MsHohneUPwftVvQAEBY0vLbbpwMLVFa18gK4Sc&thispid=mm_479070090_645900442_109195950297&src=fklm_hltk&from=tool&sight=fklm",
                                },
                                {},
                                function (error,response) {
                                    if(!error)
                                    this.$toast(response.data.model);
                                        // console.log(response.data.model);
                                    else
                                        console.log(error);
                                });
                        } else {
                            this.show_share = true;
                        }
                    }
                } else {
                this.$toast('正在获取淘口令，请耐心等待...');
                let fromData = new FormData();
                fromData.append('itemid', this.$route.query.id);
                fromData.append('apikey', config.apikey);
                fromData.append('pid', config.pid);
                fromData.append('tb_name', config.tb_name);
                this.$axios.post('/api/ratesurl', fromData).then((rsp) => {
                    if (rsp.data.code == 1) {
                        // location.assign(rsp.data.data.coupon_click_url);
                        this.$axios.post('/tao/taobao/tbwd', {
                            "appKey": config.taobao_key,
                            "appSecret": config.taobao_secret,
                            "logo": this.details.itempic,
                            "text": this.details.itemtitle,
                            "url": rsp.data.data.coupon_click_url
                        }).then((rsp) => {
                            if (rsp.data) {
                                this.api = rsp.data.tbk_tpwd_create_response.data.model;
                                this.showWei = true;
                            } else {
                                this.errorShow(rsp.data.data.coupon_click_url);
                            }
                        }).catch((e) => {
                            this.errorShow(rsp.data.data.coupon_click_url);
                        });
                    } else {
                        this.$alert.notifyNoData();
                    }
                }).catch((e) => {
                    this.$alert.dialogUnknown(e);
                });
            }

            },
        }
    }
</script>

<style scoped>
    #shareit {
        -webkit-user-select: none;
        position: fixed;
        width: 100%;
        height: 2000px;
        background: rgba(0, 0, 0, 0.85);
        text-align: center;
        top: 0;
        left: 0;
        z-index: 105;
    }

    #shareit img {
        max-width: 100%;
    }

    .arrow {
        position: absolute;
        right: 5%;
        top: 1%;
    }

    #follow {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        text-decoration: none;
        font-size: 18px;
        color: white;
        float: left;
        margin-top: 160px;
    }

</style>
