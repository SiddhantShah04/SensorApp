import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Linking,
  AsyncStorage,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import firebase from "firebase";
import Icon from "./Icon";
import argonTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="shop"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />
        );
      case "Elements":
        return (
          <Icon
            name="map-big"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      case "Articles":
        return (
          <Icon
            name="spaceship"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />
        );
      case "Profile":
        return (
          <Icon
            name="chart-pie-35"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.WARNING}
          />
        );
      case "Account":
        return (
          <Icon
            name="calendar-date"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.INFO}
          />
        );
      case "Logout":
        return (
          <Icon
            name="spaceship"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          />
        );
      case "Log out":
        return <Icon />;
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    const logoutFirebase = () => {
      var config = {
        apiKey: "AIzaSyB56qTTXlCsZ2DCM9qDiGGLh_RM6jNdEHk",
        authDomain: "sensor-14b30-default-rtdb.firebaseio.com",
        databaseURL: "https://sensor-14b30-default-rtdb.firebaseio.com/",
        projectId: "sensor-14b30",
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          AsyncStorage.removeItem("loginData");
          navigation.navigate("Login");
        })
        .catch((error) => {
          // An error happened.
          alert(error.message);
        });
    };

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() =>
          title == "Logout" ? logoutFirebase() : navigation.navigate(title)
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={15}
              bold={focused ? true : false}
              color={focused ? "white" : "rgba(0,0,0,0.5)"}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
