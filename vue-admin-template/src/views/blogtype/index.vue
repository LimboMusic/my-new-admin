<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-input placeholder="想要添加的文章类型，左侧选择等级" v-model="inputData" class="input-with-select" style="width: 400px;">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="addBlogTypeHandle">添加</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" border v-loading="isloading">
      <el-table-column prop="date" label="序号" width="165" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="文章名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="文章数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.articleCount }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template size="mini" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEditBlogType(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleRemoveBlogType(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑文章类型" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="类型名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型等级">
          <el-select v-model="form.order" placeholder="请选择">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditBlogType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBlogType, addBlogType, removeBlogType,updateBlogType } from '@/api/blogType'
export default {
  data() {
    return {
      inputData: "",
      select: "1",
      tableData: [],
      isloading: false,
      dialogFormVisible: false,
      form: {
        name:'',
        order:1
      },
    }
  },
  async mounted() {
    await this.fetchBlogType()
  },
  methods: {
    async fetchBlogType() {
      this.isloading = true
      const res = await getBlogType()
      this.tableData = res.data
      this.isloading = false
      // console.log(res)
    },
    handleEditBlogType(blogType) {
      this.form = blogType
      this.dialogFormVisible = true
    },
    async handleRemoveBlogType(row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该文章类型, 是否继续?', '是否', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await removeBlogType(row.id)
        if (res.code === 0) {
          this.$message.success('删除成功！')
          this.fetchBlogType()
        } else {
          this.$message.error('删除失败！')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    addBlogTypeHandle() {
      if (!this.inputData) {
        this.$message.error('文章类型不能为空！')
      } else {
        console.log(this.inputData, this.select)
        addBlogType(this.inputData, this.select).then(async (res) => {
          if (res.data.id) {
            this.$message.success('添加成功！')
            await this.fetchBlogType()
          }
        })
      }
    },
    async confirmEditBlogType() {
      this.dialogFormVisible = false
      const res = await updateBlogType(this.form.id,this.form.name,this.form.order)
      if(res.data){
        this.fetchBlogType()
      } else{
        this.$message.error('修改失败！')
      }
    }
  }
}
</script>

<style scoped></style>
