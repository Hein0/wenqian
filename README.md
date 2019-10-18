# 淘宝客
基于Vue 3

## 项目安装
```
npm install
```

### 启动
```
npm run serve
```

### 打包
```
npm run build
```

### 淘宝配置在
scr/static/config/
里面配置淘宝的等信息
```
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
```


### 上述信息来源
#### 淘宝联盟
https://pub.alimama.com/manage/overview/index.htm?spm=a219t.11816995.1998910419.dbb742793.2a8f75a5dBgOVY
#### 好单库
http://publish.haodanku.com/login/index/returnurl/http%25253A%25252F%25252Fpublish.haodanku.com%25252Fapikey%25252Findex.html.html

有问题可添加我的微信咨询
备注清楚来路哦
710070994


