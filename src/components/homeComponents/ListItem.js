import React, {useState, useEffect} from 'react';

import {Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const ListItem = (props) => {
  const [value, setValue] = useState();
  const [text, setText] = useState(props.text);
  const [title, setTitle] = useState(props.title);
  const [rightIconImage, setRightIconImage] = useState(props.rightIconImage);

  onItemPress = () => {
    if (props.onItemPress) props.onItemPress();
  };
  return (
    <TouchableOpacity
      onPress={() => {
        onItemPress();
      }}>
      <View style={styles.itemContainerStyle}>
        <Text style={styles.title}>{title}</Text>
        {((text != undefined && text != '') || rightIconImage) && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginRight: 0,
              marginLeft: 8,
              flex: 1,
            }}>
            {text != undefined && text != '' && (
              <Text
                style={[
                  styles.text,
                  {
                    paddingRight: 16,
                    paddingLeft: 16,
                    flex: 1,
                    textAlign: 'right',
                  },
                ]}
                numberOfLines={1}>
                {text}
              </Text>
            )}
            {rightIconImage && (
              <Image source={rightIconImage} style={{width: 24, height: 24}} />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  itemContainerStyle: {
    height: 48,
    backgroundColor: 'black',
    marginLeft: 16,
    marginRight: 16,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.semiDarkRealBlack,
  },
  title: {
    fontSize: 17,
    color: 'white',
  },
  text: {
    fontSize: 17,
    color: Colors.red,
  },
});
