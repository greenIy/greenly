import http from "../../http-commmon";


export default class AuthService {

        /**
         * Permite verificar se o utilizador se encontra autenticado (i.e. se tem um token presente e se esse token é válido)
         */
        static async isLoggedIn() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            if (accessToken){
                let response = await http.get("/auth/status", { headers: {"Authorization" : `Bearer ${accessToken}`} })

                if (response.status == 200) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        
        /**
         * Permite obter informação sobre o utilizador caso este esteja logged-in
         */
        static async getUser() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken && userId){
                let response = await http.get(`/user/${userId}`, { headers: {"Authorization" : `Bearer ${accessToken}`} })
                if (response.status == 200) {
                    return response.data
                } else {
                    return null;
                }
            }
        }

        /**
         * Permite decidir qual será o destino do utilizador durante a navegação consoante o seu estado de autenticação
         */
        static async authenticate(to, from, next) {
            const publicPages = ["/", "/products"]
                
            // TODO: Adicionar páginas relativas à autenticação por redes sociais
            // Páginas que são inacessíveis a utilizadores autenticados 
            const noAuthenticationPages = ["/login", "/register"]
        
            const isLoggedIn = await AuthService.isLoggedIn()
        
            const requiresAuth = !publicPages.includes(to.path)
        
            const canHaveAuth = !noAuthenticationPages.includes(to.path)
        
            // Caso o utilizador não esteja autenticado
            if (!isLoggedIn) {
                // Caso a página alvo precise de autenticação
                if (requiresAuth && canHaveAuth) {
                    return next('/login')
                } else {
                    // Caso não precise
                    return next();
                }
            // Caso o utilizador esteja autenticado
            } else {
                // Caso utilizadores autenticados não possam aceder à página
                if (!canHaveAuth) {
                    return next('/profile')
                } else {
                    // Caso possam
                    return next();
                }
            }
    }
}
