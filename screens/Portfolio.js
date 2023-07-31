import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {MainLayout} from './';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCoinData} from '../Src/redux/market/coinSlice';
import {BalanceInfo, CardSlider, Chart, HeaderBar} from '../components';
import {COLORS, FONTS, SIZES, icons} from '../constants';

const Portfolio = () => {
  const dispatch = useDispatch();
  const coinsData = useSelector(state => state.coin.data);
  const isLoader = useSelector(state => state.coin.isLoader);
  console.log('coidataState', coinsData);

  useEffect(() => {
    dispatch(fetchCoinData());
  }, []);

  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        <HeaderBar
          title="Portfolio"
          containerStyle={{
            marginLeft: 0,
          }}
        />

        {/* balance Info */}
        <BalanceInfo
          title="Current Balance"
          displayAmount="25,000"
          changePer={-2.5}
          containerStyle={{
            marginTop: 10,
          }}
        />
      </View>
    );
  }

  function renderCoinItem({item}) {
    let priceColor =
      item.price_change_percentage_7d_in_currency == 0
        ? COLORS.lightGray3
        : item.price_change_percentage_7d_in_currency > 0
        ? COLORS.lightGreen
        : COLORS.red;

    return (
      <TouchableOpacity
        style={{
          height: 55,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* logo */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: item.image}} style={{width: 20, height: 20}} />
        </View>
        {/* name */}
        <View style={{flex: 1}}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>{item.name}</Text>
        </View>

        {/* figures */}

        <View>
          <Text style={{textAlign: 'right', color: COLORS.white, ...FONTS.h4}}>
            ${item.current_price}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            {item.price_change_percentage_7d_in_currency != 0 && (
              <Image
                source={icons.upArrow}
                style={{
                  height: 10,
                  width: 10,
                  tintColor: priceColor,
                  transform:
                    item.price_change_percentage_7d_in_currency > 0
                      ? [{rotate: '45deg'}]
                      : [{rotate: '125deg'}],
                }}
              />
            )}
            <Text
              style={{
                marginLeft: 5,
                color: priceColor,
                ...FONTS.body5,
                lineHeight: 15,
              }}>
              {item.price_change_percentage_7d_in_currency.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Add code for displaying additional figures */}
      </TouchableOpacity>
    );
  }

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        {/* Header- wallet-info */}

        {renderWalletInfoSection()}

        {/* CardSlider */}
      
          <View style={{marginVertical: SIZES.radius, paddingHorizontal: SIZES.padding}}>
            <Text style={{color: COLORS.white, ...FONTS.h3, fontSize: 18}}>
              Quick Buy
            </Text>
          </View>
        
        <CardSlider />

        {/* Top CryptoCurrency */}
        <View style={{flex: 1}}>
          <View
            style={{
              marginBottom: SIZES.radius,
              paddingHorizontal: SIZES.padding,
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h3, fontSize: 18}}>
              Top CryptoCurrency
            </Text>
          </View>
          <FlatList
            data={coinsData}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              marginTop: 5,
              paddingHorizontal: SIZES.padding,
            }}
            // ListHeaderComponent={
            //   <View style={{marginBottom: SIZES.radius}}>
            //     <Text style={{color: COLORS.white, ...FONTS.h3, fontSize: 18}}>
            //       Top CryptoCurrency
            //     </Text>
            //   </View>
            // }
            renderItem={renderCoinItem}
            refreshing={isLoader}
            onRefresh={() => dispatch(fetchCoinData())}
            ListFooterComponent={<View style={{marginBottom: 25}}></View>}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default Portfolio;
