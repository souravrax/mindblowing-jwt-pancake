export const tokenManager = new (class TokenManager {
    accessToken: string;
    constructor() {
        this.accessToken = '';
    }
    setToken(newToken: string) {
        this.accessToken = newToken;
        setTimeout(() => {
            this.removeToken();
        }, 60000);
    }
    getToken() {
        // console.log(this);
        return this.accessToken;
    }
    removeToken() {
        this.accessToken = '';
    }
    hasToken() {
        return this.accessToken.length > 0;
    }
})();
