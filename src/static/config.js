const httpUrl = 'https://www.gomyorder.cn/';
const apikey = 'mrxg77pxk3';   //好单库apikey
const pid = 'mm_66668888_77779999_5555666'; // 选单库pid号
const tb_name = ''; // 淘宝名称
const taobao_key=''; // 淘宝key
const taobao_secret=''; // 淘宝
const footer='粤ICP备19141624号';  // 备案号
const isWeiXin = () => {
    let ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') !== -1;
};
export default {
    apikey,
    pid,
    tb_name,
    httpUrl,
    taobao_secret,
    taobao_key,
    footer,
    isWeiXin
}
