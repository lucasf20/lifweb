import * as Localization from 'expo-localization'
import i18n from 'i18n-js';
import React, {useState} from 'react';
import {
  FlatList,
  Text,
} from 'react-native';

import {styles} from './styles'

import Item from './Item';

import firebase from '../../../firebaseConfig';
import translate from '../../translate';

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;

const Stories = () => {

  const [p, setp] = useState([])
  const [ok, setok] = useState(false)

firebase.firestore().collection('posts').where('repost', '==', false).get().then(
  data => {
    var posts = []
    data.forEach(item => 
         posts.push({...item.data(), postname:item.id})
    )
    if(!ok){
      setp(posts.reverse().slice(0,5))
      setok(true)
    }
  }
  )

  return (
    <>
      <Text style={{
        ...styles.marginHorizontal,
      }}>
          {i18n.t('mostliked')} 
      </Text>
      <FlatList
        horizontal
        data={(p)?p:[]}
        keyExtractor={(item, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Item post={item}/>
        )} />
    </>
  );
};

export default Stories;
