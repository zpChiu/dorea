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
        removeClass:function (ele,cName){
            var className = ele.className.split(/\s+/);
            var pos = -1,i,len;
            for(var i = 0,len = className.length;i<len;i++){
                if (className[i] == cName) {
                    pos=i;
                    break;
                }
            }
            className.splice(i,1);
            ele.className = className.join(" ");
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
                    span.textContent = this.textContent;
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
            dorea(".dialog-close")[0].textContent = "x";
            for(i=0;i<config.btn.length;i++){
                dorea(".dialog-btn")[0].appendChild(creatEle("a")).className = "dialog-btn"+i;
                dorea(".dialog-btn"+i)[0].textContent=config.btn[i];
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
                ele: o.ele || "dorea.pagination of ele",
                count: o.count || 10, //总页数
                limit: o.limit || 5, //每页显示的条数
                page: o.page || function (obj){  },  //页码发生变化后的回调函数
            };
            if (config.ele!=="" && dorea(config.ele)[0]) {
                var ele = dorea(config.ele)[0],
                    count = config.count,
                    limit = config.limit,
                    page = config.page,
                    ePagination = creatEle("div"),
                    eUl = creatEle("ul"),
                    ePre = creatEle("a"),
                    eNext =creatEle("a"),
                    pnCount = limit < count ? pnCount = limit : pnCount = count,
                    midN = Math.ceil( pnCount / 2 ),
                    fragment = document.createDocumentFragment(); 
                /* 初始组件元素 */
                ePagination.className = "pagination";
                ePre.className = "page-pre";
                eNext.className = "page-next";
                ePre.textContent = "上一页";
                eNext.textContent = "下一页";
                ePre.href = "javascript:;";
                eNext.href = "javascript:;";
                ePre.setAttribute("data-page","1");
                eNext.setAttribute("data-page","1");  
                ePagination.appendChild(ePre);
                ePagination.appendChild(eUl);
                ePagination.appendChild(eNext);
                fragment.appendChild(ePagination);
                ele.appendChild(fragment);
                
                /* 
                * @func renderPag
                * @desc 渲染分页  
                * @param { string } startN - 页码起始数  
                * @param { string } currP - 当前页数 ，初始化该函数时可不传  
                * @var childLen - 所有的子元素（页码）的长度 
                */
                var renderPag = function (startN,currP){
                    var childLen = eUl.children.length;
                    /* 渲染前先清空所有页码 */
                    for ( var d = childLen-1; d>=0; d-- ) {
                        eUl.children[d].parentNode.removeChild(eUl.children[d]);
                    }
                    /* 渲染页码 */
                    for ( var i = startN; i <pnCount+startN; i++ ) {
                        var eLi = creatEle("li"),
                            eA = creatEle("a");
                        eA.textContent = i;
                        eA.setAttribute("href","javascript:;");
                        eLi.setAttribute("data-page",i);
                        eLi.appendChild(eA);
                        fragment.appendChild(eLi);

                        /* 添加页码的点击事件，获取当前页码currPage */
                        eLi.addEventListener("click",function (){
                            var currPage = this.getAttribute("data-page");
                            turnPag(currPage);
                            ePre.setAttribute("data-page",currPage);
                            eNext.setAttribute("data-page",currPage);
                        }); 
                    }
                    eUl.appendChild(fragment);
                    
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
                    /* 传递给page(obj)回调的参数 */
                    var obj = {
                        curr: cp.toString(),  //当前页码
                        currEle: ""  //当前页码元素
                    };
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
                    
                    for (var i = 0; i<eUl.children.length; i++) {
                        eUl.children[i].style.backgroundColor = "#fff";
                        if (eUl.children[i].getAttribute("data-page") == cp) {
                            eUl.children[i].style.backgroundColor = "#1E9FFF"; /* 选中状态 */
                            obj.currEle = eUl.children[i];
                        }
                    } 
                    return page(obj);
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
            }else{
                dorea(config.ele)[0]===undefined? 
                console.error(config.ele + " is undefined"):console.error("ele is Incorrect type");
            }    
        },
        drawDate:function (o){
            var config = {
                ele: o.ele,    /* 吸附元素 */
                minyears: o.minyears || 1990,    
                maxyears: o.maxyears || 2100,    
            };
            var target = dorea(config.ele)[0],
                weeks = ["日","一","二","三","四","五","六"],
                tYear = new Date().getFullYear();
                tMonth = new Date().getMonth()+1;
                tDay = new Date().getDate();

            /* 绘制日期头部和星期头部*/
            var eDiv = creatEle("div");
            var dateDiv = creatEle("div"),
                dateHeader = creatEle("div"),
                dateContent = creatEle("div"),
                dateSetYM = creatEle("div"),
                dateSetY = creatEle("span"),
                dateSetM = creatEle("span"),
                preY = creatEle("i"),
                preM = creatEle("i"),                
                nextY = creatEle("i"),
                nextM = creatEle("i"),
                table = creatEle("table"),
                thead = creatEle("thead"), 
                tbody = creatEle("tbody"),
                fragment = document.createDocumentFragment();
            dateDiv.className = "dorea-date";
            dateHeader.className = "dorea-date-header";    
            dateContent.className = "dorea-date-content";    
            dateSetYM.className = "dorea-date-set-ym";    
            dateSetY.className = "dorea-date-set-y";    
            dateSetM.className = "dorea-date-set-m";    
            preY.className = "dorea-pre-year";  
            preM.className = "dorea-pre-month";
            nextY.className = "dorea-next-year";            
            nextM.className = "dorea-next-month";                                  
            tbody.className = "dorea-date-tbody";             
            table.className = "dorea-date-table"; 
            preM.setAttribute("data-type","5");
            nextM.setAttribute("data-type","6");
            dateSetY.setAttribute("data-view","year");
            dateSetM.setAttribute("data-view","month");

            /* 渲染星期头部 */
            thead.insertRow(0);
            for(var i = 0; i<weeks.length; i++){
                var th = creatEle("th");
                th.textContent = weeks[i];
                thead.rows[0].appendChild(th);
            }  
            table.appendChild(thead);
            
            /* 渲染完整的日期头部 */
            dateHeader.appendChild(preY);
            dateHeader.appendChild(preM);
            dateHeader.appendChild(dateSetYM);
            dateSetYM.appendChild(dateSetY);
            dateSetYM.appendChild(dateSetM);
            dateHeader.appendChild(nextM);            
            dateHeader.appendChild(nextY);
            dateDiv.appendChild(dateHeader);            
            dateDiv.appendChild(table);

            /**
             * @func getMonthInfo - desc:  得到某年份的具体某月份信息
             * @param { string } y - 当前年份
             * @param { string } m - 当前月份（已经是new Date的月份基础上大于1了）
             * @return { array } info - 返回一个info数组,年月日周几等信息;
             * @var { number } fdWeek - 该月第一天是周几
             * @var { number } ldWeek - 该月最后一天是周几
             * @var { number } lastDay - 当前月的最后一天
             * @var { number } lmDays - 上一个月的最后一天
             * @var { number } lmYear - 上一个月的年份
             * @var { number } lmMonth - 上一个月的月份
             * 通过获取m月的最后一天，得出m月共有多少天,并补全月份数据,只展示六周的日期
            */
            function getMonthInfo(y,m){
                var info = [],
                    fdWeek = new Date(y,m-1,1).getDay(), /* 得到的日期是"m"月的前一个 月的最后一天 */
                    ldWeek = new Date(y,m,0).getDay(), /* 得到的日期是"m"月的后一个 月的第一天 */
                    lastDay = new Date(y,m,0).getDate(), 
                    lmDays =  new Date(y,m-1,0).getDate();
                    lmYear = new Date(y,m-1,0).getFullYear(),
                    lmMonth = new Date(y,m-1,0).getMonth()+1;
                    nmYear = new Date(y,m+1,0).getFullYear(),
                    nmMonth = new Date(y,m+1,0).getMonth()+1;
                for(var i = lmDays, len = lmDays + (0-fdWeek); i>len; i--){
                    info.unshift({
                        year: lmYear,
                        month: lmMonth, /* 上个月 */
                        day: i,
                        week: new Date(y,m-2,i).getDay(),
                    });  
                }
                for(var i = 1; i<=lastDay; i++){
                    info.push({
                        year: y,
                        month: m, /* 本月 */
                        day: i,
                        week: new Date(y,m-1,i).getDay(),
                    });
                }
                for(var i = 1,len = 42-info.length; i<=len; i++){
                    info.push({
                        year: nmYear,
                        month: nmMonth, /* 下个月 */
                        day: i,
                        week: new Date(y,m,i).getDay(),
                    });
                }
                console.log(info);
                return info;
            };

            /**atr = attribute 归属/属于
             * @func atrMD - desc: 遍历所得的m月是否属于m1月,不属于添加mClass类；遍历所得的d天是否等于d1天,属于添加dClass类；其他的都移除class属性
             * @param { number } y - 年份
             * @param { number } m - 月份
             * @param { number } d - 日期（天）
             * @param { number } m1 - 月份（对比月份）
             * @param { number } d1 - 日期（天）（对比日期）
             * @param { element } ele - 需要添删类名的元素
             * @param { string } mClass - 不属于m月应该添加的类名
             * @param { string } dClass - 属于m月d天的应该添加的类名
            */
            function atrMD(y,m,d,m1,d1,ele,mClass,dClass){
                if (y>config.maxyears || y<config.minyears) {
                    ele.removeEventListener("click",getDates,false);
                    ele.setAttribute("class","dorea-date-disabled");
                }else{
                    if (m===m1 && d === d1) {
                        ele.setAttribute("class",dClass);
                    }else if(m!==m1){
                        ele.setAttribute("class",mClass);
                    }else{
                        ele.removeAttribute("class");
                    }
                }
                /* 添加自定义属性data-date */
                d<10? d = "0" + d : "" ;
                m<10? m = "0" + m : "" ;
                ele.setAttribute("data-date",y + "-" + m + "-" + d);
            };
            /** 
             * @func dateView - desc:  绘制一个日期的表格
             * @param { number } year - 年份
             * @param { number } month - 月份
             * @var { array } monthInfo - month月份详细信息（包括上下月）
             * 进入方法后,（1）.先判断参数month是否大于12;
             *           （2）.设置日期头部的preM,nextM等元素为可见,并设置上下年份按钮的点击类型等;
             *           （3）.判断tbody是否存在，存在则不需要再去重复创建子元素
            */
            function dateView(year,month){
                if (month>12) {
                    month = month - 12;
                    year = year + 1;
                }else if (month<1) {
                    month = month + 12;
                    year = year -1;   
                }     

                preM.style.display = "block";
                nextM.style.display = "block";
                dateSetM.style.display = "inline-block"; 
                dateSetM.setAttribute("data-month",month);  
                dateSetY.setAttribute("data-year",year);
                dateSetM.textContent = month + "月";             
                dateSetY.textContent = year + "年";
                preY.setAttribute("data-type","1");
                nextY.setAttribute("data-type","3");

                var monthInfo = getMonthInfo(year,month),
                    isTbody = document.body.contains(dorea(".dorea-date-tbody")[0]),
                    index = 0;
                if (isTbody) {
                    for ( var i = 0, len = 6; i<len; i++ ) {
                        for ( var j = 0, col = 7; j<col; j++ ) {
                            var td = tbody.rows[i].cells[j],
                                date = monthInfo[index];
                            td.textContent = date.day;
                            atrMD(date.year,date.month,date.day,month,tDay,td,"dorea-date-not-month","dorea-date-curr");
                            index++;
                        }
                    }
                }else{
                    /* 绘制日期的页面效果 */
                    for ( var i = 0, len = 6; i<len; i++ ) {
                        tbody.insertRow(i);
                        for ( var j = 0, col = 7; j<col; j++ ) {
                            var td = tbody.rows[i].insertCell(j),
                                date = monthInfo[index];
                            td.textContent = date.day;
                            td.addEventListener("click",getDates,false);
                            atrMD(date.year,date.month,date.day,month,tDay,td,"dorea-date-not-month","dorea-date-curr");
                            index++;
                        }
                    }
                    table.appendChild(tbody);
                    dateContent.appendChild(table);               
                    dateDiv.appendChild(dateContent);
                    document.body.appendChild(dateDiv);   
                }               
            }
            dateView(tYear,tMonth); /* 初始化执行 */

            /**
             * @func atrYears - desc:  （1）.添加文本节点内容;
             *                         （2）.是否符合所规定的年限范围;
             *                         （3）.符合：移除cName类,添加toYears事件，添加自定义属性;
             *                         （4）.不符合：添加cName类，移除toYears事件，移除自定义属性;
             * @param { number } year - 传入判断的年份
             * @param { element } ele - 传入判断的年份的元素
             * @param { sub } sub - 元素下标
             * @param { cName } ele - 符合规定的元素所需添加的类名
            */
            function atrYears(year,ele,i,cName){
                ele.textContent = year;
                if (year>config.maxyears || year<config.minyears) {
                    ele.setAttribute("class",cName);
                    ele.removeAttribute("data-years");
                    ele.removeEventListener("click",toYears,false);
                }else{
                    ele.removeAttribute("class");
                    /* 中间位置的年份,长期选中状态 */  
                    i === 7?ele.className = "dorea-year-curr" :"";                  
                    ele.setAttribute("data-years",year);
                    ele.addEventListener("click",toYears,false);
                }
            }
            /**
             * @func drawYear - desc:  绘制一个年份/月份
             * @param { string } type - 绘制类型
             * @param { string } years - 年份
             * @param { string } month - 月份
             * 进入方法后,（1）.重置上下年份的点击类型,且月份点击视为不可见等;
             *           （2）.判断yLists是否存在，存在则不需要再去重复创建子元素
            */
            function drawYear(type,years,month){
                preM.style.display = "none";
                nextM.style.display = "none";
                dateSetM.style.display = "none";
                dateSetY.setAttribute("data-year",years);  

                switch (type) {
                    case "year":
                        preY.setAttribute("data-type","2");
                        nextY.setAttribute("data-type","4");
                        dateSetY.textContent = (years-7)+"年-"+(new Number(years)+7)+"年";

                        var startY = years - 7,
                            yLists = dorea(".dorea-years-list")[0];
                            isYList = document.body.contains(yLists);
                        if (isYList) {
                            var eLis = yLists.getElementsByTagName("li");
                            for(var i = 0, len = 15; i<len; i++){
                                atrYears(startY+i,eLis[i],i,"dorea-year-disabled");
                            }
                        }else{
                            var eUl = creatEle("ul");
                            eUl.className = "dorea-years-list";
                            for(var i = 0, len = 15; i<len; i++){
                                var eLi = creatEle("li");
                                atrYears(startY+i,eLi,i,"dorea-year-disabled")
                                fragment.appendChild(eLi);
                            }
                            eUl.appendChild(fragment);
                            dateContent.appendChild(eUl);
                        }                        
                        break;
                    case "month":
                        preY.setAttribute("data-type","7");
                        nextY.setAttribute("data-type","8");
                        dateSetY.textContent = years;
                        var mLists = dorea(".dorea-months-list")[0];
                            isMList = document.body.contains(mLists);
                        /* 创建月份视图 */
                        if (!isMList) {
                            var eUl = creatEle("ul");
                            eUl.className = "dorea-months-list";
                            for(var i = 0, len = 12; i<len; i++){
                                var eLi = creatEle("li");
                                eLi.setAttribute("data-month",i+1);
                                eLi.textContent = i+1 + "月";
                                eLi.addEventListener("click",toMonths,false);
                                fragment.appendChild(eLi);
                            }
                            eUl.appendChild(fragment);
                            dateContent.appendChild(eUl);
                        }
                        break;
                    default:
                        break;
                }
            }
            /**
             * @func toYears - desc:  跳转至某年份
             * 进入方法后,（1）.先获取点击事件触发元素的年份和dateSetM元素的月份
             *           （2）.删除年份视图
             *           （3）.重新执行dateView方法,绘制新的日期视图
            */            
            function toYears(){
                var yLists = dorea(".dorea-years-list"),
                    year = this.getAttribute("data-years"),
                    month = dateSetM.getAttribute("data-month");
                yLists[0].parentNode.removeChild(yLists[0]);
                dateView(year,month);
            }
            function toMonths(){
                var mLists = dorea(".dorea-months-list"),
                    year = dateSetY.getAttribute("data-year"),
                    month = this.getAttribute("data-month");
                mLists[0].parentNode.removeChild(mLists[0]);
                dateView(year,month);
            }
            /**
             * @func getDates - desc:  点击后得到一个完整的日期（年月日）,并在吸附元素输出值
             * @func toggleYM - desc: 根据点击类型判断切换年月份
             * @var  type: 1：上一年；2：上一年份范围； 3：下一年；4：下一年份范围；5：上一个月；6：下一个月；7：上一年（月份）；8：下一年（月份）；
             * 
            */
            var iBtn = dateHeader.querySelectorAll("i");
            for(var i = 0, len = iBtn.length; i < len; i++){
                iBtn[i].addEventListener("click",toggleYM,false);
            }
            function getDates(){
                var date = this.getAttribute("data-date");
                dateDiv.parentNode.removeChild(dateDiv);
                target.value = date;
            }
            function toggleYM(){
                var type = this.getAttribute("data-type"),
                    dataYear = new Number(dateSetY.getAttribute("data-year")),
                    dataMonth = new Number(dateSetM.getAttribute("data-month"));
                switch (type) {
                    case "1":
                        dateView(dataYear-1,dataMonth);
                        break;
                    case "2":
                        drawYear("year",dataYear-15,dataMonth);
                        break;
                    case "3":
                        dateSetY.textContent = dataYear +1;
                        dateView(dataYear+1,dataMonth);
                        break;
                    case "4":
                        drawYear("year",dataYear+15,dataMonth);
                        break;
                    case "5":
                        dateView(dataYear,dataMonth-1);
                        break;
                    case "6":
                        dateView(dataYear,dataMonth+1);
                        break;
                    case "7":
                        drawYear("month",dataYear-1,dataMonth);
                        break;
                    case "8":
                        drawYear("month",dataYear+1,dataMonth);
                        break;
                    default:
                        break;
                }
            }
            /* 选择年份 */
            dateSetY.addEventListener("click",function (){
                var type = this.getAttribute("data-view"),
                    years = this.getAttribute("data-year"),
                    month = new Number(dateSetM.getAttribute("data-month"));
                drawYear(type,years,month);
            });
            /* 选择月份 */
            dateSetM.addEventListener("click",function (){
                var type = this.getAttribute("data-view"),
                    month = this.getAttribute("data-month"),
                    years = new Number(dateSetY.getAttribute("data-year"));
                // console.log(years + month);
                drawYear(type,years,month);
            });
        },
        date:function (o){
            var idReg = /#/i,
                isId = idReg.test(o.ele),
                target = dorea(o.ele)[0];
            if (isId) { 
                target.addEventListener("click",function (){
                    var eDate = dorea(".dorea-date"),
                        isDate = document.body.contains(eDate[0]);
                    /* 判断eDate元素是否存在于页面,当执行多个date方法时,页面都只显示一个eDate元素*/
                    if (isDate) {
                        for(var i = 0; i<eDate.length; i++){
                            eDate[i].parentNode.removeChild(eDate[i]);
                        }
                    } 
                    dorea.drawDate(o);
                    var eDate = dorea(".dorea-date")[0],                    
                        that = this,
                        eleScrolTop = document.documentElement.scrollTop,
                        eleTop = that.offsetTop,
                        eleHeight = that.offsetHeight,
                        eleLeft = that.offsetLeft;
                    if (eleTop-eleScrolTop > 500) {
                        eDate.style.top = (eleTop - eDate.offsetHeight)-7 +"px";
                    }else{
                        eDate.style.top = (eleTop + eleHeight)+7 +"px";
                    }
                    eDate.style.left = eleLeft + "px";
                    eDate.style.opacity = "1";                    
                });
            }else{
                console.error("ele is Incorrect type");
            }
        }
    });
    
    dorea.fn.init.prototype = dorea.fn;
    window.dorea = dorea;
})(window);
