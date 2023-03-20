<template>
  <div class="app-container">
    <el-table v-loading="isLoading" border :data="tableData" element-loading-text="加载数据中..." fit highlight-current-row>
      <el-table-column width="80" align="center" label="序号">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column width="240" align="center" label="项目名称">
        <template slot-scope="scope">
          <a target="_blank" :href="scope.row.url">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column width="345" align="center" label="项目描述">
        <template slot-scope="scope">
          {{ scope.row.description.join(' ') }}
        </template>
      </el-table-column>
      <el-table-column width="240" align="center" label="预览图">
        <template slot-scope="scope">
          <el-image :src="server_URL + scope.row.thumb" width="120" fit="fill" :preview-src-list="imgSrc">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column width="240" align="center" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="github" placement="top">
            <el-button class="iconfont icon-github" type="info" circle @click="gotoGithub(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click="editProject(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="removeProject(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" fullscreen>
      <el-form :data="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述(每一项描述以英文逗号分隔)">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="github">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <el-form-item label="预览图">
          <Upload v-model="form.thumb"></Upload>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option value="1" label="1"></el-option>
            <el-option value="2" label="2"></el-option>
            <el-option value="3" label="3"></el-option>
            <el-option value="4" label="4"></el-option>
            <el-option value="5" label="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editProjectConfirm">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAllProject, removeOneProject, updateOneProject, addOneProject } from '@/api/project'
import { server_URL } from '@/urlConfig'
import Upload from '@/components/UploadImg/index.vue'
export default {
  components: {
    Upload,
  },
  data() {
    return {
      tableData: [],
      isLoading: false,
      server_URL,
      imgSrc: [],
      dialogVisible: false,
      form: {
        name: '',
        description: [],
        url: '',
        github: '',
        thumb: '',
        order: '',
      },
    }
  },
  async mounted() {
    await this.fetchProject()
  },
  methods: {
    async fetchProject() {
      this.isLoading = true
      const res = await getAllProject()
      console.log(res)
      this.tableData = res.data
      this.imgSrc = this.tableData.map(item => server_URL + item.thumb)
      this.isLoading = false
    },
    editProject(project) {
      this.dialogVisible = true
      this.form = { ...project }
      this.form.description = this.form.description.join(',')
      console.log(this.form)
    },
    removeProject(project) {
      this.$confirm('确定要删除此项目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await removeOneProject(project.id)
        console.log(res)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetchProject()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    gotoGithub(project) {

    },
    handleClose() {

    },
    async editProjectConfirm() {
      const projectObj = { ...this.form }
      projectObj.description = projectObj.description.split(',')
      projectObj.order = parseInt(projectObj.order)
      const res = await updateOneProject({ id: projectObj.id, data: projectObj })
      console.log(res)
      if (res.code === 0) {
        this.fetchProject()
        this.dialogVisible = false
        this.$message.success('修改成功！')
      } else {
        this.$message.error('修改错误！')
      }
    }
  }
}
</script>

<style scoped>
a:hover {
  color: rgb(163, 163, 163)
}
</style>
