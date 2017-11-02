import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
  // TODO: 放置初始状态
  count: 0,
  scatterData: null, //法律分析数据初始化
  statisticsData:{
    executedSum: 0,                     //目前在执行中的被执行人总个数
    executedTotal: 0,                   //目前在执行中的被执行人执行标的总额
    notDiscloseSum: 0,                  //已结案或全国法院被执行人查询平台已不披露的被执行人总个数
    notDiscloseTotal: 0,                //已结案或全国法院被执行人查询平台已不披露的被执行人的执行标的总额
    dishonestExecutedSum:0,             //目前未履行的失信被执行人个数
    quitDishonestExecutedSum:0,         //失信记录已退出的失信被执行人个数
    caseSum:0,                          //涉诉案件总数
    accuserSum:0,                       //原告案件总数
    accusedSum:0,                        //被告案件总数
    thirdPersonSum:0                    //第三人总数
  },//司法统计数据
  compHistoryData:[], //企业司法历年统计数据
  compCaseType:[], // 企业所涉及的案由所对应的案件个数
  compCaseGeo:[], // 企业案子地域分布
  compCaseGeoPY:[], // 历年企业案子地域分布
  showTabVal: 0, // 切换案子关联纵坐标
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // 更新公司司法统计数据
  REFRESHCOMPDATA (state, data){
    state.statisticsData.executedSum = +data.zxzs || 0;
    state.statisticsData.executedTotal = (+data.bdze || 0).toFixed(2);
    state.statisticsData.notDiscloseSum = +data.jazxzs || 0;
    state.statisticsData.notDiscloseTotal = (+data.jabdze || 0).toFixed(2);
    state.statisticsData.dishonestExecutedSum = +data.wlxrs || 0;
    state.statisticsData.quitDishonestExecutedSum = +data.tcrs || 0;
    state.statisticsData.caseSum = +data.ajzs || 0;
    state.statisticsData.accuserSum = +data.ygzs || 0;
    state.statisticsData.accusedSum = +data.bgzs || 0;
    state.statisticsData.thirdPersonSum = +data.dsrzs || 0;
  },
  // 更新公司司法历年统计数据
  REFRESHCOMPHISTORYDATA (state, data){
    state.compHistoryData = [];
    if(data.length != 0){
      for(var i=0; i<data.length; i++){
        state.compHistoryData[i]=data[i];
      }
    }else{
      state.compHistoryData = [];
    }
  },
  // 更新公司司法案由所对应的案件个数
  REFRESHCOMPCASETYPE (state, data){
    state.compCaseType = [];
    if(data.length != 0){
      for(var i=0; i<data.length; i++){
        state.compCaseType[i]=data[i];
      }
    }else{
      state.compCaseType = [];
    }
  },
  // 数据恢复默认状态
  DEFAULTSETTING (state, data){
    state.statisticsData={
      executedSum: 0,                     //目前在执行中的被执行人总个数
      executedTotal: 0,                   //目前在执行中的被执行人执行标的总额
      notDiscloseSum: 0,                  //已结案或全国法院被执行人查询平台已不披露的被执行人总个数
      notDiscloseTotal: 0,                //已结案或全国法院被执行人查询平台已不披露的被执行人的执行标的总额
      dishonestExecutedSum:0,             //目前未履行的失信被执行人个数
      quitDishonestExecutedSum:0,         //失信记录已退出的失信被执行人个数
      caseSum:0,                          //涉诉案件总数
      accuserSum:0,                       //原告案件总数
      accusedSum:0,                       //被告案件总数
      thirdPersonSum:0                    //第三人总数
    };//司法统计数据
    state.compHistoryData=[]; //企业司法历年统计数据
    state.compCaseType=[]; // 企业所涉及的案由所对应的案件个数
    state.compCaseGeo = []; // 所诉案件地域分布
    state.compCaseGeoPY = []; // 历年所诉案件地域分布
  },
  REFRESHCOMPCASEGEO (state, data){
    state.compCaseGeo = [];
    if(data.length != 0){
      for(var i=0; i<data.length; i++){
        state.compCaseGeo[i]=data[i];
      }
    }else{
      state.compCaseGeo = [];
    }
  },
  REFRESHCOMPCASEGEOPY (state, data){
    state.compCaseGeoPY = [];
    if(data.length != 0){
      for(var i=0; i<data.length; i++){
        state.compCaseGeoPY[i]=data[i];
      }
    }else{
      state.compCaseGeoPY = [];
    }
  },

  // 案子关联切换纵坐标
  TOGGLETAB (state, amount) {
    state.showTabVal = amount;
  },


  // TODO: 放置我们的状态变更函数
  INCREMENT (state, amount) {
    state.count = state.count + amount
	},
	subtract (state, amount) {
    state.count = state.count - amount
	},
  UPDATA (state, scatterData) {
    state.scatterData = scatterData;
  }
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations
})