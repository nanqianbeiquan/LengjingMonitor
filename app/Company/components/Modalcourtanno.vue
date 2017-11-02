<template>
    <div id="modalcourtAnnoun">
        <div class="modal" id="courtAnnounmodal" tabindex="-1">
            <div class="modal-dialog" id="courtAnnoun-modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title modalcourtAnnoun">开庭公告</h4>
                    </div>
                    <div class="modal-body">
                        <div>
                            <table class="table table-hover">
                                <tr>
                                    <td class="infoAnnounDate">公告日期</td>
                                    <td class="infoAnnounType">公告类型</td>
                                    <td class="infoAnnounName">法院名称</td>
                                    <td>公告内容</td>
                                </tr>
                                <tr v-for="courtAnnoun in nodeInfo.courtAnnoun">
                                    <td>{{courtAnnoun['bltin:pub_date']}}</td>
                                    <td>{{courtAnnoun['bltin:blt_type']}}</td>
                                    <td>{{courtAnnoun['bltin:crt_name']}}</td>
                                    <td>{{courtAnnoun['bltin:blt_content']}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
export default {
    props: ['nodeInfo'],
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
    .modalcourtAnnoun{
        text-align: center;
    }
    @media (min-width: 768px){
        #courtAnnoun-modal-dialog{
            width: 80%;
        }
    }
    .infoAnnounDate{
        width: 10%;
    }
    .infoAnnounType{
        width: 10%;
    }.infoAnnounName{
        width: 10%;
    }

</style>
