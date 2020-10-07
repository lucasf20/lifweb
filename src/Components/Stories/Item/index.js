import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

import {styles} from './styles';

const Item = ({user, image}) => {
  return (
    <View style={{
      ...styles.container,
    }}>
      <Image
        source={image} />
      <View style={{
        ...styles.wrapper,
      }}>
        <Image
          style={{
            ...styles.userimage,
          }}
          source={user.image} />
        <View style={{
          ...styles.usercontainer,
        }}>
          <Text style={{
            ...styles.whitecolor,
            ...styles.boldtext,
          }}>
            {user.name}
          </Text>
          <Text style={{
            ...styles.whitecolor,
          }}>
            2 min atrás
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Item;
