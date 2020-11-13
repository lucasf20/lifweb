import React, { useState } from "react"
import { View, Dimensions, ScrollView, Image, Text } from 'react-native'
import Header from '../../Components/Header'
import MyTextInput from '../../MyTextInput'
import { MaterialIcons } from '@expo/vector-icons';
import colorStyles from '../../colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from '../../../firebaseConfig'
import profileIcon from '../../assets/logolifweb.png'
import Svg, {
    Image as SvgImage,
    Defs,
    ClipPath,
    Polygon,
} from 'react-native-svg';

function RenderComment({ comment }) {
    const [image, setimage] = useState(null)
    const [name, setname] = useState(null)

    function getTime() {
        var now = Date.now()
        var posttime = Math.floor(comment['timestamp'])
        var minutes = (now - posttime) / 60000
        if (minutes < 60) {
            return "Há " + Math.round(minutes) + " minutos"
        } else if ((minutes / 60) < 24) {
            return "Há " + Math.round(minutes / 60) + " horas"
        } else {
            return "Há " + Math.round((minutes / 60) / 24) + " dias"
        }
    }

    async function getImg(uid) {
        var img = await firebase.storage().refFromURL("gs://lifweb-38828.appspot.com/user/" + uid + "/perfil").getDownloadURL().then(url => { return { uri: url } }).catch(erro => { return false })
        if (img) {
            return img
        } else {
            return profileIcon
        }
    }

    async function getName(uid) {
        var n = await firebase.firestore().collection('user').doc(uid).get().then(data => {
            return data.data()['apelido']
        })
        return n
    }
    getImg(comment['user']).then(im => setimage(im))
    if (!name) {
        getName(comment['user']).then(nome => setname(nome))
    }

    return (
        <View style={{ flexDirection: 'row', alignItems:'center', marginHorizontal:30 }}>
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
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {name}:
                </Text>
                    <Text >
                        {" " + comment['comment']}
                    </Text>
                </View>
                <Text style={{color:'gray'}}>
                    {getTime()}
                </Text>
            </View>
        </View>
    )
}

export default function Comments({ navigation, route }) {
    var post = route.params.post
    const [comment, setcomment] = useState("")
    const [comments, setcomments] = useState(post['comments'])
    const user = firebase.auth().currentUser.uid

    async function comentar() {
        var comentario = {
            user,
            comment,
            timestamp: Date.now()
        }
        if (comment.length > 0) {
            var cm = comments
            cm.push(comentario)
            await firebase.firestore().collection('posts').doc(post['postname']).update({ comments: firebase.firestore.FieldValue.arrayUnion(comentario) })
            setcomment("")
            setcomments(cm)
        }
    }
    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}>
            <Header />
            <ScrollView>
                {comments.map(item => (<RenderComment comment={item} />))}
                <View style={{ flexDirection: 'row', marginTop: 50, marginHorizontal: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <MyTextInput
                        onChangeText={text => setcomment(text)}
                        value={comment}
                        placeholder="Digite seu comentário..."
                        style={{ width: (Dimensions.get('window').width - 80), marginRight: 10 }}
                    />
                    <View style={{ backgroundColor: colorStyles.dorange, borderRadius: 5 }}>
                        <MaterialIcons name="send" size={24} color="white" style={{ marginHorizontal: 5, marginVertical: 10 }} onPress={() => { comentar() }} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}