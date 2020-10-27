import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import Svg, {
  Image as SvgImage,
  Defs,
  ClipPath,
  Polygon,
} from 'react-native-svg';

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
       <Svg width="50" height="50" viewBox="0 -3 43 55">
        <Polygon stroke='#F25C05' strokeWidth={5} points="0 10, 22.5 0, 45 10, 45 40, 22.5 50, 0 40" />
          <Defs>
            <ClipPath id="image" clipRule="evenodd">
              <Polygon points="0 10, 22.5 0, 45 10, 45 40, 22.5 50, 0 40" />
            </ClipPath>
          </Defs>
          <SvgImage
            x="0"
            y="0"
            width="50"
            height="50"
            href={user.image}
            clipPath="#image"
          />
        </Svg>
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
