<template>
<div class="d-flex">
    <footer class="footer p-3 text-uppercase">
        <div class="row footer">
            <div class="col-6">
                <img class="pt-2 pb-2" alt="Logo do greenly" src="../../assets/logo_dark.png">
                <p>
                    Projeto Final da Licenciatura de Tecnologias de Informação.
                </p>
                <div class="align-self-stretch">
                    <p>© 2022 Greenly <br> Todos os Direitos Reservados</p>
                </div>
            </div>
            <div class="col-2 mt-4">
                <p>Contacto</p>
                <p>
                   suporte@greenly.com
                </p>
            </div>
            <div class="col-2 mt-4">
                <p>Siga-nos</p>
                <a :href="url_instagram" target=”_blank”>
                   <span class="sr-only">Link para o Instagram</span>
                    <font-awesome-icon :icon="['fab', 'instagram']" size="lg"/>
                </a>
                <a :href="url_instagram" class="m-3" target=”_blank”>
                   <span class="sr-only">Link para o Twitter</span>
                    <font-awesome-icon :icon="['fab', 'twitter']" size="lg"/>
                </a>
            </div>
            <div class="col-2 mt-4">
                <p>Modo de pagamento</p>
                <div class="ms-auto">
                    <font-awesome-icon :icon="['fab', 'cc-paypal']" size="2xl"/>
                </div>
            </div>
        </div>
    </footer>
</div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCcPaypal, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faCcPaypal);
library.add(faInstagram);
library.add(faTwitter);

export default {
  name: 'TheFooter',
  data() {
    return {
      url_instagram: 'https://www.instagram.com',
      url_twitter: 'https://www.twitter.com',
    };
  },
};
</script>

<style scoped>
    .footer {
        background-color: #608072;
        color: #fcfaf9;
        font-size: 9px;
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 7.5rem;
    }

    img {
        width: 65px;
        height: 40px;
    }

    a {
        color: #fcfaf9;
        text-decoration: none;
    }

    a:hover {
        color: #dce5e1;
    }
</style>
