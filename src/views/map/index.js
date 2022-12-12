// export function baiduMap() {
//   return new Promise(function (resolve, reject) {
//     window.baiduMap = function () {
//       resolve();
//     };

//     var script2 = document.createElement("script");
//     script2.type = "text/javascript";
//     script2.src = `http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js`;

//     var link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = `http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css`;

//     document.head.appendChild(link);
//     document.head.appendChild(script2);

//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = `http://api.map.baidu.com/api?v=3.0&ak=GUYmaNttVmVVXqNUOZbMFWaoK7i7pCWX&callback=baiduMap`;
//     script.onerror = reject;
//     document.head.appendChild(script);
//   });
// }
