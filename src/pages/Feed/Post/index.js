import React, { useState, Fragment, forceUpdate } from 'react'
import { View, FlatList } from 'react-native'
import firebase from '../../../../firebaseConfig'
import { Fontisto} from '@expo/vector-icons';

import colorStyles from '../../../colors'
import RenderPost from '../../../Components/RenderPost'

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
                    if(data.exists){
                        var dados = data.data()
                        if (dados['posts']) {
                            return dados['posts']
                        } else {
                            return []
                        }
                    }else{
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
            <FlatList
                data={pts}
                renderItem={({ item, index, separators }) => (
                    <RenderPost post={item}></RenderPost>
                )}
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                updateCellsBatchingPeriod={100} // Increase time between renders
                windowSize={7} // Reduce the window size
            />
            {/*pts.map(item => <RenderPost post={item}></RenderPost>)*/}
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, flexDirection: 'row' }}>
                <Fontisto name="motorcycle" size={24} color={colorStyles.dorange} />
            </View>
        </View>
    )
}