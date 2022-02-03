<template>
  <el-row v-loading="loading">
    <el-col :span="24">
      <div style="text-align: left;">
        <el-button type="text" icon="el-icon-back" @click="goBack" style="padding-bottom: 0;">返回</el-button>
      </div>
    </el-col>
    <el-col :span="24">
      <div>
        <div><h3 style="margin-top: 0;margin-bottom: 0">{{ title }}</h3></div>
        <div style="width: 100%;margin-top: 5px;display: flex;justify-content: flex-end;align-items: center">
          <span
              style="color: #20a0ff;margin-right:20px;font-size: 16px;">排名: {{ rank == null ? 0 : rank }}
          </span>
          <span
              style="color: #20a0ff;margin-right:20px;font-size: 16px;">热度: {{ hotValve == null ? 0 : hotValve }}
          </span>
          <span
              style="color: #20a0ff;margin-right:20px;font-size: 16px;">时间: {{ mapList[0].value }}
          </span>
          <span style="margin:0 50px 0 0">

          </span>
        </div>
      </div>
    </el-col>
    <el-col>
    </el-col>
  </el-row>
</template>
<script>

export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted: function () {

    var douYinDetail = this.$route.query.data;
    this.activeName = this.$route.query.activeName;
    var _this = this;
    this.loading = true;
    _this.title = douYinDetail.title;
    _this.hotValve = douYinDetail.value;
    _this.mapList = douYinDetail.map_list;
    _this.rank = douYinDetail.rank;
    _this.videoList = douYinDetail.extra_list;
    debugger;
    /*      getRequest("/douYinDetail/" + aid).then(resp=> {
            if (resp.status == 200) {
              _this.douYinDetail = resp.data;
            }
            _this.loading = false;
          }, resp=> {
            _this.loading = false;
            _this.$message({type: 'error', message: '页面加载失败!'});
          });*/
    this.loading = false;
  },
  data() {
    return {
      douYinDetail: {},
      mapList: [],
      videoList: [],
      loading: false,
      activeName: '',
      title: '',
      hotValve: '',
      rank: '',
    }
  }
}
</script>
