import React, { useState, Fragment, forceUpdate } from 'react'
import { View, FlatList } from 'react-native'
import firebase from '../../../../firebaseConfig'
import { Fontisto} from '@expo/vector-icons';

import colorStyles from '../../../colors'
import RenderPost from '../../../Components/RenderPost'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
        var posts_com_foto = []
        for(let i = 0; i < uidList.length; i++){
            var avatar = await firebase.storage().ref("user/" + uidList[i] + "/perfil").getDownloadURL().then(url => { return { uri: url } }).catch(erro => { return false })
            var apelido = await firebase.firestore().collection('user').doc(uidList[i]).get().then(data => { return data.data()['apelido'] })
            var p = await firebase.firestore().collection('posts').where('owner', '==', uidList[i]).get()
            .then(
                snap => {
                    var pst = []
                    if(!snap.empty){
                        snap.forEach(
                            item => {
                                pst.push({...item.data(),postname:item.id, apelido, avatar})
                            }
                        )
                    }
                    return pst.reverse()
                }
            )
            posts = posts.concat(p)
        }
        for(let i = 0 ; i< posts.length; i++){
            var postimage = (!posts[i]['repost']) ? (await firebase.storage().ref("user/" + posts[i]['owner'] + "/posts/" + posts[i]['postname']).getDownloadURL().then(url => { return { uri: url } })) : (null)
            posts_com_foto.push({...posts[i],image:postimage })
        }
        return posts_com_foto.sort((a,b) => {
            if(a.postname < b.postname){
                return true
            }else{
                return false
            }
        })
    }

    if (!got) {
        getPosts().then(p => {
            setpts(p)
            setgot(true)
        })
    }

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        extraHeight={70}
                        extraScrollHeight={70}
                        >
        <View style={{ marginBottom: 100}}>
            <FlatList
                data={pts}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item, index, separators }) => (
                    <RenderPost post={item}></RenderPost>
                )}
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={3} // Reduce number in each render batch
                updateCellsBatchingPeriod={1} // Increase time between renders
                windowSize={7} // Reduce the window size
            />
            {/*pts.map(item => <RenderPost post={item}></RenderPost>)*/}
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, flexDirection: 'row' }}>
                <Fontisto name="motorcycle" size={24} color={colorStyles.dorange} />
            </View>
        </View>
        </KeyboardAwareScrollView>
    )
}