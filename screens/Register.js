import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  View,
  AsyncStorage,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import firebase from "firebase";
import { ActivityIndicator } from "react-native";
const { width, height } = Dimensions.get("screen");

var config = {};

var config = {
  apiKey: "AIzaSyB56qTTXlCsZ2DCM9qDiGGLh_RM6jNdEHk",
  authDomain: "sensor-14b30-default-rtdb.firebaseio.com",
  databaseURL: "https://sensor-14b30-default-rtdb.firebaseio.com/",
  projectId: "sensor-14b30",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const firebaseRegister = () => {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        setLoading(false);
        navigation.navigate("App");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setLoading(false);

        alert(error.message);
        // ..
      });
  };
  return (
    <Block flex={1} middle>
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
        <Block flex={0.2} middle>
          <Block style={styles.registerContainer}>
            <Block flex>
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
              <Block center>
                <KeyboardAvoidingView
                  style={{ flex: 1, marginTop: 8 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 1 }}>
                    <Text bold style={{ color: "#c7adae" }}>
                      NAME :
                    </Text>
                    <Input
                      borderless
                      placeholder="Name"
                      onChangeText={(txt) => setName(txt)}
                    />
                  </Block>
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

                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={firebaseRegister}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        CREATE ACCOUNT
                      </Text>
                    </Button>
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
    borderColor: "#8898AA",
    backgroundColor: "#d2767b",
    height: 110,
  },
  logo: {
    height: 420,
    zIndex: 2,
    position: "relative",
    marginTop: "-110%",
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
  inputIcons: {
    marginRight: 12,
  },
  // passwordCheck: {
  //   paddingLeft: 15,
  //   paddingTop: 13,
  //   paddingBottom: 30,
  // },
  createButton: {
    width: width * 0.5,
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

export default Register;
