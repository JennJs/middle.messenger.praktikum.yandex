import Block, { T } from './Block';

describe(' Block', () => {
	const template = jest.fn(() => 'compile');

	class Component extends Block<T> {
		render() {
			return this.compile(template, { ...this.props });
		}
	}
	test('тест Component', () => {
		const renderSpy = jest.spyOn(Component.prototype, 'render');
		const testComponent = new Component('div', { test: 'test' });
		testComponent.setProps({
			test: 'success'
		});

		expect(renderSpy).toHaveBeenCalled();
	});
	test('тест рендера', () => {
		const testComponent = new Component('div',{});

		expect(testComponent.render().textContent).toBe('compile');
	});
});

