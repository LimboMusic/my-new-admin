<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%" border v-loading="isloading">
      <el-table-column prop="date" label="序号" width="165" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (currentPage - 1) * eachPage }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="文章名称" width="180" align="center">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="文章图片" width="200" trigger="hover">
            <el-image style="width: 180px" :src="server_URL + scope.row.thumb" fit="fill"
              :preview-src-list="imgArr"></el-image>
            <a href="#" target="_blank" slot="reference" @click.prevent="goToBlog(scope.row.id)">{{ scope.row.title }}</a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="文章描述" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="浏览数" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.scanNumber }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="评论量" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.commentNumber }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="所属分类" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.category === null ? '未分类' : scope.row.category.name }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="创建日期" width="200" align="center">
        <template slot-scope="scope">
          {{ timeFormate(scope.row.createDate) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template size="mini" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="removeBlog(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next, total, jumper, sizes" :total="totalCount"
      style="margin-top: 20px;" :page-size="eachPage" @size-change="sizeChangeHandler"
      @current-change="currentChangHanlder" @prev-click="prevClickHandler" @next-click="nextClickHandler"
      :page-sizes="[5, 10, 15]">
    </el-pagination>
  </div>
</template>

<script>
import { getBlog, removeOneBlog } from '@/api/blog'
import { timeFormate } from '@/utils/tools'
import { server_URL, frontEnd_URL } from '@/urlConfig'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      imgArr: [],
      server_URL,
      frontEnd_URL,
      currentPage: 1,
      eachPage: 6,
      totalPage: 0,
      totalCount: 0,
      isloading: false,
    }
  },
  async mounted() {
    await this.fetchBlogData()
  },
  methods: {
    getBlog,
    timeFormate,
    removeOneBlog,
    async fetchBlogData() {
      this.isloading = true
      const res = await this.getBlog(this.currentPage, this.eachPage)
      this.tableData = res.data.rows
      this.totalCount = res.data.total
      this.totalPage = Math.ceil(this.totalCount / this.eachPage)
      this.imgArr = this.tableData.map(item => this.server_URL + item.thumb)
      this.isloading = false
      //当删除最后一页的最后一条数据后，当前页数可能会大于总页数
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage
        const res = await this.getBlog(this.currentPage, this.eachPage)
        this.tableData = res.data.rows
      }
    },
    goToBlog(id) {
      window.open(`${frontEnd_URL}article/${id}`)
    },
    async removeBlog(blog) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '是否', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.removeOneBlog(blog.id)
        if (res.data) {
          this.fetchBlogData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    sizeChangeHandler(num) {
      this.currentPage = 1
      this.eachPage = parseInt(num)
      this.fetchBlogData()
    },
    prevClickHandler() {
      this.currentPage--
    },
    nextClickHandler() {
      this.currentPage++
    },
    async currentChangHanlder(number) {
      this.isloading = true
      this.currentPage = parseInt(number)
      await this.fetchBlogData()
    },
    handleEdit(blog) {
      this.$router.push('/blog/editBlog/' + blog.id)
    }
  }
}
</script>

<style scoped></style>
