import Block from "../modules/block/Block";

export default function renderDom(query: string, component: Block<Record<string, any>>) {
	const root = document.querySelector(query);
	if(root)
		root.append(component.getContent());
	component.dispatchComponentDidMount();

	return root;
}
