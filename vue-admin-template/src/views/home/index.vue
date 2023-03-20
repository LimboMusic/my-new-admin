<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px; " :src="server_URL + scope.row.midImg" fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px; " :src="server_URL + scope.row.bigImg" fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template size="mini" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <Upload v-model="form.midImg"></Upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页大图">
              <Upload v-model="form.bigImg"></Upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from '@/api/banner'
import { Scope } from '@babel/traverse'
import { server_URL } from '@/urlConfig'
import Upload from '@/components/UploadImg/index.vue'
export default {
  components: {
    Upload,
  },
  data() {
    return {
      tableData: [],
      server_URL,
      dialogFormVisible: false,
      form: {
        title: '',
        id: '',
        midImg: '',
        bigImg: '',
        description: ''
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getBanner().then(res => {
        console.log(res)
        this.tableData = res.data
      })
    },
    handleEdit(row) {
      // console.log(row)
      this.dialogFormVisible = true,
        this.form = { ...row }
    },
    editBannerConfirm() {
      // console.log('111')
      let arr = [...this.tableData]
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form
        }
      }
      setBanner(arr).then(res => {
        this.dialogFormVisible = false
        this.$message({
          type: "success",
          message: "更改成功！"
        })
        this.tableData = res.data
      })
    }
  }
}
</script>

<style scoped></style>
