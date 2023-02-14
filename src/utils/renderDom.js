export default function renderDom(query, component) {
	const root = document.querySelector(query);
	if(root)
		// root.appendChild(component.getContent());
		root.append(component.getContent());
	component.dispatchComponentDidMount();

	return root;
}
