import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Switch, title } from 'react-native';
import { MainLayout } from './';
import { HeaderBar } from "../components"
import { FONTS, COLORS, SIZES, dummyData, icons } from "../constants";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SectionTitle = ({ title }) => {
  return (
    <View style={{ marginTop: SIZES.padding }}>
      <Text style={{
        color: COLORS.lightGray3, ...FONTS.h4
      }}>{title}</Text>
    </View>
  )
}
const Setting = ({ title, value, type, onPress }) => {
  if (type == "button") {
    return (
      <TouchableOpacity style={{
        flexDirection: 'row',
        height: 50, alignItems: 'center'
      }}
        onPress={onPress}>
        <Text style={{
          flex: 1, color: COLORS.white, ...FONTS.h3
        }}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{
            marginRight: SIZES.radius, color: COLORS.lightGray3, ...FONTS.h3
          }}>{value}</Text>
          <Image source={icons.rightArrow}
            style={{ width: 15, height: 15, tintColor: COLORS.white }} />
        </View>

      </TouchableOpacity>
    )
  } else {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}
        >{title}</Text>
        <Switch
          value={value}
          onValueChange={(value) => onPress(value)} />
      </View>
    )
  }

}
const Profile = () => {
 const [faceId,SetFaceId] = useState(true)
  return (
    <MainLayout>

      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black,

        }}>
        {/* Header  */}
        <Text style={{ color: COLORS.white, ...FONTS.largeTitle }}>Profile</Text>

        {/* Details  */}
        <ScrollView>
          {/* Email and user ID  */}
          <View
            style={{
              flexDirection: "row",

              marginTop: SIZES.radius
            }}>
            {/* Email and ID  */}
            <View style={{
              flex: 1,

            }}>
              <Text
                style={{ color: COLORS.white, ...FONTS.h3 }}
              >{dummyData.profile.email}</Text>
              <Text style={{
                color: COLORS.lightGray3, ...FONTS.body4
              }}>ID :{dummyData.profile.id}</Text>
            </View>
            {/* STATUS  */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            >
              <Image
                source={icons.verified}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{
                marginLeft: SIZES.base,
                color: COLORS.lightGreen, ...FONTS.body4
              }}>Verified</Text>

            </View>
          </View>
          {/* app */}
          <SectionTitle title="APP" />

          <Setting title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log("pressed")}
          />
          <Setting title="Appearance"
            value="Dark"
            type="button"
            onPress={() => console.log("pressed")}
          />
          {/* account */}
          <SectionTitle title="ACCOUNT" />

          <Setting title="Payment Currency"
            value="USD"
            type="button"
            onPress={() => console.log("pressed")}
          />
          <Setting title="Language"
            value="English"
            type="button"
            onPress={() => console.log("pressed")}
          />
          <SectionTitle title="SECURITY" />

          <Setting title="FaceID"
            value={faceId}
            type="switch"
            onPress={(value) => SetFaceId(value)}
          />
          <Setting title="Password Setting"
            value=""
            type="button"
            onPress={() => console.log("pressed")}
          />
          <Setting title="Change Password"
            value=""
            type="button"
            onPress={() => console.log("pressed")}
          />
          <Setting title="2-Factor Authentication"
            value=""
            type="button"
            onPress={() => console.log("pressed")}
          />


        </ScrollView>

      </View>
    </MainLayout>
  );
};

export default Profile;
