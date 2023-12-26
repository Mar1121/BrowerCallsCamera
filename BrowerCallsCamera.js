
let video = document.querySelector('#video')
// console.log(video.style);
let canvas = document.querySelector('#canvas')
let context = canvas.getContext('2d')
// 调取摄像头，首先得先检验当前设备是否有摄像设备
const navigator = window.navigator.mediaDevices;
console.log(navigator);
// 原型上的enumeraterDevices,getUserMedia
// 调用enumeraterDevices函数来查看当前媒体设备是否存在
const device =  navigator.enumerateDevices();

console.log(device, 'device');
// 调用navigtor 的参数 getUserMedia 接受一个对象作为请求摄像头的参数
//获取摄像头的流数据
 navigator.getUserMedia({
    audio: false,
    video: {
        width: 500,
        height: 500,
        // facingMode:{
        //     exact:"environment"//强调后置摄像头
        // }
    }
}).then(function(stream){
    video = document.querySelector('video')
    console.log(stream,'stream');
    if ("srcObject" in video) {
        // 旧的浏览器可能没有srcObject
        video.srcObject = stream;
    }else{
        // 避免在新的浏览器中使用它 正在被弃用
        video.src = window.URL.createObjectURL(stream);
    }
    console.log(video);
    // 在视频的元数据加载后执行
    video.onloadedmetadata = function(e) {
        console.log(1111,'走通了');
        video.play();
    }
}).catch(function(err){
    console.log(err);
});

let btn = document.querySelector('button')
btn.addEventListener('click',takePhoto)
function takePhoto(){
    let date = new Date().getTime();
    // canvas画图
    context.drawImage(video,0,0,300,300);
    // 获取图片base64链接
    let image = canvas.toDataURL('image/png');
    // console.log(image,'image');
    let img = new Image();
    img.src = image;
    img.id = "imgBox"
    document.body.appendChild(img);
    // base64转文件
    function dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    // 文件下载
    function downloadFile(href, filename) {
        let a = document.createElement("a");
        a.download = filename;
        a.href = href;
        a.click();
    }
    
    // // 重置画布
    // context.clearRect(0,0,300,300);
    console.log(dataURLtoFile(image,date+'.png'));
    // 下载图片
    // downloadFile(dataURLtoFile(image,date+'.png'),date+'.png');
    downloadFile(image,date+'.png');
}

