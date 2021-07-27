import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Image, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, ImageURISource, View } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global';

interface Props extends TouchableWithoutFeedbackProps {
  title: string;
  bcolor: string;
  tcolor: string;
  pressed?: boolean;
  path: ImageURISource;
}

export function CheckOutButton({
  title, 
  bcolor, 
  tcolor, 
  pressed = false,
  path,
  ...rest } : Props){
 const { gradient1, gradient2, Success } = theme.colors;

 return (
   <TouchableWithoutFeedback
     { ...rest }
   >
     <LinearGradient 
       style={[styles.container, {borderColor: bcolor}]}
       
       colors={
         pressed?
         [ Success, Success ]
         :
         [ gradient1, gradient2 ]
       }
     >
       <View style={styles.iconContainer}>
         <Image
           style={styles.icon}
           source={path}
           resizeMode='contain'
         />
       </View>
       <Text 
       style={
         [styles.title, 
           pressed?
           {color: theme.colors.input}
           :
           {color: tcolor}
         ]
       }
       >
         { title }
       </Text>
     </LinearGradient>
   </TouchableWithoutFeedback>
 );
}