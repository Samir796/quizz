import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import BgImg from '../../components/BgImage';
import CustomBtn from '../../components/CustomButton';
import CustomInput from '../../components/CustomTextInput';
import auth from '@react-native-firebase/auth';
import BackBtn from '../../components/BackBtn';
import ModalTester from '../../components/Modal';

const SignUp = ({navigation}) => {
  const shouldSetResponse = () => true;
  const onRelease = () => Keyboard.dismiss();

  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonAble, setButtonAble] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Home');
      }
    });
    return unsubscribe;
  }, []);
  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch(error => alert(error.message));
  };

  useEffect(() => {
    setButtonAble(email.length > 0 && password.length > 0);
  }, [email, password]);

  return (
    <>
      <SafeAreaView style={styles.safeContainer} />
      <View
        style={styles.containerAll}
        onResponderRelease={onRelease}
        onStartShouldSetResponder={shouldSetResponse}>
        <BgImg />
        <StatusBar hidden={true} />
        <View style={styles.containerAll}>
          <View style={styles.containerFirst}>
            <View style={styles.backBtnContainer}>
              <BackBtn onclick={() => navigation.navigate('Hi')} />
            </View>
            <Text style={styles.elementStyle}>Sign Up</Text>
          </View>
          <View style={styles.containerSecond}>
            <View style={styles.blurContainer}>
              <View style={styles.SecondInContainer}></View>
              <CustomInput
                name="Name "
                type="email-address"
                value={email}
                onchangetext={text => setEmail(text)}
              />
              <View style={styles.inputView}>
                <CustomInput
                  name="Password"
                  type="default"
                  value={password}
                  onchangetext={text => setPassword(text)}
                  secure={hidePass}
                />
                <Text
                  style={styles.inputText}
                  onPress={() => setHidePass(!hidePass)}>
                  {hidePass ? <Text>View</Text> : <Text>Hide</Text>}
                </Text>
              </View>
              <View style={styles.containerTerm}>
                <Text style={styles.textStyle}>
                  By selecting Agree and continue below,
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textStyle}>I agree to </Text>
                  <ModalTester />
                </View>
              </View>
              <CustomBtn
                isButtonAble={isButtonAble}
                text="Agree and continue"
                click={handleSignUp}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  safeContainer: {
    flex: 0,
    backgroundColor: 'white',
  },
  containerAll: {
    flex: 1,
  },
  containerFirst: {
    flex: 1,
    justifyContent: 'space-between',
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
  backBtnContainer: {
    alignItems: 'flex-start',
  },
  containerTerm: {
    alignItems: 'flex-start',
    width: '90%',
    marginVertical: 20,
  },
  elementStyle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    paddingBottom: 30,
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

  textStyle: {
    color: 'white',
    fontSize: 17,
  },
  inputView: {
    width: '100%',
    alignItems: 'center',
  },
  inputText: {
    color: '#000',
    position: 'absolute',
    top: 26,
    right: 40,
    fontSize: 17,
  },
});
export default SignUp;
