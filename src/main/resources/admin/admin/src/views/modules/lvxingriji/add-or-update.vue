<template>
	<div class="addEdit-block" style="width: 100%;">
		<el-form
			:style='{"padding":"30px","boxShadow":"0 0px 0px rgba(64, 158, 255, .3)","margin":"-30px 0 0","borderRadius":"0 0 30px 30px","flexWrap":"wrap","background":"#F8F6F7","display":"flex","width":"100%"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="120px"
		>
			<template >
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="鏃呰鍦扮偣" prop="lvxingdidian">
					<el-input v-model="ruleForm.lvxingdidian" placeholder="鏃呰鍦扮偣" clearable  :readonly="ro.lvxingdidian"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="鏃呰鍦扮偣" prop="lvxingdidian">
					<el-input v-model="ruleForm.lvxingdidian" placeholder="鏃呰鍦扮偣" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="select" v-if="type!='info'"  label="鏃呰绫诲瀷" prop="lvxingleixing">
					<el-select :disabled="ro.lvxingleixing" v-model="ruleForm.lvxingleixing" placeholder="璇烽€夋嫨鏃呰绫诲瀷" >
						<el-option
							v-for="(item,index) in lvxingleixingOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="鏃呰绫诲瀷" prop="lvxingleixing">
					<el-input v-model="ruleForm.lvxingleixing"
						placeholder="鏃呰绫诲瀷" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="鏃呰澶╂暟" prop="lvxingtianshu">
					<el-input v-model="ruleForm.lvxingtianshu" placeholder="鏃呰澶╂暟" clearable  :readonly="ro.lvxingtianshu"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="鏃呰澶╂暟" prop="lvxingtianshu">
					<el-input v-model="ruleForm.lvxingtianshu" placeholder="鏃呰澶╂暟" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="upload" v-if="type!='info' && !ro.lvxingtupian" label="鏃呰鍥剧墖" prop="lvxingtupian">
					<file-upload
						tip="鐐瑰嚮涓婁紶鏃呰鍥剧墖"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.lvxingtupian?ruleForm.lvxingtupian:''"
						@change="lvxingtupianUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="upload" v-else-if="ruleForm.lvxingtupian" label="鏃呰鍥剧墖" prop="lvxingtupian">
					<img v-if="ruleForm.lvxingtupian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.lvxingtupian.split(',')[0]" width="100" height="100">
					<img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.lvxingtupian.split(',')" :src="$base.url+item" width="100" height="100">
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="璐﹀彿" prop="zhanghao">
					<el-input v-model="ruleForm.zhanghao" placeholder="璐﹀彿" clearable  :readonly="ro.zhanghao"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="璐﹀彿" prop="zhanghao">
					<el-input v-model="ruleForm.zhanghao" placeholder="璐﹀彿" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="濮撳悕" prop="xingming">
					<el-input v-model="ruleForm.xingming" placeholder="濮撳悕" clearable  :readonly="ro.xingming"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else class="input" label="濮撳悕" prop="xingming">
					<el-input v-model="ruleForm.xingming" placeholder="濮撳悕" readonly></el-input>
				</el-form-item>
			</template>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-if="type!='info'"  label="鏃呰鍐呭" prop="lvxingneirong">
					<editor 
						style="min-width: 200px; max-width: 600px;"
						v-model="ruleForm.lvxingneirong" 
						class="editor" 
						action="file/upload">
					</editor>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px 0"}' v-else-if="ruleForm.lvxingneirong" label="鏃呰鍐呭" prop="lvxingneirong">
                    <span :style='{"fontSize":"14px","lineHeight":"40px","color":"#000","fontWeight":"500","display":"inline-block"}' v-html="ruleForm.lvxingneirong"></span>
                </el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0","margin":"0"}' class="btn">
				<el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"0","background":"#67D4B2","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">鎻愪氦</el-button>
				<el-button :style='{"border":"0px solid rgba(64, 158, 255, 1)","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#fff","borderRadius":"0","background":"#67D4B2","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type!='info'" class="btn-close" @click="back()">鍙栨秷</el-button>
				<el-button :style='{"border":"0px solid rgba(64, 158, 255, 1)","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#fff","borderRadius":"0","background":"#67D4B2","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type=='info'" class="btn-close" @click="back()">杩斿洖</el-button>
			</el-form-item>
		</el-form>
    

  </div>
