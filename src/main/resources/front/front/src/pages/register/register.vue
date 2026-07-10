<template>
  <div class="container">
    <el-form
      v-if="pageFlag === 'register'"
      ref="registerForm"
      class="rgs-form"
      :model="registerForm"
      :rules="rules"
    >
      <div class="title">南京旅游景点管理系统注册</div>

      <el-form-item v-if="tableName === 'yonghu'" prop="zhanghao">
        <el-input v-model="registerForm.zhanghao" placeholder="请输入账号" clearable />
      </el-form-item>
      <el-form-item v-if="tableName === 'yonghu'" prop="mima">
        <el-input v-model="registerForm.mima" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item v-if="tableName === 'yonghu'" prop="mima2">
        <el-input v-model="registerForm.mima2" type="password" placeholder="请再次输入密码" show-password />
      </el-form-item>
      <el-form-item v-if="tableName === 'yonghu'" prop="xingming">
        <el-input v-model="registerForm.xingming" placeholder="请输入姓名" clearable />
      </el-form-item>
      <el-form-item v-if="tableName === 'yonghu'" prop="xingbie">
        <el-select v-model="registerForm.xingbie" placeholder="请选择性别">
          <el-option
            v-for="item in yonghuxingbieOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="tableName === 'yonghu'" prop="nianling">
        <el-input v-model="registerForm.nianling" placeholder="请输入年龄" clearable />
      </el-form-item>
      <el-form-item v-if="tableName === 'yonghu'" prop="shouji">
        <el-input v-model="registerForm.shouji" placeholder="请输入手机" clearable />
      </el-form-item>
      <el-form-item v-if="tableName === 'yonghu'" prop="touxiang">
        <file-upload
          tip="点击上传头像"
          action="file/upload"
          :limit="1"
          :multiple="true"
          :fileUrls="registerForm.touxiang ? registerForm.touxiang : ''"
          @change="yonghutouxiangUploadChange"
        />
      </el-form-item>

      <el-button class="primary-btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
      <el-button class="secondary-btn" @click="resetForm('registerForm')">重置</el-button>
      <router-link class="login-link" to="/login">已有账号，去登录</router-link>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageFlag: '',
      tableName: '',
      registerForm: {
        zhanghao: '',
        mima: '',
        mima2: '',
        xingming: '',
        xingbie: '',
        nianling: '',
        shouji: '',
        touxiang: ''
      },
      rules: {
        zhanghao: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        mima: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        mima2: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
        xingming: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        nianling: [{ required: true, validator: this.$validate.isIntNumer, trigger: 'blur' }],
        shouji: [{ required: true, validator: this.$validate.isMobile, trigger: 'blur' }]
      },
      yonghuxingbieOptions: ['男', '女']
    }
  },
  created() {
    this.pageFlag = this.$route.query.pageFlag || 'register'
    this.tableName = this.$route.query.role || 'yonghu'
  },
  methods: {
    yonghutouxiangUploadChange(fileUrls) {
      this.registerForm.touxiang = fileUrls.replace(new RegExp(this.$config.baseUrl, 'g'), '')
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }

        if (this.tableName === 'yonghu' && this.registerForm.mima !== this.registerForm.mima2) {
          this.$message.error('两次密码输入不一致')
          return
        }

        const payload = { ...this.registerForm }
        delete payload.mima2
        this.$http.post(`${this.tableName}/register`, payload).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '注册成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.$router.push('/login')
              }
            })
            return
          }

          this.$message.error(res.data.msg || '注册失败')
        })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  align-items: center;
  background-image: url(http://codegen.caihongy.cn/20221024/23b37078fa41495b866fda764fd3ea28.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
}

.rgs-form {
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 32px 20px;
  width: 750px;
}

.title {
  color: #000;
  font-size: 32px;
  line-height: 44px;
  margin: 0 0 28px;
  text-align: center;
  width: 100%;
}

.rgs-form .el-form-item,
.primary-btn,
.secondary-btn,
.login-link {
  display: block;
  margin: 20px auto;
  width: 80%;
}

.primary-btn,
.secondary-btn {
  border-radius: 8px;
  font-size: 16px;
  height: 40px;
}

.primary-btn {
  background: #000;
  border: none;
  color: #fff;
}

.secondary-btn {
  background: none;
  color: #000;
}

.login-link {
  color: rgba(40, 40, 40, 1);
  font-size: 14px;
  text-decoration: none;
}
</style>
