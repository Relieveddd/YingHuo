<template>
  <div class="uploadMain">
    <el-upload
      drag
      action=""
      :auto-upload="false"
      :show-file-list="false"
      :before-upload="beforeUp"
      :on-change="change"
      :limit="1"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload_text">将文件拖到此处<em>点击上传</em></div>
    </el-upload>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="up(indexC)"
      >上传到服务器</el-button
    >
  </div>
</template>
<script>
import SparkMD5 from "spark-md5";
import axios from "axios";
export default {
  name: "upload",
  data() {
    return {
      fileCopy: null,
      size: 5 * 1024 * 1024,
      fileSize: "",
      chuckNum: "",
      md5: "",
      chuckArr: [],
      indexC: "",
    };
  },
  methods: {
    beforeUp() {
      // 获取切片的数量
      this.chuckNum = Math.ceil(this.fileSize / this.size);
      //获取文件md5
      this.getMd5();
    },
    change(file) {
      console.log(file);
      this.fileCopy = file.raw;
      this.fileSize = file.size;
      if (file <= this.size) {
        return;
      } else {
        this.beforeUp();
      }
    },
    getMd5() {
      var self = this;
      const sparkMD5 = new SparkMD5();
      for (let i = 0; i <= this.chuckNum; i++) {
        var reader = new FileReader();
        let park = self.fileCopy.slice(i * self.size, (i + 1) * self.size);
        self.chuckArr.push(park);
        // readAsArraybuffer     readAsText
        if (i == 0) {
          reader.readAsText(park);
          reader.onload = function (event) {
            self.str = event.target.result.slice(0, 1) + self.str;
            console.log(self.str);
          };
        }
        if (i == self.chuckNum - 1) {
          reader.readAsText(park);
          reader.onload = function (event) {
            // 获取第一篇和最后一片的首个字母进行加密
            self.str = event.target.result.slice(0, 1) + self.str;
            // console.log(self.str);
            // 计算md5
            sparkMD5.append(self.str);
            self.md5 = sparkMD5.end();
            console.log(self.md5);
            // self.checkUp(self.md5);
            self.checkMd5(self.md5);
          };
        }
      }
    },
    checkMd5(md5) {
      var self = this;
      axios
        .post("/api/file/fragment/checkFile", { fileMd5: md5 })
        .then((res) => {
          console.log(res);
          self.indexC = res.data.data.CurrIndex;
          self.up(self.indexC);
        });
    },
    up(index) {
      // 递归上传
      let Current = index - 1;
      var self = this;
      if (Current < this.chuckNum) {
        const fromData = new FormData();
        var fragmentDto = {
          type: "file",
          moduleCode: "locus",
          originFileName: self.fileCopy.name,
          fileMd5: self.md5,
          fragmentNum: this.chuckNum,
          CurrIndex: index,
          size: self.size,
        };
        fromData.append("file", this.chuckArr[Current]);
        fromData.append("fragmentDto", JSON.stringify(fragmentDto));
        axios
          .post("http://api_devs.wanxikeji.cn/api/admin/videoAddModify", {
            token: localStorage.getItem("token"),
            fromData,
          })
          .then((res) => {
            if (res.data.code == 0) {
              self.indexC++;
              self.up(self.indexC);
            }
          });
      } else {
        return;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.uploadMain {
  margin: 0 auto;
  margin-top: 20px;
  width: 300px;
  text-align: center;
}
</style>
