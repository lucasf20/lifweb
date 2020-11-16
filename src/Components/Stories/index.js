import React, {useState} from 'react';
import {
  FlatList,
  Text,
} from 'react-native';

import {styles} from './styles'

import Item from './Item';

import firebase from '../../../firebaseConfig';

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
      setp(posts.sort().slice(0,5))
      setok(true)
    }
  }
  )

  return (
    <>
      <Text style={{
        ...styles.marginHorizontal,
      }}>
        Mais curtidos
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
