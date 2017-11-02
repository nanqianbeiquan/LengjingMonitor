<template>
    <div id="modalnewsdetail">
        <div class="modal" id="newsdetailmodal" tabindex="-1">
            <div class="modal-dialog" id="news-detail-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title news-detail-title">{{newsDetail.title}}</h4>
                    </div>
                    <div class="modal-body" id="modal-body-news-detail">
                        <!-- {{newsDetail.content}} -->
                        <div id="news-detail-content"></div>
                            <br/>
                            <p>{{newsDetail.source}}</p>
                            <p>{{newsDetail.url}}</p>
                        </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
export default {
    props: ['newsDetail'],
    data () {
        return {
            
        }
    },
    methods: {
        // clickCloseButton: function() {
        //     this.$dispatch('closeButtonClicked');
        // }

    }
}
</script>

<style>
    .news-detail-title{
        text-align: center;
    }
    #modal-body-news-detail a{
        pointer-events:none;
    }
    @media (min-width:768px){
        #modal-body-news-detail{
            padding:20px 10px;
        }
    }
    @media (min-width:992px){
        #modal-body-news-detail{
            padding:20px 100px;
        }
    }
    @media (min-width:1200px){
        #modal-body-news-detail{
            padding:20px 200px;
        }
    }
    #modal-body-news-detail{
        overflow: auto;
    }
</style>
