import React, {useState} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import BackBtn from '../../components/BackBtn';
import BgImg from '../../components/BgImage';
import CustomBtn from '../../components/CustomButton';
import CustomInput from '../../components/CustomTextInput';
import ForgotPassword from '../../components/Forgot';
import auth from '@react-native-firebase/auth';

const Login = ({route, navigation}) => {
  const shouldSetResponse = () => true;
  const onRelease = () => Keyboard.dismiss();

  const [hidePass, setHidePass] = useState(true);
  const [psw, setPsw] = useState('');
  const {email} = route.params;

  function login() {
    auth()
      .signInWithEmailAndPassword(email, psw)
      .then(response => {
        navigation.navigate('Home');
      })
      .catch(error => {
        alert(error.message);
      });
  }

  return (
    <View
      style={styles.containerAll}
      onResponderRelease={onRelease}
      onStartShouldSetResponder={shouldSetResponse}>
      <BgImg />
      <BackBtn
        onClickBackBtn={() => navigation.navigate('Hi')}
        textHeader={'Login'}
      />
      <View style={styles.containerSecond}>
        <View style={styles.blurContainer}>
          <View style={styles.SecondInContainer}></View>
          <CustomInput
            value={psw}
            onchangetext={setPsw}
            name="Password"
            type="default"
            secure={hidePass}
          />
          <Text style={styles.inputText} onPress={() => setHidePass(!hidePass)}>
            {hidePass ? 'View' : 'Hide'}
          </Text>
          <CustomBtn
            isButtonAble={psw.length > 0}
            click={login}
            text="Continue"
          />
          <ForgotPassword
            onClickForgotBtn={() => navigation.navigate('Forgot')}
            text="Forgot your password?"
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
  },
  containerSecond: {
    flex: 2,
  },
  SecondInContainer: {
    position: 'absolute',
    opacity: 0.8,
    borderRadius: 20,
    backgroundColor: '#2D2B2C',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  blurContainer: {
    marginHorizontal: 5,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: 20,
  },
  textOrStyle: {
    color: '#ffff',
    fontSize: 19,
  },
  SignUpContainer: {
    flexDirection: 'row',
    width: '90%',
    paddingVertical: 10,
  },
  fontSizeColor: {
    fontSize: 19,
    color: '#ffff',
  },
  textSignUp: {
    color: '#20B98D',
    fontSize: 19,
    fontWeight: '900',
    marginHorizontal: 5,
  },
  inputText: {
    color: '#000',
    position: 'absolute',
    top: 46,
    right: 40,
    fontSize: 17,
  },
});
export default Login;
