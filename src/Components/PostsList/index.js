import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Share } from 'react-native'
import { SimpleLineIcons, AntDesign, EvilIcons, FontAwesome } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
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
import firebase from '../../../firebaseConfig';

function Post({ name, icon, source, comment, likes}) {

    //let [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);

function downloadFile(uri){
        let fileUri = FileSystem.documentDirectory + "lifweb.jpg";
        FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
            setFile(uri);
          })
          .catch(error => {
            console.error(error);
          })
    }

    let openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync())) {
          alert(`Uh oh, sharing isn't available on your platform`);
          return;
        }
        downloadFile(
            'https://firebasestorage.googleapis.com/v0/b/lifweb-38828.appspot.com/o/user%2FJP5UY9rpQvco4RusP7vPD8Drf3S2%2Fcapa?alt=media&token=7262666b-f0e0-45cd-b5a5-c6b51560d983'
            )
        await Sharing.shareAsync(file,{dialogTitle:'Imagem compartilhada pelo app LifWeb'});
        //await onShare(name)
      };

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
                name +' compartilhou esta postagem através do app LifWeb. Junte-se a nos! https://lifweb.com.br/ ',

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
                    <TouchableOpacity style={{paddingRight:10}} onPress={openShareDialogAsync}>
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

    const [following, setfollwing] = useState([])
    const [gotfollowing, setgotfollowing] = useState(false)
    const [posts, setposts] = useState([])
    const [gotposts, setgotposts] = useState(false)
    getFollowing()
    getposts().then(console.log(posts))

    function getFollowing(){
        const user = firebase.auth().currentUser
        if(!gotfollowing){
            firebase.firestore().collection('user').doc(user.uid).get().then(
            data => {
                var dados = data.data()
                var a = []
                if(dados['following']){
                    a = (dados['following'])  
                }else{
                    firebase.firestore().collection('user').doc(user.uid).update({
                        following:[],
                        followed: []
                    })
                }
                a.push(user.uid)
                setfollwing(a)
                if(!dados['posts']){
                    firebase.firestore().collection('user').doc(user.uid).update({
                        posts:[]
                    })
                }
            })
            setgotfollowing(true)
        }          
    }

    async function getposts(){
        var psts = []
        var post = null
        if(!gotposts){
            for(let i = 0; i<following.length; i++){
                console.log(i)
                post = await firestore.firestore().collection('user').doc(following[i]).get().then(data => {
                    var dados = data.data()
                    if(dados['posts']){
                        return dados['posts']
                    }else{
                        firebase.firestore().collection('user').doc(following[i]).update({
                            posts:[]
                        })
                        return []
                    }
                })
                psts.concat(psts, post)
            }
            for(let i = 0; i < psts.length; i++){
                post = psts[i] 
                psts[i] = await firebase.firestore().collection('posts').doc(psts[i]).get().then(
                    data => {
                        return data.data()
                    }
                )
                psts[i]['imagem'] = await firebase.storage().ref('user/' + psts[i]['owner'] + "/posts/" + post).getDownloadURL().then(url => {return {uri:url}})
            }
            setposts(psts)
            setgotposts(true)
        }
    }

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
