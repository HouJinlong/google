# mip-stats-google 谷歌统计

添加谷歌统计。

描述|谷歌统计组件，用于统计页面数据
----|----
类型| 通用
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-stats-google/mip-stats-google.js

## 示例

MIP提供谷歌统计的插件，便于分析页面数据，需要提前到谷歌统计这边创建站点，在谷歌统计后台会自动生成js代码。从中找出token后插入到MIP组件的token
位置。方法为：

``` javascript
// 例：谷歌统计代码截取
_gaq.push(['_setAccount', 'UA-13266796-1']);
// UA-13266796-1 为你的统计 token。此例 token="UA-13266796-1"
```

谷歌统计插件引入示例:

```
<mip-stats-google token="UA-13266796-1"></mip-stats-google>

```

谷歌统计事件追踪示例:
```
<div data-stats-google-obj="%7B%22type%22:%22click%22,%22data%22:%22%5B_trackPageview,%20/virtual/login%5D%22%7D">
    我是自动触发
</div>
 
```

## 属性

### token

说明：token，从谷歌统计代码中截取

必填：是

格式：字符串


### setconfig

说明：自定义参数;

必填：否

格式：字符串

### 备注

【setconfig值必须encodeURIComponent处理,并且参数无引号,空值位置留空】

####参数只有一组

``` javascript
// 例：谷歌统计代码截取
 _gaq.push(['_setCustomVar', 1, 'node', 'index', 3]);
// [_setCustomVar, 1, node, index, 3] 为你的统计 setconfig。

此例：setconfig='%5B_setCustomVar%2C%201%2C%20node%2C%20index%2C%203%5D';
``` 

####参数有多组[用,号隔开]

``` javascript
// 例：谷歌统计代码截取
 _gaq.push(['_setCustomVar', 1, 'node', 'picture', 3]);
 _gaq.push(['_setCustomVar', 2, 'pro_cateid', '7911', 3]);
 _gaq.push(['_setCustomVar', 3, 'pro_gid', '377551', 3]);
 _gaq.push(['_setCustomVar', 4, 'pro_cid', '', 3]);
// [_setCustomVar, 1, node, picture, 3],[_setCustomVar, 2, pro_cateid, 7911, 3],[_setCustomVar, 3, pro_gid, 377551, 3],[_setCustomVar, 4, pro_cid, , 3] 为你的统计 setconfig。
此例：setconfig='%5B_setCustomVar%2C%201%2C%20node%2C%20picture%2C%203%5D%2C%5B_setCustomVar%2C%202%2C%20pro_cateid%2C%207911%2C%203%5D%2C%5B_setCustomVar%2C%203%2C%20pro_gid%2C%20377551%2C%203%5D%2C%5B_setCustomVar%2C%204%2C%20pro_cid%2C%20%2C%203%5D';
``` 

## 事件追踪属性: data-stats-google-obj

### type

说明：对应的触发事件(load加载触发/click点击触发)

必填：是

格式：字符串数组


### data

说明：用于事件追踪数据传递参考

必填：是

格式：字符串

### 备注

data-stats-google-obj值必须encodeURIComponent处理,如{"type":"click","data":"[_trackPageview, /virtual/login]"};需转化为%7B%22type%22:%22click%22,%22data%22:%22%5B_trackPageview,%20/virtual/login%5D%22%7D

