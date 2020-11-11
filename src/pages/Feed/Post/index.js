import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import firebase from '../../../../firebaseConfig'
import profileIcon from '../../../assets/logolifweb.png'
import { SimpleLineIcons, AntDesign, EvilIcons, FontAwesome } from '@expo/vector-icons';
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
import { firestore } from 'firebase';

function RenderPost({ post }) {

    const [h, seth] = useState(Dimensions.get('window').width - 40)
    const [w, setw] = useState(Dimensions.get('window').width - 40)

    const user = firebase.auth().currentUser
    const apelido = post['apelido']
    const avatar = (post['avatar']) ? post['avatar'] : profileIcon
    const imagem = (post['repost']) ? post['repost']['image'] : post['image']
    const repost = post['repost']
    const comments = post['comments']
    const likes = post['likes']
    const liked = likes.includes(user.uid)
    const descricao = post['descricao']
    const owner = post['owner']
    const postname = post['postname']
    const rotation = post['rotation']

    function height() {
        if (!imagem) {
            return { h, w }
        } else {
            Image.getSize(imagem.uri, (width, height) => {
                if (rotate() == "0deg") {
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

    return (
        <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal:20 }}>
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

                    <Text>
                        {apelido}
                    </Text>
                </TouchableOpacity>
                <SimpleLineIcons name="options" size={24} color="gray"  />
            </View>
            <Image source={imagem} style={{ height: height().h, width: height().w, borderRadius: 5, marginVertical: 20, marginHorizontal:5 }} />
            <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems:'center', marginHorizontal:5 }}>
            <View>
                <Text>
                    Curtido por {likes.length}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ paddingRight: 10 }} >
                    <Image source={(liked) ? caveiralike : caveira} style={{ height: 30, width: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingRight: 10 }}>
                    <Image source={Comentario} style={{ height: 30, width: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingRight: 10 }}>
                    <Image source={Repost} style={{ height: 30, width: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingRight: 10 }} >
                    <Image source={ShareIcon} style={{ height: 30, width: 30 }}></Image>
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
        for (let i = 0; i < postnames.length; i++) {
            var p = await firebase.firestore().collection('posts').doc(postnames[i]).get().then(data => data.data())
            var postimage = await firebase.storage().ref("user/" + p['owner'] + "/posts/" + postnames[i]).getDownloadURL().then(url => { return { uri: url } })
            var avatar = await firebase.storage().ref("user/" + p['owner'] + "/perfil").getDownloadURL().then(url => { return { uri: url } }).catch(erro => { return false })
            var apelido = await firebase.firestore().collection('user').doc(p['owner']).get().then(data => { return data.data()['apelido'] })
            posts.push({ ...p, postname: postnames[i], image: postimage, avatar, apelido })
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
        </View>
    )
}