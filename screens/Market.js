import React from 'react';
import {
    View,
    Text, TouchableOpacity, FlatList, Animated, Image
} from 'react-native';
import { MainLayout } from './';
import { HeaderBar, TextButton } from "../components";
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { LineChart } from "react-native-chart-kit";
import {  useSelector } from 'react-redux';
import { useNavigation, } from '@react-navigation/native';
import {CoinDetails} from "./CoinDetails"

const Market = () => {
    const navigation = useNavigation();
    const coinsData = useSelector(state => state.coin.data);

    function renderButtons() {
        return (
            <View style={{
                flexDirection: "row",
                marginTop: SIZES.radius,
                // marginHorizontal: SIZES.radius
            }}>
                <TextButton label={"USD"} />
                <TextButton label={"% 7d"}
                    containerStyle={{ marginLeft: SIZES.base }} />
                <TextButton label={"Top"}
                    containerStyle={{ marginLeft: SIZES.base }} />
            </View>
        )
    }
    function renderList() {
        return (
            <View>
                <View style={{ marginBottom: SIZES.radius, marginTop: 30 }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3, fontSize: 22 }}>
                        Top CryptoCurrency
                    </Text>
                </View>
                <FlatList
                    data={coinsData}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {

                        let priceColor = (item.price_change_percentage_7d_in_currency == 0)
                            ? COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0) ?
                                COLORS.lightGreen : COLORS.red

                        return (
                            <TouchableOpacity 
                            onPress={() => navigation.navigate("CoinDetails")}>
                                <View style={{
                                    flexDirection: 'row',
                                    // paddingHorizontal: SIZES.padding,
                                    marginBottom: SIZES.radius
                                }}>
                                    {/* coin */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={{ uri: item.image }}
                                            style={{ width: 20, height: 20 }} />
                                        <Text style={{
                                            color: COLORS.white, ...FONTS.h3,
                                            marginLeft: SIZES.radius
                                        }}>{item.name}</Text>

                                    </View>
                                    {/* Line card */}
                                    <View style={{ flex: 1, alignItems: 'center', marginLeft: SIZES.radius, }}>
                                        <LineChart
                                            withVerticalLabels={false}
                                            withHorizontalLabels={false}
                                            withDots={false}
                                            withInnerLines={false}
                                            withOuterLines={false}
                                            withVerticalLines={false}
                                            data={{
                                                datasets: [
                                                    { data: item.sparkline_in_7d.price }
                                                ]
                                            }}
                                            width={60}
                                            height={50}
                                            chartConfig={{
                                                color: () => priceColor,
                                                backgroundColor: "#000080",
                                                backgroundGradientFrom: '#000080',
                                                backgroundGradientTo: '#000080',

                                            }}
                                            // bezier
                                            style={{ paddingRight: 0 }}
                                        />

                                    </View>
                                    {/* figures */}
                                    <View style={{
                                        flex: 1, alignItems: 'flex-end'
                                        , justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            color: COLORS.white, ...FONTS.h4
                                        }}>
                                            $ {item.current_price}</Text>

                                        <View style={{
                                            flexDirection: 'row', justifyContent: 'flex-end',
                                            alignItems: 'center'
                                        }}>
                                            {item.price_change_percentage_7d_in_currency != 0 &&
                                                <Image source={icons.upArrow}
                                                    style={{
                                                        height: 10, width: 10,
                                                        tintColor: priceColor,
                                                        transform: item.price_change_percentage_7d_in_currency > 0 ? [{ rotate: "45deg" }] :
                                                            [{ rotate: '125deg' }]
                                                    }} />
                                            }
                                            <Text
                                                style={{ color: priceColor, marginLeft: 5, ...FONTS.body5 }}
                                            > {item.price_change_percentage_7d_in_currency.toFixed(2)} %
                                            </Text>

                                        </View>

                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    // ListHeaderComponent={
                    //     <View style={{ marginBottom: SIZES.radius }}>
                    //         <Text style={{ color: COLORS.white, ...FONTS.h3, fontSize: 18 }}>
                    //             Top CryptoCurrency
                    //         </Text>
                    //     </View>
                    // }
                    // renderItem={renderCoinItem}
                    // refreshing={isLoader}
                    // onRefresh={() => dispatch(fetchCoinData())}

                    ListFooterComponentStyle={
                        <View style={{ marginBottom: 50 }}>

                        </View>
                    }

                />
            </View>
        )
    }
    return (
        <MainLayout>
            <View style={{
                flex: 1,

                backgroundColor: COLORS.black,
                paddingHorizontal: SIZES.padding,
                paddingVertical: 10
            }}>
                {/* Header */}
                <HeaderBar title="Market" />
                {/* <Text style={{color:COLORS.white, ...FONTS.largeTitle}}>Market</Text> */}
                {/* Tab bar */}

                {/* Button */}
                {renderButtons()}

                {/* Market list */}
                {renderList()}
            </View>
        </MainLayout>
    )
}

export default Market;