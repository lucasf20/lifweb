import React from 'react'
import { ScrollView, View, Image, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'

import image from '../../../images/avatar_stories1.jpg'
import image2 from '../../../images/avatar_stories2.jpg'
import image3 from '../../../images/avatar_stories3.jpg'
import image4 from '../../../images/fotocapa.jpg'
import image5 from '../../../images/perfil3.jpg'
import image6 from '../../../images/post_image.jpg'
import image7 from '../../../images/post_image.png'
import image8 from '../../../images/PostImage2.png'
import image9 from '../../../images/PostImage3.png'




function Grid({ imagesList }) {
    var lines = []

    function showItem(item, index) {
        if (item.length == 2) {
            if (index % 2 == 0) {
                return (
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <TouchableOpacity>
                            <Image source={item[0]} style={{ borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (2 / 3)) }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={item[1]} style={{ marginLeft: 20, borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (1 / 3)) }} />
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <TouchableOpacity>
                            <Image source={item[0]} style={{ borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (1 / 3)) }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={item[1]} style={{ marginLeft: 20, borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (2 / 3)) }} />
                        </TouchableOpacity>
                    </View>
                )
            }
        } else {
            if (index % 2 == 0) {
                return (
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <TouchableOpacity>
                            <Image source={item[0]} style={{ borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (2 / 3)) }} />
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <TouchableOpacity>
                            <Image source={item[0]} style={{ borderRadius: 5, height: 110, width: ((Dimensions.get('window').width - 60) * (1 / 3)) }} />
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }

    for (let i = 0; i < imagesList.length; i++) {
        if (i + 1 < imagesList.length) {
            lines.push([imagesList[i], imagesList[++i]])
        } else {
            lines.push([imagesList[i]])
        }
    }

    return (
        <View>
            {lines.map((item, index, arr) => (showItem(item, index)))}
        </View>

    )
}

export default function Timeline() {

    var imglist = [image2, image3, image4, image5, image7, image8, image9]

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                <Text style={{ fontSize: 20 }}>
                    Timeline
                </Text>
                <TouchableOpacity style={{ marginTop: 5 }}>
                    <SimpleLineIcons name="options" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:20, marginBottom:20}}>
                <Grid imagesList={imglist} />
            </View>
        </View>
    )
}