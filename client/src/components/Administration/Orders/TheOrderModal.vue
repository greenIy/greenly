<template>
<div class="modal fade" id="order-details" aria-hidden="true" aria-labelledby="order-details" tabindex="-1"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="order-details">Itens da encomenda #{{currentOrder.id}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        TBC
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import http from "../../../../http-common";
import AuthService from "../../../router/auth";

export default {
    name: 'TheOrderModal',
    props: [
        'currentOrder',
    ],
    methods: {

    }
}
</script>

<style scoped>

</style>
