import * as Localization from 'expo-localization'
import i18n from 'i18n-js';
import React, { useState, Fragment } from 'react'

import { ScrollView, View, Image, Text, Dimensions, TouchableOpacity, FlatList, Alert, TouchableHighlight, Share, Linking } from 'react-native'

import { SimpleLineIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';


import firebase from '../../../firebaseConfig'
import profileIcon from '../../assets/logolifweb.png'
import { MaterialIcons } from '@expo/vector-icons';
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
import MyTextInput from '../../MyTextInput'
import * as ImageManipulator from 'expo-image-manipulator';

import translate from '../../translate';

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;


function LikeAvatar({ likelist }) {

    const [image, setimage] = useState(null)
    const [u, setu] = useState(null)
    const nav = useNavigation()

    async function getImg(uid) {
        var img = await firebase.storage().refFromURL("gs://lifweb-38828.appspot.com/user/" + uid + "/perfil").getDownloadURL().then(url => { return { uri: url } }).catch(erro => { return false })
        if (img) {
            return img
        } else {
            return profileIcon
        }
    }


    function navigateOwnerProfile() {
        nav.dispatch(StackActions.popToTop());
        nav.navigate('Profile', { uid: u });
    }

    var interval = likelist.length
    if (interval > 0) {
        var random = Math.floor(Math.random() * Date.now()) % interval
        var winner = likelist[random]
        if (!image) {
            getImg(winner).then(im => { setimage(im); setu(winner) })
        }
        return (
            <Fragment>
                { u && <TouchableOpacity onPress={() => { navigateOwnerProfile() }}>
                    {(image == profileIcon) ?
                        (<Image source={profileIcon} style={{ height: 50, width: 43 }} />) :
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
                </TouchableOpacity>
                }
            </Fragment>
        )
    } else {
        return (
            <Fragment />
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
    const foto = (post['repost']) ? post['repost']['image']['uri'] : post['image']['uri']
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
    const [gotcomment, setgotcomment] = useState(false)
    const [edit, setedit] = useState(false)
    const [descript, setdescript] = useState(descricao)

    //setTimeout(() => { getcomments() }, 15000);

    async function getcomments() {
        comments = await firebase.firestore().collection('posts').doc(postname).get().then(data => data.data()['comments'])
        if (comments.length > 0) {
            var last = comments[comments.length - 1]
            var com = {
                user: await firebase.firestore().collection('user').doc(last['user']).get().then(data => data.data()['apelido']),
                comment: last['comment'],
                tam: comments.length
            }
            setlastcomment(com)
        } else {
            setlastcomment(null)
        }
        setgotcomment(true)
    }

    if (!gotcomment) {
        getcomments()
    }

    if (!cached) {
        //cache(foto.uri, 'foto').then(obj => { setimagem(obj); })
        setimagem({ uri: foto })
        //Image.queryCache(foto.uri)
        //Image.prefetch(foto.uri).then(() => {setimagem(foto)})
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
        //  downloadFile(
        //      imagem.uri
        // )
        let url = 'https://intense-inlet-17045.herokuapp.com/imagens/'
        let topost = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: imagem.uri,
                rotation:rotation
            })
        }
        let img = await fetch(url, topost).then((response) => response.json()).then((json) => { return json.imagem_marcada })
        const manipResult = await ImageManipulator.manipulateAsync(
            img,
            [],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        await Sharing.shareAsync(manipResult.uri, { dialogTitle: 'Imagem compartilhada pelo app LifWeb' });
        await onShare(name)
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `${apelido} ${i18n.t('sharephrase')} https://lifweb.com.br/ 

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
            i18n.t('sharepost'),
            i18n.t('sharechoose'),
            [
                {
                    text: i18n.t('exportimg'),
                    onPress: () => openShareDialogAsync()
                },
                // {
                //     text: i18n.t('sharetext'),
                //     onPress: () => onShare(),
                //     style: 'cancel'
                // }
            ],
            { cancelable: true }
        );
    }

    function height() {
        if (!imagem) {
            return { h, w }
        } else {
            Image.getSize(imagem.uri, (width, height) => {
                if (rotation == "0deg" || rotation == '180deg') {
                    seth(height)
                    setw(width)
                } else {
                    seth(width)
                    setw(height)
                }
            }, (error) => {
                console.error(`Couldn't get the image size: ${error.message}`);
            });
            if (rotation == '0deg' || rotation == "180deg") {
                var wt = Dimensions.get('window').width - 10
                var ht = h * (wt) / w
                return { h: ht, w: wt }
            } else {
                var ht = Dimensions.get('window').width - 10
                var wt = w * (ht) / w
                return { h: ht, w: wt }
            }

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
        nav.navigate("Feed", { reload: true })
    }

    function getTime() {
        var now = Date.now()
        var posttime = Math.floor(postname)
        var minutes = (now - posttime) / 60000
        if (minutes < 60) {
            return i18n.t('ha') + Math.round(minutes) + i18n.t('minutes')
        } else if ((minutes / 60) < 24) {
            return i18n.t('ha') + Math.round(minutes / 60) + i18n.t('hours')
        } else {
            return i18n.t('ha') + Math.round((minutes / 60) / 24) + i18n.t('days')
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
        nav.navigate('Feed', { reload: true })
    }

    async function editarPost() {
        if (descript.length > 0) {
            await firebase.firestore().collection('posts').doc(postname).update({ descricao: descript })
            setedit(false)
        }
    }

    return (
        <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo name="dots-three-vertical" size={20} color="black" onPress={() => { (showops) ? setshowops(false) : setshowops(true) }} />
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
                                {i18n.t('sharedfrom')}
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
                        <Text style={{ color: colorStyles.dorange, fontWeight: 'bold', maxWidth: "45%" }}>
                            {repost['apelido']}
                        </Text>
                    </TouchableOpacity>) : (<Fragment />)}
                </View>

            </View>
            <View>
                <FlatList
                    data={(showops && (owner == user.uid)) ? [i18n.t('deletepost'), i18n.t('editpost')] : (showops) ? [i18n.t('reportpost')] : []}
                    renderItem={({ item, index, separators }) => (
                        <TouchableHighlight
                            key={item.key}
                            onPress={
                                () => {
                                    if (index == 0 && owner == user.uid) {
                                        Alert.alert(
                                            i18n.t('deletepost') + '?',
                                            i18n.t('deletequestion'),
                                            [
                                                {
                                                    text: i18n.t('delete'),
                                                    onPress: () => excluirPost()
                                                },
                                                {
                                                    text: i18n.t('cancel'),
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel'
                                                }
                                            ],
                                            { cancelable: true }
                                        );
                                    } if (index == 1 && owner == user.uid) {
                                        setedit(true)
                                        setshowops(false)
                                    } if (index == 0 && owner != user.uid) {
                                        Alert.alert(
                                            i18n.t('reportpost') + '?',
                                            i18n.t('reportquestion'),
                                            [
                                                {
                                                    text: i18n.t('report'),
                                                    onPress: () => Linking.openURL('mailto:denunciar@lifweb.com?subject='+i18n.t('reportsubject')+apelido+'body='+i18n.t('reportdescription'))
                                                },
                                                {
                                                    text: i18n.t('cancel'),
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
                            <View style={{ backgroundColor: (index == 0 && owner == user.uid) ? 'red' : (index == 1) ? '#021740' : "#ffae42", borderRadius: 5, height: 50, marginTop: 1, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, color: (index == 0) ? 'white' : 'white' }}>{item}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
                <Image source={{ uri: foto, cache: 'force-cache' }} transition={false} style={{ transform: [{ rotate: rotation }], height: (height().h), width: (height().w), borderRadius: 5, marginVertical: 20, marginHorizontal: 5 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 13 }}>
                    <LikeAvatar likelist={likes} />
                    <View>
                        <Text style={{ marginLeft: 5 }}>
                            {i18n.t('likedby')} {numlikes}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={like}>
                        <Image source={(liked) ? caveiralike : caveira} style={{ height: 30, width: 30 }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => { nav.navigate("Comments", { post: post }) }}>
                        <Image source={Comentario} style={{ height: 30, width: 30 }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => {
                        Alert.alert(
                            i18n.t('repostpost'),
                            i18n.t('repostphrase'),
                            [
                                {
                                    text: i18n.t('repost'),
                                    onPress: () => repostar()
                                },
                                {
                                    text: i18n.t('cancel'),
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
            <View style={{ marginHorizontal: 5, marginTop: 10, width: Dimensions.get('window').width - 10 }}>
                {(edit) ? (
                    <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <MyTextInput
                            onChangeText={text => setdescript(text)}
                            value={descript}
                            placeholder={i18n.t('enterdescript')}
                            style={{ width: (Dimensions.get('window').width - 80), marginRight: 10 }}
                        />
                        <View style={{ backgroundColor: colorStyles.doraange, borderRadius: 5 }}>
                            <MaterialIcons name="send" size={24} color="white" style={{ marginHorizontal: 5, marginVertical: 10 }} onPress={() => { editarPost() }} />
                        </View>
                    </View>
                ) : (<Text style={{ fontSize: 16 }}>
                    {descript}
                </Text>)}
                {lastcomment &&
                    <TouchableOpacity onPress={() => { nav.navigate("Comments", { post: post }) }} style={{ marginLeft: 15 }}>
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={{ fontWeight: 'bold', color: colorStyles.dorange, fontSize: 16 }}>
                                {lastcomment.user}:
                            </Text>
                            <Text style={{ fontSize: 14, marginEnd: 50, paddingEnd: 20 }}>
                                {" " + lastcomment.comment}
                            </Text>

                        </View>
                        <Text style={{ fontSize: 16, color: 'gray' }}>
                            {(lastcomment.tam > 1) ? i18n.t('see') + lastcomment.tam + i18n.t('comment') + 's.' : i18n.t('see') + lastcomment.tam + i18n.t('comment') + '.'}
                        </Text>

                    </TouchableOpacity >
                }
            </View>
        </View>
    )
}