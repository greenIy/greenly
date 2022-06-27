<template>
    <footer class="text-center text-lg-start text-light px-3 text-uppercase position-absolute w-100 ">
        <div class="row mt-3">
            <div class="col-lg-4 col-md-6 mb-4 mb-md-2">
                <img class="pt-2 pb-2" alt="Logo do greenly" src="../../assets/logo_dark.png">

                <p>Projeto Final da Licenciatura de Tecnologias de Informação.</p>
            </div>

            <div class="col-lg-2 col-md-6 mb-4 mb-md-2">
                <h6>Sobre Greenly</h6>

                <ul class="list-unstyled mb-0">
                    <li>
                        <router-link to="/equipa" class="mb-2 pr-2">Conheça a equipa</router-link>
                    </li>
                </ul>
            </div>

            <div class="col-lg-2 col-md-6 mb-4 mb-md-2">
                <h6>Contacto</h6>

                <ul class="list-unstyled mb-0">
                    <li><a href="mailto:support@greenly.pt">support@greenly.pt</a></li>
                </ul>
            </div>

            <div class="col-lg-2 col-md-6 mb-4 mb-md-2">
                <h6>Siga-nos</h6>

                <a class="me-2" :href="url_instagram" target=”_blank”>
                    <span class="sr-only">Link para o Instagram</span>
                    <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
                </a>

                <a class="me-2" :href="url_twitter" target=”_blank”>
                    <span class="sr-only">Link para o Twitter</span>
                    <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
                </a>

                <a :href="url_facebook" target=”_blank”>
                    <span class="sr-only">Link para o Facebook</span>
                    <font-awesome-icon :icon="['fab', 'facebook-square']" size="lg" />
                </a>
            </div>

            <div class="col-lg-2 col-md-6 mb-4 mb-md-2">
                <h6>Métodos de pagamento</h6>


                <font-awesome-icon :icon="['fab', 'cc-visa']" size="2xl" /><span class="me-2"></span>
                <font-awesome-icon :icon="['fab', 'cc-mastercard']" size="2xl" class="icon-space" /><span class="me-2"></span>
                <font-awesome-icon :icon="['fab', 'cc-amex']" size="2xl" class="icon-space" /><span class="me-2"></span>
                <font-awesome-icon :icon="['fab', 'cc-paypal']" size="2xl" /><span class="me-2"></span>
                <font-awesome-icon :icon="['fab', 'cc-apple-pay']" size="2xl" class="icon-space" /><span class="me-2"></span>
                <font-awesome-icon :icon="['fab', 'google-pay']" size="2xl" class="icon-space" />

            </div>
        </div>

        <div class="row my-3">
            <div class="col-12 text-center">
                © 2022 Greenly : Todos os Direitos Reservados
            </div>
        </div>
    </footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCcPaypal, faInstagram, faTwitter, faFacebookSquare, faCcVisa, faCcMastercard, faCcAmex, faCcApplePay, faGooglePay } from '@fortawesome/free-brands-svg-icons';

library.add(faCcPaypal, faInstagram, faTwitter, faFacebookSquare, faCcVisa, faCcMastercard, faCcAmex, faCcApplePay, faGooglePay);

export default {
  name: 'TheFooter',
  data() {
    return {
      url_instagram: 'https://www.instagram.com/greenlypt/',
      url_twitter: 'https://www.twitter.com/greenlypt/',
      url_facebook: 'https://www.facebook.com/Greenly-102561432419524',
    };
  },
};
</script>

<style scoped>
    footer {
        background-color: #5e9f88;
        font-size: 12px;
    }

    img {
        width: 75px;
    }

    a {
        color: #fcfaf9;
        text-decoration: none;
    }

    a:hover {
        color: #dce5e1;
    }

    .icon-space {
        padding-left: 5px;
    }

    .icons-div {
       font-size: 10px;
    }
</style>