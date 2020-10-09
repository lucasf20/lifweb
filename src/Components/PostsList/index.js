import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { SimpleLineIcons, AntDesign, EvilIcons, FontAwesome } from '@expo/vector-icons';
import Icon from '../../images/avatar_stories1.png'
import PostImage from '../../images/post_image.png'
import Svg, {
  Image as SvgImage,
  Defs,
  ClipPath,
  Polygon,
} from 'react-native-svg';

import Icon2 from '../../images/avatar_stories1.jpg'
import PostImage2 from '../../images/post_image.jpg'
import Caveira from '../../assets/caveira.png'
import Comentario from '../../assets/comentario.png'
import Share from '../../assets/share.png'
import Repost from '../../assets/repost.png'

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
                        <Svg style={styles.avatar} width="50" height="50" viewBox="0 0 50 50">
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
                            href={icon}
                            clipPath="#image"
                        />
                        </Svg>
                        {/* <Image style={styles.avatar} source={icon} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>{name}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <SimpleLineIcons name="options" size={24} color="gray" style={{paddingRight:15}}/>
                </TouchableOpacity>
            </View>
            <View>
                <View style={{alignItems:'center'}}>
                    <Image style={{...styles.postImg, width:imageResize(source)[0],height:imageResize(source)[1]}} source={source} />
                </View>
            </View>
            <View style={styles.footer}>
            </View>
            <View style={{justifyContent:'space-between', flexDirection:"row"}}>
            <View style={styles.likes}>
                <Image style={styles.avatarLikes} source={icon} />
                <Text numberOfLines={1}>Curtido por {Math.floor(Math.random() * 50000)}</Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={{paddingRight:10}}>
                        <Image source={Caveira} style={{height:30, width:30}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingRight:10}}>
                        <Image source={Comentario} style={{height:30, width:30}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingRight:10}}>
                        <Image source={Repost} style={{height:30, width:30}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingRight:10}}>
                        <Image source={Share} style={{height:30, width:30}}></Image>
                    </TouchableOpacity>
                </View>
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
                <TouchableOpacity style={{height:85}}>
                    <Text>
                        End of posts
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
export default PostsList