<template>
  <div class="files_list">
    <div style="display: flex;justify-content: flex-start; margin-top: 10px;">
      <el-col span="8">
        <el-col span="8">
          文件名：
        </el-col>
        <el-input
            maxlength=50
            v-model="fileName"
            placeholder="支持模糊查询"
            clearable=true
            style="width: 150px"
            size="mini">
        </el-input>
      </el-col>

      <el-col span="8">
        <el-col span="8">
          归属用户：
        </el-col>
        <el-input
            maxlength=50
            v-model="attrUser"
            placeholder="请输入作者"
            clearable=true
            style="width: 150px"
            size="mini">
        </el-input>
      </el-col>

      <el-col span="8">
        <el-col span="8">
          归属分类：
        </el-col>
        <el-select
            v-model="categoryId"
            clearable=true
            style="width: 150px"
            size="mini">
          <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.cateName"
              :value="item.id">
          </el-option>
        </el-select>
      </el-col>

      <el-col span="8"></el-col>
    </div>

    <div style="display: flex;justify-content: flex-start; margin-top: 10px;">
      <el-col span="8">
        <el-col span="8">
          上传时间范围：
        </el-col>
        <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="uploadTimeStart"
            clearable=true
            placeholder="开始时间"
            style="width: 150px"
            size="mini">
        </el-date-picker>
        <span>-</span>
        <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="uploadTimeEnd"
            clearable=true
            placeholder="结束时间"
            style="width: 150px"
            size="mini">
        </el-date-picker>
      </el-col>

      <el-col span="8">
        <el-col span="8">
          修改时间范围：
        </el-col>
        <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="editTimeStart"
            clearable=true
            placeholder="开始时间"
            style="width: 150px"
            size="mini">
        </el-date-picker>
        <span>-</span>
        <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="editTimeEnd"
            clearable=true
            placeholder="结束时间"
            style="width: 150px"
            size="mini">
        </el-date-picker>
      </el-col>

      <el-col span="8" align="right">
        <el-button
            type="primary"
            size="small"
            style="margin-left: 10px"
            @click="searchClick">
          搜索
        </el-button>
        <el-button
            type="info"
            size="small"
            style="margin-left: 10px"
            @click="resetParam">
          重置
        </el-button>
      </el-col>
    </div>
    <div style="width: 100%;height: 1px;background-color: #20a0ff;margin-top: 8px;margin-bottom: 0px"></div>
    <el-table
        ref="multipleTable"
        :data="filesInfoList"
        tooltip-effect="dark"
        style="width: 100%;overflow-x: hidden; overflow-y: hidden;"
        height="600"
        @selection-change="handleSelectionChange"
        v-loading="loading">
      <el-table-column
          type="selection"
          width="35"
          align="left"
      >
      </el-table-column>
      <el-table-column
          label="文件名"
          width="150"
          align="left">
        <template slot-scope="scope">
          <span style="color: #409eff;cursor: pointer" @click="itemClick(scope.row)">
            {{ scope.row.fileName }}
          </span>
          <!-- <p>{{ scope.row.summary + "..."}}</p>-->
        </template>
      </el-table-column>
      <el-table-column
          prop="fileType"
          label="文件类型"
          width="100"
          align="left">
      </el-table-column>
      <el-table-column
          prop="fileSize"
          label="文件大小"
          width="100"
          align="left">
      </el-table-column>
      <el-table-column
          label="上传时间"
          width="150"
          align="left">
        <template slot-scope="scope">
          {{ scope.row.uploadTime | formatDateTime }}
        </template>
      </el-table-column>
      <el-table-column
          label="修改时间"
          width="150"
          align="left">
        <template slot-scope="scope">
          {{ scope.row.editTime | formatDateTime }}
        </template>
      </el-table-column>
      <el-table-column
          prop="attrUser"
          label="归属用户"
          width="120"
          align="left">
      </el-table-column>
      <el-table-column
          prop="categoryName"
          label="所属分类"
          width="120" align="left">
      </el-table-column>
      <el-table-column
          prop="downloadTimes"
          label="下载次数"
          width="80" align="left">
      </el-table-column>
      <el-table-column
          label="操作"
          align="left"
          width="120">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">
            重新上传
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click="handleDownload(scope.$index, scope.row)">
            下载
          </el-button>
          <el-button
              size="mini"
              type="info"
              @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="blog_table_footer">
      <el-button
          type="danger"
          size="mini"
          style="margin: 0;"
          v-show="this.filesInfoList.length>0"
          :disabled="this.selItems.length==0"
          @click="deleteMany">
        批量删除
      </el-button>
      <el-button
          type="info"
          size="mini"
          style="margin: 0;"
          v-show="this.filesInfoList.length>0"
          :disabled="this.selItems.length==0"
          @click="deleteMany">
        批量下载
      </el-button>
      <span></span>
      <el-pagination
          background
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes"
          :total="totalCount"
          @current-change="currentChange"
          @size-change="pageSizeChange"
          v-show="this.filesInfoList.length>0">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {postRequest, putRequest} from '../utils/api'
