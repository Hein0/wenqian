const httpUrl = 'https://www.gomyorder.cn/';
const apikey = '';
const pid = '';
const tb_name = '';
const  taobao_key='';
const  taobao_secret='';
const  footer='';
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
