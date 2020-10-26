import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import {styles} from './styles'

const Button = ({
  onPress = () => {},
  text = '',
  icon = null,
  foregroundColor = '#000',
  backgroundColor = '#FFF',
  textTransform = 'uppercase',
  style = {},
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor,
        ...styles.container,
        ...style,
      }}
      {...props}
      onPress={onPress}>
      <View style={{
        ...styles.flexGrow,
        ...styles.alignItemsCenter,
        ...styles.justifyContentCenter,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={15}
              style={{
                color: foregroundColor,
                ...styles.marginRight,
              }} />
          )}
          <Text style={{
            color: foregroundColor,
            ...styles.text,
            textTransform,
          }}>
            {text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Button
