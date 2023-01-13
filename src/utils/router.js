import { pageChats, page404, page500, pageUserSettings, pageLogin, pageSignIn, pageUserChangeData, pageUserChangePassword } from '../index';

export const router = () => {
	if (window.location.pathname === '/404') {
		return page404;
	} else if (window.location.pathname === '/userSettings') {
		return pageUserSettings;
	} else if (window.location.pathname === '/login') {
		return pageLogin;
	} else if (window.location.pathname === '/registration') {
		return pageSignIn;
	} else if (window.location.pathname === '/500') {
		return page500;
	} else if (window.location.pathname === '/userSettings/change-data') {
		return pageUserChangeData;
	} else if (window.location.pathname === '/userSettings/change-password') {
		return pageUserChangePassword;
	}
	return pageChats;
}