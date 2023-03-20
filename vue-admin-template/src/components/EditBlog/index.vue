<template>
    <div>
        <el-form>
            <el-form-item>
                <div class="title">文章标题</div>
                <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="edit">文章编辑</div>
                <Editor :initialValue="form.editorText" height="550px" ref="toastuiEditor" :options="editorOptions">
                </Editor>
            </el-form-item>
            <el-form-item>
                <div class="desc">文章描述</div>
                <el-input type="textarea" v-model="form.description" :rows="7"></el-input>
            </el-form-item>
            <el-form-item>
                <Upload v-model="form.thumb" uploadTitle="文章头图"></Upload>
            </el-form-item>
            <el-form-item>
                <div class="desc">文章类型</div>
                <el-select v-model="form.select" placeholder="请选择">
                    <el-option :label="item.name" :value="item.id" v-for="item in blogType" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.prevent="handeSubmit">{{ mode === 'edit' ? '提交修改' : '添加文章' }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import Upload from '@/components/UploadImg/index.vue'
import { getBlogType } from '@/api/blogType'
import { addBlog, editBlog, findOneBlog } from "@/api/blog"
import '@toast-ui/editor/dist/i18n/zh-cn'

export default {
    props: ["mode"],
    data() {
        return {
            form: {
                title: "",
                editorText: '',//用户编辑的内容
                description: "",//文章描述
                thumb: '',
                select: "",
            },
            blogType: [],
            editorOptions: {
                language: 'zh-CN'
            },
            blogId: null,
        }
    },
    async mounted() {
        this.fetchBlogType()
        if (this.mode === 'edit') {
            this.blogId = this.$route.params.id
            this.fetchBlogInfo()
        }
    },
    components: {
        Editor,
        Upload,
    },
    methods: {
        async fetchBlogInfo() {
            const res = await findOneBlog(this.blogId)
            if (typeof res === 'string') {
                return
            }
            this.form = res.data
            this.form.select = res.data.category ? res.data.category.id : ''
            this.$refs.toastuiEditor.invoke('setHTML', res.data.htmlContent);
        },
        async fetchBlogType() {
            const res = await getBlogType()
            this.blogType = res.data
        },
        async handeSubmit() {
            let html = this.$refs.toastuiEditor.invoke('getHTML');
            let markdown = this.$refs.toastuiEditor.invoke('getMarkdown');
            const article = {
                title: this.form.title,
                description: this.form.description,
                createDate: Date.now(),
                categoryId: this.form.select,
                htmlContent: html,
                markdownContent: markdown,
                thumb: this.form.thumb,
            }
            let res = null
            if (this.mode === 'add') {
                res = await addBlog(article)
            } else if (this.mode === 'edit') {
                res = await editBlog({ id: this.form.id, data: article })
            }
            if (typeof res === 'string') {
                this.$message.error('提交错误！')
                return
            }
            this.$message.success('修改成功！')
            if (this.mode === 'edit') {
                this.$router.push('/blog/bloglist')
            }
        }
    }
}
</script>
  
<style scoped lang="scss">
.title {
    margin: 15px 0;
}
</style>
  