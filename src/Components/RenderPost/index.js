import React, { useState, Fragment } from 'react'

import { ScrollView, View, Image, Text, Dimensions, TouchableOpacity, FlatList, Alert, TouchableHighlight, Share } from 'react-native'

import { SimpleLineIcons } from '@expo/vector-icons'

import firebase from '../../../firebaseConfig'
import profileIcon from '../../assets/logolifweb.png'
import { Fontisto, FontAwesome } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Svg, {
    Image as SvgImage,
    Defs,
    ClipPath,
    Polygon,
} from 'react-native-svg';

import caveira from '../../assets/caveira.png'
import caveiralike from '../../assets/caveiralike.png'
import Comentario from '../../assets/comentario.png'
import ShareIcon from '../../assets/share.png'
import Repost from '../../assets/repost.png'
import { useNavigation, StackActions } from '@react-navigation/native';
import colorStyles from '../../colors'

function LikeAvatar({ likelist }) {

    const [image, setimage] = useState(null)

    async function getImg(uid) {
        var img = await firebase.storage().refFromURL("gs://lifweb-38828.appspot.com/user/" + uid + "/perfil").getDownloadURL().then(url => { return { uri: url } }).catch(erro => { return false })
        if (img) {
            return img
        } else {
            return profileIcon
        }
    }

    var interval = likelist.length
    if (interval > 0) {
        var random = Math.floor(Math.random()) % interval
        var winner = likelist[random]
        if (!image) {
            getImg(winner).then(im => setimage(im))
        }
        return (
            <Fragment>
                {(image == profileIcon) ?
                    (<Image source={profileIcon} style={{ height: 50, width: 43}} />) :
                    (
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
                                href={image}
                                clipPath="#image"
                            />
                        </Svg>
                    )}
            </Fragment>
        )
    }else{
        return(
            <Fragment/>
        )
    }
}

