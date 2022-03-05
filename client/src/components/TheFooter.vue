<template>
<footer>
<div>
    <div class="footer-left">
        <h3><img alt="Logo do greenly" src="../assets/logo_dark.png"></h3>
        <p class="footer-company-name">Greenly© 2022</p>
    </div>
    <div class="footer-center">
        <div>
            <p>endereço</p>
        </div>
        <div>
            <p>num</p>
        </div>
        <div>
            <p>
            <a href="mailto:support@greenly.com">
            support@greenly.com
            </a>
            </p>
        </div>
    </div>
    <div class="footer-right">
        <p class="footer-company-about">
        <span>About the company</span>
        Descrição da empresa
        </p>
        <div class="footer-icons">
            <a :href="www.facebook.com">Facebook</a>
            <a :href="www.facebook.com">Twitter</a>
            <a :href="www.facebook.com">Github</a>
        </div>
    </div>
</div>
</footer>
</template>

<script>

export default {
  name: 'TheFooter',
};
</script>

<style scoped>
    footer {
        background-color: #608072;
    }
</style>
