<template>
    <div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="termsConditons">
            <label class="form-check-label" for="termsConditions">Aceito os <router-link to="/termsConditions" class="float-right">termos e condições de uso</router-link>.</label>
        </div>
    </div>
</template>

<script>
export default {
  name: 'registerTermsConditions',
};
</script>