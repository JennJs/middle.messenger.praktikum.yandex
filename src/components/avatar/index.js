import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.css';

export default (src_img) => {
	return Handlebars.compile(tpl)(src_img);
}
