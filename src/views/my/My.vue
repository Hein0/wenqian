<template>

    <div class="bc" style="height: 100%">

        <div class="orange-home bc">
            <div class="orange-content content">

                <!--头部-->
                <div class="head">
                    <span class="head-name">
                       柒仟度
                    </span>
                    <p class="head-signature">
                        购物先领券，一年省一半
                    </p>
                </div>
                <!--头部 end-->

                <!--头部紧接-->
                <div class="head-immediately">
                    <div class="head-immediately-common" @click="openCollect()">
                        <span>{{ user.data.collectNumber }}</span>
                        <p>收藏夹</p>
                    </div>
                    <!--                    <div class="head-immediately-common" @click="openMsg()">-->
                    <!--                        <span>{{ user.data.msgNumber }}</span>-->
                    <!--                        <p>系统消息</p>-->
                    <!--                    </div>-->
                    <div class="head-immediately-common" @click="openFootprint()">
                        <span>{{ user.data.footprintNumber }}</span>
                        <p>足迹</p>
                    </div>
                </div>
                <!--头部紧接 end-->

                <!--其余的一个一个的-->
                <div class="other">
                    <van-cell-group>
                        <!--                        <van-cell value="" icon="label-o" @click="openTutorial()">-->
                        <!--                            <template slot="title">-->
                        <!--                                <span class="custom-text">新手教程 </span>-->
                        <!--                                <van-tag type="danger">{{ user.data.tutorialNumber }}</van-tag>-->
                        <!--                            </template>-->
                        <!--                        </van-cell>-->
                        <van-cell icon="service-o" title="客服中心" value="" @click="cs = true"/>
                        <van-cell icon="aim" title="发现好货" value="" @click="openMsg"/>
                        <!--                        <van-cell icon="info-o" title="关于我们" value="" @click="gy = true" />-->
                    </van-cell-group>
                </div>
                <!--其余的一个一个的 end-->

                <!--点击触发-->
                <!--客服中心触发界面-->
                <van-popup position="bottom" v-model="cs" title="客服联系">
                    <van-row type="flex" justify="center" style="margin: 20px 0 20px 0">
                        <van-col span="24" style="text-align: center;justify-content: center;align-items: center">
                            联系微信 Hein-xiao
                        </van-col>
                    </van-row>
                </van-popup>


                <!--关于我们触发界面-->
                <van-actionsheet v-if="gy" title="关于我们">
                    <van-row type="flex" justify="center" style="margin: 20px 0 20px 0">
                        <van-col span="24" style="text-align: center;justify-content: center;align-items: center">
                            <div v-html="systemConfig.about" style="font-size: 15px;color: #999999">

                            </div>
                        </van-col>
                    </van-row>
                </van-actionsheet>

            </div>

            <orange-footer></orange-footer>

        </div>

    </div>

</template>

<script>

    import {queue} from "../../static/queue";

    export default {
        name: "My",
        activated() {

            this.user.data.collectNumber = queue.getCount(this.collectKey);
            this.user.data.footprintNumber = queue.getCount(this.footprintKey);

            // this.$axios.get('systemMessage/count').then((rsp) => {
            //
            //     if (rsp.data.code == 9) {
            //         this.user.data.msgNumber = rsp.data.data;
            //     } else {
            //         this.$alert.notifyNoData(rsp.data.msg);
            //     }
            //
            // }).catch((e) => {
            //     this.$alert.dialogUnknown(e);
            // });
            // this.$axios.get('course/count').then((rsp) => {
            //
            //     if (rsp.data.code == 9) {
            //         this.user.data.tutorialNumber = rsp.data.data;
            //     } else {
            //         this.$alert.notifyNoData(rsp.data.msg);
            //     }
            //
            // }).catch((e) => {
            //     this.$alert.dialogUnknown(e);
            // });
            // this.$axios.get('systemConfig/getSystemConfig').then((rsp) => {
            //
            //     if (rsp.data.code == 9) {
            //         this.systemConfig = rsp.data.data;
            //     } else {
            //         this.$alert.notifyNoData(rsp.data.msg);
            //     }
            //
            // }).catch((e) => {
            //     this.$alert.dialogUnknown(e);
            // });

        },
        data() {
            return {
                active: -1,
                cs: false,
                gy: false,
                footprintKey: 'orange-tyh-footprint',
                collectKey: 'orange-tyh-collect',
                systemConfig: {},
                user: {
                    data: {
                        //收藏夹数量
                        collectNumber: 0,
                        //系统消息数量
                        msgNumber: 0,
                        //足迹数量
                        footprintNumber: 0,
                        //新手教程数量
                        tutorialNumber: 0,
                    },
                }
            }
        },
        methods: {
            openCollect() {
                this.$router.push({path: "/my/collect"});
            },
            openFootprint() {
                this.$router.push({path: "/my/footprint"});
            },
            openMsg() {
                this.$router.push({path: "/discovery"});
            },
            openTutorial() {
                this.$router.push({path: "/my/msg/courseList"});
            },
        },
    }
</script>

<style scoped>

    .content {
        display: flex;
        flex-direction: column;
        background-color: #F2F6FC;
    }

    .head {
        background: url('../../static/img/bj.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        height: 180px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .head-name {
        margin-top: 10px;
        color: #ffffff;
        font-size: 30px;
    }

    .head-signature {
        font-size: 15px;
        color: #ffffff;
    }

    .head-immediately {
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding-top: 10px;
        height: 60px;
    }

    .head-immediately-common {
        display: flex;
        width: 50%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 13px;
    }

    .order-card {
        padding-top: 5px;
    }

    .other {
        padding-top: 5px;
    }

</style>
