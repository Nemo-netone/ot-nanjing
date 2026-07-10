<template>
  <div>
    <div class="breadcrumb-preview">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>交通路线</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="list-preview">
      <el-form :inline="true" :model="formSearch" class="list-form-pv">
        <el-form-item label="路线名称">
          <el-input v-model="formSearch.luxianmingcheng" placeholder="请输入路线名称" clearable />
        </el-form-item>
        <el-form-item label="路线类型">
          <el-select v-model="formSearch.luxianleixing" placeholder="请选择路线类型" clearable>
            <el-option v-for="item in luxianleixingOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="始发地">
          <el-input v-model="formSearch.shifadi" placeholder="请输入始发地" clearable />
        </el-form-item>
        <el-form-item label="终点地">
          <el-input v-model="formSearch.zhongdiandi" placeholder="请输入终点地" clearable />
        </el-form-item>
        <el-button type="primary" class="action-btn" @click="getList(1)">
          <i class="el-icon-search"></i> 查询
        </el-button>
        <el-button v-if="isAuth('jiaotongluxian', '新增')" type="primary" class="action-btn" @click="add('/index/jiaotongluxianAdd')">
          <i class="el-icon-circle-plus-outline"></i> 添加
        </el-button>
      </el-form>

      <div class="list">
        <div
          v-for="item in dataList"
          :key="item.id"
          class="list-item"
          @click="toDetail(item)"
        >
          <img v-if="firstImage(item.luxiantupian)" :src="firstImage(item.luxiantupian)" class="image">
          <div v-else class="image placeholder-image">交通路线</div>
          <div class="item-info">
            <div class="name">{{ item.luxianmingcheng }}</div>
            <div class="meta">{{ item.luxianleixing }}</div>
            <div class="meta" v-if="item.shifadi || item.zhongdiandi">
              {{ item.shifadi || '-' }} 至 {{ item.zhongdiandi || '-' }}
            </div>
          </div>
        </div>
      </div>

      <el-pagination
        background
        class="pagination"
        :pager-count="7"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        prev-text="上一页"
        next-text="下一页"
        :hide-on-single-page="false"
        :layout="['total', 'prev', 'pager', 'next', 'sizes', 'jumper'].join()"
        :total="total"
        @current-change="curChange"
        @prev-click="prevClick"
        @next-click="nextClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: '',
      formSearch: {
        luxianmingcheng: '',
        luxianleixing: '',
        shifadi: '',
        zhongdiandi: ''
      },
      dataList: [],
      total: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      totalPage: 1,
      luxianleixingOptions: ['公交路线', '地铁路线', '自驾路线', '步行路线']
    }
  },
  created() {
    this.baseUrl = this.$config.baseUrl
    this.getList(1)
  },
  methods: {
    add(path) {
      this.$router.push({ path })
    },
    firstImage(value) {
      if (!value) {
        return ''
      }
      const image = value.split(',')[0]
      return image.indexOf('http') === 0 ? image : `${this.baseUrl}${image}`
    },
    getList(page) {
      const params = { page, limit: this.pageSize }
      if (this.formSearch.luxianmingcheng) params.luxianmingcheng = `%${this.formSearch.luxianmingcheng}%`
      if (this.formSearch.luxianleixing) params.luxianleixing = this.formSearch.luxianleixing
      if (this.formSearch.shifadi) params.shifadi = `%${this.formSearch.shifadi}%`
      if (this.formSearch.zhongdiandi) params.zhongdiandi = `%${this.formSearch.zhongdiandi}%`

      this.$http.get('jiaotongluxian/list', { params }).then(res => {
        if (res.data.code === 0) {
          this.dataList = res.data.data.list || []
          this.total = res.data.data.total || 0
          this.pageSize = res.data.data.pageSize || this.pageSize
          this.totalPage = res.data.data.totalPage || 1
          this.pageSizes = [this.pageSize, this.pageSize * 2, this.pageSize * 3, this.pageSize * 5]
        }
      })
    },
    curChange(page) {
      this.getList(page)
    },
    prevClick(page) {
      this.getList(page)
    },
    nextClick(page) {
      this.getList(page)
    },
    toDetail(item) {
      this.$router.push({ path: '/index/jiaotongluxianDetail', query: { detailObj: JSON.stringify(item) } })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.breadcrumb-preview,
.list-preview {
  margin: 12px auto 0;
  width: 1200px;
}

.breadcrumb-preview {
  background: linear-gradient(284deg, rgba(85, 205, 129, 1) 0%, rgba(61, 183, 105, 1) 100%), #3db769;
  border-radius: 16px;
  padding: 10px;
}

.breadcrumb-preview ::v-deep .el-breadcrumb__inner,
.breadcrumb-preview ::v-deep .el-breadcrumb__separator {
  color: #fff;
}

.list-preview {
  background: none;
  position: relative;
}

.list-form-pv {
  background: #fff;
  border: 2px solid #a4d9b7;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  padding: 18px;
}

.action-btn {
  background: #55b44b;
  border: 0;
  border-radius: 10px;
  height: 42px;
  margin: 0 8px 18px;
}

.list {
  background: #fff;
  border: 2px solid #a4d9b7;
  border-radius: 8px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 20px 0 0;
  padding: 20px;
}

.list-item {
  cursor: pointer;
  display: flex;
  min-height: 150px;
}

.image {
  border-radius: 10px 40px 40px 10px;
  height: 150px;
  object-fit: cover;
  width: 240px;
}

.placeholder-image {
  align-items: center;
  background: #eff8f2;
  color: #3db769;
  display: flex;
  justify-content: center;
}

.item-info {
  background: #eff8f2;
  border-radius: 8px;
  flex: 1;
  margin-left: 24px;
  padding: 16px;
}

.name {
  color: #333;
  font-size: 18px;
  line-height: 32px;
}

.meta {
  color: #666;
  font-size: 14px;
  line-height: 28px;
}

.pagination {
  color: #333;
  margin: 20px auto;
  white-space: nowrap;
  width: 1200px;
}
</style>
