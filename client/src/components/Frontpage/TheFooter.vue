<template>
<div class="d-flex align-self-stretch min-vh-100">
    <footer class="align-self-stretch bg-light text-center text-lg-start mt-auto foot">
        <div class="d-flex footer">
            <div class="p-3 align-self-stretch ">
                <p>Sobre nós</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor tempor
                    nulla eget vestibulum. Ut orci urna, luctus vitae imperdiet id, commodo auctor
                    diam. In non eleifend nunc. Nam ipsum purus, maximus eget est eget, ullamcorper
                    congue nibh. Integer tempor, eros ut varius commodo, arcu nisl vehicula nunc,
                    id mattis.
                </p>
            </div>
            <div class="align-self-stretch p-3">
                <p>Contacto</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor tempor
                    nulla eget vestibulum. Ut orci urna, luctus vitae imperdiet id, commodo auctor
                    diam. In non eleifend nunc. Nam ipsum purus, maximus eget est eget, ullamcorper
                    congue nibh. Integer tempor, eros ut varius commodo, arcu nisl vehicula nunc,
                    id mattis.
                </p>
            </div>
            <div class="align-self-stretch p-3">
                <p>Siga-nos</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor tempor
                    nulla eget vestibulum. Ut orci urna, luctus vitae imperdiet id, commodo auctor
                    diam. In non eleifend nunc. Nam ipsum purus, maximus eget est eget, ullamcorper
                    congue nibh. Integer tempor, eros ut varius commodo, arcu nisl vehicula nunc,
                    id mattis.
                </p>
            </div>
        </div>
        <div class="d-flex p-3 footer">
            <div class="align-self-stretcht">
                <p>© 2022 Greenly <br> Todos os Direitos Reservados</p>
            </div>
            <div class="ms-auto">
                 <font-awesome-icon :icon="['fab', 'cc-paypal']" size="2xl"/>
            </div>
        </div>
    </footer>
</div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons';

library.add(faCcPaypal);

export default {
  name: 'TheFooter',
};
</script>

<style scoped>
    .footer {
        background-color: #608072;
        color: #fcfaf9;
    }

    img {
        width: 250px;
        height: 105px;
    }
</style>
