import {
  contPage404, contPage500, contChats, contSignInForm, contUserChangeData, contUserChangePassword, contUserSettingsPage, contloginForm,
} from '../index';

// console.log( _404Page);
export const router = () => {
  if (window.location.pathname === '/404') {
    return contPage404;
  } if (window.location.pathname === '/userSettings') {
    return contUserSettingsPage;
  } if (window.location.pathname === '/login') {
    return contloginForm;
  } if (window.location.pathname === '/registration') {
    return contSignInForm;
  } if (window.location.pathname === '/500') {
    return contPage500;
  } if (window.location.pathname === '/userSettings/change-data') {
    return contUserChangeData;
  } if (window.location.pathname === '/userSettings/change-password') {
    return contUserChangePassword;
  }
  return contChats;
};
