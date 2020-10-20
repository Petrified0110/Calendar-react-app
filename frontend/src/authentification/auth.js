import api from "../api";
import Cookies from 'universal-cookie';

export const login = credentials => 
  api.user.login(credentials).then(user => {
    const cookies = new Cookies();
    cookies.set('token', user.token, {path: '/'});
    cookies.set('user', user.data.email, {path: '/'})
  });

export const logout = () => {
    const cookies = new Cookies();
    cookies.remove('token', {path: '/'});     
};

export const getUserEmail = () => {
  const cookies = new Cookies();
  return cookies.get('user');
}

export const getToken = () => {
  const cookies = new Cookies();
  return cookies.get('token');
}

export const isLoggedIn = () => {
  return getToken() ? true: false;
}

export const setLanguagePref = lang => {
  const cookies = new Cookies();
  cookies.set('langValue', lang.value, {path: '/'});
  cookies.set('langText', lang.text, {path: '/'});
  cookies.set('langKey', lang.key, {path: '/'});
}

export const getLanguagePref = () => {
  const cookies = new Cookies();
  let lang = {};
  lang.value = cookies.get('langValue');
  lang.text = cookies.get('langText');
  lang.key = cookies.get('langKey');
  return lang;
}