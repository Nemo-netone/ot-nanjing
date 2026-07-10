<template>
<div :style='{"border":"2px solid #a4d9b7","padding":"20px","margin":"20px auto 0","borderRadius":"8px","flexWrap":"wrap","background":"#fff","width":"1200px","position":"relative"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="200px"
    >
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="鍩庡競" prop="chengshi">
            <el-input v-model="ruleForm.chengshi" 
                placeholder="鍩庡競" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="灏侀潰" v-if="type!='cross' || (type=='cross' && !ro.fengmian)" prop="fengmian">
            <file-upload
            tip="鐐瑰嚮涓婁紶灏侀潰"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.fengmian?ruleForm.fengmian:''"
            @change="fengmianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' class="upload" v-else label="灏侀潰" prop="fengmian">
                <img v-if="ruleForm.fengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.fengmian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.fengmian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}'  label="澶╂皵" prop="tianqi">
            <el-select v-model="ruleForm.tianqi" placeholder="璇烽€夋嫨澶╂皵"  >
              <el-option
                  v-for="(item,index) in tianqiOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="姘旀俯" prop="qiwen">
            <el-input v-model="ruleForm.qiwen" 
                placeholder="姘旀俯" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="婀垮害" prop="shidu">
            <el-input v-model="ruleForm.shidu" 
                placeholder="婀垮害" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}'  label="椋庡悜" prop="fengxiang">
            <el-select v-model="ruleForm.fengxiang" placeholder="璇烽€夋嫨椋庡悜"  >
              <el-option
                  v-for="(item,index) in fengxiangOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}'  label="用户名" prop="fengsu">
            <el-select v-model="ruleForm.fengsu" placeholder="璇烽€夋嫨椋庨€?  >
              <el-option
                  v-for="(item,index) in fengsuOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}'  label="閫傚疁鍑鸿" prop="shiyichuxing">
            <el-select v-model="ruleForm.shiyichuxing" placeholder="璇烽€夋嫨閫傚疁鍑鸿"  >
              <el-option
                  v-for="(item,index) in shiyichuxingOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="绌胯。鎺ㄨ崘" prop="chuanyituijian">
            <el-input v-model="ruleForm.chuanyituijian" 
                placeholder="绌胯。鎺ㄨ崘" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="鏇存柊鏃堕棿" prop="gengxinshijian" >
              <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.gengxinshijian" 
                  type="datetime"
                  placeholder="鏇存柊鏃堕棿">
              </el-date-picker>
          </el-form-item>

      <el-form-item :style='{"padding":"0","margin":"8px 0 0 0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"20px 40px 20px 260px","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"20px","background":"#47b144","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">鎻愪氦</el-button>
        <el-button :style='{"border":"2px solid #3db769","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#3db769","borderRadius":"20px","background":"rgba(255, 255, 255, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">杩斿洖</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        baseUrl: '',
        ro:{
            chengshi : false,
            fengmian : false,
            tianqi : false,
            qiwen : false,
            shidu : false,
            fengxiang : false,
            fengsu : false,
            shiyichuxing : false,
            chuanyituijian : false,
            gengxinshijian : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          chengshi: '',
          fengmian: '',
          tianqi: '',
          qiwen: '',
          shidu: '',
          fengxiang: '',
          fengsu: '',
          shiyichuxing: '',
          chuanyituijian: '',
          gengxinshijian: '',
        },
        tianqiOptions: [],
        fengxiangOptions: [],
        fengsuOptions: [],
        shiyichuxingOptions: [],
        rules: {
          chengshi: [
          ],
          fengmian: [
          ],
          tianqi: [
          ],
          qiwen: [
          ],
          shidu: [
          ],
          fengxiang: [
          ],
          fengsu: [
          ],
          shiyichuxing: [
          ],
          chuanyituijian: [
          ],
          gengxinshijian: [
          ],
        },
      };
    },
    computed: {



    },
    created() {
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 涓嬭浇
      download(file){
        window.open(`${file}`)
      },
      // 鍒濆鍖?
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='chengshi'){
              this.ruleForm.chengshi = obj[o];
              this.ro.chengshi = true;
              continue;
            }
            if(o=='fengmian'){
              this.ruleForm.fengmian = obj[o].split(",")[0];
              this.ro.fengmian = true;
              continue;
            }
            if(o=='tianqi'){
              this.ruleForm.tianqi = obj[o];
              this.ro.tianqi = true;
              continue;
            }
            if(o=='qiwen'){
              this.ruleForm.qiwen = obj[o];
              this.ro.qiwen = true;
              continue;
            }
            if(o=='shidu'){
              this.ruleForm.shidu = obj[o];
              this.ro.shidu = true;
              continue;
            }
            if(o=='fengxiang'){
              this.ruleForm.fengxiang = obj[o];
              this.ro.fengxiang = true;
              continue;
            }
            if(o=='fengsu'){
              this.ruleForm.fengsu = obj[o];
              this.ro.fengsu = true;
              continue;
            }
            if(o=='shiyichuxing'){
              this.ruleForm.shiyichuxing = obj[o];
              this.ro.shiyichuxing = true;
              continue;
            }
            if(o=='chuanyituijian'){
              this.ruleForm.chuanyituijian = obj[o];
              this.ro.chuanyituijian = true;
              continue;
            }
            if(o=='gengxinshijian'){
              this.ruleForm.gengxinshijian = obj[o];
              this.ro.gengxinshijian = true;
              continue;
            }
          }
        }
        // 鑾峰彇鐢ㄦ埛淇℃伅
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.tianqiOptions = "鏅村ぉ,闃村ぉ,灏忛洦,涓洦,澶ч洦,鏆撮洦,闃甸洦,闄嶉洩,鍐伴浌".split(',')
        this.fengxiangOptions = "鍖?涓滃寳,涓?涓滃崡,鍗?瑗垮崡,瑗?瑗垮寳".split(',')
        this.fengsuOptions = "鏃犻,杞,杞婚,寰,鍜岄,鍔查,寮洪,鐤鹃,澶ч,鐑堥,鐙傞,鏆撮,鍙伴".split(',')
        this.shiyichuxingOptions = '是,否'.split(',')
      },

    // 澶氱骇鑱斿姩鍙傛暟
      // 澶氱骇鑱斿姩鍙傛暟
      info(id) {
        this.$http.get('tianqiyubao/detail/${id}', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 鎻愪氦
      onSubmit() {

        //鏇存柊璺ㄨ〃灞炴€?
        var crossuserid;
        var crossrefid;
        var crossoptnum;
        this.$refs["ruleForm"].validate(valid => {
          if(valid) {
            if(this.type=='cross'){
                 var statusColumnName = localStorage.getItem('statusColumnName');
                 var statusColumnValue = localStorage.getItem('statusColumnValue');
                 if(statusColumnName && statusColumnName!='') {
                     var obj = JSON.parse(localStorage.getItem('crossObj'));
                     if(!statusColumnName.startsWith("[")) {
                         for (var o in obj){
                             if(o==statusColumnName){
                                 obj[o] = statusColumnValue;
                             }
                         }
                         var table = localStorage.getItem('crossTable');
                         this.$http.post(table+'/update', obj).then(res => {});
                     } else {
                            crossuserid=Number(localStorage.getItem('userid'));
                            crossrefid=obj['id'];
                            crossoptnum=localStorage.getItem('statusColumnName');
                            crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                     }
                 }
            }
            if(crossrefid && crossuserid) {
                 this.ruleForm.crossuserid=crossuserid;
                 this.ruleForm.crossrefid=crossrefid;
                 var params = {
                     page: 1,
                     limit: 10,
                     crossuserid:crossuserid,
                     crossrefid:crossrefid,
                 }
                 this.$http.get('tianqiyubao/list', {
                  params: params
                 }).then(res => {
                     if(res.data.data.total>=crossoptnum) {
                         this.$message({
                          message: localStorage.getItem('tips'),
                          type: 'success',
                          duration: 1500,
                         });
                          return false;
                     } else {
                         // 璺ㄨ〃璁＄畻


                          this.$http.post('tianqiyubao/add', this.ruleForm).then(res => {
                              if (res.data.code == 0) {
                                  this.$message({
                                      message: '鎿嶄綔鎴愬姛',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              } else {
                                  this.$message({
                                      message: res.data.msg,
                                      type: 'error',
                                      duration: 1500
                                  });
                              }
                          });
                     }
                 });
             } else {


                  this.$http.post('tianqiyubao/add', this.ruleForm).then(res => {
                     if (res.data.code == 0) {
                          this.$message({
                              message: '鎿嶄綔鎴愬姛',
                              type: 'success',
                              duration: 1500,
                              onClose: () => {
                                  this.$router.go(-1);
                              }
                          });
                      } else {
                          this.$message({
                              message: res.data.msg,
                              type: 'error',
                              duration: 1500
                          });
                      }
                  });
             }
          }
        });
      },
      // 鑾峰彇uuid
      getUUID () {
        return new Date().getTime();
      },
      // 杩斿洖
      back() {
        this.$router.go(-1);
      },
      fengmianUploadChange(fileUrls) {
          this.ruleForm.fengmian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item ::v-deep .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 200px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item ::v-deep .el-form-item__content {
	  margin-left: 200px;
	}
	
	.add-update-preview .el-input ::v-deep .el-input__inner {
	  border: 1px solid #9ce0b5;
	  border-radius: 4px;
	  padding: 0 12px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  outline: none;
	  color: #666;
	  width: 80%;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-select ::v-deep .el-input__inner {
	  border: 1px solid #9ce0b5;
	  border-radius: 4px;
	  padding: 0 10px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  outline: none;
	  color: #666;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor ::v-deep .el-input__inner {
	  border: 1px solid #9ce0b5;
	  border-radius: 4px;
	  padding: 0 10px 0 30px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  outline: none;
	  color: #666;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview ::v-deep .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview ::v-deep .upload .upload-img {
	  border: 1px solid #9ce0b5;
	  cursor: pointer;
	  border-radius: 6px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  color: #3db769;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview ::v-deep .el-upload-list .el-upload-list__item {
	  border: 1px solid #9ce0b5;
	  cursor: pointer;
	  border-radius: 6px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  color: #3db769;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview ::v-deep .el-upload .el-icon-plus {
	  border: 1px solid #9ce0b5;
	  cursor: pointer;
	  border-radius: 6px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  color: #3db769;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview .el-textarea ::v-deep .el-textarea__inner {
	  border: 1px solid #9ce0b5;
	  border-radius: 4px;
	  padding: 12px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  outline: none;
	  color: #666;
	  width: 80%;
	  font-size: 14px;
	  min-height: 180px;
	}
</style>

