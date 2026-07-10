<template>
  <div class="main-containers">
    <div class="top-container">
      <div class="brand">南京旅游名胜景点管理系统</div>
      <div class="user-actions">
        <span v-if="Token" class="username">{{ username }}</span>
        <el-button v-if="!Token" class="primary-action" @click="toLogin">登录/注册</el-button>
        <el-button v-else class="secondary-action" @click="logout">退出</el-button>
      </div>
    </div>

    <div class="body-containers">
      <div class="menu-preview">
        <el-menu
          class="el-menu-horizontal-demo"
          :default-active="activeIndex"
          :unique-opened="true"
          mode="horizontal"
          :router="true"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(menu, index) in menuList"
            :index="index + ''"
            :key="menu.url"
            :route="menu.url"
          >
            <i :class="iconArr[index]"></i>
            <span>{{ menu.name }}</span>
          </el-menu-item>
          <el-menu-item @click="goBackend">
            <i class="el-icon-box"></i>
            <span>后台管理</span>
          </el-menu-item>
          <el-menu-item v-if="Token && notAdmin" :index="menuList.length + 2 + ''" @click="goMenu('/index/center')">
            <i class="el-icon-user"></i>
            <span>个人中心</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="banner-preview">
        <el-carousel trigger="click" indicator-position="inside" arrow="always" height="400px" :autoplay="true" :interval="3000" :loop="true">
          <el-carousel-item v-for="item in carouselList" :key="item.id">
            <el-image :src="baseUrl + item.value" fit="cover"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>

      <router-view></router-view>

      <div class="bottom-preview"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      activeIndex: '0',
      baseUrl: '',
      carouselList: [],
      menuList: [],
      Token: localStorage.getItem('Token'),
      username: localStorage.getItem('username'),
      notAdmin: localStorage.getItem('sessionTable') !== 'users',
      iconArr: [
        'el-icon-house',
        'el-icon-location-outline',
        'el-icon-office-building',
        'el-icon-dish',
        'el-icon-guide',
        'el-icon-notebook-2',
        'el-icon-document'
      ]
    }
  },
  created() {
    this.baseUrl = this.$config.baseUrl
    this.menuList = this.$config.indexNav
    this.getCarousel()
  },
  mounted() {
    this.activeIndex = localStorage.getItem('keyPath') || '0'
  },
  watch: {
    $route(newValue) {
      this.menuList.forEach((menu, index) => {
        if (newValue.path === menu.url) {
          this.activeIndex = `${index}`
        }
      })
      this.Token = localStorage.getItem('Token')
      this.username = localStorage.getItem('username')
      this.notAdmin = localStorage.getItem('sessionTable') !== 'users'
    }
  },
  methods: {
    handleSelect(keyPath) {
      if (keyPath) {
        localStorage.setItem('keyPath', keyPath)
      }
    },
    toLogin() {
      this.$router.push('/login')
    },
    logout() {
      localStorage.clear()
      Vue.http.headers.common.Token = ''
      this.$router.push('/index/home')
      this.activeIndex = '0'
      localStorage.setItem('keyPath', this.activeIndex)
      this.Token = ''
      this.$message({
        message: '退出成功',
        type: 'success',
        duration: 1000
      })
    },
    getCarousel() {
      this.$http.get('config/list', { params: { page: 1, limit: 3 } }).then(res => {
        if (res.data.code === 0) {
          this.carouselList = res.data.data.list
        }
      })
    },
    goBackend() {
      window.open('/admin/', '_blank')
    },
    goMenu(path) {
      if (!localStorage.getItem('Token')) {
        this.toLogin()
        return
      }
      this.$router.push(path)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.top-container {
  align-items: center;
  display: flex;
  height: 64px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
  position: relative;
  z-index: 1002;
}

.brand {
  color: #52b548;
  font-size: 30px;
}

.user-actions {
  align-items: center;
  display: flex;
  gap: 16px;
}

.username {
  color: #666;
  font-size: 14px;
}

.primary-action,
.secondary-action {
  border: 0;
  border-radius: 20px;
  font-size: 18px;
  height: 36px;
  line-height: 36px;
  padding: 0 20px;
}

.primary-action {
  background: #4fa946;
  color: #f4f4f5;
}

.secondary-action {
  background: #f4f4f5;
  color: #666;
}

.body-containers {
  background-image: url(http://codegen.caihongy.cn/20221024/3dac00c9fc144901a781afb3b54ec6b8.jpg);
  min-height: 100vh;
  position: relative;
}

.menu-preview {
  background: none;
  height: auto;
  width: 100%;
}

.menu-preview .el-menu-horizontal-demo {
  background: linear-gradient(90deg, rgba(19,154,68,1) 0%, rgba(61,183,105,1) 36%, rgba(12,125,53,1) 100%), rgb(19,154,68);
  border: 0;
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0 auto;
  position: relative;
  width: 100%;
}

.menu-preview .el-menu-horizontal-demo .el-menu-item {
  align-items: center;
  background: none;
  border: 0;
  box-shadow: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  margin: 0 2px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
}

.menu-preview .el-menu-horizontal-demo .el-menu-item:hover,
.menu-preview .el-menu-horizontal-demo .el-menu-item.is-active {
  background: #4bc276;
  border-radius: 8px;
  box-shadow: inset 0 0 2px 0 #b0e8c4;
  color: #fff;
  height: 50px;
  line-height: 50px;
  margin: 5px 2px 0;
}

.menu-preview .el-menu-horizontal-demo i {
  color: inherit;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  margin: 0;
  padding: 0 10px;
  width: 14px;
}

.banner-preview {
  height: 100%;
  margin: 0 0 20px;
  width: 100%;
}

.banner-preview .el-carousel {
  height: 100%;
  margin: 0 auto;
  width: 100%;
}

.banner-preview .el-carousel .el-image,
.banner-preview .el-carousel ::v-deep img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.bottom-preview {
  align-items: center;
  background: #282828;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0 0;
  min-height: 80px;
  padding: 40px 0;
  width: 100%;
}
</style>
