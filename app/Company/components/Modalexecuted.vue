<template>
    <div id="modalexecuted">
        <div class="modal" id="executedmodal" tabindex="-1">
            <div class="modal-dialog" id="executed-modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title modalexecuted">被执行</h4>
                    </div>
                    <div class="modal-body">
                        <div>
                            <table class="table table-hover">
                                <tr>
                                    <td class="InfoexecutedDate">立案时间</td>
                                    <td class="InfoexecutedNum">案号</td>
                                    <td >被执行人姓名/名称</td>
                                    <td >执行法院</td>
                                    <td >身份证号码/组织机构代码</td>
                                    <td >执行标的</td>
                                </tr>
                                <tr v-for='executed in nodeInfo.executed'>
                                    <td>{{executed['beizhixing:sj']}}</td>
                                    <td>{{executed['beizhixing:ah']}}</td>
                                    <td>{{executed['beizhixing:mc']}}</td>
                                    <td>{{executed['beizhixing:zxfy']}}</td>
                                    <td>{{executed['beizhixing:dm']}}</td>
                                    <td>{{executed['beizhixing:zxbd']}}</td>
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
    .modalexecuted{
        text-align: center;
    }
    @media (min-width: 768px){
        #executed-modal-dialog{
            width: 80%;
        }
    }
    .InfoexecutedDate{
        width: 12%;
    }
    .InfoexecutedNum{
        width: 20%;
    }

</style>
