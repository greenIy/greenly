<template>
<div class="d-flex">
    <footer class="footer p-3 text-uppercase">
        <div class="row footer">
            <div class="col-4">
                <img class="pt-2 pb-2" alt="Logo do greenly" src="../../assets/logo_dark.png">
                <p>
                    Projeto Final da Licenciatura de Tecnologias de Informação.
                </p>
                <div class="align-self-stretch">
                    <p>© 2022 Greenly <br> Todos os Direitos Reservados</p>
                </div>
            </div>
            <div class="col-2 mt-4">
                <p>Sobre Greenly</p>
                <router-link to="/aboutUs" class="mb-2 pr-2">
                    Conheça a equipa
                </router-link>
            </div>
            <div class="col-2 mt-4">
                <p>Contacto</p>
                <a href="mailto:support@greenly.pt">support@greenly.pt</a>
            </div>
            <div class="col-2 mt-4">
                <p>Siga-nos</p>
                <a :href="url_instagram" target=”_blank”>
                   <span class="sr-only">Link para o Instagram</span>
                    <font-awesome-icon :icon="['fab', 'instagram']" size="lg"/>
                </a>
                <a :href="url_twitter" class="m-3" target=”_blank”>
                   <span class="sr-only">Link para o Twitter</span>
                    <font-awesome-icon :icon="['fab', 'twitter']" size="lg"/>
                </a>
                <a :href="url_facebook" target=”_blank”>
                   <span class="sr-only">Link para o Facebook</span>
                    <font-awesome-icon :icon="['fab', 'facebook-square']" size="lg"/>
                </a>
            </div>
            <div class="col-2 mt-4">
                <p>Métodos de pagamento</p>
                <!-- eslint-disable max-len -->
                <div class="ms-auto icons-div">
                    <font-awesome-icon :icon="['fab', 'cc-visa']" size="2xl"/>
                    <font-awesome-icon :icon="['fab', 'cc-mastercard']" size="2xl" class="icon-space"/>
                    <font-awesome-icon :icon="['fab', 'cc-amex']" size="2xl" class="icon-space"/>
                    <br>
                    <font-awesome-icon :icon="['fab', 'cc-paypal']" size="2xl"/>
                    <font-awesome-icon :icon="['fab', 'cc-apple-pay']" size="2xl" class="icon-space"/>
                    <font-awesome-icon :icon="['fab', 'google-pay']" size="2xl" class="icon-space"/>
                </div>
                <!-- eslint-enable max-len -->
            </div>
        </div>
    </footer>
</div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
// eslint-disable-next-line
import { faCcPaypal, faInstagram, faTwitter, faFacebookSquare, faCcVisa, faCcMastercard, faCcAmex, faCcApplePay, faGooglePay } from '@fortawesome/free-brands-svg-icons';

library.add(faCcPaypal);
library.add(faInstagram);
library.add(faTwitter);
library.add(faFacebookSquare);
library.add(faCcVisa);
library.add(faCcMastercard);
library.add(faCcAmex);
library.add(faCcApplePay);
library.add(faGooglePay);

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
    .footer {
        background-color: #608072;
        color: #fcfaf9;
        font-size: 9px;
        width: 99.88%;
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

    .icon-space {
        padding-left: 5px;
    }

    .icons-div {
       font-size: 10px;
    }
</style>
