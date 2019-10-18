<template>

<!--    <van-row type="flex" justify="space-around">-->
<!--        <van-col span="24" style="text-align: center;margin-top: 5px;padding: 10px 0 10px 0;background-color: deepskyblue">-->
<!--            <div v-html="content" style="padding-top: 5px;font-size: 15px;color: #fff">-->
<!--            </div>-->
<!--        </van-col>-->

<!--    </van-row>-->

</template>

<script>
    import config from '../static/config'

    export default {
        name: "orange-technology-footer",
        data() {
            return {
                content: config.footer,
            }
        },
        mounted() {
            // this.$axios.get('/apisystemConfig/getSystemConfig').then((rsp) => {
            //
            //     if (rsp.data.code == 9) {
            //         this.content = rsp.data.data.footer;
            //     } else {
            //         this.$alert.notifyNoData(rsp.data.msg);
            //     }
            //
            // }).catch((e) => {
            //     this.$alert.dialogUnknown(e);
            // });
        },
    }
</script>

<style scoped>

</style>
