import { login } from '../utils/firebase';
import { validateEmail, removeWhitespace } from '../utils/functions';
import { ProgressContext, UserContext } from '../contexts';

const _handleLoginButtonPress = async () => {
 try {
   spinner.start();
   const user = await login({ email, password });
   dispatch(user);
 } catch (e) {
   Alert.alert('Login Error', e.message);
 } finally {
   spinner.stop();
 }
};
