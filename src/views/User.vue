<template lang="pug">
div.user
    Bread(:target="target")
    el-form(:inline="true",:model="formInline",class="demo-form-inline")
        el-form-item(label="用户角色")
            el-select(v-model="formInline.role",placeholder="请选择")
                el-option(v-for="item in options",:key="item.value",:label="item.label",:value="item.value")
        el-form-item(label="用户姓名")
            el-input(v-model="formInline.name",placeholder="请输入用户姓名")
        el-form-item(label="帐号状态")
            el-select(v-model="formInline.status",placeholder="请选择")
                el-option(v-for="item in options1",:key="item.value",:label="item.label",:value="item.value")
        el-form-item
            el-button(type="primary",icon="el-icon-search",@click="onSubmit") 搜索
        el-form-item
            el-button(icon="el-icon-refresh-left",@click="resetHandle") 重置
    div.userBox
        el-button(type="primary",icon="el-icon-plus",plain,size="small",@click="addOne") 添加账号
        el-table(:data="tableData",style="width: 100%",height="600px",border="true")
            el-table-column(label="序号",type="index",width="50")
            el-table-column(label="角色",prop="role")
            el-table-column(label="机构",prop="ogz")
            el-table-column(label="用户名",prop="user")
            el-table-column(label="姓名",prop="name")
            el-table-column(label="联系人",prop="connect")
            el-table-column(label="电话",prop="name")
            el-table-column(label="状态",prop="status")
            el-table-column(label="最后登录时间",prop="time")
            el-table-column(label="操作",width="280")
                template(#default="scope")
                    el-link.el-icon-edit(:underline="false",href="javascript:;") 编辑
                    el-link.el-icon-s-operation(:underline="false",href="javascript:;") 权限
                    el-link.el-icon-delete-solid(:underline="false",href="javascript:;") 删除
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
        el-form-item(label="角色")
            el-select(v-model="form.role",placeholder="请选择状态")
                el-option(v-for="item in roleOptions",:key="item.id",:label="item.name",:value="item.id")
        el-form-item(label="用户类型")
            el-select(v-model="form.type",placeholder="请选择状态")
                el-option(v-for="item in typeOptions",:key="item.id",:label="item.name",:value="item.id")
        el-form-item(label="用户名")
            el-input(v-model="form.user")
        el-form-item(label="姓名")
            el-input(v-model="form.name")
        el-form-item(label="性别")
            el-radio(v-model="form.sex",label="1") 男
            el-radio(v-model="form.sex",label="2") 女
        el-form-item(label="出生日期")
            el-date-picker(v-model="form.birth",type="date",placeholder="选择日期")
        el-form-item(label="联系人")
            el-input(v-model="form.connect")
        el-form-item(label="联系电话")
            el-input(v-model="form.tele")
        el-form-item(label="用户状态")
            el-radio(v-model="form.status",label="1") 正常
            el-radio(v-model="form.status",label="2") 禁用
            el-radio(v-model="form.status",label="3") 锁定
    template(#footer)
        div.dialog-footer
            el-button(@click="closeHandle") 关闭
            el-button(type="primary") 提交
</template>

<script>
export default {
    data(){
        return{
            target:['系统管理','用户管理'],
            formInline:{
                role:'',
                name:'',
                status:'',
            },
            options:[],
            options1:[
                {
                    label:'正常',
                    value:1
                },
                {
                    label:'锁定',
                    value:2
                },
                {
                    label:'禁用',
                    value:3
                }
            ],
            tableData:[],
            tableList:[
                {
                    role:'',
                    ogz:'',
                    type:'',
                    user:'',
                    name:'',
                    connect:'',
                    tel:'',
                    status:'',
                    time:''
                }
            ],
            currentPage4:1,
            // dialog
            dialogVisible:false,
            title:'添加用户',
            form:{
                user:'',
                name:'',
                type:'',
                role:'',
                connect:'',
                tel:'',
                birth:'',
                status:'',
                sex:'',
            },
            roleOptions:[],
            typeOptions:[
                {
                    label:'全部',
                    value:0
                },
                {
                    label:'平台',
                    value:1
                },
                {
                    label:'机构',
                    value:2
                },
            ]
            
        }
    },
    methods:{
        onSubmit(){
            this.tableData = []
            for(let i = 0; i < this.tableList.length; i++){
                if(this.tableList[i].name == this.formInline.name){
                    this.tableData.push(this.tableList[i])
                }
            }
        },
        resetHandle(){
            this.tableData = this.tableList
            this.formInline = {
                name:'',
            }
        },
        addOne(){
            this.title = '添加用户'
            this.dialogVisible = true
        },
        closeHandle(){
            this.dialogVisible = false
        },
        
        handleSizeChange(val){
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`)
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
    },
    mounted(){
        this.tableData = this.tableList
    }
}
</script>

<style lang="scss" scoped>
.user{
    box-sizing: border-box;
    padding:20px 45px;
    .el-form{
        margin-top: 20px;
        text-align: left;
    }
    .userBox{
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