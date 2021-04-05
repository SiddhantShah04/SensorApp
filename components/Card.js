import React from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  AsyncStorage,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Images } from "../constants";
import { useEffect } from "react";
import { useState } from "react";
import * as firebase from "firebase";
import "firebase/firestore";

import { Button } from "galio-framework";
const { width, height } = Dimensions.get("screen");
const Card = ({ navigation }) => {
  const [data, setData] = useState([]);
  //   readUserData() {
  //     firebase.database().ref('Users/').once('value', function (snapshot) {
  //         console.log(snapshot.val())
  //     });
  // }
  const screenWidth = Dimensions.get("window").width;

  var config = {
    databaseURL: "https://sensor-14b30-default-rtdb.firebaseio.com/",
    projectId: "sensor-14b30",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const [spo2, setSpo2] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [avgBpm, setAvgBpm] = useState(0);
  const temperature = (Math.random() * (35 - 37 + 1) + 35).toFixed(2);

  const saveUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("loginData");
      console.log(value);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      const entityRef = firebase.firestore().collection("userData");
      const data = {
        email: value,
        spo2: spo2,
        heartRate: heartRate,
        createdAt: timestamp,
        temperature: temperature,
      };
      entityRef
        .add(data)

        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      // Error retrieving data
      alert(error);
    } finally {
      alert("Patient data has been saved.");
    }
  };

  const getUserHistroy = () => {
    navigation.navigate("history");
  };

  const getData = async () => {
    //firebase.initializeApp(config);

    firebase
      .database()
      .ref("spo2/")
      .on("value", (snapshot) => {
        setSpo2(snapshot.val());
      });

    firebase
      .database()
      .ref("heartRate/")
      .on("value", (snapshot) => {
        setHeartRate(snapshot.val());
      });
    firebase
      .database()
      .ref("Avg BPM/")
      .on("value", (snapshot) => {
        setAvgBpm(snapshot.val());
      });
    // firebase.database().ref('IR Value/').once('value', function (snapshot) {
    //            console.log(snapshot.val())
    //    })
  };

  useEffect(() => {
    getData();
  });

  // const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;

  return (
    <Block middle flex={1} style={{ backgroundColor: "#ffffff" }}>
      <Block>
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
        </Block>
      </Block>

      <Block row>
        <Button
          style={
            (styles.fullwidthButton,
            {
              ...styles.fullwidthButton,
              backgroundColor: "#d2767b",
            })
          }
        >
          <Text size={23} bold style={styles.buttonText}>
            MEASURE
          </Text>
        </Button>
        <Button
          style={
            (styles.fullwidthButton,
            {
              ...styles.fullwidthButton,
              backgroundColor: "#e9bcbf",
            })
          }
        >
          <Text
            onPress={getUserHistroy}
            size={23}
            bold
            style={styles.buttonText}
          >
            HISTORY
          </Text>
        </Button>
      </Block>

      <TouchableWithoutFeedback>
        <Block flex={2} style={styles.cardDescription}>
          <Text bold size={24} style={styles.cardTitle}>
            SpO2 SATURATION :{" "}
            <Text bold size={20} style={styles.cardTitle} bold>
              {spo2}%
            </Text>
          </Text>
          <Text bold size={24} style={styles.cardTitle}>
            HEART RATE :{" "}
            <Text size={20} style={styles.cardTitle} bold>
              {heartRate} BPM
            </Text>
          </Text>
          <Text bold size={24} style={styles.cardTitle}>
            TEMPERATURE :{" "}
            <Text size={20} style={styles.cardTitle} bold>
              {temperature}°C
            </Text>
          </Text>
          <Block row center>
            <Button onPress={saveUserData} style={styles.createButton}>
              <Text bold style={styles.buttonText}>
                SAVE
              </Text>
            </Button>
            <Button style={styles.createButton}>
              <Text bold style={styles.buttonText}>
                DISCARD
              </Text>
            </Button>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
      <Block flex={1} style={{ justifyContent: "flex-end", marginBottom: 4 }}>
        <Image source={Images.LogoOnboarding} style={styles.logo} />
      </Block>
    </Block>
  );
};

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  socialConnect: {
    borderColor: "#8898AA",
    backgroundColor: "#d2767b",
    width: width,
    height: height * 0.11,
  },
  createButton: {
    width: width * 0.3,
    backgroundColor: "white",
  },
  cardDescription: {
    marginBottom: height * 0.1,
  },

  buttonText: {
    color: "#ffc8c8",
  },
  fullwidthButton: {
    top: -6,
    width: width * 0.49,
    height: height * 0.062,
    borderRadius: 1,
    color: "#d2767b",
    marginLeft: 1,
    marginRight: 1,
  },
  cardTitle: {
    margin: 10,
    textAlign: "center",
    color: "#c7adae",
  },
  logo: {
    height: height * 0.34,

    position: "relative",
  },
});

export default withNavigation(Card);
