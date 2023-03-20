<template>
  <div class="app-container">
    <div style="margin-bottom: 20px;">关于我</div>
    <el-input v-model="url" :disabled="isDisabled" placeholder="请输入网址..."></el-input>
    <el-button type="primary" style="margin-top: 20px;" @click="handleClick">{{ state ? '完成' : '编辑' }}</el-button>
  </div>
</template>

<script>
import { getUrl, setUrl } from '@/api/about'
export default {
  data() {
    return {
      url: "",
      isDisabled: true,
    }
  },
  async mounted() {
    const res = await getUrl()
    this.url = res.data
  },
  methods: {
    async handleClick() {
      this.isDisabled = !this.isDisabled
      if (this.isDisabled === true) {
        if (this.url === '') {
          this.$message.error('网址不能为空!')
          return
        }
        const res = await setUrl(this.url)
        this.$message.success('修改成功！')
      }
    }
  }
}
</script>

<style scoped></style>
