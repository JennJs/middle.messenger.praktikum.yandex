import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.css';

export default (href, link_title, clas, style) => {
	return Handlebars.compile(tpl)({ href, link_title, clas, style });
}
