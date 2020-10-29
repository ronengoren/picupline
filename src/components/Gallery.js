import React, {useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Divider, Text, Avatar, Accessory, Image} from 'react-native-elements';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function Gallery({navigation, route, items}) {
  const itemsSize = (Dimensions.get('screen').width - 12) / 3;
  // const {width, height} = Dimensions.get('screen');

  const [data, setData] = useState(items);
  const [itemSize, setItemSize] = useState();
  const [total, setTotal] = useState();
  const [fileNames, setFileNames] = useState([]);
  const [imageURI, setImageURI] = useState(null);

  var imagesurls = [];

  const extractItemKey = (index) => `${index}`;
  // React.useEffect(() => {
  //   setData(items);
  //   console.log(items);
  //   // const reference = items.forEach((element) => {
  //   //   storage()
  //   //     .ref('postImages' + '/' + element)
  //   //     .getDownloadURL()
  //   //     .then((url) => {
  //   //       // console.log(url);

  //   //       imagesurls.push(url);

  //   //       //from url you can fetched the uploaded image easily
  //   //     });
  //   // });

  //   // this side effect will run just once, after the first render
  // }, []);

  React.useEffect(() => {
    var arr = [];
    setData(items);
    urlImages(data);
    // console.log(data);
    // const display = data.map((item) => {
    //   const filename = item.substring(item.lastIndexOf('/') + 1);
    //   const reference = storage().ref('postImages' + '/' + filename);
    //   const jfjf = reference.getDownloadURL().then(async (url) => {
    //     console.log(url);
    //   });
    //   // setFileNames(jfjf);
    //   // console.log(jfjf);
    // });
  });

  const urlImages = async (params) => {
    // console.log(params);
    for (let i = 0; i < params.length; i++) {
      const element = params[i];
      const filename = element.substring(element.lastIndexOf('/') + 1);
      const reference = storage().ref('userImages' + '/' + filename);
      reference
        .getDownloadURL()
        .then((url) => {
          // console.log('images');
          // setImageURI({uri: url});
          // console.log(url);
          // console.log('images');
          //from url you can fetched the uploaded image easily
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));

      // return filename;
      // console.log(filename);
    }
  };

  const renderItem = ({item, index}) => (
    <React.Fragment>
      <TouchableOpacity onPress={() => alert(item)}>
        {/* <Image
          style={{
            width: itemsSize,
            height: itemsSize,
            margin: 1.5,
          }}
          source={item}
        /> */}
      </TouchableOpacity>
    </React.Fragment>
  );
  return (
    <View style={styles.images}>
      <FlatList
        data={data}
        numColumns={3}
        keyExtractor={extractItemKey}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  images: {
    flexDirection: 'row',
    paddingHorizontal: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});