</template>
<script>
// 鏁板瓧锛岄偖浠讹紝鎵嬫満锛寀rl锛岃韩浠借瘉鏍￠獙
import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
	data() {
		let self = this
		var validateIdCard = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!checkIdCard(value)) {
				callback(new Error("请输入正确的身份证号码"));
			} else {
				callback();
			}
		};
		var validateUrl = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isURL(value)) {
				callback(new Error("璇疯緭鍏ユ纭殑URL鍦板潃"));
			} else {
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isMobile(value)) {
				callback(new Error("璇疯緭鍏ユ纭殑鎵嬫満鍙风爜"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isPhone(value)) {
				callback(new Error("璇疯緭鍏ユ纭殑鐢佃瘽鍙风爜"));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isEmail(value)) {
				callback(new Error("璇疯緭鍏ユ纭殑閭鍦板潃"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isNumber(value)) {
				callback(new Error("请输入数字"));
			} else {
				callback();
			}
		};
		var validateIntNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			id: '',
			type: '',
			
			
			ro:{
				lvxingdidian : false,
				lvxingleixing : false,
				lvxingtianshu : false,
				lvxingneirong : false,
				lvxingtupian : false,
				zhanghao : false,
				xingming : false,
				thumbsupnum : false,
				crazilynum : false,
			},
			
			
			ruleForm: {
				lvxingdidian: '',
				lvxingleixing: '',
				lvxingtianshu: '',
				lvxingneirong: '',
				lvxingtupian: '',
				zhanghao: '',
				xingming: '',
			},
		
			lvxingleixingOptions: [],
			
			rules: {
				lvxingdidian: [
				],
				lvxingleixing: [
				],
				lvxingtianshu: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				lvxingneirong: [
				],
				lvxingtupian: [
				],
				zhanghao: [
				],
				xingming: [
				],
				thumbsupnum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				crazilynum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
			}
		};
	},
	props: ["parent"],
	computed: {



	},
	created() {
	},
	methods: {
		
		// 涓嬭浇
		download(file){
			window.open(`${file}`)
		},
		// 鍒濆鍖?
		init(id,type) {
			if (id) {
				this.id = id;
				this.type = type;
			}
			if(this.type=='info'||this.type=='else'){
				this.info(id);
			}else if(this.type=='logistics'){
				this.logistics=false;
				this.info(id);
			}else if(this.type=='cross'){
				var obj = this.$storage.getObj('crossObj');
				for (var o in obj){
						if(o=='lvxingdidian'){
							this.ruleForm.lvxingdidian = obj[o];
							this.ro.lvxingdidian = true;
							continue;
						}
						if(o=='lvxingleixing'){
							this.ruleForm.lvxingleixing = obj[o];
							this.ro.lvxingleixing = true;
							continue;
						}
						if(o=='lvxingtianshu'){
							this.ruleForm.lvxingtianshu = obj[o];
							this.ro.lvxingtianshu = true;
							continue;
						}
						if(o=='lvxingneirong'){
							this.ruleForm.lvxingneirong = obj[o];
							this.ro.lvxingneirong = true;
							continue;
						}
						if(o=='lvxingtupian'){
							this.ruleForm.lvxingtupian = obj[o];
							this.ro.lvxingtupian = true;
							continue;
						}
						if(o=='zhanghao'){
							this.ruleForm.zhanghao = obj[o];
							this.ro.zhanghao = true;
							continue;
						}
						if(o=='xingming'){
							this.ruleForm.xingming = obj[o];
							this.ro.xingming = true;
							continue;
						}
						if(o=='thumbsupnum'){
							this.ruleForm.thumbsupnum = obj[o];
							this.ro.thumbsupnum = true;
							continue;
						}
						if(o=='crazilynum'){
							this.ruleForm.crazilynum = obj[o];
							this.ro.crazilynum = true;
							continue;
						}
				}
				









			}
			
			
			// 鑾峰彇鐢ㄦ埛淇℃伅
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					
					var json = data.data;
					if(((json.zhanghao!=''&&json.zhanghao) || json.zhanghao==0) && this.$storage.get("role") !== "\u7ba1\u7406\u5458"){
						this.ruleForm.zhanghao = json.zhanghao
						this.ro.zhanghao = true;
					}
					if(((json.xingming!=''&&json.xingming) || json.xingming==0) && this.$storage.get("role") !== "\u7ba1\u7406\u5458"){
						this.ruleForm.xingming = json.xingming
						this.ro.xingming = true;
					}
				} else {
					this.$message.error(data.msg);
				}
			});
			
            this.lvxingleixingOptions = "鍛ㄦ湯娓?璺熷洟娓?鑷娓?绉佸鍥?涓€鏃ユ父".split(',')
			
		},
    // 澶氱骇鑱斿姩鍙傛暟

    info(id) {
      this.$http({
        url: `lvxingriji/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //瑙ｅ喅鍓嶅彴涓婁紶鍥剧墖鍚庡彴涓嶆樉绀虹殑闂
        let reg=new RegExp('../../../upload','g')//g浠ｈ〃鍏ㄩ儴
        this.ruleForm.lvxingneirong = this.ruleForm.lvxingneirong.replace(reg,'../../../springboot655ms/upload');
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 鎻愪氦
    onSubmit() {










	if(this.ruleForm.lvxingtupian!=null) {
		this.ruleForm.lvxingtupian = this.ruleForm.lvxingtupian.replace(new RegExp(this.$base.url,"g"),"");
	}









var objcross = this.$storage.getObj('crossObj');

      //鏇存柊璺ㄨ〃灞炴€?
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(statusColumnName && !statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
       this.$refs["ruleForm"].validate(valid => {
         if (valid) {
		 if(crossrefid && crossuserid) {
			 this.ruleForm.crossuserid = crossuserid;
			 this.ruleForm.crossrefid = crossrefid;
			let params = { 
				page: 1, 
				limit: 10, 
				crossuserid:this.ruleForm.crossuserid,
				crossrefid:this.ruleForm.crossrefid,
			} 
			this.$http({ 
				url: "lvxingriji/page", 
				method: "get", 
				params: params 
			}).then(({ 
				data 
			}) => { 
				if (data && data.code === 0) { 
				       if(data.data.total>=crossoptnum) {
					     this.$message.error(this.$storage.get('tips'));
					       return false;
				       } else {
					 this.$http({
					   url: `lvxingriji/${!this.ruleForm.id ? "save" : "update"}`,
					   method: "post",
					   data: this.ruleForm
					 }).then(({ data }) => {
					   if (data && data.code === 0) {
					     this.$message({
					       message: "鎿嶄綔鎴愬姛",
					       type: "success",
					       duration: 1500,
					       onClose: () => {
						 this.parent.showFlag = true;
						 this.parent.addOrUpdateFlag = false;
						 this.parent.lvxingrijiCrossAddOrUpdateFlag = false;
						 this.parent.search();
						 this.parent.contentStyleChange();
					       }
					     });
					   } else {
					     this.$message.error(data.msg);
					   }
					 });

				       }
				} else { 
				} 
			});
		 } else {
			 this.$http({
			   url: `lvxingriji/${!this.ruleForm.id ? "save" : "update"}`,
			   method: "post",
			   data: this.ruleForm
			 }).then(({ data }) => {
			   if (data && data.code === 0) {
			     this.$message({
			       message: "鎿嶄綔鎴愬姛",
			       type: "success",
			       duration: 1500,
			       onClose: () => {
				 this.parent.showFlag = true;
				 this.parent.addOrUpdateFlag = false;
				 this.parent.lvxingrijiCrossAddOrUpdateFlag = false;
				 this.parent.search();
				 this.parent.contentStyleChange();
			       }
			     });
			   } else {
			     this.$message.error(data.msg);
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
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.lvxingrijiCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    lvxingtupianUploadChange(fileUrls) {
	    this.ruleForm.lvxingtupian = fileUrls;
    },
  }
};
</script>
<style lang="scss" scoped>
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item ::v-deep .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  color: #666;
	  	  font-weight: 500;
	  	  width: 120px;
	  	  font-size: 14px;
	  	  line-height: 40px;
	  	  text-align: center;
	  	}
	
	.add-update-preview .el-form-item ::v-deep .el-form-item__content {
	  margin-left: 120px;
	}
	
	.add-update-preview .el-input ::v-deep .el-input__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 0;
	  	  padding: 0 12px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: #000;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-select ::v-deep .el-input__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 0;
	  	  padding: 0 10px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: #000;
	  	  width: 300px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor ::v-deep .el-input__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 0;
	  	  padding: 0 10px 0 30px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: #000;
	  	  width: 300px;
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
	  	  border: 2px solid #797979;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #797979;
	  	  width: 90px;
	  	  font-size: 32px;
	  	  line-height: 90px;
	  	  text-align: center;
	  	  height: 90px;
	  	}
	
	.add-update-preview ::v-deep .el-upload-list .el-upload-list__item {
	  	  border: 2px solid #797979;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #797979;
	  	  width: 90px;
	  	  font-size: 32px;
	  	  line-height: 90px;
	  	  text-align: center;
	  	  height: 90px;
	  	}
	
	.add-update-preview ::v-deep .el-upload .el-icon-plus {
	  	  border: 2px solid #797979;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #797979;
	  	  width: 90px;
	  	  font-size: 32px;
	  	  line-height: 90px;
	  	  text-align: center;
	  	  height: 90px;
	  	}
	
	.add-update-preview .el-textarea ::v-deep .el-textarea__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 0;
	  	  padding: 12px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: #000;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 120px;
	  	}
</style>

