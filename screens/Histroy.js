import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import * as firebase from "firebase";
import "firebase/firestore";

import { Button, Icon, Input, Header } from "../components";
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
const History = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [entities, setEntities] = useState([]);

  const getData = async () => {
    setLoading(true);
    const entityRef = firebase.firestore().collection("userData");

    const email = await AsyncStorage.getItem("loginData");
    entityRef
      .where("email", "==", email)

      .onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();

            entity.id = doc.id;
            newEntities.push(entity);
          });
          setEntities(newEntities);
        },
        (error) => {
          alert(error);
        }
      );
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Block flex middle>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        {loading ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size={100} color="#00ff00" />
          </View>
        ) : (
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Text
                size={20}
                color={argonTheme.COLORS.ACTIVE}
                bold
                style={{ alignSelf: "center", marginTop: 10 }}
              >
                Patient previous reocords
              </Text>

              {loading ? (
                <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size={100} color="#00ff00" />
                </View>
              ) : (
                <ScrollView>
                  {/* <Block flex space="between" style={styles.cardDescription}>
                  {entities.map((elt) => (
                    <Text>{elt.email}</Text>
                  ))}
                </Block> */}

                  <TouchableWithoutFeedback>
                    <Block flex space="between" style={styles.cardDescription}>
                      {entities.map((elt) => (
                        <Block
                          style={{
                            borderWidth: 1,
                            borderRadius: 2,
                            padding: 4,
                            marginBottom: 8,
                            borderColor: "#5e60ce",
                          }}
                        >
                          <Text size={20} style={styles.cardTitle}>
                            Date:{" "}
                            <Text
                              size={20}
                              color={argonTheme.COLORS.ACTIVE}
                              bold
                            >
                              {new Date(
                                elt.createdAt.seconds * 1000
                              ).toLocaleDateString("en-AU") +
                                " at " +
                                new Date(
                                  elt.createdAt.seconds * 1000
                                ).toLocaleTimeString()}
                            </Text>
                          </Text>
                          <Text size={20} style={styles.cardTitle}>
                            SPO2 :{" "}
                            <Text
                              size={18}
                              color={argonTheme.COLORS.ACTIVE}
                              bold
                            >
                              {elt.spo2}
                            </Text>
                          </Text>
                          <Text size={20} style={styles.cardTitle}>
                            Heart Rate :{" "}
                            <Text
                              size={20}
                              color={argonTheme.COLORS.ACTIVE}
                              bold
                            >
                              {elt.heartRate}
                            </Text>
                          </Text>
                          <Text size={20} style={styles.cardTitle}>
                            Temperature :{" "}
                            <Text
                              size={20}
                              color={argonTheme.COLORS.ACTIVE}
                              bold
                            >
                              {elt.temperature}
                            </Text>
                          </Text>
                        </Block>
                      ))}

                      {/* <Text size={24} style={styles.cardTitle}>
            Average BPM :{" "}
            <Text size={20} color={argonTheme.COLORS.ACTIVE} bold>
              {avgBpm}
            </Text>
          </Text> */}
                    </Block>
                  </TouchableWithoutFeedback>
                </ScrollView>
              )}
            </Block>
          </Block>
        )}
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    alignSelf: "center",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },

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

  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default History;
