<template>
<div class="page-container">
    <div class="content-wrap">
    <the-navbar/>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Successo!</h4>
                    </div>
                    <div class="card-body">
                        <p>
                            <strong>A sua encomenda está em processo!</strong>
                        </p>
                        <p>
                            <router-link to="/">
                                <button class="btn btn-primary">
                                    Voltar a casa
                                </button>
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <the-footer/>
        </div>
</div>
</template>

<script>
import TheNavbar from "@/components/Frontpage/TheNavbar";
import TheFooter from "@/components/Frontpage/TheFooter";
export default {
    name: "SuccessView",
    components: {TheFooter, TheNavbar}
}
</script>

<style scoped>

</style>