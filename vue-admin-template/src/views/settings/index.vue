<template>
  <div class="app-container">
    <el-form>
      <div class="block">网站信息</div>
      <el-form-item label="网站标题">
        <br>
        <el-input disabled v-model="form.siteTitle" style="width: 700px;" />
      </el-form-item>
      <el-form-item label="邮箱">
        <br>
        <el-input disabled v-model="form.mail" style="width: 700px;" />
      </el-form-item>
      <el-form-item label="备案号">
        <br>
        <el-input disabled v-model="form.icp" style="width: 700px;" />
      </el-form-item>
      <el-form-item label="网站头像预览">
        <br>
        <el-image :src="form.avatar" style="width: 100px;" fit="fill">
        </el-image>
      </el-form-item>
      <el-divider></el-divider>
      <div class="block">网站图标信息</div>
      <el-form-item label="网址图标地址">
        <br>
        <el-input placeholder="请输入图片地址" v-model="form.favicon" style="width: 700px;" disabled></el-input>
      </el-form-item>
      <el-form-item label="网站图标预览">
        <br>
        <el-image :src="form.favicon" style="width: 100px;" fit="fill"></el-image>
      </el-form-item>
      <el-divider></el-divider>
      <div class="block">qq信息</div>
      <el-form-item label="qq账号">
        <br>
        <el-input placeholder="请输入qq账号" v-model="form.qq" style="width: 700px;" disabled></el-input>
      </el-form-item>
      <el-form-item label="qq头像预览">
        <br>
        <el-image :src="form.qqQrcode" style="width: 100px;" fit="fill"></el-image>
      </el-form-item>
      <el-divider></el-divider>
      <div class="block">github信息</div>
      <el-form-item label="github地址">
        <br>
        <el-input placeholder="请输入github地址" v-model="form.github" style="width: 700px;" disabled></el-input>
      </el-form-item>
      <el-form-item label="github名称">
        <br>
        <el-input placeholder="请输入github名称" v-model="form.githubName" style="width: 700px;" disabled></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <div class="block">微信信息</div>
      <el-form-item label="微信号">
        <br>
        <el-input v-model="form.weixin" style="width: 700px;" disabled></el-input>
      </el-form-item>
      <el-form-item label="微信二维码图片预览">
        <br>
        <el-image :src="form.weixinQrcode" style="width: 100px;" fit="fill"></el-image>
      </el-form-item>
      <el-divider></el-divider>
      <el-button type="primary" @click="goEdit">进入编辑</el-button>
    </el-form>



    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" fullscreen>
      <el-form>
        <el-form-item label="网站标题">
          <br>
          <el-input v-model="form2.siteTitle" />
        </el-form-item>
        <el-form-item label="邮箱">
          <br>
          <el-input v-model="form2.mail" />
        </el-form-item>
        <el-form-item label="备案号">
          <br>
          <el-input v-model="form2.icp" />
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="网址图标地址">
          <br>
          <el-input placeholder="请输入图片地址" v-model="form2.favicon"></el-input>
        </el-form-item>
        <el-form-item label="网址头像地址">
          <br>
          <Upload v-model="form2.favicon"></Upload>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="微信号">
          <br>
          <el-input v-model="form2.weixin"></el-input>
        </el-form-item>
        <el-form-item label="微信二维码图片地址">
          <br>
          <Upload v-model="form2.weixinQrCode"></Upload>
        </el-form-item>
        <el-form-item label="qq账号">
          <br>
          <el-input placeholder="请输入qq账号" v-model="form2.qq"></el-input>
        </el-form-item>
        <el-form-item label="QQ二维码图片地址">
          <br>
          <Upload v-model="form2.qqQrCode"></Upload>
        </el-form-item>
        <el-form-item label="github地址">
          <br>
          <el-input placeholder="请输入github地址" v-model="form2.github"></el-input>
        </el-form-item>
        <el-form-item label="github名称">
          <br>
          <el-input placeholder="请输入github名称" v-model="form2.githubName"></el-input>
        </el-form-item>
        <el-button type="primary" @click="confirmEdit">确认编辑</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getSettings,setSettings } from '@/api/settings'
import { server_URL } from '@/urlConfig'
import Upload from '@/components/UploadImg/index'
export default {
  components: {
    Upload
  },
  data() {
    return {
      server_URL,
      form: {
        siteTitle: '',
        mail: '',
        icp: '',
        avatar: '',
        favicon: '',
      },
      dialogFormVisible: false,
      form2: {
        siteTitle: '',
        mail: '',
        icp: '',
        avatar: '',
        favicon: '',
      },
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    goEdit() {
      this.dialogFormVisible = true
      this.form2 = { ...this.form }
    },
    async fetchData() {
      const res = await getSettings()
      this.form = res.data
      console.log(res.data,'data')
      this.form.avatar = server_URL + this.form.avatar
      this.form.favicon = server_URL + this.form.favicon
      console.log(this.form)
    },
    async confirmEdit() {
      this.dialogFormVisible = false
      await setSettings(this.form2)
      this.$message.success('修改成功！')
      this.fetchData()
    }
  }
}
</script>

<style scoped lang="scss">
.block {
  margin-bottom: 30px;
  font-weight: 300;
}
</style>
