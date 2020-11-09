import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Share } from 'react-native'
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
import caveira from '../../assets/caveira.png'
import caveiralike from '../../assets/caveiralike.png'

import Comentario from '../../assets/comentario.png'
import ShareIcon from '../../assets/share.png'
import Repost from '../../assets/repost.png'

import UserImage2 from '../../images/avatar_stories2.jpg';
import UserImage3 from '../../images/perfil3.jpg';

import styles from './styles'

function Post({ name, icon, source, comment, likes}) {

    function imageResize(source){
        const screenwidth = Dimensions.get('window').width - 10;
        const {width, height} = Image.resolveAssetSource(source);
        return [screenwidth, height * screenwidth/width] 
    }

function trocaCaveira(){
    (like)?setLike(false):setLike (true)
    }

    const [like, setLike] = useState (false)   


const onShare = async (name) => {
        try {
          const result = await Share.share({
            message:
                'Imagem compartilhada atraves de postagem do lifweb. Junte-se a nos! https://lifweb.com.br/ ',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <View style={styles.info}>
                    <TouchableOpacity>
                       <Svg style={styles.avatar} width="50" height="50" viewBox="0 -3 43 55">
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
                <Text numberOfLines={1}>Curtido por {likes} pessoas</Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={{paddingRight:10}} onPress={trocaCaveira}>
                        <Image source={(like)?caveiralike:caveira} style={{height:30, width:30}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingRight:10}}>
                        <Image source={Comentario} style={{height:30, width:30}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingRight:10}}>
                        <Image source={Repost} style={{height:30, width:30}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingRight:10}} onPress={()=>{onShare(name)}}>
                        <Image source={ShareIcon} style={{height:30, width:30}}></Image>
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
                <Post name="Renan" icon={UserImage2} source={PostImage} comment="Corrida!!!" likes="5"/>
                <Post name="Eduardo" icon={Icon} source={PostImage} comment="Segura!!!"  likes ="10" />
                <Post name="João Pedro" icon={UserImage3} source={PostImage2} comment="Que cidade incrivel!!!" likes ="3" />
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
