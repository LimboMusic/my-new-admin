<template>
    <div>
        <div class="title">
            {{ uploadTitle }}
        </div>
        <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false" :headers="headers"
            :on-success="handleAvatarSuccess">
            <img v-if="value" :src="imgSrc" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import { server_URL } from '@/urlConfig'
export default {
    name: 'Upload',
    props: ['uploadTitle', 'value'],
    computed: {
        imgSrc() {
            if (this.value) {
                return server_URL + this.value
            }
        },
        headers() {
            return {
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }
    },
    data() {
        return {
        }
    },
    methods: {
        handleAvatarSuccess(res) {
            if (res.code === 0 && res.data) {
                this.$emit('input', res.data)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.title {
    margin: 15px 0;
}

.avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>