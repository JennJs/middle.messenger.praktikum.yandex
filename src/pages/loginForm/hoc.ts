import  connect  from '../../HOC/connect';
import { LoginForm } from './index';

export default connect(
	LoginForm, 
	state => {
        console.log(state);
		return {
            name: 'state.user.name',
            avatar: 'state.user.avatar',
        };
	}
);
