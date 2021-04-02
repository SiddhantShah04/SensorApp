import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
  Image,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { Block, Checkbox, theme } from "galio-framework";
import AppLoading from "expo-app-loading";
import firebase from "firebase";
import { Text } from "react-native";
import {
  useFonts,
  Orbitron_400Regular,
  Orbitron_500Medium,
  Orbitron_600SemiBold,
  Orbitron_700Bold,
  Orbitron_800ExtraBold,
  Orbitron_900Black,
} from "@expo-google-fonts/orbitron";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");
var config = {
  apiKey: "AIzaSyB56qTTXlCsZ2DCM9qDiGGLh_RM6jNdEHk",
  authDomain: "sensor-14b30-default-rtdb.firebaseio.com",
  databaseURL: "sensor-14b30-default-rtdb.firebaseio.com",
  projectId: "sensor-14b30",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const Login = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_500Medium,
    Orbitron_600SemiBold,
    Orbitron_700Bold,
    Orbitron_800ExtraBold,
    Orbitron_900Black,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginLocalStorage = async (userName) => {
    console.log(userName);
    try {
      await AsyncStorage.setItem("loginData", userName);
    } catch (error) {
      // Error saving data
      alert(error);
    }
  };

  const firebaseLogin = () => {
    // Add Firebase auth

    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        loginLocalStorage(email);
        setLoading(false);
        navigation.navigate("App");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setLoading(false);

        alert(errorMessage);
      });
  };
  const loginWithApp = (txt) => {
    var provider = "";

    if (txt === "Google") {
      provider = new firebase.auth.GoogleAuthProvider();
    } else {
      provider = new firebase.auth.GithubAuthProvider();
    }

    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error);
        // ...
      });
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Block flex middle>
        <StatusBar hidden />
        {/* <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        > */}
        {loading ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size={100} color="#00ff00" />
          </View>
        ) : (
          <Block safe middle>
            <Block style={styles.registerContainer}>
              <Block middle style={styles.socialConnect}>
                <Text
                  style={{
                    fontFamily: "Orbitron_800ExtraBold",
                    color: "#ffffff",
                    fontSize: 44,
                  }}
                >
                  baymax
                </Text>
                {/* <Block row style={{ marginTop: theme.SIZES.BASE }}></Block> */}
              </Block>
              <Block flex={0.4}>
                <Block flex={0.2} middle></Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 2 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 1 }}>
                      <Text bold style={{ color: "#c7adae" }}>
                        EMAIL :
                      </Text>
                      <Input borderless onChangeText={(txt) => setEmail(txt)} />
                    </Block>
                    <Block width={width * 0.8}>
                      <Text bold style={{ color: "#c7adae" }}>
                        PASSWORD :
                      </Text>
                      <Input
                        password
                        borderless
                        onChangeText={(txt) => setPassword(txt)}
                      />
                    </Block>
                    {/* <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3,
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the"
                      />
                      <Button
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14,
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Block> */}
                    <Block middle row>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={firebaseLogin}
                      >
                        <Text bold style={{ color: argonTheme.COLORS.WHITE }}>
                          Login
                        </Text>
                      </Button>

                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={() => navigation.navigate("Register")}
                      >
                        <Text bold style={{ color: argonTheme.COLORS.WHITE }}>
                          Sign Up
                        </Text>
                      </Button>
                      {/* <Text
                          style={{ color: "blue" }}
                          onPress={() => navigation.navigate("Register")}
                        >
                          Or Sign up
                        </Text> */}
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
            <Image source={Images.Pro} style={styles.logo} />
          </Block>
        )}
        {/* </ImageBackground> */}
      </Block>
    );
  }
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width,
    height: height,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
  },
  socialConnect: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    //borderColor: "#8898AA",
    backgroundColor: "#d2767b",
    height: 115,
  },
  logo: {
    height: 420,
    zIndex: 2,
    position: "relative",
    marginTop: "-114%",
  },
  // socialButtons: {
  //   width: 120,
  //   height: 40,
  //   backgroundColor: "#fff",
  //   shadowColor: argonTheme.COLORS.BLACK,
  //   shadowOffset: {
  //     width: 0,
  //     height: 4,
  //   },
  //   shadowRadius: 8,
  //   shadowOpacity: 0.1,
  //   elevation: 1,
  // },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },

  // passwordCheck: {
  //   paddingLeft: 15,
  //   paddingTop: 13,
  //   paddingBottom: 30,
  // },
  createButton: {
    width: width * 0.4,
    // marginTop: 25,\
    color: "#d2767b",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    // padding: 20,
  },
});

export default Login;
