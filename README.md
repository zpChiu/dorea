### dorea 1.1 版本
```
dorea.dialog({
    bg: false, //是否开启遮罩层,默认false
    bgClr: "rgba(0,0,0,.5)",//遮罩层颜色,默认"rgba(0,0,0,.5)"
    title: "温馨提示", //弹框标题，默认字符串"温馨提示"
    titleClr: "#009f95", //弹框标题背景色，默认#009f95
    content: "<div style='color:red;'>我是弹框的提示内容</div><div>我是弹框的提示内容</div>", //弹框提示内容
    close: true, //右上角图标关闭，默认开启
    btn: ["关闭"], //关闭按钮，默认显示关闭按钮
    btnCB: {}, //点击按钮后的回调函数，btn0代表btn数组的第一个，以此类推...
    end: function (){
        console.log("弹框消失了");
    }, //弹框消失后的回调函数
    time: o.time || 0, //自动失效时间，默认1300毫秒后消失
})；
```
```
dorea.load({
    ele: "", //在哪个元素上显示加载图层，默认是body元素
    type: 0, //暂时只提供一种加载类型
    bg: true, //是否显示加载背景图层，默认显示
})
```
```
dorea.tips({
    ele: "", //吸附元素
    type: 2, //提示层在什么方向显示，1:上-2:右-3:下-4:左
    content: "", //提示层显示内容
    area: ["100px","auto"], //提示层的宽高
    bgClr: "rgba(0,0,0,.8)", //提示层的北京额
    time: 0, //提示层自动失效时间，默认1300毫秒后消失
    end: function (){
        console.log("tips消失了");
    }//提示层消失后的回调函数
})
```
```
dorea.lazyLoad(); //图片懒加载
```
```
dorea.ie({
  "ie7":function(){ console.log("ie7浏览器") };
  "ie8":function(){ console.log("ie8浏览器") };
  "ie9":function(){ console.log("ie9浏览器") };
  "ie10":function(){ console.log("ie10浏览器") };
  "ie11":function(){ console.log("ie11浏览器") };
  "edge":function(){ console.log("edge浏览器") };
}); //IE兼容处理方法,会根据相对应的回调在浏览器中作出对应处理
```
```
dorea.select(); //下拉菜单
```
```
dorea.pagination({
    count: 10, //总页数
    limit: 5,  //限制显示多少页
});
该功能需要复制一下的html
<div class="pagination">
    <a href="javascript:;"  class="page-pre">上一页</a>
    <ul></ul>
    <a href="javascript:;" class="page-next">下一页</a>
</div>
```
```
dorea.date({
    ele: "#dorea-date-input2", //吸附元素
    minyears: 2018,  //最小年份限制，默认1900
    maxyears: 2018  //最大年份限制，默认2099
});
```
