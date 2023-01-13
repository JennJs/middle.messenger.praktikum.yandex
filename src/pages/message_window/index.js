import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.css';

export default ( ...props ) => {
	console.log(props);
	return Handlebars.compile(tpl)(...props );
}
