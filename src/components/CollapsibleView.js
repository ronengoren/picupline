import React, {useState, useContext, useEffect} from 'react';

import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';

const CollapsibleView = (props) => {
  const {
    containerStyle,
    textStyle,
    collapseButtonStyle,
    title,
    collapseText,
    viewAllText,
    getComponent,
  } = props;
  // console.log(props);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
        <TouchableOpacity
          onPress={() => {
            setCollapsed(!collapsed);
          }}>
          <Text style={[styles.collapseButton, collapseButtonStyle]}>
            {!collapsed
              ? collapseText
                ? collapseText
                : 'Collapse >'
              : viewAllText
              ? viewAllText
              : 'View all >'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {getComponent && getComponent(collapsed)}
      </View>
    </View>
  );
};

export default CollapsibleView;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 16,
  },
  content: {
    alignSelf: 'stretch',
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    color: Colors.red,
  },
  collapseButton: {
    fontSize: 13,
    color: Colors.lightGreyBlue,
  },
});
