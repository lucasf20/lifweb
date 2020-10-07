import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 180,
    overflow: 'hidden',
    marginVertical: 20,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  wrapper: {
    position: 'absolute',
    margin: 5,
    height: '100%'
  },
  usercontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  userimage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  whitecolor: {
    color: 'white',
  },
  boldtext: {
    fontWeight: 'bold',
  },
});

export default styles;
