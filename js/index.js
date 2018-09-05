window.onload=function (){
    dorea.btnRandom();
    dorea.btnHoverRandom();
    dorea.select();
    dorea.timeLine();
    dorea.lazyLoad();
    dorea.pagination({
        ele:".pagination-wrap",
        count: 10,
        limit: 5,
        page:function (obj){
            console.log(obj);
        }
    });
    dorea.pagination({
        ele:".pagination-wrap2",
        count: 5,
        limit: 5,
        page:function (obj){
            console.log(obj);
        }
    });
    dorea.pagination({
        ele:".pagination-wrap3",
        count: 1,
        limit: 5,
        page:function (obj){
            console.log(obj);
        }
    });

    dorea.date({
        ele: "#dorea-date-input",
    });
    dorea.date({
        ele: "#dorea-date-input2",
        minyears: 2018,
        maxyears: 2018
    });

    dorea(".page-dialog-btn")[0].addEventListener("click",function (){
        dorea.dialog({
            bg:true,
            title:"<span style='color:#e7e7e7'>一个弹框的标题</span>",
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
            // time:2000
        });
    });
    dorea(".page-dialog-btn2")[0].addEventListener("click",function (){
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
    dorea(".tips-up")[0].addEventListener("click",function (){
        dorea.tips({
            ele:".tips-up",
            content:"我是一个在元素上方的小tips",
            type:1,
            bgClr:"rgba(123,123,123,.5)",
            end:function (){
                console.log(dorea(".tips-up")[0].innerHTML);
            }
        });
        //往header添加参数 测试
        // $.ajax({
        //     url: "http://baidu.com",
        //     dataType: 'json',
        //     type: 'GET',
        //     headers: {
        //         test: "application/json; charset=utf-8"
        //     },
        //     // beforeSend: function (xhr) {
        //     //     xhr.setRequestHeader("Test", "testheadervalue");
        //     //     // xhr.setRequestHeader("Test2", "testheadervalue");
        //     // },
        //     async: false,
        //     cache: false,
        //     success: function (sResponse) {
        //     }
        // });

    });
    dorea(".tips-right")[0].addEventListener("click",function (){
        dorea.tips({
            ele:".tips-right",
            content:"我是一个在元素右方的小tips",
            type:2,
            bgClr:"rgba(13,13,13,.5)",
            end:function (){
                console.log(dorea(".tips-right")[0].innerHTML);
            }
        });
    });
    dorea(".tips-down")[0].addEventListener("click",function (){
        dorea.tips({
            ele:".tips-down",
            content:"我是一个在元素下方的小tips",
            type:3,
            bgClr:"rgba(123,173,13,.5)",
            end:function (){
                console.log(dorea(".tips-down")[0].innerHTML);
            }
        });
    });
    dorea(".tips-left")[0].addEventListener("click",function (){
        dorea.tips({
            ele:".tips-left",
            content:"我是一个在元素左方的小tips",
            type:4,
            bgClr:"rgba(12,132,13,.5)",
            end:function (){
                console.log(dorea(".tips-left")[0].innerHTML);
            }
        });
    });
    dorea(".page-load-btn")[0].addEventListener("click",function (){
        dorea.load({
            content:"正在加载中..."
        });
    });
};