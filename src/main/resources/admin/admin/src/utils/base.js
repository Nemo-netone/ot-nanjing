const base = {
    get() {
        const apiBaseUrl = window.NANJING_API_BASE || 'https://ot-nanjing-api-273280-7-1369167244.sh.run.tcloudbase.com/springboot655ms'
        return {
            url : `${apiBaseUrl}/`,
            name: "springboot655ms",
            // 退出到首页链接
            indexUrl: 'https://ot-nanjing.pages.dev/front/'
        };
    },
    getProjectName(){
        return {
            projectName: "南京旅游名胜景点管理系统"
        } 
    }
}
export default base
