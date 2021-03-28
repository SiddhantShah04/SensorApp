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

import { argonTheme } from "../constants";
import { useEffect } from "react";
import { useState } from "react";
import * as firebase from "firebase";
import "firebase/firestore";

import { Button } from "galio-framework";

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

  const [graphData, setGraphData] = useState([0]);
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
    <Block>
      <Block flex space="between" style={styles.cardDescription}>
        <Text size={14} style={styles.cardTitle}></Text>
        {/* 
            <Text>Add Data</Text> */}
        {/* <LineChart
              data={intialGraphValue}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            /> */}
      </Block>
      {/* <TouchableWithoutFeedback >
        <Block flex style={imgContainer}>
          <Image source={{ uri: item.image }} style={imageStyles} />
        </Block>
      </TouchableWithoutFeedback> */}
      <TouchableWithoutFeedback>
        <Block flex space="between" style={styles.cardDescription}>
          <Text size={24} style={styles.cardTitle}>
            SPO2 :{" "}
            <Text size={20} color={argonTheme.COLORS.ACTIVE} bold>
              {spo2}
            </Text>
          </Text>
          <Text size={24} style={styles.cardTitle}>
            Heart Rate :{" "}
            <Text size={20} color={argonTheme.COLORS.ACTIVE} bold>
              {heartRate}
            </Text>
          </Text>
          <Text size={20} style={styles.cardTitle}>
            Temperature :{" "}
            <Text size={20} color={argonTheme.COLORS.ACTIVE} bold>
              {temperature}°C
            </Text>
          </Text>
          {/* <Text size={24} style={styles.cardTitle}>
            Average BPM :{" "}
            <Text size={20} color={argonTheme.COLORS.ACTIVE} bold>
              {avgBpm}
            </Text>
          </Text> */}
        </Block>
      </TouchableWithoutFeedback>
      <Block row>
        <Button color={argonTheme.COLORS.SUCCESS} onPress={saveUserData}>
          Save
        </Button>
        <Button onPress={getUserHistroy}>History</Button>
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
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16,
  },
  cardTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: "hidden",
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: "auto",
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);
