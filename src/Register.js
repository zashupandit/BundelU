import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

const Register = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '154655169375-p0ad0tjpa363tvvrk92op436420qt17d.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        Alert.alert('Account Created ! Please Login');
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Account Created ! Please Login',
          button: 'close',
        });

        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <ScrollView>
      <View className="flex justify-around flex-1">
        <Image
          source={require('../assets/images/bu_logo.png')}
          className="w-24 h-24 mx-auto mt-10"
          resizeMode="contain"
        />
        <Text className=" text-3xl text-center font-Bold text-primary m-4  mt-3">
          BUNDEL U
        </Text>
        <TextInput
          className="border-2 px-4 py-2  rounded-lg  my-2 mx-8 border-[#c4c5c7] font-Regular text-xs "
          placeholder="Enter your Email "
          onChangeText={setemail}
          value={email}
        />
        <TextInput
          className="border-2 px-4 py-2  rounded-lg my-2 mx-8 border-[#c4c5c7] font-Regular text-xs"
          placeholder="Enter your password "
          onChangeText={setpassword}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity
          onPress={() => {
            register();
          }}
          className="m-6 rounded-lg py-3  mx-8 flex flex-row justify-evenly bg-primary ">
          <Text className="text-xs text-center self-center text-white font-Bold ">
            Sign Up
          </Text>
        </TouchableOpacity>

        <Text className="text-gray text-md text-center  my-2 ">
          ------or continue with-----
        </Text>
        <TouchableOpacity
          onPress={signIn}
          className="rounded-lg  my-4 px-2 py-1 border-2 mx-8 flex flex-row justify-evenly border-[#c4c5c7] ">
          <Image
            className="h-8 w-8"
            source={require('../assets/images/google_logo.png')}
          />
          <Text className="text-sm text-center self-center ">
            Sign up with google
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row justify-center items-center space-x-2 mt-5">
          <Text className="text-gray text-sm text-center font-Regular ">
            Already have an account ?
          </Text>
          <Text
            className="underline text-primary text-sm font-Regular "
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Login
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({});
