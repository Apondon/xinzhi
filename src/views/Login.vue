<template lang="pug">
div.login
    el-form(:model="ruleForm",status-icon,:rules="rules",ref="ruleForm",label-width="100px",class="demo-ruleForm")
        el-form-item(label="用户名",prop="account")
            el-input(type="text",v-model="ruleForm.account",autocomplete="off")
        
        el-form-item(label="密码" prop="pass")
            el-input(type="password",v-model="ruleForm.pass",autocomplete="off")
        el-form-item
            el-button(type="primary",@click="submitForm('ruleForm')") 提交
            el-button(@click="resetForm('ruleForm')") 重置
        
    
</template>
<script>
export default {
    data() {
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      
      return {
        ruleForm: {
          pass: '',
          account: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$router.push('/')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style scoped lang="scss" >

div.login{
    width: 100%;
    height: 100%;
    display: flex;
    background: url(../assets/login.jpg) no-repeat center;
    background-size: cover;
    justify-content: center;
    align-items: center;
    .el-form{
        width: 400px;
        height: 200px;
    }
}
</style>