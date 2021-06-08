
var videoList = [];
var current = 0;
var frame;
var frameDom;

var dutationa = 14000
var dutationb = 5000
function startPlay(){

    var a = ()=>{
        current++;
        if(current >= videoList.length){
            alert("刷课完成");
            return;
        }
        frameDom.setAttribute("src",videoList[current].url);
        console.log("切换视频,等待"+dutationa/1000+"秒")
        setTimeout(()=>{

            frame.document.getElementById("video").currentTime = frame.document.getElementById("video").duration-1;
            console.log(player);
            console.log("开始播放" + videoList[current].name)
            clickPlayBtn();
    
            console.log("注册下次切换,时间:"+(/*videoList[current].time*1000 +*/ dutationb)+"毫秒后")
            setTimeout(a,/*videoList[current].time*1000 +*/ dutationb);
        },dutationa)
    }

    console.log("开始运行,等待"+dutationa/1000+"秒")
    setTimeout(()=>{

        frame.document.getElementById("video").currentTime = frame.document.getElementById("video").duration-1;
        console.log(player);
        console.log("开始播放" + videoList[current].name)
        clickPlayBtn();

        console.log("注册下次切换,时间:"+(/*videoList[current].time*1000 +*/dutationb)+"毫秒后")
        setTimeout(a,/*videoList[current].time*1000 +*/ dutationb);
    },dutationa)
}


function init(){
    


    var videoLiList = document.getElementsByClassName("video_lists")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
    for (let i = 0; i < videoLiList.length; i++) {
        const li = videoLiList[i];
        var a = li.getElementsByTagName("a")[0];
        var videoInf = {
            url : a.getAttribute("href"),
            time : parseVideoTime(li.getElementsByTagName("span")[0].innerText),//这里时间是秒
            name : a.innerText
        }
        videoList.push(videoInf);

        // if(getComputedStyle(a,null).getPropertyValue("color") == "rgb(255, 0, 0)" && i!=0){
        //     current = i;
        // }
        if(hasClass(li,"video_red1")){
            current = i;
        }
    }
    
    document.write('<frameset cols=\'*\'>\n<frame src=\'' + window.location.href + '\' /></frameset>');//把网页搞到frame里
    frame = frames[0];

    frameDom = document.getElementsByTagName("frame")[0];
}


function preventBackground(){//阻止无法后台播放,好像不太能用
    document.addEventListener('visibilitychange', function () { //浏览器切换事件
        console.log("后台点播放")
        setInterval(()=>{
            clickPlayBtn();},500)
        // clickPlayBtn();

    });
    // console.log(player)
    // player.on('pause', function (event) {
    //     console.log("暂停后自动播放")
    //     player.play();
    // });

}


function parseVideoTime(timeStr){
    var l = timeStr.split(":");
    var t = (l[0]*60*60 )+ (l[1]*60) + (l[2]*1);

    // var t = (l[2]*1)
    if(t>30)t=t-30;
    return t;
}
function closeModel(){
    var e = frame.document.createEvent("MouseEvents");
    e.initEvent("click", true, true);
    var modelList = frame.document.getElementsByClassName("public_submit");
    for (let i = 0; i < modelList.length; i++) {
        const model = modelList[i];
        model.dispatchEvent(e)
    }
}
function clickPlayBtn(){
    var e = frame.document.createEvent("MouseEvents");
    e.initEvent("click", true, true);
    var list = frame.document.getElementsByClassName("plyr__controls__item plyr__control");
    for (let i = 0; i < list.length; i++) {
        const btn = list[i];
        if(btn.getAttribute("aria-label") == "Play"){
            btn.dispatchEvent(e)
            console.log("模拟点击")

        }
    }

}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

init();

startPlay();

    
