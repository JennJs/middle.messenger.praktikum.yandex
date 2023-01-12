import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.css';

export default (name) => {
	return Handlebars.compile(tpl)( name );
}
