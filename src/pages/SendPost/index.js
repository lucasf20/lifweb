import React, { useEffect, useState , useRef} from 'react';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DeviceMotion, Accelerometer } from 'expo-sensors';

export default function App() {
    //  camera permissions
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    // Screen Ratio and image padding
    const [imagePadding, setImagePadding] = useState(0);
    const [ratio, setRatio] = useState('4:3');  // default is 4:3
    const { height, width } = Dimensions.get('window');
    const screenRatio = height / width;
    const [isRatioSet, setIsRatioSet] = useState(false);
    const [flash, setFlash] = useState(false)
    const [coord, setcoord] = useState({x:0,y:1,z:0})

    //navigation
    const nav = useNavigation()

    // on screen  load, ask for permission to use the camera
    useEffect(() => {
        async function getCameraStatus() {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setHasCameraPermission(status == 'granted');
        }
        getCameraStatus();
    }, []);

    // set the camera ratio and padding.
    // this code assumes a portrait mode screen
    const prepareRatio = async () => {
        let desiredRatio = '4:3';  // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await camera.getSupportedRatiosAsync();

            // Calculate the width/height of each of the supported camera ratios
            // These width/height are measured in landscape mode
            // find the ratio that is closest to the screen ratio without going over
            let distances = {};
            let realRatios = {};
            let minDistance = null;
            for (const ratio of ratios) {
                const parts = ratio.split(':');
                const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
                realRatios[ratio] = realRatio;
                // ratio can't be taller than screen, so we don't want an abs()
                const distance = screenRatio - realRatio;
                distances[ratio] = realRatio;
                if (minDistance == null) {
                    minDistance = ratio;
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio;
                    }
                }
            }
            // set the best match
            desiredRatio = minDistance;
            //  calculate the difference between the camera width and the screen height
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            );
            // set the preview padding and preview ratio
            setImagePadding(remainder / 2);
            setRatio(desiredRatio);
            // Set a flag so we don't do this 
            // calculation each time the screen refreshes
            setIsRatioSet(true);
        }
    };

    const takePicture = async () => {
        if (camera) {
          const options = { quality: 0.5, base64: true, skipProcessing: true };
          const data = await camera.takePictureAsync(options);
          const source = data.uri;
          Accelerometer.addListener(obj => {setcoord(obj)})
          nav.navigate('SendPost2', {photo:{uri:source},coord:coord})
        }
      };

    // the camera must be loaded in order to access the supported ratios
    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio();
        }
    };

    if (hasCameraPermission === null) {
        return (
            <View style={styles.information}>
                <Text>Waiting for camera permissions</Text>
            </View>
        );
    } else if (hasCameraPermission === false) {
        return (
            <View style={styles.information}>
                <Text>No access to camera</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                    <Entypo name="chevron-left" size={30} color="white" style={{ marginTop: 30 }} onPress={() => { nav.goBack() }} />
                    {(flash)?
                    (<Ionicons name="ios-flash" size={30} color="yellow" style={{ marginTop: 30, marginRight:10 }} onPress={()=>{setFlash(false)}}/>):
                    (<Ionicons name="ios-flash-off" size={30} color="white" style={{ marginTop: 30, marginRight:10 }} onPress={()=>{setFlash(true)}}/>)
                    }
                </View>
                <Camera
                    flashMode={(flash)?'on':'off'}
                    style={[styles.cameraPreview, { marginTop: imagePadding, marginBottom: imagePadding }]}
                    type={type}
                    onCameraReady={setCameraReady}
                    ratio={'1:1'}
                    ref={(ref) => {
                        setCamera(ref);
                    }}>
                </Camera>
                <View style={{ marginHorizontal: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="ios-reverse-camera" size={45} color="white" onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }} />
                    <MaterialCommunityIcons name="camera-iris" size={80} color="white" onPress={takePicture}/>
                    <MaterialIcons name="add-a-photo" size={35} color="white" onPress={() => {nav.navigate("SendPost2", {photo:null, coord:coord})}}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    information: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        
    },
    cameraPreview: {
        flex: 1,
    }
});