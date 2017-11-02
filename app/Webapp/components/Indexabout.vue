<template>
    <footer class="indexAbout">
    	<div class="about outer">
    		<ul>
    			<li><a href="#">关于我们</a></li>
    			<li><a href="#">诚聘英才</a></li>
    		</ul>
    		<ul>
    			<li>联系方式</li>
    			<li>电话：0000-0000</li>
    			<li>QQ：000000</li>
    			<li>联系地址：＃＃＃＃＃＃＃＃＃</li>
    		</ul>
    	</div>
    </footer>
</template>

<script>
export default {
    props: ['searchForm'],
    data () {
        return {
            msg: 'Hello Vue!'
        }
    },
    methods: {
        // clickSearchButton: function() {
        //     this.$dispatch('renderGraphBySearchData');
        // }
    }
}
</script>

<style>
	.indexAbout{
		width: 100%;
		height: 1.5rem;
		background-color: #171b24;
		padding: 0.2rem;
		font-size: 0.07rem;
		color: #fff;
	}
	.about{
		width: 90%;
	}
	.about ul{
		float: left;
		margin-right: 0.4rem;
	}
	.about ul li{
		list-style: none;
	}
</style>
