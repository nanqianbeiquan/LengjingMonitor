// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

// export function getCount (state) {
//   return state.count
// }
var getter = {
	getCount:function(state) {
		return state.count;
	},
	getScatterData: function(state){
		return state.scatterData;
	},
	getStatisticsData: function(state){
		return state.statisticsData;
	}
}
























//导出读取数据对象getter
 module.exports = {
	getter: getter
}