import {getRequest} from '../utils/api'
import {isEmpty} from "../utils/utils";

export default {
  data() {
    return {
      filesInfoList: [],
      selItems: [],
      loading: false,
      currentPage: 1,
      totalCount: -1,
      pageSize: 10,
      keywords: '',
      dustbinData: [],
      categories: [],
      fileName: '',
      fileType: '',
      fileSize: '',
      filePtah: '',
      uploadTime: '',
      editTime: '',
      attrUser: '',
      categoryId: '',
      categoryName: '',
      downloadTimes: 0,
      state: '',
      uploadTimeStart: '',
      uploadTimeEnd: '',
      editTimeStart: '',
      editTimeEnd: ''
    }
  },
  mounted: function () {
    var _this = this;
    this.loading = true;
    this.getCategories();
    this.loadFilesInfoList(1, this.pageSize);
    var _this = this;
    window.bus.$on('blogTableReload', function () {
      _this.loading = true;
      _this.loadFilesInfoList(_this.currentPage, _this.pageSize);
    })
  },

  methods: {

    getCategories() {
      let _this = this;
      getRequest("/admin/category/all").then(resp => {
        _this.categories = resp.data;
      });
    },

    searchClick() {
      this.loadFilesInfoList(1, this.pageSize);
    },

    resetParam() {
      this.fileName = '';
      this.main_code = '';
      this.uploadTimeStart = '';
      this.uploadTimeEnd = '';
      this.editTimeStart = '';
      this.editTimeEnd = '';
      this.fileType = '';
      this.attrUser = '';
    },

    itemClick(row) {
      this.$router.push({path: '/blogDetail', query: {aid: row.id}})
    },

    deleteMany() {
      var selItems = this.selItems;
      for (var i = 0; i < selItems.length; i++) {
        this.dustbinData.push(selItems[i].id)
      }
      this.deleteToDustBin(selItems[0].state)
    },

    //翻页
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.loadFilesInfoList(currentPage, this.pageSize);
    },

    // x条/页
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadFilesInfoList(1, this.pageSize);
    },

    loadFilesInfoList(pageNum, pageSize) {
      var _this = this;
      _this.loading = true;
      debugger;
      // null问题
      var start = this.uploadTimeStart == null ? "" : this.uploadTimeStart;
      var end = this.uploadTimeEnd == null ? "" : this.uploadTimeEnd;
      var editTimeStart = this.editTimeStart == null ? "" : this.editTimeStart;
      var editTimeEnd = this.editTimeEnd == null ? "" : this.editTimeEnd;
      var state = isEmpty(this.state) ? "" : this.state;
      var param = {
        fileName: this.fileName,
        fileType: this.fileType,
        attrUser: this.attrUser,
        categoryId: this.categoryId,
        uploadTimeStart: start,
        uploadTimeEnd: end,
        editTimeStart: editTimeStart,
        editTimeEnd: editTimeEnd,
        state: state,
        pageNum: pageNum,
        pageSize: pageSize
      };
      var url = '';
      if (state == -2) {
        url = "/admin/filesController/all"
      } else {
        url = "/filesController/queryFilesInfo"
      }

      postRequest(url, param).then(resp => {
        _this.loading = false;
        if (resp.status == 200) {
          _this.filesInfoList = resp.data.filesInfoList;
          _this.totalCount = resp.data.totalCount;
        } else {
          _this.$message({type: 'error', message: '数据加载失败!'});
        }
      }, resp => {
        _this.loading = false;
        if (resp.response.status == 403) {
          _this.$message({type: 'error', message: resp.response.data});
        } else {
          _this.$message({type: 'error', message: '数据加载失败!'});
        }
      }).catch(resp => {
        console.log("load error... " + resp);
        //压根没见到服务器
        _this.loading = false;
        _this.$message({type: 'error', message: '数据加载失败!'});
      })
    },

    handleSelectionChange(val) {
      this.selItems = val;
    },

    handleEdit(index, row) {
      this.$router.push({path: '/editBlog', query: {from: this.activeName, id: row.id}});
    },

    handleDelete(index, row) {
      this.dustbinData.push(row.id);
      this.deleteToDustBin(row.state);
    },

    handleRestore(index, row) {
      let _this = this;
      this.$confirm('将该文件还原到原处，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.loading = true;
        putRequest('/article/restore', {articleId: row.id}).then(resp => {
          if (resp.status == 200) {
            var data = resp.data;
            _this.$message({type: data.status, message: data.msg});
            if (data.status == 'success') {
              window.bus.$emit('blogTableReload')//通过选项卡都重新加载数据
            }
          } else {
            _this.$message({type: 'error', message: '还原失败!'});
          }
          _this.loading = false;
        });
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消还原'
        });
      });
    },

    handleShowLogDetail(index, row) {
      this.itemClick(row);
    },

    // 批量下载
    handleBatchDownload() {
      var selItems = this.selItems;
      var param = '';
      for (var i = 0; i < selItems.length; i++) {
        var interfaceInfo = selItems[i];
        var uuid = interfaceInfo.uuid + ',';
        param += uuid;
      }
      this.downloadFiles(param);
    },

    // 下载一个
    handleDownload(index, row) {
      this.downloadFiles(row.fileId);
    },

    downloadFiles(param) {
      let _this = this;
      this.$confirm('将该文件下载到本地，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        _this.loading = true;
        debugger;
        console.log("........................." + param);
        // 方法一
        window.location.href = '/filesController/downloadFiles?paramListString=' + param;
        _this.loading = false;
        _this.$message({type: 'success', message: "请求成功！若文件未下载请稍后再试！"});
      }).catch(() => {
        _this.loading = false;
        _this.$message({
          type: 'info',
          message: '已取消下载'
        });
      });
    },

    deleteToDustBin(state) {
      var _this = this;
      this.$confirm(state != 2 ? '将该文件放入回收站，是否继续?' : '永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.loading = true;
        var url = '';
        if (_this.state == -2) {
          url = "/admin/article/dustbin";
        } else {
          url = "/article/dustbin";
        }
        putRequest(url, {aids: _this.dustbinData, state: state}).then(resp => {
          if (resp.status == 200) {
            var data = resp.data;
            _this.$message({type: data.status, message: data.msg});
            if (data.status == 'success') {
              window.bus.$emit('blogTableReload')//通过选项卡都重新加载数据
            }
          } else {
            _this.$message({type: 'error', message: '删除失败!'});
          }
          _this.loading = false;
          _this.dustbinData = []
        }, resp => {
          _this.loading = false;
          _this.$message({type: 'error', message: '删除失败!'});
          _this.dustbinData = []
        });
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        });
        _this.dustbinData = []
      });
    }
  },
  props: ['state', 'showEdit', 'showDelete', 'activeName', 'showRestore']
}
</script>

<style type="text/css">
.files_list {
  margin-top: 20px;
}

.blog_table_footer {
  display: flex;
  box-sizing: content-box;
  padding-top: 10px;
  padding-bottom: 0;
  margin-bottom: 0;
  justify-content: space-between;
}
</style>