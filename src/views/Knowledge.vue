<template lang="pug">
div.knowledge
    Bread(:target="target")
    el-form(:inline="true",:model="formInline",class="demo-form-inline")
        el-form-item(label="名称")
            el-input(v-model="formInline.name",placeholder="请输入名称")
        el-form-item(label="问题类型")
            el-select(v-model="formInline.ques",placeholder="请选择")
                el-option(v-for="item in qOptions",:key="item.value",:label="item.label",:value="item.value")
        el-form-item(label="就诊类型")
            el-select(v-model="formInline.ret",placeholder="请选择")
                el-option(v-for="item in rOptions",:key="item.value",:label="item.label",:value="item.value")
        el-form-item
            el-button(type="primary",icon="el-icon-search",@click="onSubmit") 搜索
        el-form-item
            el-button(icon="el-icon-refresh-left",@click="resetHandle") 重置
    div.knowledgeBox
        el-button(type="primary",icon="el-icon-plus",plain,size="small",@click="addOne") 添加知识库
        el-table(:data="tableData",style="width: 100%",height="600px",border="true")
            el-table-column(label="序号",type="index",width="50")
            el-table-column(label="名称",prop="name")
            el-table-column(label="拼音简码",prop="code")
            el-table-column(label="关键字",prop="keyWord")
            el-table-column(label="问题类型",prop="ques")
                template(#default="scope")
                    span(v-show="scope.row.ques===1") 诊前
                    span(v-show="scope.row.ques===2") 诊后
            el-table-column(label="就诊类型",prop="ret")
                template(#default="scope")
                    span(v-show="scope.row.ret===1") 门诊
                    span(v-show="scope.row.ret===2") 医保
            el-table-column(label="备注",prop="text")
            el-table-column(label="操作",width="280")
                template(#default="scope")
                    el-link.el-icon-edit(:underline="false",href="javascript:;",@click="editHandle(scope.$index,scope.row)") 编辑
                    el-link.el-icon-delete-solid(:underline="false",href="javascript:;",@click="deleteHandle(scope.$index)") 删除
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
        el-form-item(label="名称")
            el-input(v-model="form.name",placeholder="请输入名称")
        el-form-item(label="简码")
            el-input(v-model="form.code",placeholder="请输入简码")
        el-form-item(label="关键字")
            el-input(v-model="form.keyword",placeholder="请输入关键字")
        el-form-item(label="关键字简码")
            el-input(v-model="form.keywordCode",placeholder="请输入关键字简码")
        el-form-item(label="问题类型")
            el-select(v-model="form.ques",placeholder="请选择")
                el-option(v-for="item in qOptions",:key="item.value",:label="item.label",:value="item.value")
        el-form-item(label="就诊类型")
            el-select(v-model="form.ret",placeholder="请选择")
                el-option(v-for="item in rOptions",:key="item.value",:label="item.label",:value="item.value")
        el-form-item(label="问题")
            el-input(v-model="form.question",placeholder="请输入问题")
        el-form-item(label="答案")
            el-input(v-model="form.answer",placeholder="请输入答案")
        el-form-item(label="备注")
            el-input(v-model="form.text",placeholder="请输入")
    template(#footer)
        div.dialog-footer
            el-button(@click="closeHandle") 关闭
            el-button(type="primary",@click="submitHandle") 提交

</template>

<script>
export default {
    data(){
        return{
            target:['系统管理','知识库'],
            formInline:{
                name:'',
                ques:'',
                ret:''
            },
            qOptions:[
                {
                    label:'诊前',
                    value:1
                },
                {
                    label:'诊后',
                    value:2
                }
            ],
            rOptions:[
                {
                    label:'门诊',
                    value:1
                },
                {
                    label:'医保',
                    value:2
                }
            ],
            tableData:[],
            tableList:[
                {
                    id:1,
                    name:'问题1',
                    code:'WTY',
                    keyWord:'',
                    keywordCode:'',
                    ques:1,
                    ret:2,
                    text:'备注内容',
                    question:'',
                    answer:'',
                   
                },
                {
                    id:2,
                    name:'问题1',
                    code:'WTY',
                    keyWord:'',
                    keywordCode:'',
                    ques:1,
                    ret:2,
                    text:'复制问题1',
                    question:'',
                    answer:'',
                   
                },
                {
                    id:3,
                    name:'问题2',
                    code:'WTY',
                    keyWord:'',
                    keywordCode:'',
                    ques:2,
                    ret:1,
                    text:'备注内容',
                    question:'',
                    answer:'',
                   
                },
                {
                    id:4,
                    name:'问题3',
                    code:'WTY',
                    keyWord:'',
                    keywordCode:'',
                    ques:1,
                    ret:2,
                    text:'备注内容',
                    question:'',
                    answer:'',
                   
                },

            ],
            // dialog
            dialogVisible:false,
            title:'',
            form:{
                name:'',
                code:'',
                keyword:'',
                keywordCode:'',
                ques:'',
                ret:'',
                question:'',
                answer:'',
                text:''
            },
            isEdit:false,
            editIndex:0,
        }
    },
    methods:{
        // 表单
        onSubmit(){
            this.tableData = []
            for(let i=0; i<this.tableList.length;i++){
                if(this.formInline.name || this.formInline.ques || this.formInline.ret){
                    let flag = true
                    // 值存在且不包含关键字
                    if(this.formInline.name && !this.tableList[i].name.includes(this.formInline.name)) flag = false 
                    // 值存在且问题类型不相同
                    if(this.formInline.ques!== '' && this.formInline.ques !== this.tableList[i].ques) flag = false 
                    // 值存在且就诊类型不相同
                    if(this.formInline.ret!== '' && this.formInline.ret !== this.tableList[i].ret) flag = false 
                    if(flag) this.tableData.push(this.tableList[i])
                }
                
            }
        },
        resetHandle(){
            this.tableData = []
            for(let i in this.tableList){
                this.tableData.push(this.tableList[i])
            }
            for(let i in this.formInline){
                this.formInline[i] = ''
            }
        },
        addOne(){
            this.title = '新增知识库'
            this.isEdit = false
            for(let i in this.form){
                this.form[i] = ''
            }
            this.dialogVisible = true
        },
        editHandle(index,row){
            this.title = '修改知识库'
            this.isEdit = true
            this.editIndex = index
            this.dialogVisible = true
            this.form = {
                name:row.name,
                code:row.code,
                keyword:row.keyword,
                keywordCode:row.keywordCode,
                ques:row.ques,
                ret:row.ret,
                question:row.question,
                answer:row.answer,
                text:row.text
            }
        },
        deleteHandle(index){
            this.tableList.splice(index,1)
            this.tableData = []
            for(let i in this.tableList){
                this.tableData.push(this.tableList[i])
            }
        },
        // dialog
        closeHandle(){
            this.dialogVisible = false
        },
        submitHandle(){
            // 编辑
            if(this.isEdit){
                this.tableList[this.editIndex] = {
                    name:this.form.name,
                    code:this.form.code,
                    keyword:this.form.keyword,
                    keywordCode:this.form.keywordCode,
                    ques:this.form.ques,
                    ret:this.form.ret,
                    question:this.form.question,
                    answer:this.form.answer,
                    text:this.form.text
                }
            }
            // 新增
            if(!this.isEdit){
                this.tableList.push({
                    name:this.form.name,
                    code:this.form.code,
                    keyword:this.form.keyword,
                    keywordCode:this.form.keywordCode,
                    ques:this.form.ques,
                    ret:this.form.ret,
                    question:this.form.question,
                    answer:this.form.answer,
                    text:this.form.text
                })
            }
            this.tableData = []
            for(let i in this.tableList){
                this.tableData.push(this.tableList[i])
            }
            this.dialogVisible = false
        },
        // 分页
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

.knowledge{
    box-sizing: border-box;
    padding:20px 45px;
    .el-form{
        margin-top: 20px;
        text-align: left;
    }
    .knowledgeBox{
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