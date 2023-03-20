<template>
  <div class="app-container">
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
        <br />
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
        <el-button type="primary" @click="addProjectConfirm">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addOneProject } from '@/api/project'
import Upload from '@/components/UploadImg/index.vue'
export default {
  components: {
    Upload,
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        thumb: '',
        url: '',
        github: '',
        order: '',
      }
    }
  },
  methods: {
    handleClose() {

    },
    async addProjectConfirm() {
      const obj = { ...this.form }
      obj.order = parseInt(obj.order)
      obj.description = obj.description.split(',')
      const res = await addOneProject(obj)
      if (res.code === 0) {
        this.$message.success('添加成功！')
        this.$router.push('/project/projectList')
      } else {
        this.$message.error('出错啦！')
      }
    }
  }
}
</script>

<style scoped></style>
