import React from 'react';
import {View,Animated,} from 'react-native';
import {IconTextButton} from '../components';
import {COLORS, SIZES, icons} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import {
  setIsTradeModalVisible,
  selectIsTradeModalVisible,
} from '../Src/redux/market/coinSlice';

const MainLayout = ({children}) => {

  const isTradeModalVisible = useSelector(selectIsTradeModalVisible);
  const modalAnimatedValue = React.useRef (new Animated.Value(0)).current;

  React.useEffect(()=>{
    if(isTradeModalVisible){
      Animated.timing(modalAnimatedValue,{
        toValue:1,
        duration:500,
        useNativeDriver:false
      }).start();
    }else{
      Animated.timing(modalAnimatedValue,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }).start();

    }

  },[isTradeModalVisible])

const modalY =modalAnimatedValue.interpolate({
  inputRange:[0,1],
  outputRange:[SIZES.height, SIZES.height-232]
})

  return (
    <View style={{flex: 1}}>
      {children}

{/* Dim Background */}

{
  isTradeModalVisible && 
  <Animated.View
  style={{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:COLORS.transparentBlack
  }}
 opacity={modalAnimatedValue}
  
  />
}


{/* model */}

      <Animated.View style={{
        position:'absolute',
        left:0,
        top:modalY,
        width:'100%',
        size:SIZES.padding,
        backgroundColor:COLORS.primary,
  
      }}>
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={console.log('transfer')}
        />

        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{
            marginTop:SIZES.base
          }}
          onPress={console.log('withdraw')}
        />
      </Animated.View>
    </View>
  );
};

export default MainLayout;
