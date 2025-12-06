import { signup } from '../utils/firebase';
const _handleSignupButtonPress = async () => {
 try {
   spinner.start();
   const user = await signup({ name, email, password });
   dispatch(user);
 } catch(e) {
   Alert.alert('Signup Error', e.message);
 } finally {
   spinner.stop();
 }
};
