import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.css';

export default (type, id, value, clas) => {
	return Handlebars.compile(tpl)({ type, id, value, clas });
}
