import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';

export default ( ...props ) => {
	// console.log(props );
	return Handlebars.compile(tpl)(...props );
}
