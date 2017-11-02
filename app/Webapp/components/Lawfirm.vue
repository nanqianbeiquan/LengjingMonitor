<template>
    <section class="lawFirm">
    	<div class="container">
	    	<div class="row">
	    	    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
	    	    	<div class="law-firm-b">
	    	    		<header>优秀律师事务所推荐</header>
	    	    	</div>
	    	    </div>
	    	    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
					<div class="law-firm-b">
						<header>律师事务所排名</header>
					</div>
	    	    </div>
	    	</div>
    	</div>
    </section>
</template>

<script>
export default {
    props: [],
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
	.lawFirm{
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
	}
	.law-firm-b{
		border: 1px solid #eee;
		height: 2rem;
		background-color: #fff;
	}
	.law-firm-b header{
		height: 0.2rem;
		line-height: 0.2rem;
		padding-left: 0.1rem;
		border-bottom: 1px solid #eee;
	}
</style>
