import { UserSettingsPage } from '.';
import { Connect } from '../../services/Store';
import FormPage from './FormPage';

export default Connect(
	UserSettingsPage, 
	state => state.userSettings ?? {
       console.log('state.userSettings')
    } 
);
