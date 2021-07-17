<template lang="pug">
div.info
    Bread(:target="target")
    el-form(:inline="true",:model="formInline",class="demo-form-inline")
        el-form-item(label="文章类型")
            el-radio(v-model="formInline.type",:label="1") 公告
            el-radio(v-model="formInline.type",:label="2") 资讯
        el-form-item(label="文章名称")
            el-input(v-model="formInline.name",placeholder="请输入文章名称")
        el-form-item(label="时间范围")
            el-date-picker(v-model="formInline.infoTime",type="daterange")
        el-form-item
            el-button(type="primary",icon="el-icon-search",@click="onSubmit") 搜索
        el-form-item
            el-button(icon="el-icon-refresh-left",@click="resetHandle") 重置
    div.infoBox
        el-button(type="primary",icon="el-icon-plus",plain,size="small",@click="addOne") 添加新文章
        el-table(:data="tableData",style="width: 100%",height="600px",border="true")
            el-table-column(prop="title",label="文章标题")
            el-table-column(prop="type",label="文章类型")
                template(#default="scope")
                    span(v-show="scope.row.type===1") 公告
                    span(v-show="scope.row.type===2") 资讯
            el-table-column(prop="top",label="是否置顶")
                template(#default="scope")
                    span(v-show="scope.row.top===1") 是
                    span(v-show="scope.row.top===2") 否
            el-table-column(prop="count",label="点击量")
            el-table-column(label="操作",align="center")
                template(#default="scope")
                    el-link.el-icon-edit(:underline="false",href="javascript:;",@click="editHandle(scope.$index,scope.row)") 编辑
                    el-link.el-icon-delete-solid(:underline="false",href="javascript:;",@click="deleteHandle(scope.$index,scope.row)") 删除
        el-pagination(
            @size-change="handleSizeChange",
            @current-change="handleCurrentChange",
            :current-page="currentPage4",
            :page-sizes="[10, 20, 30, 40]",
            :page-size="10",
            layout="total, sizes, prev, pager, next, jumper",
            :total="400") 
el-dialog(:title="title",v-model="dialogVisible",width="30%",:center="false")
    el-form(ref="form",:model="form",label-width="80px")
        el-form-item(label="文章标题")
            el-input(v-model="form.title")
        el-form-item(label="文章类型")
            el-radio(v-model="form.type",:label="1") 公告
            el-radio(v-model="form.type",:label="2") 资讯
        el-form-item(label="是否置顶")
            el-radio(v-model="form.top",:label="1") 是
            el-radio(v-model="form.top",:label="2") 否
        el-form-item(label="备注")
            QuillEditor(:options="editorOption",:v-model="form.content",ref="quill")
    template(#footer)
        div.dialog-footer
            el-button(@click="closeHandle") 关闭
            el-button(type="primary",@click="submitHandle") 提交
</template>

<script>
export default {
    data(){
        return{
            target:['系统管理','公告资讯'],
            formInline:{
                type:'',
                name:'',
                infoTime:'',
            },
            tableData:[],
            tableList:[
                {
                    title:'文章1',
                    type:1,
                    top:1,
                    count:10,
                    content:'111111'
                }
            ],
            currentPage4:1,
            // dialog
            dialogVisible:false,
            title:'',
            form:{
                title:'',
                type:0,
                top:0,
                count:10,
                content:''
            },
            isEdit:false,
            editIndex:0,
            editorOption:{
                debug: 'info',
                // modules: {
                //     toolbar: '#toolbar'
                // },
                placeholder: 'Compose an epic...',
                // readOnly: true,
                theme: 'snow'
            }
        }
    },
    methods:{
        onSubmit(){
        },
        resetHandle(){
        },
        addOne(){
            
            this.dialogVisible = true
            this.isEdit = false
            this.title = '添加新文章'
            for(let i in this.form){
                this.form[i] = ''
            }
            this.$refs.quill.setText('')
        },
        deleteHandle(index,row){
            this.tableData.splic(index,1)
        },
        editHandle(index,row){
            this.isEdit = true
            this.title = '编辑文章'
            this.editIndex = index
            this.form = {
                title:row.title,
                type:row.type,
                top:row.top,
                count:row.count,
                content:row.content
            }
            this.$refs.quill.setText(row.content)
            this.dialogVisible = true
        },
        closeHandle(){
            this.dialogVisible = false
        },
        submitHandle(){
            console.log()
            if(this.isEdit){
                this.tableData[this.editIndex] = {
                    title:this.form.title,
                    type:this.form.type,
                    top:this.form.top,
                    count:this.form.count,
                    content:this.$refs.quill.getContents().ops[0].insert
                }
            }
            if(!this.isEdit){
               this.tableData.push({
                   title:this.form.title,
                    type:this.form.type,
                    top:this.form.top,
                    count:this.form.count,
                    content:this.$refs.quill.getContents().ops[0].insert
               }) 
            }
            this.dialogVisible = false
        },
        handleSizeChange(val){
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`)
        },
    },
    mounted(){
        for(let i in this.tableList){
            this.tableData.push(this.tableList[i])
        }
    }
}
</script>

<style lang="scss" scoped>
.info{
    box-sizing: border-box;
    padding:20px 45px;
    .el-form{
        margin-top: 20px;
        text-align: left;
    }
    .infoBox{
        margin-top: 20px;
        text-align: left;
    }
    .el-table{
        margin-top:20px;
        .el-link{
            margin:0 10px;
        }
    }
    .el-pagination{
        text-align: right;
    }
    .ql-snow .ql-picker{
        line-height: 24px;
    }
}
</style>