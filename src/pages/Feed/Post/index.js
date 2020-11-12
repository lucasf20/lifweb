import React, { useState, Fragment, forceUpdate } from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions, FlatList,TouchableHighlight, Alert, Share } from 'react-native'
import firebase from '../../../../firebaseConfig'
import profileIcon from '../../../assets/logolifweb.png'
import { SimpleLineIcons, Fontisto, FontAwesome } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Svg, {
    Image as SvgImage,
    Defs,
    ClipPath,
    Polygon,
} from 'react-native-svg';

import caveira from '../../../assets/caveira.png'
import caveiralike from '../../../assets/caveiralike.png'
import Comentario from '../../../assets/comentario.png'
import ShareIcon from '../../../assets/share.png'
import Repost from '../../../assets/repost.png'
import colorStyles from '../../../colors'
import { useNavigation, StackActions } from '@react-navigation/native';

function RenderPost({ post }) {

    const [file, setFile] = useState(null);

    const [h, seth] = useState(Dimensions.get('window').width - 40)
    const [w, setw] = useState(Dimensions.get('window').width - 40)
    const [showops, setshowops] = useState(false)

    const user = firebase.auth().currentUser
    const apelido = post['apelido']
    const avatar = (post['avatar']) ? post['avatar'] : profileIcon
    const imagem = (post['repost']) ? post['repost']['image'] : post['image']
    const repost = post['repost']
    const comments = post['comments']
    const likes = post['likes']
    const descricao = post['descricao']
    const owner = post['owner']
    const postname = post['postname']
    const rotation = post['rotation']
    const nav = useNavigation()

    const [liked, setliked] = useState(likes.includes(user.uid))
    const [numlikes, setnumlikes] = useState(likes.length)
    
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
            imagem.uri
            )
        await Sharing.shareAsync(file,{dialogTitle:'Imagem compartilhada pelo app LifWeb'});
        //await onShare(name)
      };

      const onShare = async () => {
        try {
          const result = await Share.share({
            message:
                `${apelido} compartilhou esta postagem através do app LifWeb. Junte-se a nos! https://lifweb.com.br/ 

${descricao}`,

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

    
    function shareAlert(){
        Alert.alert(
            'Compartilhar Post',
            'Escolha o compartilhamento',
            [
              {
                text: 'Exportar Imagem',
                onPress: () => openShareDialogAsync()
              },
              {
                text: 'Compartilhar Texto',
                onPress: () => onShare(),
                style: 'cancel'
              }
            ],
            { cancelable: true }
          );
    }

    function height() {
        if (!imagem) {
            return { h, w }
        } else {
            Image.getSize(imagem.uri, (width, height) => {
                if (rotation == "0deg") {
                    seth(height)
                    setw(width)
                } else {
                    seth(width)
                    setw(height)
                }
            }, (error) => {
                console.error(`Couldn't get the image size: ${error.message}`);
            });
            var wt = Dimensions.get('window').width - 10
            var ht = h * (wt) / w
            return { h: ht, w: wt }
        }
    }

    async function like() {
        if (!liked) {
            await firebase.firestore().collection('posts').doc(postname).update({ likes: firebase.firestore.FieldValue.arrayUnion(user.uid) })
            setliked(true)
            setnumlikes(numlikes + 1)
        } else {
            await firebase.firestore().collection('posts').doc(postname).update({ likes: firebase.firestore.FieldValue.arrayRemove(user.uid) })
            setliked(false)
            setnumlikes(numlikes - 1)
        }
    }

    async function repostar() {
        var pname = Date.now().toString()
        var metadata = {
            owner: user.uid,
            likes: [],
            descricao: descricao,
            rotation: rotation,
            comments: [],
            repost: (repost) ? repost : post
        }
        await firebase.firestore().collection("posts").doc(pname).set(metadata)
        await firebase.firestore().collection('user').doc(user.uid).update({ posts: firebase.firestore.FieldValue.arrayUnion(pname) })
        nav.dispatch(StackActions.popToTop)
        nav.navigate('Feed')
    }

    function getTime() {
        var now = Date.now()
        var posttime = Math.floor(postname)
        var minutes = (now - posttime) / 60000
        if (minutes < 60) {
            return "Há " + Math.round(minutes) + " minutos atrás"
        } else if ((minutes / 60) < 24) {
            return "Há " + Math.round(minutes / 60) + " horas atrás"
        } else {
            return "Há " + Math.round((minutes / 60) / 24) + " dias atrás"
        }
    }
    async function excluirPost(){
        await firebase.firestore().collection('posts').doc(postname).delete()
        await firebase.firestore().collection('user').doc(owner).update({posts:firebase.firestore.FieldValue.arrayRemove(postname)})
        if(!repost){
            await firebase.storage().ref('user/' + owner + "/posts/" + postname).delete()
        }
        nav.navigate('Feed')
        nav.dispatch(StackActions.popToTop)
        nav.navigate('Feed')
    }

    return (
        <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {(post['avatar']) ? (
                        <Svg style={{
                            width: 45,
                            height: 45,
                            borderRadius: 50,
                            marginRight: 8
                        }} width="50" height="50" viewBox="0 -3 43 55">
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
                                href={avatar}
                                clipPath="#image"
                            />
                        </Svg>
                    ) : (<Image source={avatar} style={{ height: 50, width: 43, marginRight: 13 }} />)}
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>
                            {apelido}
                        </Text>
                        {(repost) ? (<TouchableOpacity style={{ flexDirection: 'row' }} >
                            <Text>
                                {"Compartilhado de "}
                            </Text>
                            <Text style={{ color: colorStyles.dorange, fontWeight: 'bold' }}>
                                {repost['apelido']}
                            </Text>
                        </TouchableOpacity>) : (<Fragment />)}
                        <Text style={{ color: 'gray' }}>
                            {getTime()}
                        </Text>
                    </View>
                </TouchableOpacity>
                <SimpleLineIcons name="options" size={24} color="gray" onPress={() => {(showops)?setshowops(false):setshowops(true)}}/>
            </View>
            <View>
            <FlatList
                    data={(showops && (owner == user.uid))?['Excluir Post', 'Editar Post']:[]}
                    renderItem={({ item, index, separators }) => (
                        <TouchableHighlight
                            key={item.key}
                            onPress={
                                () => { 
                                    if(item == "Excluir Post"){
                                        Alert.alert(
                                            'Excluir Post?',
                                            'Você tem certeza que deseja excluir esta postagem?',
                                            [
                                              {
                                                text: 'Exlcuir',
                                                onPress: () => excluirPost()
                                              },
                                              {
                                                text: 'Cancelar',
                                                onPress: () => console.log('Cancel Pressed'),
                                                style: 'cancel'
                                              }
                                            ],
                                            { cancelable: false }
                                          );
                                    } 
                            }}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}>
                            <View style={{ backgroundColor: (item == 'Excluir Post')?'red':'orange', borderRadius: 5, height: 50, marginTop:1, marginHorizontal:5, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{ fontSize: 15, color: (item == 'Excluir Post')?'white':'black' }}>{item}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
                <Image source={imagem} style={{ height: height().h, width: height().w, borderRadius: 5, marginVertical: 20, marginHorizontal: 5 }} />
                <View style={{flexDirection:'row', marginHorizontal:5}}>
                    <Text style={{fontSize:16}}>
                        {descricao}
                    </Text>
                </View>
            </View> 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                <View>
                    <Text>
                        Curtido por {numlikes}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={like}>
                        <Image source={(liked) ? caveiralike : caveira} style={{ height: 30, width: 30 }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 10 }}>
                        <Image source={Comentario} style={{ height: 30, width: 30 }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={repostar}>
                        <Image source={Repost} style={{ height: 30, width: 30 }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={()=>shareAlert()} >
                        <Image source={ShareIcon} style={{ height: 30, width: 30 }} ></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default function Post() {

    const user = firebase.auth().currentUser
    const [pts, setpts] = useState([])
    const [got, setgot] = useState(false)

    async function getFollowers() {
        var f = await firebase.firestore().collection('user').doc(user.uid).get().then(data => {
            var dados = data.data()
            if (dados['following']) {
                return dados['following']
            } else {
                return []
            }
        })
        f.push(user.uid)
        return f
    }

    async function getPosts() {
        var uidList = await getFollowers().then(data => data)
        var posts = []
        var postnames = []
        for (let i = 0; i < uidList.length; i++) {
            var a = await firebase.firestore().collection('user').doc(uidList[i]).get().then(
                data => {
                    var dados = data.data()
                    if (dados['posts']) {
                        return dados['posts']
                    } else {
                        return []
                    }
                }
            )
            postnames = postnames.concat(a)
        }
        postnames.sort()
        postnames.reverse()
        for (let i = 0; i < postnames.length; i++) {
            if (Date.now() - Math.floor(postnames[i]) < 86400000) {
                var p = await firebase.firestore().collection('posts').doc(postnames[i]).get().then(data => data.data())
                var postimage = (!p['repost']) ? (await firebase.storage().ref("user/" + p['owner'] + "/posts/" + postnames[i]).getDownloadURL().then(url => { return { uri: url } })) : (null)
                var avatar = await firebase.storage().ref("user/" + p['owner'] + "/perfil").getDownloadURL().then(url => { return { uri: url } }).catch(erro => { return false })
                var apelido = await firebase.firestore().collection('user').doc(p['owner']).get().then(data => { return data.data()['apelido'] })
                posts.push({ ...p, postname: postnames[i], image: postimage, avatar, apelido })
            }
        }
        return posts
    }

    if (!got) {
        getPosts().then(p => {
            setpts(p)
            setgot(true)
        })
    }

    return (
        <View style={{ marginBottom: 100 }}>
            {pts.map(item => <RenderPost post={item}></RenderPost>)}
            <View style={{justifyContent:'center', alignItems:'center', height:50, flexDirection:'row'}}>
                <Fontisto name="motorcycle" size={24} color={colorStyles.dorange} />
            </View>
        </View>
    )
}