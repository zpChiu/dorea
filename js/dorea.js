window.onload=function (){
    var query = function (ele){
        return document.querySelectorAll(ele);
    };
    var creatEle = function (ele){
        return document.createElement(ele);
    };
    
    var dorea = {
        /**
         * randomRgbColor - 随机生成RGB颜色并返回rgb(r,g,b)格式颜色
         * btnRandom - 给btn-random类名的按钮一个随机色
         * btnHoverRandom - 给btn-hover-random类名的按钮一个悬浮事件：悬浮时候背景颜色随机
         * dialog - 弹框启动
         * tips - 小提示
         * load - 加载提示
         * select - 下拉菜单
         * timeLine - 时间线的小圆圈随机色
         * ie - ie 7,8,9,10,11,edge的浏览器处理 ie({"ie8":callback()}) 
         *    备注：ie5会执行ie7的回调，因为ie5返回的ua是ie7的
         */
        init:function (){
            this.btnRandom();
            this.btnHoverRandom();
            this.timeLine();
            query(".page-dialog-btn")[0].addEventListener("click",function (){
                dorea.dialog({
                    bg:true,
                    title:"一个弹框的标题",
                    btn:["确定","关闭","选择"],
                    btnCB:{
                        btn0:function (){
                            console.log("btn0");
                        },
                        btn2:function (){
                            console.log("btn2");
                        }
                    },
                    end:function (){
                        console.log("我确实消失了");
                    },
                    time:2000
                });
            });
            query(".page-dialog-btn2")[0].addEventListener("click",function (){
                dorea.dialog({
                    bg:true,
                    title:"一个弹框的标题2",
                    titleClr:"#1773cc",
                    btnCB:{
                        btn0:function (){
                            console.log("btn0");
                        },
                        btn2:function (){
                            console.log("btn2");
                        }
                    },
                    end:function (){
                        console.log("我确实消失了2");
                    },
                    time:2000
                });
            });
            query(".tips-up")[0].addEventListener("click",function (){
                dorea.tips({
                    ele:".tips-up",
                    content:"我是一个在元素上方的小tips",
                    type:1,
                    bgClr:"rgba(123,123,123,.5)",
                    end:function (){
                        console.log(query(".tips-up")[0].innerHTML);
                    }
                });
                //往header添加参数 测试
                $.ajax({
                    url: "http://baidu.com",
                    dataType: 'json',
                    type: 'GET',
                    headers: {
                        test: "application/json; charset=utf-8"
                    },
                    // beforeSend: function (xhr) {
                    //     xhr.setRequestHeader("Test", "testheadervalue");
                    //     // xhr.setRequestHeader("Test2", "testheadervalue");
                    // },
                    async: false,
                    cache: false,
                    success: function (sResponse) {
                    }
                });

            });
            query(".tips-right")[0].addEventListener("click",function (){
                dorea.tips({
                    ele:".tips-right",
                    content:"我是一个在元素右方的小tips",
                    type:2,
                    bgClr:"rgba(13,13,13,.5)",
                    end:function (){
                        console.log(query(".tips-right")[0].innerHTML);
                    }
                });
            });
            query(".tips-down")[0].addEventListener("click",function (){
                dorea.tips({
                    ele:".tips-down",
                    content:"我是一个在元素下方的小tips",
                    type:3,
                    bgClr:"rgba(123,173,13,.5)",
                    end:function (){
                        console.log(query(".tips-down")[0].innerHTML);
                    }
                });
            });
            query(".tips-left")[0].addEventListener("click",function (){
                dorea.tips({
                    ele:".tips-left",
                    content:"我是一个在元素左方的小tips",
                    type:4,
                    bgClr:"rgba(12,132,13,.5)",
                    end:function (){
                        console.log(query(".tips-left")[0].innerHTML);
                    }
                });
            });
            query(".page-load-btn")[0].addEventListener("click",function (){
                dorea.load({
                    content:"正在加载中..."
                });
            });
            this.select();
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
            var s = query(".select"),
                a = query(".select>ul>li a");
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
            var circle = query(".tl-circle");
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
            var randomBtn = query(".btn-random");
            for(var i = 0;i<randomBtn.length;i++){
                randomBtn[i].style.backgroundColor=dorea.randomRgbColor();
            };
        },
        btnHoverRandom:function (){
            var randomBtn = query(".btn-hover-random");
                randomBtn2 = query(".btn-hover-random2");
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
        defConfig:{
            bg:false, //是否开启遮罩层
            bgClr:"rgba(0,0,0,.5)",//遮罩层颜色
            title:"温馨提示", 
            titleClr:"#009f95",
            content:"<div style='color:red;'>我是弹框的提示内容</div><div>我是弹框的提示内容</div>",
            close:true,
            btn:["关闭"],
            btnCB:{},
            end:function (){
                console.log("弹框消失了");
            },
            time:0,
        },
        dialog:function (parmConfig){
            /**
             * @var config : 默认参数
             * @var dialog : 弹框
             * @var title : 弹框标题
             * @var bg : 弹框背景元素
             * @var dialog : 弹框元素
             * @var close : 右上角关闭元素
             * @var destroy : 弹框销毁
             */
            var config = {},
                dialog = creatEle("div"),
                title = creatEle("div"),
                content = creatEle("div"),
                btn = creatEle("div"),
                close = creatEle("span"),
                isDestroy = false, //初始化弹窗为未销毁，销毁后赋值为true,防止自动销毁后报错
                destroy = (function (){
                    if (!isDestroy) {
                        var bg  = query(".dialog-bg")[0],
                        dialogEle  = query(".dialog")[0]; 
                        if (config.bg) {
                            bg.parentNode.removeChild(bg);                            
                        }
                        dialogEle.parentNode.removeChild(dialogEle);
                        //弹框销毁后回调 - config.end
                        if (query(".dialog").length===0 && config.end) {
                            config.end();
                        } 
                        isDestroy = true;
                    }
                });
            for(var key in dorea.defConfig){
                !parmConfig[key]? config[key] = dorea.defConfig[key]:config[key] = parmConfig[key];
            }

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
            query(".dialog")[0].appendChild(title);
            query(".dialog")[0].appendChild(content);
            query(".dialog")[0].appendChild(btn);
            query(".dialog")[0].appendChild(close);
            
            query(".dialog-title")[0].innerHTML = config.title;
            query(".dialog-title")[0].style.backgroundColor = config.titleClr;
            query(".dialog-content")[0].innerHTML = config.content;
            query(".dialog-close")[0].innerHTML = "x";
            for(i=0;i<config.btn.length;i++){
                query(".dialog-btn")[0].appendChild(creatEle("a")).className = "dialog-btn"+i;
                query(".dialog-btn"+i)[0].innerHTML=config.btn[i];
                query(".dialog-btn"+i)[0].style.backgroundColor=config.titleClr;//按钮背景色跟随标题背景色  
                //给弹框按钮赋予点击事件及事件发生后，弹框销毁
                (function (i){
                    query(".dialog-btn"+i)[0].addEventListener("click",function (e){
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
                query(".dialog-close")[0].style.display="inline-block";
                query(".dialog-close")[0].addEventListener("click",function (){
                    destroy();
                });
            }else{
                query(".dialog-close")[0].style.display="none"
            }
            //让弹框高度居中
            dialogH = window.getComputedStyle(query(".dialog")[0]).height;
            dialogH = Number(dialogH.slice(0,-2));
            query(".dialog")[0].style.marginTop="-"+(dialogH/2)+"px";
            //自动消失
            if (config.time!==0) {
                setTimeout(function (){
                    destroy();
                },config.time);
            }
        },
        tipsConfig:{
            ele:"",
            type:2,
            content:"",
            area:["100px","auto"],
            bgClr:"rgba(0,0,0,.8)",
            time:0,
            end:function (){}
        },
        tips:function (parmConfig){
            var config = {},
                tips = creatEle("span"),
                tipsI = creatEle("i");

            for(var key in dorea.tipsConfig){
                !parmConfig[key]? config[key] = dorea.tipsConfig[key]:config[key] = parmConfig[key];
            }
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
                var ele = query(config.ele)[0],
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
                    var tips  = query(".tips")[0];
                    tips.parentNode.removeChild(tips);
                    config.end();
                },config.time);
            }else{
                console.warn("'ele' is undefined");
            }
        },
        loadConfig:{
            // ele:".load-test",
            ele:"",
            type:0,
            bg:true,
        },
        load:function (parmConfig){
            if (query(".load").length<1) {
                var config = {},
                    load = creatEle("div"),
                    loadBg = creatEle("div")
                    loadImg = new Image(),
                    w = 0,
                    h = 0;
                load.className = "load";
                loadBg.className = "load-bg";    
                loadImg.className = "load-images"; 

                for(var key in dorea.loadConfig){
                    !parmConfig[key]? config[key] = dorea.loadConfig[key]:config[key] = parmConfig[key];
                }
                config.ele!=="" && query(config.ele).length===1?
                    config.ele = query(config.ele)[0] : config.ele = document.body;
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
        }
    }
    dorea.init();
};