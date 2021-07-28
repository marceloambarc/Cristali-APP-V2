import React from "react";
import { View, Text, Image } from "react-native";

import { styles } from './styles';

export function Banner(){
  return (
    <View style={styles.container}>
      <View style={styles.banner} >

        <View style={styles.bannerRow}>
          <View style={styles.bannerCol}>
            <Image 
              source={require('../../assets/cards/mastercard.png')}
              style={styles.cardsImage}
            />
          </View>
          <View style={styles.bannerCol}>
            <Image 
              source={require('../../assets/cards/visa.png')}
              style={styles.cardsImage}
            />
          </View>
          <View style={styles.bannerCol}>
            <Image 
              source={require('../../assets/cards/elo.png')}
              style={styles.cardsImage}
            />
          </View>
          <View style={styles.bannerCol}>
            <Image 
              source={require('../../assets/cards/banri.png')}
              style={styles.cardsImage}
            />
          </View>
        </View>
        <View style={styles.bannerRow}>
          <View style={styles.bannerCol}>
            <Image 
              source={require('../../assets/cards/amex.png')}
              style={styles.cardsImage}
            />
          </View>
          <View style={styles.bannerCol}>
            <Image 
              source={require('../../assets/cards/cabal.png')}
              style={styles.cardsImage}
            />
          </View>
          <View style={styles.bannerCol}>
            <Image 
              source={require('../../assets/cards/diners.png')}
              style={styles.cardsImage}
            />
          </View>
          <View style={styles.bannerCol}>
            <Image 
              source={require('../../assets/cards/hiper.png')}
              style={styles.cardsImage}
            />
          </View>
        </View>

      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Bandeiras Aceitas</Text>
      </View>

    </View>
  );
}