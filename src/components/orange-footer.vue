<template>
    <div class="orange-footer">
        <van-tabbar v-model="active">
            <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
                        <van-tabbar-item to="/nine/nineDistrict?type=2&title=9.9包邮" icon="point-gift-o">9.9包邮</van-tabbar-item>
            <van-tabbar-item to="/search/main" icon="search">超级搜</van-tabbar-item>
            <!--            <van-tabbar-item to="/discovery" icon="aim">发现</van-tabbar-item>-->
            <van-tabbar-item to="/hot" icon="hot-o">热门抖货</van-tabbar-item>
            <van-tabbar-item to="/my" icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "orange-footer",
        data() {
            return {
                active: 0
            }
        },
        methods: {},
        activated() {
            switch (this.$route.name) {
                case "home":
                    this.active = 0;
                    break;
                case "hot":
                    this.active = 3;
                    break;
                case "searchMain":
                    this.active = 2;
                    break;
                case "discovery":
                    this.active = 4;
                    break;
                case "my":
                    this.active = 4;
                    break;
                default:
                    this.active=1;
                    break;
            }
        }
    }
</script>

<style scoped>

</style>
