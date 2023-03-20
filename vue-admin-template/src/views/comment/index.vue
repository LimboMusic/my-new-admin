<template>
  <div class="app-container">
    <el-table :data="tableData" border v-loading="isloading" fit highlight-current-row>
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          {{ timeFormate(scope.row.createDate) }}
        </template>
      </el-table-column>
      <el-table-column label="文章名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.blog.title }}
        </template>
      </el-table-column>
      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <el-image :src="server_URL + scope.row.avatar">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template size="mini" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="removeComment(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next, total, ->,jumper, sizes" :total="totalCount"
      style="margin-top: 20px;" :page-size="eachPage" @size-change="sizeChangeHandler"
      :current-page.sync="pagerCurrentPage" @current-change="currentChangHanlder" @prev-click="prevClickHandler"
      @next-click="nextClickHandler" :page-sizes="[5, 10, 15]">
    </el-pagination>
  </div>
</template>

<script>
import { getComment, removeOneComment } from '@/api/comment'
import { timeFormate } from '@/utils/tools'
import { server_URL } from '@/urlConfig'
export default {
  data() {
    return {
      tableData: [],
      isloading: false,
      currentPage: 1,
      eachPage: 5,
      totalPage: 0,
      totalCount: 2,
      server_URL,
      pagerCurrentPage: 1
    }
  },
  methods: {
    timeFormate,
    async fetchData() {
      this.isloading = true
      const res = await getComment(this.currentPage, this.eachPage)
      console.log(res)
      this.totalCount = res.data.total
      this.totalPage = Math.ceil(this.totalCount / this.eachPage)
      this.tableData = res.data.rows
      this.isloading = false
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage
        const res = await this.getBlog(this.currentPage, this.eachPage)
        this.tableData = res.data.rows
      }
    },
    sizeChangeHandler() {
      this.pagerCurrentPage = 1
    },
    async currentChangHanlder(num) {
      this.currentPage = parseInt(num)
      await this.fetchData()
    },
    prevClickHandler() {
      this.currentPage--
    },
    nextClickHandler() {
      this.currentPage++
    },
    removeComment(comment) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '是否', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await removeOneComment(comment.id)
        if (res.data) {
          this.fetchData()
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
    }
  },
  async mounted() {
    await this.fetchData()
  }
}
</script>

<style scoped></style>
