<template lang="pug">
div.salesman
    Bread(:target="target")
    el-form(:inline="true",:model="formInline",class="demo-form-inline")
        el-form-item(label="机构")
            el-select(v-model="formInline.ogz",placeholder="请选择",clearable)
                el-option(v-for="item in gOptions",:key="item.value",:label="item.label",:value="item.value")
        el-form-item(label="业务员姓名")
            el-input(v-model="formInline.name",placeholder="请输入名称",clearable)
        el-form-item(label="帐号状态")
            el-select(v-model="formInline.status",placeholder="请选择",clearable)
                el-option(v-for="item in sOptions",:key="item.value",:label="item.label",:value="item.value")
        el-form-item(label="时间范围")
            el-date-picker(v-model="formInline.value1",type="date",placeholder="选择日期",value-format="YYYY-MM-DD",clearable)
        el-form-item
            el-button(type="primary",icon="el-icon-search",@click="onSubmit") 搜索
        el-form-item
            el-button(icon="el-icon-refresh-left",@click="resetHandle") 重置
    div.salesmanBox
        el-button(type="primary",icon="el-icon-plus",plain,size="small",@click="addOne") 添加业务员
        el-table(:data="tableData",style="width: 100%",height="600px",border="true")
            el-table-column(label="序号",type="index",width="50")
            el-table-column(label="机构",prop="ogz")
            el-table-column(label="账号",prop="account")
            el-table-column(label="姓名",prop="name")
            el-table-column(label="性别",prop="sex")
                template(#default="scope")
                    span(v-show="scope.row.sex===1") 男
                    span(v-show="scope.row.sex===2") 女
            el-table-column(label="年龄",prop="age")
            el-table-column(label="手机号",prop="tele")
            el-table-column(label="状态",prop="status")
                template(#default="scope")
                    span(v-show="scope.row.status===1") 正常
                    span(v-show="scope.row.status===2") 禁用
            el-table-column(label="负责区域",prop="area")
            el-table-column(label="备注",prop="text")
            el-table-column(label="创建时间",prop="time")
            el-table-column(label="操作",width="280")
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
        el-form-item(label="机构")
            el-select(v-model="form.ogz",placeholder="请选择",clearable)
                el-option(v-for="item in gOptions",:key="item.value",:label="item.label",:value="item.value")
        el-form-item(label="账号")
            el-input(v-model="form.account",clearable)
        el-form-item(label="密码")
            el-input(v-model="form.password",type="password",clearable)
        el-form-item(label="姓名")
            el-input(v-model="form.name",clearable)
        el-form-item(label="性别")
            el-radio(v-model="form.sex",:label="1") 男
            el-radio(v-model="form.sex",:label="2") 女
        el-form-item(label="年龄")
            el-input(v-model="form.age",clearable)
        el-form-item(label="手机号")
            el-input(v-model="form.tele",clearable)
        el-form-item(label="出生日期")
            el-date-picker(v-model="form.birth",type="date",placeholder="选择日期",value-format="YYYY-MM-DD",clearable)
        el-form-item(label="身份证号")
            el-input(v-model="form.id",clearable)
        el-form-item(label="负责区域")
            el-input(v-model="form.area",clearable)
        el-form-item(label="状态")
            el-radio(v-model="form.status",:label="1") 正常
            el-radio(v-model="form.status",:label="2") 禁用
        el-form-item(label="备注")
            el-input(v-model="form.text")
    template(#footer)
        div.dialog-footer
            el-button(@click="closeHandle") 关闭
            el-button(type="primary",@click="submitHandle") 提交
</template>

<script>
export default {
    data(){
        return{
            target:['系统管理','业务员管理'],
            formInline:{
                ogz:'',
                name:'',
                status:'',
                value1:''
            },
            gOptions:[
                {
                    label:'中国平安郑州分公司',
                    value:1
                },
                {
                    label:'三门峡中医院',
                    value:2
                },
            ],
            sOptions:[
                {
                    label:'正常',
                    value:1
                },
                {
                    label:'禁用',
                    value:2
                },
            ],
            tableData:[],
            tableList:[{id:1}],
            // 分页
            currentPage4:1,
            // dialog
            dialogVisible:false,
            title:'',
            form:{
                ogz:'',
                account:'',
                password:'',
                name:'',
                sex:'',
                age:'',
                tele:'',
                birth:'',
                id:'',
                area:'',
            },
            isEdit:false,
            editIndex:0,
        }
    },
    methods:{
        onSubmit(){},
        resetHandle(){},
        addOne(){
            this.title="添加业务员"
            this.isEdit = false
            for(let i in this.form){
                this.form[i] = ''
            }
            this.dialogVisible = true
        },
        closeHandle(){
            this.dialogVisible = false
        },
        submitHandle(){
            let obj = {}
            for(let i in this.form){
                obj[i] = this.form[i]
            }
            if(this.isEdit) this.tableData[this.editIndex] = obj
            if(!this.isEdit) this.tableData.push(obj)
            this.dialogVisible = false
        },
        editHandle(index,row){
            this.title="编辑业务员"
            this.isEdit = true
            this.dialogVisible = true
            this.editIndex = index
            this.form = {}.assign(row)
            console.log(this.form)
        },
        deleteHandle(index,row){
            this.tableData.splice(index,1)
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
.salesman{
    box-sizing: border-box;
    padding:20px 45px;
    .el-form{
        margin-top: 20px;
        text-align: left;
    }
    .salesmanBox{
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