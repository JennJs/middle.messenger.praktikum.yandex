import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.css';

export default (lable, input_type, input_name, input_id, input_value, state) => {
	return Handlebars.compile(tpl)({ lable, input_type, input_name, input_id, input_value, state });
}
