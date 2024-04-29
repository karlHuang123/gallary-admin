class AuthHelper {
  token: string | null = null;

  static TOKEN_KEY = 'token';

  constructor() {
    this.token = localStorage.getItem(AuthHelper.TOKEN_KEY);
  }

  save(token: string, persist: boolean = false) {
    this.token = token;
    if (persist) {
      localStorage.setItem(AuthHelper.TOKEN_KEY, this.token);
    }
  }

  getToken() {
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem(AuthHelper.TOKEN_KEY);
  }
}

export default new AuthHelper();
