<template>
  <el-dialog title="门店地图分布" v-model="open" width="70%" draggable>
    <div id="map" :style="{ height: mapHeight }">
      <div id="allmap" ref="allmap"></div>
    </div>
  </el-dialog>
</template>
<script setup name="BaiduMap">
import { nextTick } from "vue";

const mapHeight = ref("70vh");
const open = ref(false);
const allmap = ref(null);

function map(id) {
  open.value = true;
  getLineShopMap(id).then((res) => {
    var markerArr = [];
    var data = res.data;
    for (var i = 0; i < data.length; i++) {
      var point = data[i].lng + "," + data[i].lat;
      var shop =
        '{ title: "' +
        data[i].shopname +
        '",areaname: "' +
        data[i].name +
        '", point: "' +
        point +
        '", receiver: "' +
        data[i].receiver +
        '", mobile: "' +
        data[i].mobile +
        '" }';
      var shopobj = eval("(" + shop + ")");
      markerArr.push(shopobj);
    }
    nextTick((res) => {
      baiduMap().then((thatMap) => {
        // 创建地图实例
        var map = new BMap.Map("map");
        var point = new BMap.Point(113.312213, 23.147267); //地图中心点，广州市
        map.centerAndZoom(point, 13); // 初始化地图,设置中心点坐标和地图级别。
        map.enableScrollWheelZoom(true); //启用滚轮放大缩小
        //地图、卫星、混合模式切换
        map.addControl(
          new BMap.MapTypeControl({
            mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP],
          })
        );
        //向地图中添加缩放控件
        var ctrlNav = new window.BMap.NavigationControl({
          anchor: BMAP_ANCHOR_TOP_LEFT,
          type: BMAP_NAVIGATION_CONTROL_LARGE,
        });
        map.addControl(ctrlNav);
        //向地图中添加缩略图控件
        var ctrlOve = new window.BMap.OverviewMapControl({
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
          isOpen: 1,
        });
        map.addControl(ctrlOve);
        //向地图中添加比例尺控件
        var ctrlSca = new window.BMap.ScaleControl({
          anchor: BMAP_ANCHOR_BOTTOM_LEFT,
        });
        map.addControl(ctrlSca);

        var point = new Array(); //存放标注点经纬信息的数组
        var marker = new Array(); //存放标注点对象的数组
        var info = new Array(); //存放提示信息窗口对象的数组
        var searchInfoWindow = new Array(); //存放检索信息窗口对象的数组

        for (var i = 0; i < markerArr.length; i++) {
          var p0 = markerArr[i].point.split(",")[0]; //
          var p1 = markerArr[i].point.split(",")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来
          point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点
          marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记
          map.addOverlay(marker[i]);
          marker[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
          //显示marker的title，marker多的话可以注释掉
          var label = new window.BMap.Label(markerArr[i].title, {
            offset: new window.BMap.Size(20, -10),
          });
          marker[i].setLabel(label);
          // 创建信息窗口对象  receiver: "'+data[i].receiver+'", mobile:
          info[i] =
            "<p style='font-size:14px;line-height:20px'>" +
            "</br>门店名称：" +
            markerArr[i].title +
            "</br>所在区域：" +
            markerArr[i].areaname +
            "</br>接收人：" +
            markerArr[i].receiver +
            "</br> 门店电话：" +
            markerArr[i].mobile +
            "</br></p>";
          //创建百度样式检索信息窗口对象
          searchInfoWindow[i] = new BMapLib.SearchInfoWindow(map, info[i], {
            title: markerArr[i].title, //标题
            width: 290, //宽度
            // height : 40,              //高度
            panel: "panel", //检索结果面板
            enableAutoPan: true, //自动平移
            searchTypes: [
              BMAPLIB_TAB_SEARCH, //周边检索
              //    BMAPLIB_TAB_TO_HERE,  //到这里去
              //   BMAPLIB_TAB_FROM_HERE //从这里出发
            ],
          });

          //添加点击事件
          marker[i].addEventListener(
            "click",
            (function (k) {
              // js 闭包
              return function () {
                //将被点击marker置为中心
                // map.centerAndZoom(point[k], 13);
                // console.log(searchInfoWindow[k])
                //在marker上打开检索信息窗口
                searchInfoWindow[k].open(marker[k]);
              };
            })(i)
          );
        }
      });
    });
  });
}

defineExpose({
  map,
  BaiduMap,
});
</script>
<style>
#allmap {
  height: 100%;
  overflow: hidden;
}
</style>