export default function RenderPost({ post }) {

    const [file, setFile] = useState(null);

    const [h, seth] = useState(Dimensions.get('window').width - 40)
    const [w, setw] = useState(Dimensions.get('window').width - 40)
    const [showops, setshowops] = useState(false)

    const user = firebase.auth().currentUser
    const apelido = post['apelido']
    const perfil = (post['avatar']) ? post['avatar'] : profileIcon
    const foto = (post['repost']) ? post['repost']['image'] : post['image']
    const repost = post['repost']
    var comments = post['comments']
    const likes = post['likes']
    const descricao = post['descricao']
    const owner = post['owner']
    const postname = post['postname']
    const rotation = post['rotation']
    const nav = useNavigation()

    const [liked, setliked] = useState(likes.includes(user.uid))
    const [numlikes, setnumlikes] = useState(likes.length)
    const [avatar, setavatar] = useState(null)
    const [imagem, setimagem] = useState(null)
    const [cached, setcached] = useState(false)
    const [lastcomment, setlastcomment] = useState(null)

    setTimeout(async () => {
        comments = await firebase.firestore().collection('posts').doc(postname).get().then(data => data.data()['comments'])
        if(comments.length > 0){
            var last = comments[comments.length -1]
            var com = {
                user: await firebase.firestore().collection('user').doc(last['user']).get().then(data => data.data()['apelido']),
                comment: last['comment']
            }
            setlastcomment(com)
        }else{
            setlastcomment(null)
        }
    }, 1000);

    if (!cached) {
        cache(foto.uri, 'foto').then(obj => { setimagem(obj); })
        if (post['avatar']) {
            setavatar(perfil)
        } else {
            setavatar(profileIcon)
        }
        setcached(true)
    }

    function navigateOwnerProfile() {
        nav.dispatch(StackActions.popToTop());
        nav.navigate('Profile', { uid: owner });
    }
    function navigateRepostProfile() {
        nav.dispatch(StackActions.popToTop());
        nav.navigate('Profile', { uid: repost['owner'] });
    }

    async function cache(uri, type) {
        if (type == 'foto') {
            var f = await FileSystem.getInfoAsync(FileSystem.documentDirectory + postname)
            if (f.exists) {
                return { uri: FileSystem.documentDirectory + postname }
            } else {
                var file = FileSystem.documentDirectory + postname
                await FileSystem.downloadAsync(uri, file)
                return { uri: FileSystem.documentDirectory + postname }
            }
        } else {
            var f = await FileSystem.getInfoAsync(FileSystem.documentDirectory + owner)
            if (f.exists) {
                return { uri: FileSystem.documentDirectory + owner }
            } else {
                var file = FileSystem.documentDirectory + owner
                await FileSystem.downloadAsync(uri, file)
                return { uri: FileSystem.documentDirectory + owner }
            }
        }
    }

    function downloadFile(uri) {
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
        // downloadFile(
        //     imagem.uri
        // )
        await Sharing.shareAsync(imagem.uri, { dialogTitle: 'Imagem compartilhada pelo app LifWeb' });
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


    function shareAlert() {
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
            return "Há " + Math.round(minutes) + " minutos"
        } else if ((minutes / 60) < 24) {
            return "Há " + Math.round(minutes / 60) + " horas"
        } else {
            return "Há " + Math.round((minutes / 60) / 24) + " dias"
        }
    }
    async function excluirPost() {
        await firebase.firestore().collection('posts').doc(postname).delete()
        await firebase.firestore().collection('user').doc(owner).update({ posts: firebase.firestore.FieldValue.arrayRemove(postname) })
        if (!repost) {
            await firebase.storage().ref('user/' + owner + "/posts/" + postname).delete()
        }
        nav.navigate('Feed')
        nav.dispatch(StackActions.popToTop)
        nav.navigate('Feed')
    }

    return (
        <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { navigateOwnerProfile() }}>
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
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>
                            {apelido}
                        </Text>
                        {repost &&
                            <Text>
                                {"Compartilhado de "}
                            </Text>}
                        <Text style={{ color: 'gray' }}>
                            {getTime()}
                        </Text>
                    </View>
                    {(repost) ? (<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigateRepostProfile() }}>
                        {<TouchableOpacity onPress={() => { navigateRepostProfile() }} style={{ marginLeft: 5 }}>
                            {(repost['avatar']) ? (
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
                                        href={repost['avatar']}
                                        clipPath="#image"
                                    />
                                </Svg>
                            ) : (<Image source={profileIcon} style={{ height: 50, width: 43, marginRight: 13 }} />)}
                        </TouchableOpacity>}
                        <Text style={{ color: colorStyles.dorange, fontWeight: 'bold' }}>
                            {repost['apelido']}
                        </Text>
                    </TouchableOpacity>) : (<Fragment />)}
                </View>
                <SimpleLineIcons name="options" size={24} color="gray" onPress={() => { (showops) ? setshowops(false) : setshowops(true) }} />
            </View>
            <View>
                <FlatList
                    data={(showops && (owner == user.uid)) ? ['Excluir Post', 'Editar Post'] : []}
                    renderItem={({ item, index, separators }) => (
                        <TouchableHighlight
                            key={item.key}
                            onPress={
                                () => {
                                    if (item == "Excluir Post") {
                                        Alert.alert(
                                            'Excluir Post?',
                                            'Você tem certeza que deseja excluir esta postagem?',
                                            [
                                                {
                                                    text: 'Excluir',
                                                    onPress: () => excluirPost()
                                                },
                                                {
                                                    text: 'Cancelar',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel'
                                                }
                                            ],
                                            { cancelable: true }
                                        );
                                    }
                                }}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}>
                            <View style={{ backgroundColor: (item == 'Excluir Post') ? 'red' : 'orange', borderRadius: 5, height: 50, marginTop: 1, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, color: (item == 'Excluir Post') ? 'white' : 'black' }}>{item}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
                <Image source={imagem} style={{ height: height().h, width: height().w, borderRadius: 5, marginVertical: 20, marginHorizontal: 5 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft:13}}>
                <LikeAvatar likelist={likes}/>
                <View>
                    <Text style={{marginLeft:5}}>
                        Curtido por {numlikes}
                    </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={like}>
                        <Image source={(liked) ? caveiralike : caveira} style={{ height: 30, width: 30 }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={() =>{nav.navigate("Comments", {post:post})}}>
                        <Image source={Comentario} style={{ height: 30, width: 30 }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => {
                        Alert.alert(
                            'Respostar Post?',
                            'Você tem certeza que deseja repostar esta postagem?',
                            [
                                {
                                    text: 'Repostar',
                                    onPress: () => repostar()
                                },
                                {
                                    text: 'Cancelar',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel'
                                }
                            ],
                            { cancelable: true }
                        );
                    }}>
                        <Image source={Repost} style={{ height: 30, width: 30 }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => shareAlert()} >
                        <Image source={ShareIcon} style={{ height: 30, width: 30 }} ></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginHorizontal: 5, marginTop: 10, width:Dimensions.get('window').width - 10 }}>
                <Text style={{ fontSize: 16 }}>
                    {descricao}
                </Text>
                {lastcomment && 
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() =>{nav.navigate("Comments", {post:post})}}>
                    <Text style={{fontWeight:'bold', color:colorStyles.dorange, fontSize: 16 }}>
                        {lastcomment.user}:
                    </Text>
                    <Text style={{fontSize: 16 }}>
                        {" "+lastcomment.comment}
                    </Text>
                </TouchableOpacity >
                }
            </View>
        </View>
    )
}