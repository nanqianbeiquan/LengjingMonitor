<template>
    <section class="radar-monitor">
    	<div class="container">
	    	<div class="row">
	    	    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
					<div class="radarG">
						<header>
							<p>企业各维度风险雷达监控</p>
							<button @click='refreashMonitor'><span class="glyphicon glyphicon-refresh"></span></button>
						</header>
						<div class="rm-legend outer">
							<p v-for='(index,l) in legend'>
								<span class="rm-l-rect" :class="'rm-l-rect-'+index"></span><span>{{l}}</span>
							</p>
							<div>{{time}}</div>
						</div>
						<ul>
							<li v-for='(index,comp) in monitorComps'>
								<h6>
									<a href="./companyDatails.jsp?key={{comp}}" style="text-decoration:none">{{comp}}</a></h6>
								<div id="radar{{index}}" class="radar"></div>
							</li>
						</ul>
					</div>
	    	    </div>
	    	    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
	    	    	<div class="monitorLists">
	    	    		<header>监控企业</header>
	    	    		<ul>
	    	    			<li v-for='(index,comp) in monitorComps'>
	    	    				<a href="./companyDatails.jsp?key={{comp}}" style="text-decoration:none">
	    	    					{{comp}}
	    	    				</a>
	    	    				<button @click='deleteComp(index)'>X</button>
	    	    			</li>
	    	    		</ul>
	    	    	</div>
	    	    </div>
	    	</div>
	   	</div>
    </section>
</template>

<script>
export default {
    props: ['monitorComps','time'],
    data () {
        return {
            msg: 'Hello Vue!',
            legend: ['无风险','低风险','中风险','高风险']
        }
    },
    computed: {
  
    },
    methods: {
        deleteComp: function(index) {
            this.$dispatch('deleteCompCalled',index);
        },
        refreashMonitor: function(){
        	this.$dispatch('refreashMonitorCalled');
        }
    }
}
</script>

<style>
	/*提示框样式*/
	.mouseTooltip{
		position: absolute;
		background: rgba(33,33,33,0.5);
		border-radius: 5px;
		color: #fff;
		padding: 2px;
	}
	/*提示框样式*/
	.radar-monitor{
		position: relative;
		min-height: 500px;
		-webkit-font-smoothing: antialiased; 
		-moz-osx-font-smoothing: antialiased;
	}
	.radar-monitor header{
		width: 100%;
		height: 40px;
		color: #fff;
		font-size: 16px;
		font-weight: 800;
		line-height: 40px;
		background-color: brown;
		padding-left: 20px;
		position: relative;
	}
	.rm-legend{
		padding-top:20px;
		padding-left: 10px;
	}
	.rm-legend p{
		display: inline-block;
		margin-right: 20px;
	}
	.rm-l-rect{
		display: inline-block;
		width: 10px;
		height: 10px;
		margin-right: 5px;
	}
	.rm-l-rect-0{
		background-color: green;
	}
	.rm-l-rect-1{
		background-color: #d6dd3a;
	}
	.rm-l-rect-2{
		background-color: orange;
	}
	.rm-l-rect-3{
		background-color: #ff0000;
	}
	.rm-legend div{
		float: right;
		padding-right: 10px;
	}

	/*左侧*/
	.radarG{
		width: 100%;
		background-color: #fff;
		margin:20px 0;
	}
	.radarG header button{
		font-size: 18px;
		color: #fff;
		background-color: transparent;
		border:none;
		outline: none;
		position: absolute;
		top: 9px;
		right: 10px;
	}
	.radarG ul{
		width: 100%;
	    padding-left: 1%;
	}
	.radarG ul li{
		display: inline-block;
		margin: 20px 1%;
		width: 31%;
		font-size: 14px;
		color: #555;
		text-align: center;
	}
	.radarG ul li h6{
		margin: 10px 0;
	}
	.radar{
		width: 100%;
		height: 250px;
		border: 1px solid #eee;
	}

	/*右侧*/
	.monitorLists{
		background-color: #fff;
		padding-bottom: 20px;
		margin: 20px 0;
	}
	.monitorLists ul li{
		list-style: none;
		margin: 10px 0 0 10px;
	}
	.monitorLists ul li button{
		color: #888;
		background-color: transparent;
		border:none;
		outline: none;
	}
</style>
