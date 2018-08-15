/* 1. 使用沙箱模式防止全局变量的污染 */
(function (window){
    var creatEle = function (ele){
        return document.createElement(ele);
    };

    function dorea(selector){
        return new dorea.fn.init(selector);
    };
    dorea.fn = dorea.prototype = {
        constructor: dorea,
        init:function (selector){
            return document.querySelectorAll(selector);
        }
    };
    /* 对象扩展(原型方法) */
    dorea.extend = dorea.fn.extend = function(obj,prop){
        if(!prop){
            prop = obj;
            obj = this;
        }
        for(var attr in prop){
            obj[attr] = prop[attr];
        }
    };
    dorea.extend({
        /**
         * @function randomRgbColor - 随机生成RGB颜色并返回rgb(r,g,b)格式颜色
         * @function btnRandom - 给btn-random类名的按钮一个随机色
         * @function btnHoverRandom - 给btn-hover-random类名的按钮一个悬浮事件：悬浮时候背景颜色随机
         * @function dialog - 弹框启动
         * @function tips - 小提示
         * @function load - 加载提示
         * @function select - 下拉菜单
         * @function timeLine - 时间线的小圆圈随机色
         * @function lazyLoad - 图片懒加载 -待优化
         * @function ie - ie 7,8,9,10,11,edge的浏览器处理 ie({"ie8":callback()}) 
         *                备注：ie5会执行ie7的回调，因为ie5返回的ua是ie7的
        */
        siblings:function (ele){
            var siblings = [],
                parent = ele.parentNode,
                childs = parent.children; 
            for(var i = 0; i<childs.length; i++){
                if (childs[i]!==ele) {
                    siblings.push(childs[i]);
                }
            }
            return siblings;
        },
        ie:function (param){
            var ua = navigator.userAgent,
                isIE = ua.indexOf("compatible") > -1 && ua.indexOf("MSIE") > -1, //ie<11 
                isEdge = ua.indexOf("Edge") > -1 && !isIE,   
                isIE11 = ua.indexOf('Trident') > -1 && ua.indexOf("rv:11.0") > -1; 
            if(isIE) {
                var regIE = new RegExp("MSIE (\\d+\\.\\d+);");
                regIE.test(ua)
                var ver = parseFloat(RegExp["$1"]);
                switch (ver) {
                    case ver<7:
                        break;
                    default:
                        param["ie"+ver]?param["ie"+ver]():"";
                        break;
                }                 
            } else if(isEdge) {
                param.edge? param.edge():"";
            } else if(isIE11) {
                param.ie11? param.ie11():"";
            }
        },
        select:function (){
            var s = dorea(".select"),
                a = dorea(".select>ul>li a");
            for(var i=0; i<s.length; i++){
                s[i].addEventListener("click",function (event){
                    var that = this,
                        child = that.children[1],
                        span = that.children[0];
                        style = creatEle("style"),
                        display = window.getComputedStyle(child).display;
                    if (display==="none") {
                        child.style.display="block";
                        span.style.backgroundImage="url('../images/select-up1.png')";
                        //给a标签添加背景色,添加伪类
                        document.head.appendChild(style);
                        sheet = style.sheet;
                        sheet.addRule('.select>ul>li>a:hover','background-color:'+dorea.randomRgbColor(".3"));
                    }else{
                        child.style.display="none";
                        span.style.backgroundImage="url('../images/select-down1.png')";
                    }
                });
            }
            for(var j=0; j<a.length; j++){
                a[j].addEventListener("click",function (event){
                    var that = this;
                        span = that.parentNode.parentNode.previousSibling.previousSibling;
                    span.innerHTML = this.innerHTML;
                })
            }
        },
        timeLine:function (){
            var circle = dorea(".tl-circle");
            for(var i = 0;i<circle.length;i++){
                circle[i].style.borderColor=dorea.randomRgbColor();
            };
        },
        randomRgbColor:function (a){
            var r = Math.floor(Math.random() * 256); 
                g = Math.floor(Math.random() * 256); 
                b = Math.floor(Math.random() * 256);
                if (!a) {
                    return "rgb("+r+","+g+","+b+")";                    
                }else{
                    return "rgba("+r+","+g+","+b+","+a+")";                    
                }
        },
        btnRandom:function (){
            var randomBtn = dorea(".btn-random");
            for(var i = 0;i<randomBtn.length;i++){
                randomBtn[i].style.backgroundColor=dorea.randomRgbColor();
            };
        },
        btnHoverRandom:function (){
            var randomBtn = dorea(".btn-hover-random");
                randomBtn2 = dorea(".btn-hover-random2");
            for(var i = 0;i<randomBtn.length;i++){
                randomBtn[i].addEventListener("mouseover",function (){
                    this.style.backgroundColor=dorea.randomRgbColor();
                });
            };
            for(var i = 0;i<randomBtn2.length;i++){
                var oldColor;
                randomBtn2[i].addEventListener("mouseover",function (){
                    oldColor = this.style.backgroundColor;
                    this.style.backgroundColor=dorea.randomRgbColor();
                })
                randomBtn2[i].addEventListener("mouseout",function (){
                    this.style.backgroundColor=oldColor;
                })
            };
        },
        dialog:function (o){
            /**
             * @var config : 默认参数
             * @var dialog : 弹框
             * @var title : 弹框标题
             * @var bg : 弹框背景元素
             * @var dialog : 弹框元素
             * @var close : 右上角关闭元素
             * @var destroy : 弹框销毁
             */
            var config = {
                bg: o.bg || false, //是否开启遮罩层
                bgClr: o.bgClr || "rgba(0,0,0,.5)",//遮罩层颜色
                title: o.title || "温馨提示", 
                titleClr: o.titleClr || "#009f95",
                content: o.content || "<div style='color:red;'>我是弹框的提示内容</div><div>我是弹框的提示内容</div>",
                close: o.close || true,
                btn: o.btn || ["关闭"],
                btnCB: o.btnCB || {},
                end: o.end || function (){
                    console.log("弹框消失了");
                },
                time: o.time || 0,
            };
            var dialog = creatEle("div"),
                title = creatEle("div"),
                content = creatEle("div"),
                btn = creatEle("div"),
                close = creatEle("span"),
                isDestroy = false, //初始化弹窗为未销毁，销毁后赋值为true,防止自动销毁后报错
                destroy = (function (){
                    if (!isDestroy) {
                        var bg  = dorea(".dialog-bg")[0],
                            dialogEle  = dorea(".dialog")[0]; 
                        if (config.bg) {
                            bg.parentNode.removeChild(bg);                            
                        }
                        dialogEle.parentNode.removeChild(dialogEle);
                        //弹框销毁后回调 - config.end
                        if (dorea(".dialog").length===0 && config.end) {
                            config.end();
                        } 
                        isDestroy = true;
                    }
                });

            if (config.bg) {
                var bg = creatEle("div"); 
                bg.className="dialog-bg";
                bg.style.backgroundColor = config.bgClr;                
                document.body.appendChild(bg);
            }

            dialog.className="dialog";
            title.className="dialog-title";
            content.className="dialog-content";
            btn.className="dialog-btn";
            close.className="dialog-close";
            
            document.body.appendChild(dialog);
            dorea(".dialog")[0].appendChild(title);
            dorea(".dialog")[0].appendChild(content);
            dorea(".dialog")[0].appendChild(btn);
            dorea(".dialog")[0].appendChild(close);
            
            dorea(".dialog-title")[0].innerHTML = config.title;
            dorea(".dialog-title")[0].style.backgroundColor = config.titleClr;
            dorea(".dialog-content")[0].innerHTML = config.content;
            dorea(".dialog-close")[0].innerHTML = "x";
            for(i=0;i<config.btn.length;i++){
                dorea(".dialog-btn")[0].appendChild(creatEle("a")).className = "dialog-btn"+i;
                dorea(".dialog-btn"+i)[0].innerHTML=config.btn[i];
                dorea(".dialog-btn"+i)[0].style.backgroundColor=config.titleClr;//按钮背景色跟随标题背景色  
                //给弹框按钮赋予点击事件及事件发生后，弹框销毁
                (function (i){
                    dorea(".dialog-btn"+i)[0].addEventListener("click",function (e){
                        var btn = "btn"+i,
                            callBack = config.btnCB[btn];
                        try {
                            callBack();
                        } catch (error) {};
                        destroy();
                    });
                })(i);
            }
            //右上角关闭图标
            if (config.close) {
                dorea(".dialog-close")[0].style.display="inline-block";
                dorea(".dialog-close")[0].addEventListener("click",function (){
                    destroy();
                });
            }else{
                dorea(".dialog-close")[0].style.display="none"
            }
            //让弹框高度居中
            dialogH = window.getComputedStyle(dorea(".dialog")[0]).height;
            dialogH = Number(dialogH.slice(0,-2));
            dorea(".dialog")[0].style.marginTop="-"+(dialogH/2)+"px";
            //自动消失
            if (config.time!==0) {
                setTimeout(function (){
                    destroy();
                },config.time);
            }
        },
        tips:function (o){
            var config = {
                ele: o.ele || "",
                type: o.type || 2,
                content: o.content || "",
                area: o.area || ["100px","auto"],
                bgClr: o.bgClr || "rgba(0,0,0,.8)",
                time: o.time || 0,
                end: o.end || function (){
                    console.log("tips消失了");
                }
            };
            var tips = creatEle("span"),
                tipsI = creatEle("i");

            if (config.ele!=="") {
                tips.className = "tips";
                tipsI.className = "tip-icon";
                tips.innerHTML = config.content;     
    
                //定义宽高
                tips.style.width = config.area[0];            
                if (config.area.length===1) {
                    tips.style.height = config.area[0];
                }else if(config.area.length===2){
                    tips.style.height = config.area[1];
                }
                
                //检测 bgClr 是否符合 rgba 格式,否：使用默认的bgClr
                var rgbaReg = /rgba/i,
                    isRgba = rgbaReg.test(config.bgClr);
                if (isRgba) {
                    tips.style.backgroundColor = config.bgClr;                
                }else{
                    console.warn("please use 'rabg'");
                    tips.style.backgroundColor = dorea.tipsConfig.bgClr;
                }
    
                //根据 type 实现定位 1:上-2:右-3:下-4:左
                var ele = dorea(config.ele)[0],
                    eleOParent = ele.offsetParent; //获取吸附元素是根据哪个元素进行定位的
                //获取吸附元素的offset
                eleWidth = ele.offsetWidth;
                eleHeight = ele.offsetHeight;
                eleTop = ele.offsetTop;
                eleLeft = ele.offsetLeft;
                eleOParent.appendChild(tips); //保证eleLeft的准确性，放到最后去实现            
                tips.appendChild(tipsI);  

                var tipsWidth = tips.offsetWidth,       
                    tipsHeight = tips.offsetHeight;        
                /*tips、图标定位,根据配置type作出微定位处理
                 *主要是tips在吸附元素的位置
                 *图标在tips的位置和旋转角度
                 */
                switch(config.type) {
                    case 1:
                        tips.style.top = (eleTop-tipsHeight-13)+"px";
                        tips.style.left = eleLeft+"px";
                        tipsI.style.bottom = -19+"px";
                        tipsI.style.left = 23+"px";
                        tipsI.style.transform = "rotate(-185deg)";
                        tipsI.style.msTransform = 'rotate(-185deg)'; //IE9兼容处理
                        break;
                    case 2:
                        tips.style.top = eleTop+"px";
                        tips.style.left = (eleLeft+eleWidth+13)+"px";
                        tipsI.style.top = 9+"px";
                        tipsI.style.left = -13+"px";
                        tipsI.style.transform = "rotate(-90deg)";
                        tipsI.style.msTransform = 'rotate(-90deg)';
                        break;
                    case 3:
                        tips.style.top = (eleTop+tipsHeight+13)+"px";
                        tips.style.left = eleLeft+"px";
                        tipsI.style.top = -20+"px";
                        tipsI.style.left = 23+"px";
                        tipsI.style.transform = "rotate(-358deg)";
                        tipsI.style.msTransform = 'rotate(-358deg)';
                        break;
                    case 4:
                        tips.style.top = eleTop+"px";
                        tips.style.left = (eleLeft-tipsWidth-13)+"px";
                        tipsI.style.top = 9+"px";
                        tipsI.style.right = -13+"px";
                        tipsI.style.transform = "rotate(90deg)";
                        tipsI.style.msTransform = 'rotate(90deg)';
                        break;
                } 
                tipsI.style.borderBottomColor = config.bgClr; //图标背景色和对话框背景色一致
    
                //tips自动销毁
                config.time===0?config.time=1300:config.time=config.time;
                setTimeout(function (){
                    var tips  = dorea(".tips")[0];
                    tips.parentNode.removeChild(tips);
                    config.end();
                },config.time);
            }else{
                console.warn("'ele' is undefined");
            }
        },
        load:function (o){
            if (dorea(".load").length<1) {
                var config = {
                    ele: o.ele || "",
                    type: o.tyoe || 0,
                    bg: o.bg || true,
                };
                var load = creatEle("div"),
                    loadBg = creatEle("div"),
                    loadImg = new Image(),
                    w = 0,
                    h = 0;
                load.className = "load";
                loadBg.className = "load-bg";    
                loadImg.className = "load-images"; 

                config.ele!=="" && dorea(config.ele).length===1?
                    config.ele = dorea(config.ele)[0] : config.ele = document.body;
                if (config.bg) {
                    config.ele.appendChild(loadBg);                
                }  
                config.ele.appendChild(load);  
                load.appendChild(loadImg);
                loadImg.src = "../images/load"+config.type+".gif";
                loadImg.onload=function(){
                    w = loadImg.width;
                    h = loadImg.height;
                    load.style.marginTop = -h/2 +"px";
                    load.style.marginLeft = -w/2 +"px";
                };
            }
        },
        lazyLoad:function (){
            /**
             * @var n  图片索引
             * @var ch 可视高度
             * @var img 所有图片
             * @var st 滚动高度
             * @var sh 文档顶部到可视区域底部 = 可视高度+滚动高度
             * @var htmlTop 图片距离页面顶部的距离
             */
            var n = 0,
                ch = document.documentElement.clientHeight,     
                img = dorea("img");  
            window.onscroll = function (){               
                var st = document.body.scrollTop || document.documentElement.scrollTop,
                    sh = ch + st;
                for (var i = n; i < img.length; i++) {
                    var htmlTop = img[i].getBoundingClientRect().top;
                    /* 判断是否进入可视区域 */
                    if (htmlTop<sh && htmlTop<ch) {
                        var that = img[i];
                        that.setAttribute("src",that.getAttribute("data-src"));
                        n = i + 1;
                    }    
                }           
            };
        },
        down:function (src){
            var $a = document.createElement('a');
            $a.setAttribute("href", src);
            $a.setAttribute("download", "");

            var evObj = document.createEvent('MouseEvents');
            evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);//初始化
            $a.dispatchEvent(evObj); //触发
            document.body.removeChild($a);
        },
        pagination:function (o){
            /**
             * 翻页会出现的情况：
             * 总页数 > 限制页数  30 > 10 
             * 总页数 < 限制页数  5 < 10
             * 总页数 = 限制页数  10 = 10
             * @var pnCount - 显示多少页码 =>  限制显示页码 < 页码总数 （按限制显示） ： 限制显示页码 > 页码总数 （按页码总数显示）
             * @var midN - 翻页的中间页码位置
             * 
            */
            var config = {
                count: o.count || 10,
                limit: o.limit || 5, //每页显示的条数
            };
            var count = config.count,
                limit = config.limit,
                eUl = dorea(".pagination ul")[0],
                ePre = dorea(".pagination .page-pre")[0],
                eNext = dorea(".pagination .page-next")[0],
                eUlChild = eUl.children,
                pnCount = limit < count ? pnCount = limit : pnCount = count,
                midN = Math.ceil( pnCount / 2 );
            /* 初始化上下翻页的页码 */
            ePre.setAttribute("data-page","1");
            eNext.setAttribute("data-page","1");  
            
            /* 
             * @func renderPag
             * @desc 渲染分页  
             * @param { string } startN - 页码起始数  
             * @param { string } currP - 当前页数 ，初始化该函数时可不传  
             * @var childLen - 所有的子元素（页码）的长度 
            */
            var renderPag = function (startN,currP){
                var childLen = eUlChild.length;
                /* 渲染前先清空所有页码 */
                for ( var d = childLen-1; d>=0; d-- ) {
                    eUlChild[d].parentNode.removeChild(eUlChild[d]);
                }
                /* 渲染页码 */
                for ( var i = startN; i <pnCount+startN; i++ ) {
                    var eLi = creatEle("li"),
                        eA = creatEle("a");
                    eA.innerHTML = i;
                    eA.setAttribute("href","javascript:;");
                    eLi.setAttribute("data-page",i);
                    eLi.appendChild(eA);
                    eUl.appendChild(eLi);

                    /* 添加页码的点击事件，获取当前页码currPage */
                    eLi.addEventListener("click",function (){
                        var currPage = this.getAttribute("data-page");
                        turnPag(currPage);
                        ePre.setAttribute("data-page",currPage);
                        eNext.setAttribute("data-page",currPage);
                    }); 
                }
                /* 每次重新渲染翻页时，判断当前页情况（是否属于首页和尾页） */
                if (currP!==undefined) {
                    if (currP=="1") {
                        ePre.style.color = "#d2d2d2";
                        ePre.style.cursor = "not-allowed";
                        ePre.removeEventListener("click",preFn,false);
                    }else if(currP==count){
                        eNext.style.color = "#d2d2d2";
                        eNext.style.cursor = "not-allowed";
                        eNext.removeEventListener("click",nextFn,false);
                    }else{
                        ePre.style.color = "#333";
                        ePre.style.cursor = "pointer";
                        eNext.style.color = "#333";
                        eNext.style.cursor = "pointer";
                        ePre.addEventListener("click",preFn,false); 
                        eNext.addEventListener("click",nextFn,false);
                    } 
                }
            };
            /**
             * @func turnPag
             * @desc 翻页事件判断，主要用于点击事件发生后，进行页码渲染前的判断
             * @param { string } cp - 传入一个点击所获得的当前页数
             * 情况：1) count > limit
             *          a). limit的前半部分页码，例如 10,5 ，前半部分是 1,2 => 起始页为 1
             *          b). limit的后半部分页码，例如 10,5 ，后半部分是 9,10 => 起始页为 (count-limit)+1
             *          b). limit的中间部分，例如 10,5 ，中间部分是 4-7 => 起始页为 (当前页 - (limit/2))+1
             * 情况：2) count = limit => 起始页为 1
             * 情况：3) count < limit => 限制10条，但真实数据确只有5条
             *          a). 发生这类情况，限制条数应以总数据条数为准则
             * 
            */
            var turnPag = function (cp){
                console.log("当前第 "+cp+" 页");
                if (count>limit) {
                    if ( cp<=midN ) { //判断是否属于前部分
                        renderPag(1,cp);
                    }else if( cp<=count && cp>count - midN ){ //判断是否属于后部分
                        renderPag( (count - limit)+1 ,cp) ;
                    }else{
                        renderPag( (cp-midN)+1 ,cp);
                    }
                }else if (count===limit || count<limit) {
                    renderPag(1);
                }else{
                    renderPag( (count - midN)-1 ,cp);
                }
                
                for (var i = 0; i<eUlChild.length; i++) {
                    eUlChild[i].style.backgroundColor = "#fff";
                    if (eUlChild[i].getAttribute("data-page") == cp) {
                        eUlChild[i].style.backgroundColor = "#1E9FFF"; /* 选中状态 */
                    }
                } 
            };
            /**
             * @func preFn 
             * @desc 上翻页
             * @func nextFn 
             * @desc 下翻页
             */
            var preFn = function (){
                var currPage = this.getAttribute("data-page");
                currPage--;
                turnPag(currPage);
                ePre.setAttribute("data-page",currPage);
                eNext.setAttribute("data-page",currPage);
            };
            var nextFn = function (){
                var currPage = this.getAttribute("data-page");                    
                currPage++;
                turnPag(currPage);
                ePre.setAttribute("data-page",currPage);
                eNext.setAttribute("data-page",currPage);
            };
            renderPag(1);

            /* 
             * 初次渲染翻页时，判断当前的总页数情况，初始化翻页功能
             * 情况： 1) count > limit 上翻页：暗色，删除事件 - 下翻页：亮色，点击事件
             * 情况： 2) count = limit 上下翻页：暗色，删除事件
             * 情况： 3) count < limit 上下翻页：暗色，删除事件
            */
            if (count>limit) {
                ePre.style.color = "#d2d2d2";   
                ePre.style.cursor = "not-allowed";
                ePre.removeEventListener("click",preFn,false);
                eNext.addEventListener("click",nextFn,false);
            }else{
                ePre.style.color = "#d2d2d2";
                ePre.style.cursor = "not-allowed";
                ePre.removeEventListener("click",preFn,false);
                eNext.style.color = "#d2d2d2";
                eNext.style.cursor = "not-allowed";
                eNext.removeEventListener("click",nextFn,false);
            }
        },
    });
    
    dorea.fn.init.prototype = dorea.fn;
    window.dorea = dorea;
})(window);
