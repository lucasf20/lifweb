import React, { useState, Fragment } from 'react'
import { ScrollView, View, Image, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { SimpleLineIcons, Fontisto } from '@expo/vector-icons'

import firebase from '../../../../firebaseConfig'
import RenderPost from '../../../Components/RenderPost'
import colorStyles from '../../../colors'

function Grid({ imagesList }) {
    var lines = []
    var imgs = getImages()

    function getImages() {
        var img = []
        for (let i = 0; i < imagesList.length; i++) {
            if (imagesList[i]['repost']) {
                img.push(imagesList[i]['repost']['image'])
            } else {
                img.push(imagesList[i]['image'])
            }
        }
        return img
    }

    function showItem(item, index) {
        if (item.length == 2) {
            if (index % 2 == 0) {
                return (
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <TouchableOpacity>
                            <Image source={{...item[0] , cache: 'force-cache'}} style={{ borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (2 / 3)) }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={{...item[1] , cache: 'force-cache'}} style={{ marginLeft: 20, borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (1 / 3)) }} />
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <TouchableOpacity>
                            <Image source={{...item[0] , cache: 'force-cache'}} style={{ borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (1 / 3)) }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={{...item[1] , cache: 'force-cache'}} style={{ marginLeft: 20, borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (2 / 3)) }} />
                        </TouchableOpacity>
                    </View>
                )
            }
        } else {
            if (index % 2 == 0) {
                return (
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <TouchableOpacity>
                            <Image source={{...item[0] , cache: 'force-cache'}} style={{ borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (2 / 3)) }} />
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <TouchableOpacity>
                            <Image source={{...item[0] , cache: 'force-cache'}} style={{ borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (1 / 3)) }} />
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }

    for (let i = 0; i < imgs.length; i++) {
        if (i + 1 < imgs.length) {
            lines.push([imgs[i], imgs[++i]])
        } else {
            lines.push([imgs[i]])
        }
    }

    return (
        <View>
            {lines.map((item, index, arr) => (showItem(item, index)))}
        </View>

    )
}

export default function Timeline({ uid, grid }) {

    const user = firebase.auth().currentUser

    const [imglist, setimglist] = useState([])
    const [gotimg, setgotimg] = useState(false)

    async function getPosts() {
        var uidList = []
        uidList.push(uid)
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
            var p = await firebase.firestore().collection('posts').doc(postnames[i]).get().then(data => data.data())
            var postimage = (!p['repost']) ? (await firebase.storage().ref("user/" + p['owner'] + "/posts/" + postnames[i]).getDownloadURL().then(url => { return { uri: url } })) : (null)
            var avatar = await firebase.storage().ref("user/" + p['owner'] + "/perfil").getDownloadURL().then(url => { return { uri: url } }).catch(erro => { return false })
            var apelido = await firebase.firestore().collection('user').doc(p['owner']).get().then(data => { return data.data()['apelido'] })
            posts.push({ ...p, postname: postnames[i], image: postimage, avatar, apelido })
        }
        return posts
    }

    if (!gotimg) {
        getPosts().then(p => { setimglist(p); setgotimg(true); console.log(p) })
    }

    //var imglist = [image2, image3, image4, image5, image7, image8, image9]

    if (grid) {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                    <Text style={{ fontSize: 20 }}>
                        Timeline
                </Text>
                    <TouchableOpacity style={{ marginTop: 5 }}>
                        <SimpleLineIcons name="options" size={24} color="transparent" />
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
                    <Grid imagesList={imglist} />
                </View>
            </View>
        )
    } else {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                    <Text style={{ fontSize: 20 }}>
                        Timeline
                </Text>
                    <TouchableOpacity style={{ marginTop: 5 }}>
                        <SimpleLineIcons name="options" size={24} color="transparent" />
                    </TouchableOpacity>
                </View>
                <View>
                    {imglist.map(item => (<RenderPost post={item} />))}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, flexDirection: 'row' }}>
                    <Fontisto name="motorcycle" size={24} color={colorStyles.dorange} />
                </View>
            </View>
        )
    }

}