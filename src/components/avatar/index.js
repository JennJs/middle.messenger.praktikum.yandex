import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.css';

export default (img) => {
	return Handlebars.compile(tpl)({ img });
}
