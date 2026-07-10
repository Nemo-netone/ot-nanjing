<template>
  <div class="center-preview">
    <div class="title">{{ title }}</div>

    <el-tabs tab-position="left" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="个人中心" name="profile">
        <el-form ref="sessionForm" class="center-preview-pv" :model="sessionForm" :rules="rules" label-width="90px">
          <el-form-item v-if="userTableName === 'yonghu'" label="账号" prop="zhanghao">
            <el-input v-model="sessionForm.zhanghao" placeholder="账号" readonly />
          </el-form-item>
          <el-form-item v-if="userTableName === 'yonghu'" label="密码" prop="mima">
            <el-input v-model="sessionForm.mima" type="password" placeholder="密码" show-password />
          </el-form-item>
          <el-form-item v-if="userTableName === 'yonghu'" label="姓名" prop="xingming">
            <el-input v-model="sessionForm.xingming" placeholder="姓名" />
          </el-form-item>
          <el-form-item v-if="userTableName === 'yonghu'" label="性别">
            <el-select v-model="sessionForm.xingbie" placeholder="请选择性别">
              <el-option v-for="item in dynamicProp.xingbie" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="userTableName === 'yonghu'" label="年龄" prop="nianling">
            <el-input v-model="sessionForm.nianling" placeholder="年龄" />
          </el-form-item>
          <el-form-item v-if="userTableName === 'yonghu'" label="手机" prop="shouji">
            <el-input v-model="sessionForm.shouji" placeholder="手机" />
          </el-form-item>
          <el-form-item v-if="userTableName === 'yonghu'" label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="yonghutouxiangHandleAvatarSuccess"
            >
              <img v-if="sessionForm.touxiang" :src="fileUrl(sessionForm.touxiang)" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button class="primary-btn" type="primary" @click="onSubmit('sessionForm')">更新信息</el-button>
            <el-button class="secondary-btn" @click="logout">退出登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="我的收藏" name="storeup" />
    </el-tabs>
  </div>
</template>

<script>
import config from '@/config/config'
import Vue from 'vue'

export default {
  data() {
    return {
      title: '个人中心',
      baseUrl: config.baseUrl,
      sessionForm: {},
      rules: {
        zhanghao: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        mima: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        xingming: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        nianling: [{ required: false, validator: this.$validate.isIntNumer, trigger: 'blur' }],
        shouji: [{ required: false, validator: this.$validate.isMobile, trigger: 'blur' }]
      },
      uploadUrl: `${config.baseUrl}file/upload`,
      headers: { Token: localStorage.getItem('Token') },
      userTableName: localStorage.getItem('UserTableName') || 'yonghu',
      dynamicProp: {
        xingbie: ['男', '女']
      }
    }
  },
  created() {
    if (!localStorage.getItem('Token')) {
      this.$router.push('/login')
      return
    }

    this.getSession()
  },
  methods: {
    fileUrl(file) {
      if (!file) {
        return ''
      }
      return file.indexOf('http') === 0 ? file : `${this.baseUrl}${file}`
    },
    getSession() {
      this.$http.get(`${this.userTableName}/session`, { emulateJSON: true }).then(res => {
        if (res.data.code === 0) {
          this.sessionForm = res.data.data || {}
          localStorage.setItem('userid', this.sessionForm.id)
          if (this.sessionForm.touxiang) {
            localStorage.setItem('headportrait', this.sessionForm.touxiang)
          } else if (this.sessionForm.headportrait) {
            localStorage.setItem('headportrait', this.sessionForm.headportrait)
          }
        }
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }

        this.$http.post(`${this.userTableName}/update`, this.sessionForm).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '更新成功',
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message.error(res.data.msg || '更新失败')
          }
        })
      })
    },
    yonghutouxiangHandleAvatarSuccess(res) {
      if (res.code === 0) {
        this.sessionForm.touxiang = `upload/${res.file}`
      }
    },
    handleClick(tab) {
      if (tab.name === 'storeup') {
        localStorage.setItem('storeupType', 1)
        this.$router.push('/index/storeup')
        this.title = '我的收藏'
      } else {
        this.title = '个人中心'
      }
    },
    logout() {
      localStorage.clear()
      Vue.http.headers.common.Token = ''
      this.$router.push('/index/home')
      localStorage.setItem('keyPath', '0')
      this.$message({
        message: '退出成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.center-preview {
  background: none;
  height: auto;
  margin: 10px auto;
  position: relative;
  width: 1200px;
}

.title {
  background: url(http://codegen.caihongy.cn/20221104/468cb37a5a4e43e89db0db4acaf0ea39.png) #e1f7e9 no-repeat center 10px;
  border: 1px solid rgba(72, 197, 117, .8);
  border-bottom-width: 4px;
  border-radius: 8px;
  color: #333;
  font-size: 28px;
  height: 120px;
  line-height: 76px;
  margin: 20px 0;
  overflow: hidden;
  padding: 20px 0;
  text-align: center;
  width: 100%;
}

.tabs {
  background: #fff;
  border: 2px solid #a4d9b7;
  border-radius: 8px;
  margin: 20px 0 0;
  padding: 20px;
}

.center-preview-pv {
  max-width: 640px;
}

.primary-btn,
.secondary-btn {
  border-radius: 40px;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  margin-right: 12px;
  padding: 0 24px;
}

.primary-btn {
  background: #3db769;
  border: 0;
  color: #fff;
}

.secondary-btn {
  background: #fff;
  border: 1px solid #3db769;
  color: #3db769;
}

.avatar {
  border: 1px solid #9ce0b5;
  border-radius: 6px;
  cursor: pointer;
  min-height: 100px;
  object-fit: cover;
  width: 150px;
}

.avatar-uploader-icon {
  border: 1px solid #9ce0b5;
  border-radius: 6px;
  color: #3db769;
  cursor: pointer;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  width: 150px;
}
</style>
