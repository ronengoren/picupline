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

export default function Gallery({navigation, route, items}) {
  const itemsSize = (Dimensions.get('screen').width - 12) / 3;
  // const {width, height} = Dimensions.get('screen');

  const [data, setData] = useState(items);
  const [itemSize, setItemSize] = useState();
  const [total, setTotal] = useState();

  const extractItemKey = (index) => `${index}`;

  React.useEffect(() => {
    setData(items);
    // console.log(data);
  });
  const renderItem = ({item, index}) => (
    <React.Fragment>
      <TouchableOpacity onPress={() => alert('add functionality to open')}>
        <Image
          style={{
            width: itemsSize,
            height: itemsSize,
            margin: 1.5,
          }}
          source={item}
        />
      </TouchableOpacity>
    </React.Fragment>
  );
  return (
    <View style={styles.images}>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={extractItemKey}
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
