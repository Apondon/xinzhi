<template lang="pug">
div.wordList
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
    div.wordlistdBox
        el-button(type="primary",icon="el-icon-plus",plain,size="small",@click="addOne") 添加字典
        el-table(:data="tableData",style="width: 100%",height="600px",border="true")
            el-table-column(label="序号",type="index",width="50")
            el-table-column(prop="name",label="数据标签",width="180")
            el-table-column(prop="value",label="Value",width="180")
            el-table-column(prop="status",label="状态",width="180")
                template(#default="scope")
                    span(v-show="scope.row.status===1") 正常
                    span(v-show="scope.row.status===2") 禁用
            el-table-column(prop="text",label="备注",width="180")
            el-table-column(prop="time",label="创建时间")
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
        //- el-form-item(label="字典名称")
        //-     el-input(v-model="form.name")
        //- el-form-item(label="Code")
        //-     el-input(v-model="form.code")
        //- el-form-item(label="状态")
        //-     el-radio(v-model="form.status",:label="1") 正常
        //-     el-radio(v-model="form.status",:label="2") 禁用
        //- el-form-item(label="备注")
        //-     el-input(v-model="form.text")
    template(#footer)
        div.dialog-footer
            el-button(@click="closeHandle") 关闭
            el-button(type="primary" @click="submitHandle") 提交
</template>

<script>
export default {
    data(){
        return{
            target:['系统管理','列表'],
            formInline:{
                user:'',
                radio:1,
            },
            id:'',
            tableData:[],
            tableList:[
                {
                    group:1,
                    name:'标签1',
                    value:'111',
                    status:1,
                    text:'这是标签1',
                    time:'2021-07-15 09:13:01'
                },
                {
                    group:1,
                    name:'标签11',
                    value:'111',
                    status:2,
                    text:'这是标签1',
                    time:'2021-07-15 09:13:01'
                },
                {
                    group:2,
                    name:'标签2',
                    value:'222',
                    status:2,
                    text:'这是标签1',
                    time:'2021-07-15 09:13:01'
                }
            ],
            currentPage4:1,
            // dialog
            dialogVisible:false,
            isEdit:false,
            title:'',
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
            this.tableData = []
            for(let i = 0;i < this.tableList.length;i++){
            if(this.tableList[i].group == this.id){
                this.tableData.push(this.tableList[i])
                }
            }
            this.formInline = {
                user:'',
                radio:1,
            }
        },
        addOne(){
            this.title = '添加角色'
            this.dialogVisible = true
            this.isEdit = false
        },
        deleteHandle(index , row){
            this.tableData.splice(index , 1)
        },
        editHandle(index,row){
            this.title = '编辑角色'
            this.dialogVisible = true
            this.isEdit = true
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
        },
        // dialog
        closeHandle(){
            this.dialogVisible = false
        },
        submitHandle(){
            // if(this.isEdit){
            //     this.tableData[this.editItem] = {
            //         name:this.form.name,
            //         value:this.form.value,
            //         status:this.form.status,
            //         text:this.form.text,
            //         time:this.transTime()
            //     }
            // }else{
            //     this.tableData.push({
            //         group:this.id,
            //         name:this.form.name,
            //         value:this.form.value,
            //         status:this.form.status,
            //         text:this.form.text,
            //         time:this.transTime()
            //     })
            // }
            this.form = {
                name:'',
                value:'',
                status:'',
                text:'',
                time:''
            }
            this.dialogVisible = false
        },
    },
    mounted(){
        let id = this.$route.query.id
        this.id = id
        // this.tableData = this.tableList
        for(let i = 0;i < this.tableList.length;i++){
            if(this.tableList[i].group == id){
                this.tableData.push(this.tableList[i])
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wordList{
    box-sizing: border-box;
    padding:20px 45px;
    .el-form{
        margin-top: 20px;
        text-align: left;
    }
    .wordlistdBox{
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