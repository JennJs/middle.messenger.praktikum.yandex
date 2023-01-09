import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.css';

export default (id, value, clas) => {
	return Handlebars.compile(tpl)({ id, value, clas });
}
