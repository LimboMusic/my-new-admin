<template>
    <div class="app-container">
        <el-form :mode="userInfo" :rules="setRules" ref="form">
            <el-form-item label="用户名" prop="name">
                <el-input placeholder="请输入用户名" style="width: 400px;" v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldLoginPwd">
                <el-input placeholder="请输入旧密码" type="password" style="width: 400px;"
                    v-model="userInfo.oldLoginPwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newLoginPwd">
                <el-input placeholder="请输入新密码" type="password" style="width: 400px;"
                    v-model="userInfo.newLoginPwd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmNewLoginPwd">
                <el-input placeholder="请确认新密码" type="password" style="width: 400px;"
                    v-model="userInfo.confirmNewLoginPwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleClick">确认修改</el-button>
                <el-button type="danger" @click="handleBack">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getUserInfo, setUser } from '@/api/user'
export default {
    data() {
        const validator1 = (rule, value, callback) => {
            if (value === null) {
                callback(new Error('密码不能为空'))
            } else if (value !== this.userInfo.newLoginPwd) {
                callback(new Error('两次密码输入不一致！'))
            } else {
                callback()
            }
        }
        return {
            userInfo: {
                name: "",
                oldLoginPwd: "",
                newLoginPwd: "",
                confirmNewLoginPwd: "",
                loginId: "",
                id: ""
            },
            setRules: {
                confirmNewLoginPwd: [
                    { validator: validator1, trigger: 'blur' }
                ],
            }
        }
    },
    async mounted() {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo.id = res.data.id
        this.userInfo.loginId = res.data.loginId
        this.userInfo.name = res.data.name
    },
    methods: {
        handleBack(){
            this.$router.push('/')
        },
        async handleClick() {
            const obj = {
                name: this.userInfo.name,
                loginId: this.userInfo.loginId,
                loginPwd: this.userInfo.newLoginPwd,
                oldLoginPwd: this.userInfo.oldLoginPwd,
                confirmLoginPwd: this.userInfo.confirmNewLoginPwd
            }
            if (obj.oldLoginPwd && obj.loginPwd && obj.confirmLoginPwd) {
                const res = await setUser(obj)
                if (typeof res === 'string') {
                    this.$message.error(JSON.parse(res).msg)
                } else {
                    this.$message.success('修改成功！')
                    this.$store.dispatch('user/logout').then(res => {
                        this.$router.push('/login?redirect=' + this.$route.fullPath)
                    })
                }
            } else {
                this.$message.error('请填写所有项目')
            }
        }
    }

}
</script>

<style scoped></style>