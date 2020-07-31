import React from 'react'
import {StyleSheet,View} from 'react-native'
const AllSeparator=()=>(
  <View style={styles.separator}/>
)
const styles=StyleSheet.create({
  separator: {
    marginVertical:5,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})

export default AllSeparator;