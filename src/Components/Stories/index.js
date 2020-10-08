import React from 'react';
import {
  FlatList,
  Text,
} from 'react-native';

import Item from './Item';
import PostImage from '../../images/post_image.jpg';
import UserImage from '../../images/avatar_stories1.jpg';

const Stories = () => {
  const datasource = [
    {
			image: PostImage,
      user: {
				name: 'User 1',
				image: UserImage,
			},
		},
		{
			image: PostImage,
      user: {
				name: 'User 1',
				image: UserImage,
			},
		},
		{
			image: PostImage,
      user: {
				name: 'User 1',
				image: UserImage,
			},
    },
  ];

  return (
    <FlatList
      horizontal
      data={datasource}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
				<Item {...item} />
      )} />
  );
};

export default Stories;
