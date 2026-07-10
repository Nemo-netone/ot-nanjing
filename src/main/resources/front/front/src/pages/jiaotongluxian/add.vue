<template>
<div :style='{"border":"2px solid #a4d9b7","padding":"20px","margin":"20px auto 0","borderRadius":"8px","flexWrap":"wrap","background":"#fff","width":"1200px","position":"relative"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="200px"
    >
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="璺嚎鍚嶇О" prop="luxianmingcheng">
            <el-input v-model="ruleForm.luxianmingcheng" 
                placeholder="璺嚎鍚嶇О" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}'  label="璺嚎绫诲瀷" prop="luxianleixing">
            <el-select v-model="ruleForm.luxianleixing" placeholder="璇烽€夋嫨璺嚎绫诲瀷"  >
              <el-option
                  v-for="(item,index) in luxianleixingOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="用户名" prop="shifadi">
            <el-input v-model="ruleForm.shifadi" 
                placeholder="请输入内容" clearable></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="用户名" prop="zhongdiandi">
            <el-input v-model="ruleForm.zhongdiandi" 
                placeholder="请输入内容" clearable></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="鍏ㄧ▼璺濈" prop="quanchengjuli">
            <el-input v-model="ruleForm.quanchengjuli" 
                placeholder="鍏ㄧ▼璺濈" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="璺嚎鍥剧墖" v-if="type!='cross' || (type=='cross' && !ro.luxiantupian)" prop="luxiantupian">
            <file-upload
            tip="鐐瑰嚮涓婁紶璺嚎鍥剧墖"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.luxiantupian?ruleForm.luxiantupian:''"
            @change="luxiantupianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' class="upload" v-else label="璺嚎鍥剧墖" prop="luxiantupian">
                <img v-if="ruleForm.luxiantupian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.luxiantupian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.luxiantupian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="璺嚎璇︽儏" prop="luxianxiangqing">
            <editor 
                :style='{"padding":"0","boxShadow":"0 0 0px rgba(155, 198, 146, .5)","margin":"0","borderColor":"#ccc","backgroundColor":"#fff","borderRadius":"8px","borderWidth":"0","width":"80%","borderStyle":"solid","height":"auto"}'
                v-model="ruleForm.luxianxiangqing" 
                class="editor" 
                action="file/upload">
            </editor>
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
            luxianmingcheng : false,
            luxianleixing : false,
            shifadi : false,
            zhongdiandi : false,
            quanchengjuli : false,
            luxianxiangqing : false,
            luxiantupian : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          luxianmingcheng: '',
          luxianleixing: '',
          shifadi: '',
          zhongdiandi: '',
          quanchengjuli: '',
          luxianxiangqing: '',
          luxiantupian: '',
        },
        luxianleixingOptions: [],
        rules: {
          luxianmingcheng: [
          ],
          luxianleixing: [
          ],
          shifadi: [
          ],
          zhongdiandi: [
          ],
          quanchengjuli: [
          ],
          luxianxiangqing: [
          ],
          luxiantupian: [
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
            if(o=='luxianmingcheng'){
              this.ruleForm.luxianmingcheng = obj[o];
              this.ro.luxianmingcheng = true;
              continue;
            }
            if(o=='luxianleixing'){
              this.ruleForm.luxianleixing = obj[o];
              this.ro.luxianleixing = true;
              continue;
            }
            if(o=='shifadi'){
              this.ruleForm.shifadi = obj[o];
              this.ro.shifadi = true;
              continue;
            }
            if(o=='zhongdiandi'){
              this.ruleForm.zhongdiandi = obj[o];
              this.ro.zhongdiandi = true;
              continue;
            }
            if(o=='quanchengjuli'){
              this.ruleForm.quanchengjuli = obj[o];
              this.ro.quanchengjuli = true;
              continue;
            }
            if(o=='luxianxiangqing'){
              this.ruleForm.luxianxiangqing = obj[o];
              this.ro.luxianxiangqing = true;
              continue;
            }
            if(o=='luxiantupian'){
              this.ruleForm.luxiantupian = obj[o].split(",")[0];
              this.ro.luxiantupian = true;
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
        this.luxianleixingOptions = "鐏溅,姹借溅,椋炴満,杞埞".split(',')
      },

    // 澶氱骇鑱斿姩鍙傛暟
      // 澶氱骇鑱斿姩鍙傛暟
      info(id) {
        this.$http.get('jiaotongluxian/detail/${id}', {emulateJSON: true}).then(res => {
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
                 this.$http.get('jiaotongluxian/list', {
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


                          this.$http.post('jiaotongluxian/add', this.ruleForm).then(res => {
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


                  this.$http.post('jiaotongluxian/add', this.ruleForm).then(res => {
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
      luxiantupianUploadChange(fileUrls) {
          this.ruleForm.luxiantupian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
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

