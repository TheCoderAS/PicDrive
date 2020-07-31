import React from 'react'
import {StyleSheet,View} from 'react-native'
const Separator=()=>(
  <View style={styles.separator}/>
)
const styles=StyleSheet.create({
  separator: {
    marginTop:31,
    marginBottom:5,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})

export default Separator;