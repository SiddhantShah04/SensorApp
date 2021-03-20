import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';
import { useEffect } from 'react';
import { useState } from 'react';
import firebase from 'firebase';

import { LineChart } from "react-native-chart-kit";

const Card = (props)=> {

  const [data,setData] = useState([])
//   readUserData() {
//     firebase.database().ref('Users/').once('value', function (snapshot) {
//         console.log(snapshot.val())
//     });
// }
  const screenWidth = Dimensions.get("window").width;

  const [plotData,setPlotData] = useState([])

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  }



  const [graphData, setGraphData] = useState([0])


  const intialGraphValue = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: graphData,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  }

  const getData = async()=>{
    var config = {
      databaseURL: "https://sensor-14b30-default-rtdb.firebaseio.com/",
      projectId: "sensor-14b30",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
  //firebase.initializeApp(config);
  
  firebase.database()
  .ref('IR Value/')
  .on('value', snapshot => {
    
    setGraphData([...graphData,snapshot.val() ])
    console.log('IR Value: ', snapshot.val());
  });

  // firebase.database().ref('IR Value/').once('value', function (snapshot) {
  //            console.log(snapshot.val())
  //    })
  }

    useEffect(()=>{
      getData()
    })
  
    // const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    
    // const imageStyles = [
    //   full ? styles.fullImage : styles.horizontalImage,
    //   imageStyle
    // ];
    // const cardContainer = [styles.card, styles.shadow, style];
    // const imgContainer = [styles.imageContainer,
    //   horizontal ? styles.horizontalStyles : styles.verticalStyles,
    //   styles.shadow
    // ];

    return (
      <Block >
          <Block flex space="between" style={styles.cardDescription}>
            {/* <Text size={14} style={styles.cardTitle}>Siddhant</Text>
            <Text>Add Data</Text> */}
            <LineChart
              data={intialGraphValue}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
          </Block>
        {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <Block flex style={imgContainer}>
            <Image source={{uri: item.image}} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={14} style={styles.cardTitle}>{item.title}</Text>
            <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.cta}</Text>
          </Block>
        </TouchableWithoutFeedback> */}
      </Block>
    );
  }


Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
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