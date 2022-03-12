<template>
    <div>
        <p class="text-left" style="margin-bottom: -2%">Morada</p><hr/>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputCountry" class="form-label">País <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="country" placeholder="Introduza país...">
                </div>
                <div class="col mb-3">
                    <label for="inputCity" class="form-label">Cidade <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="city" placeholder="Introduza cidade...">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="street" class="form-label">Rua <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="street" placeholder="Introduza rua...">
                </div>
                <div class="col mb-3">
                    <label for="postalCode" class="form-label">Repetir palavra-passe <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="postalCode" placeholder="Introduza código postal...">
                </div>
            </div>
    </div>
</template>

<script>
export default {
  name: 'registerAddress',
};
</script>