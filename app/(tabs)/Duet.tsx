import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert, ImageStyle, Switch } from 'react-native'
import React, { useEffect } from 'react'
import clrStyle, { componentStyle, NGHIACOLOR } from '@/assets/componentStyleSheet'
import styles, { vw } from '@/assets/stylesheet'
import { avatarComponet, marginBottomForScrollView } from '@/assets/component'
import * as ICON from '@/assets/svgXml'
import * as  CLASS from '@/assets/Class'
import * as CTEXT from '@/assets/CustomText'
import { DefaultTheme, useNavigation } from '@react-navigation/native'
import { MatchHistoryFormat, RoomFormat } from '@/data/interfaceFormat'
import { getStorageItem, getStorageList } from '@/data/storageFunc'
import { RootContext } from '@/data/store'
import { SvgXml } from 'react-native-svg'
import { lvlData } from '@/data/factoryData'

export default function Duet() {
  const navigation = useNavigation()
  const [CurrentCache, dispatch] = React.useContext(RootContext)

  const [roomID, setRoomID] = React.useState<string>('')
  const [roomInfo, setRoomInfo] = React.useState<RoomFormat>()
  const [isCreateNew, setIsCreateNew] = React.useState<boolean>(false)
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false)

  function roomJoinHandler() {
    if (roomID !== '') {
      navigation.navigate('DuetRoom', { roomID: roomID })
    } else {
      Alert.alert('Vui lớng nhập ID phòng')
    }
  }

  function createRoom() {
    let data: RoomFormat = {
      match: null,
      id: 0,
      pass: 0,
      public: false,
    }
  }

  // Create new room with random ID
  useEffect(() => {
    const checkRoomExistence = async () => {
      if (isCreateNew) {
        let id = Math.floor(Math.random() * 100000).toString();
        let existed = await getStorageItem('room', id);

        while (existed) {
          id = Math.floor(Math.random() * 100000).toString();
          existed = await getStorageItem('room', id);
        }
        setRoomID(id);
      }
    };

    checkRoomExistence();
  }, [isCreateNew]);

  function renderItem() {
    switch (isCreateNew) {
      case true:
        return (
          <>
            <CLASS.ViewCol style={[componentStyle.borderBrand800, styles.gap4vw, styles.marginVertical4vw, styles.w100, styles.padding4vw]}>

              <CTEXT.NGT_Inter_HeaderMd_SemiBold>Lựa chọn mức độ chơi</CTEXT.NGT_Inter_HeaderMd_SemiBold>
              {
                lvlData.map((item, index) => {
                  return <CLASS.LevelChoosing key={index} icon={item[0]} title={item[1] as string} med={item[2] as string} time={item[3] as number} navAdd={item[4]} />
                })
              }

              <CTEXT.NGT_Inter_HeaderMd_SemiBold>Mật khẩu của phòng</CTEXT.NGT_Inter_HeaderMd_SemiBold>
              <CLASS.ViewRowBetweenCenter style={[styles.gap4vw]}>
                <CLASS.ViewRowStartCenter style={[styles.flex1, styles.borderRadius2vw, styles.padding2vw, styles.paddingLeft4vw, { backgroundColor: NGHIACOLOR.NghiaTransparentWhite30 }]}>
                  <CTEXT.NGT_Inter_BodyLg_Reg color={NGHIACOLOR.NghiaBrand300}>Phòng số: <CTEXT.NGT_Inter_HeaderMd_SemiBold>{roomID}</CTEXT.NGT_Inter_HeaderMd_SemiBold></CTEXT.NGT_Inter_BodyLg_Reg>
                </CLASS.ViewRowStartCenter>
                <CLASS.ViewRowCenter>
                  <CTEXT.NGT_Inter_HeaderMd_SemiBold>Phòng kín </CTEXT.NGT_Inter_HeaderMd_SemiBold>
                  <Switch value={isPrivate}
                    onValueChange={(value) => { setIsPrivate(value) }}
                    thumbColor={NGHIACOLOR.NghiaBrand600}
                    trackColor={{ false: NGHIACOLOR.NghiaGray500, true: NGHIACOLOR.NghiaBrand300 }}

                  />
                </CLASS.ViewRowCenter>
              </CLASS.ViewRowBetweenCenter>
            </CLASS.ViewCol>
          </>
        )

      default:
        return (
          <>
            <Image style={[{ width: vw(84), height: vw(54), borderTopRightRadius: vw(8), borderTopLeftRadius: vw(8) }]} source={require('@/assets/photos/duet.jpeg')} />
            <CLASS.ViewGra800600 style={[styles.w100, styles.borderRadius2vw]}>
              <CLASS.RoundBtn
                title='Tạo phòng'
                onPress={() => { setIsCreateNew(true) }}
                textClass={CTEXT.NGT_Inter_HeaderLg_SemiBold}
                textColor={clrStyle.white}
                customStyle={[styles.justifyContentCenter]}
              />
            </CLASS.ViewGra800600>

            <CLASS.ViewCol style={[componentStyle.borderBrand800, styles.gap4vw, styles.marginVertical4vw, styles.w100, styles.padding4vw]}>
              <CTEXT.NGT_Inter_HeaderMd_SemiBold>Bạn đã có phòng rồi?</CTEXT.NGT_Inter_HeaderMd_SemiBold>
              <TextInput
                value={roomID}
                onChangeText={setRoomID}
                keyboardType='numeric'
                placeholder='ID của phòng'
                placeholderTextColor={NGHIACOLOR.NghiaGray400}
                style={[styles.borderRadius2vw, styles.paddingH4vw, styles.paddingV2vw, styles.border1, styles.w100, styles.border1, { borderColor: NGHIACOLOR.NghiaGray400, fontFamily: 'Inter-Medium', fontSize: vw(3.5), backgroundColor: NGHIACOLOR.NghiaTransparentDark30, color: 'white' }]}
              />
              <CLASS.ViewGra800600 style={[styles.w100, styles.borderRadius2vw]}>
                <CLASS.RoundBtn
                  title='Tham gia phòng'
                  onPress={roomJoinHandler}
                  textClass={CTEXT.NGT_Inter_HeaderMd_SemiBold}
                  textColor={clrStyle.white}
                  customStyle={[styles.paddingV2vw, styles.justifyContentCenter]}
                />
              </CLASS.ViewGra800600>
            </CLASS.ViewCol>
          </>
        )
    }
  }

  return (
    <CLASS.SSBarWithSaveArea trans margin barContentStyle='light-content' bgColor={DefaultTheme.colors.background} barColor={DefaultTheme.colors.background}>
      <CLASS.ViewRowBetweenCenter style={[styles.paddingV2vw, styles.alignItemsStart, styles.paddingH4vw, styles.paddingBottom4vw]}>
        <View>
          <CTEXT.NGT_Inter_DispMd_SemiBold>Đấu cặp</CTEXT.NGT_Inter_DispMd_SemiBold>
          <CLASS.ViewRowStartCenter style={[styles.gap2vw]}>
            {avatarComponet(vw(6), vw(6))}
            <CTEXT.NGT_Inter_BodyMd_Med>Luyện tập cùng bạn bè</CTEXT.NGT_Inter_BodyMd_Med>
          </CLASS.ViewRowStartCenter>
        </View>
        <CLASS.ViewRowStartCenter style={[styles.borderRadius2vw, styles.gap1vw, styles.paddingV1vw, styles.paddingRight4vw, styles.paddingLeft2vw, styles.border1, { backgroundColor: NGHIACOLOR.NghiaTransparentDark30, borderColor: NGHIACOLOR.NghiaBrand800 }]}>
          <Image style={[{ width: vw(7), height: vw(7) }]} source={require('@/assets/photos/GoldStar.png')} />
          <CTEXT.NGT_Inter_BodyLg_Med>{CurrentCache.user.star}</CTEXT.NGT_Inter_BodyLg_Med>
        </CLASS.ViewRowStartCenter>
      </CLASS.ViewRowBetweenCenter>

      <ScrollView style={[styles.padding4vw, styles.flex1]} contentContainerStyle={[styles.flexColCenter]}>
        {renderItem()}
      </ScrollView>
    </CLASS.SSBarWithSaveArea >
  )
}