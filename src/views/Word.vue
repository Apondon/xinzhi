<template lang="pug">
div.word
    Bread(:target="target")
    el-form(:inline="true",:model="formInline",class="demo-form-inline")
        el-form-item(label="字典名称")
            el-input(v-model="formInline.user",placeholder="请输入用户名")
        el-form-item(label="状态")
            el-radio(v-model="formInline.radio",:label="1") 正常
            el-radio(v-model="formInline.radio",:label="2") 禁用
        el-form-item
            el-button(type="primary",icon="el-icon-search",@click="onSubmit") 搜索
        el-form-item
            el-button(icon="el-icon-refresh-left",@click="resetHandle") 重置
    div.wordBox
        el-button(type="primary",icon="el-icon-plus",plain,size="small",@click="addOne") 添加字典
        el-table(:data="tableData",style="width: 100%",height="600px",border="true")
            el-table-column(label="序号",type="index",width="50")
            el-table-column(prop="name",label="字典名称",width="180")
            el-table-column(prop="code",label="Code",width="180")
            el-table-column(prop="status",label="状态",width="180")
                template(#default="scope")
                    span(v-show="scope.row.status===1") 正常
                    span(v-show="scope.row.status===2") 禁用
            el-table-column(prop="text",label="备注",width="180")
            el-table-column(prop="time",label="创建时间")
            el-table-column(label="操作",align="center")
                template(#default="scope")
                    el-link.el-icon-edit(:underline="false",href="javascript:;",@click="editHandle(scope.$index,scope.row)") 编辑
                    el-link.el-icon-s-fold(:underline="false",href="javascript:;") 列表
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
        el-form-item(label="字典名称")
            el-input(v-model="form.name")
        el-form-item(label="Code")
            el-input(v-model="form.code")
        el-form-item(label="状态")
            el-radio(v-model="form.status",:label="1") 正常
            el-radio(v-model="form.status",:label="2") 禁用
        el-form-item(label="备注")
            el-input(v-model="form.text")
    template(#footer)
        div.dialog-footer
            el-button(@click="closeHandle") 关闭
            el-button(type="primary" @click="submitHandle") 提交
      
</template>

<script>
export default {
    data(){
        return{
            target:['系统设置','字典管理'],
            formInline:{
                user:'',
                radio:1,
            },
            tableData:[],
            tableList:[
                {
                    id:1,
                    name:'字典1',
                    code:123456,
                    status:1,
                    text:'正常字典',
                    time:'2021-07-14 10:30:10'
                },
                {
                    id:2,
                    name:'字典2',
                    code:134567,
                    status:2,
                    text:'不正常字典',
                    time:'2021-07-14 10:31:10'
                }
            ],
            currentPage4:1,
            dialogVisible:false,
            isEdit:false,
            title:'',
            form:{
                name:'',
                code:'',
                status:0,
                text:'',
            },
            editItem:0,
        }
    },
    methods:{
        onSubmit(){
            this.tableData = []
            for(let i = 0; i < this.tableList.length; i++){
                if(this.tableList[i].name == this.formInline.user && this.tableList[i].status == this.formInline.radio){
                    this.tableData.push(this.tableList[i])
                }
            }
        },
        resetHandle(){
            this.tableData = this.tableList
            this.formInline = {
                user:'',
                radio:1,
            }
        },
        handleSizeChange(val){
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`)
        },
        addOne(){
            this.title = '添加角色'
            this.dialogVisible = true
            this.isEdit = false
        },
        closeHandle(){
            this.dialogVisible = false
        },
        submitHandle(){
            if(this.isEdit){
                this.tableData[this.editItem] = {
                    name:this.form.name,
                    code:this.form.code,
                    status:this.form.status,
                    text:this.form.text,
                    time:this.transTime()
                }
            }else{
                this.tableData.push({
                    name:this.form.name,
                    code:this.form.code,
                    status:this.form.status,
                    text:this.form.text,
                    time:this.transTime()
                })
            }
            this.form = {
                name:'',
                code:'',
                status:'',
                text:'',
                time:''
            }
            this.dialogVisible = false
        },
        deleteHandle(index , row){
            this.tableData.splice(index , 1)
        },
        editHandle(index,row){
            this.title = '编辑字典'
            this.editItem = index
            this.isEdit = true
            this.form = {
                name:row.name,
                code:row.code,
                status:row.status,
                text:row.text,
            }
            this.dialogVisible = true
        },
        transTime(){
            let D = new Date()
            let yyyy = D.getFullYear()
            let MM = D.getMonth() < 10 ? '0'+ D.getMonth() : D.getMonth()
            let dd = D.getDate() < 10 ? '0'+ D.getDate() : D.getDate()
            let hh = D.getHours() < 10 ? '0' + D.getHours() : D.getHours()
            let mm = D.getMinutes() < 10 ? '0' + D.getMinutes() : D.getMinutes()
            let ss = D.getSeconds() < 10 ? '0' + D.getSeconds() : D.getSeconds()
            return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
        }
    },
    mounted(){
        this.tableData = this.tableList
    }
}
</script>

<style lang="scss" scoped>
.word{
    box-sizing: border-box;
    padding:20px 45px;
    .el-form{
        margin-top: 20px;
        text-align: left;
    }
    .wordBox{
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
}
</style>