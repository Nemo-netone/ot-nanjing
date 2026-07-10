<template>
  <div class="container">
    <el-form ref="loginForm" class="login-form" :model="loginForm" :rules="rules">
      <div class="en-title">USER / LOGIN</div>
      <div class="title">南京旅游景点管理系统登录</div>

      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入账号" clearable />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" show-password />
      </el-form-item>
      <el-form-item v-if="roles.length > 1" prop="tableName">
        <el-radio-group v-model="loginForm.tableName">
          <el-radio
            v-for="item in roles"
            :key="item.tableName"
            :label="item.tableName"
            @change="getCurrentRow(item)"
          >
            {{ item.roleName }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button class="submit-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button class="reset-btn" @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
      <div class="register-links">
        <router-link
          v-for="item in registerRoles"
          :key="item.tableName"
          :to="{ path: '/register', query: { role: item.tableName, pageFlag: 'register' } }"
        >
          注册{{ item.roleName }}
        </router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ROLE_MENUS } from '@/common/menus'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        tableName: ''
      },
      role: '',
      roles: [],
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        tableName: [{ required: true, message: '请选择登录用户类型', trigger: 'change' }]
      }
    }
  },
  computed: {
    registerRoles() {
      return this.roles.filter(item => item.hasFrontRegister === '是')
    }
  },
  created() {
    this.roles = ROLE_MENUS.filter(item => item.hasFrontLogin === '是')
    if (this.roles.length > 0) {
      this.getCurrentRow(this.roles[0])
      this.loginForm.tableName = this.roles[0].tableName
    }
  },
  methods: {
    getCurrentRow(row) {
      this.role = row.roleName
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }

        this.$http.get(`${this.loginForm.tableName}/login`, { params: this.loginForm }).then(res => {
          if (res.data.code === 0) {
            localStorage.setItem('Token', res.data.token)
            localStorage.setItem('UserTableName', this.loginForm.tableName)
            localStorage.setItem('username', this.loginForm.username)
            localStorage.setItem('adminName', this.loginForm.username)
            localStorage.setItem('sessionTable', this.loginForm.tableName)
            localStorage.setItem('role', this.role)
            localStorage.setItem('keyPath', this.$config.indexNav.length + 2)
            this.$router.push('/index/center')
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 1500
            })
            return
          }

          this.$message.error(res.data.msg || '登录失败')
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

.login-form {
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  min-height: 520px;
  padding: 80px 20px 20px;
  width: 750px;
}

.en-title,
.title {
  color: #000;
  line-height: 44px;
  text-align: center;
  width: 100%;
}

.en-title {
  font-size: 32px;
}

.title {
  font-size: 30px;
  font-weight: 600;
  margin: 0 0 30px;
}

.login-form .el-form-item {
  margin: 24px auto;
  width: 80%;
}

.submit-btn,
.reset-btn {
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  height: 44px;
  margin: 8px 0;
  padding: 0 24px;
  width: 100%;
}

.submit-btn {
  background: #000;
  border: none;
  color: #fff;
}

.reset-btn {
  background: none;
  color: #000;
}

.register-links {
  margin: 20px auto;
  width: 80%;
}

.register-links a {
  color: rgba(40, 40, 40, 1);
  font-size: 14px;
  margin: 0 5px;
  text-decoration: none;
}
</style>
