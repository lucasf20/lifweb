import React, {useState} from 'react';
import {
  FlatList,
  Text,
} from 'react-native';

import {styles} from './styles'

import Item from './Item';

import firebase from '../../../firebaseConfig';

const Stories = () => {

  const [p, setp] = useState(null)

firebase.firestore().collection('posts').where('repost', '==', false).get().then(
  data => {
    var posts = []
    data.forEach(item => 
         posts.push({...item.data(), postname:item.id})
    )
    if(!p){
      setp(posts.sort((a,b)=>{
        var order = [true, false]
        var num = Math.floor(Math.random()*10)%2
        return order[num]
      }).slice(0,5))
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
