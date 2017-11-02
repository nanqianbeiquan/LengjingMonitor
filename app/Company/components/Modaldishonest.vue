<template>
    <div id="modaldishonest">
        <div class="modal" id="dishonestmodal" tabindex="-1">
            <div class="modal-dialog" id="dishonest-modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title modaldishonest">失信被执行</h4>
                    </div>
                    <div class="modal-body">
                        <div>
                            <table class="table table-hover">
                                <tr>
                                    <td class="dishonestDate">发布时间</td>
                                    <td class="dishonestpeople">被执行人姓名/名称</td>
                                    <td class="dishonestPerform">履行情况</td>
                                    <td class="dishonestDatail">具体情形</td>
                                </tr>
                                <tr v-for="dishonestExecuted in nodeInfo.dishonestExecuted">
                                    <td>{{dishonestExecuted['shixin:fbsj']}}</td>
                                    <td>{{dishonestExecuted['shixin:mc']}}</td>
                                   <td>{{dishonestExecuted['shixin:lxqk']}}</td>
                                    <td>{{dishonestExecuted['shixin:sxjtqk']}}</td>
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
    .modaldishonest{
        text-align: center;
    }
    @media (min-width: 768px){
        #dishonest-modal-dialog{
            width: 80%;
        }
    }
    .dishonestDate{
        width: 15%;
    }
    .dishonestpeople{
        width: 30%;
    }
    .dishonestPerform{
        /*width: 10%;*/
    }
    .dishonestDatail{
        /*width: 20%;*/
    }

</style>
