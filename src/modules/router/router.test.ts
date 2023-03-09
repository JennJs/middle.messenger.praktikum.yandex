import {router} from './Router';
describe('router', () => {
	beforeEach(() => {
		router.go = jest.fn((pathname) => global.history.pushState({}, '', pathname));
	});
	test('тест смены location.pathname', () => {
		router.go('/profile');

		expect(global.location.pathname).toBe('/profile');
	});
	test('тест перехода на страницу', () => {
		global.history.pushState = jest.fn();
		router.go('/messenger');
		const res = jest.spyOn(global.history, 'pushState');

		expect(res).toHaveBeenCalled();
	});
})
