import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { SimpleLineIcons, AntDesign, EvilIcons, FontAwesome } from '@expo/vector-icons';
import Icon from '../../images/avatar_stories1.png'
import PostImage from '../../images/post_image.png'

import Icon2 from '../../images/avatar_stories1.jpg'
import PostImage2 from '../../images/post_image.jpg'
import Caveira from '../../assets/caveira.png'
import Comentario from '../../assets/comentario.png'
import Share from '../../assets/share.png'

import styles from './styles'

function Post({ name, icon, source, comment }) {

    function imageResize(source){
        const screenwidth = Dimensions.get('window').width - 10;
        const {width, height} = Image.resolveAssetSource(source);
        return [screenwidth, height * screenwidth/width] 
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <View style={styles.info}>
                    <TouchableOpacity>
                        <Image style={styles.avatar} source={icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>{name}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <SimpleLineIcons name="options-vertical" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <View style={{alignItems:'center'}}>
                    <Image style={{...styles.postImg, width:imageResize(source)[0],height:imageResize(source)[1]}} source={source} />
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.actions}>
                    <TouchableOpacity style={{paddingRight:10}}>
                        <Image source={Caveira} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingRight:10}}>
                        <Image source={Comentario} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingRight:10}}>
                        <Image source={Share} ></Image>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <FontAwesome name="bookmark-o" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.likes}>
                <Image style={styles.avatarLikes} source={icon} />
                <Text numberOfLines={1}>Curtido por {name} e outras {Math.floor(Math.random() * 50000)} pessoas.</Text>
            </View>
            <View style={styles.comments}>
                <Text style={styles.commentsUser}>{name}:</Text>
                <Text style={styles.commentsText}>{comment}</Text>
            </View>
        </View>
    )
}
function PostsList() {
    return (
        <View style={{height:'auto', flex:1}}>
            <ScrollView>
                <Post name="Renan" icon={Icon} source={PostImage} comment="Corrida!!!" />
                <Post name="Eduardo" icon={Icon} source={PostImage} comment="Segura!!!" />
                <Post name="João Pedro" icon={Icon2} source={PostImage2} comment="Que cidade incrivel!!!" />
                <TouchableOpacity style={{height:115}}>
                    <Text>
                        End of posts
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
export default PostsList