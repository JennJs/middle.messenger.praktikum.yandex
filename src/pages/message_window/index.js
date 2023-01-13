import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.css';

export default ( ...props ) => {
	return Handlebars.compile(tpl)(...props );
}
