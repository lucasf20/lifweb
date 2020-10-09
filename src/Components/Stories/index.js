import React from 'react';
import {
  FlatList,
  Text,
} from 'react-native';

import {styles} from './styles'

import Item from './Item';
import PostImage from '../../images/PostImg.png';
import PostImage2 from '../../images/PostImage2.png';
import PostImage3 from '../../images/PostImage3.png';
import UserImage from '../../images/perfil3.jpg';
import UserImage2 from '../../images/avatar_stories2.jpg';
import UserImage3 from '../../images/avatar_stories3.jpg';

const Stories = () => {
  const datasource = [
    {
			image: PostImage2,
      user: {
				name: 'Moto Vlog',
				image: UserImage,
			},
		},
		{
			image: PostImage,
      user: {
				name: 'Vinny Santos',
				image: UserImage2,
			},
		},
		{
			image: PostImage3,
      user: {
				name: 'Venssar Biker',
				image: UserImage3,
			},
    },
  ];

  return (
    <>
      <Text style={{
        ...styles.marginHorizontal,
      }}>
        Mais curtidos
      </Text>
      <FlatList
        horizontal
        data={datasource}
        keyExtractor={(item, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Item {...item} />
        )} />
    </>
  );
};

export default Stories;
