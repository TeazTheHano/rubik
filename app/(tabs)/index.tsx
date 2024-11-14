import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { componentStyle, NGHIACOLOR } from '@/assets/componentStyleSheet'
import styles, { vw } from '@/assets/stylesheet'
import { avatarComponet, marginBottomForScrollView } from '@/assets/component'
import * as ICON from '@/assets/svgXml'
import * as  CLASS from '@/assets/Class'
import * as CTEXT from '@/assets/CustomText'
import { DefaultTheme, useNavigation } from '@react-navigation/native'
import { MatchHistoryFormat } from '@/data/interfaceFormat'
import { getStorageList } from '@/data/storageFunc'

export default function index() {
  const navigation = useNavigation()
  const [starNum, setStarNum] = React.useState(0)
  const [bestMatchSelect, setBestMatchSelect] = React.useState(0)
  const [matchHisList, setMatchHisList] = React.useState<MatchHistoryFormat[]>()

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      getStorageList('match').then((res) => {
        if (res) {
          setMatchHisList(res)
        }
      }).catch(err => {
        console.log('Error getting data from storage: ', err);
      });
    })
    return unsub
  }, [navigation]); // Add dependencies in the array if needed

  const lvlData = [
    [ICON.lv1, 'Beginner', 'AO5', 30, () => navigation.navigate('')],
    [ICON.lv2, 'Intermediate', 'AO5', 15, () => navigation.navigate('')],
    [ICON.lv3, 'Expert', 'AO12', 15, () => navigation.navigate('')],
  ]

  return (
    <CLASS.SSBarWithSaveArea trans margin barContentStyle='light-content' bgColor={DefaultTheme.colors.background} barColor={DefaultTheme.colors.background}>
      <ScrollView style={[styles.paddingH4vw]}>
        <CLASS.ViewRowBetweenCenter style={[styles.paddingV2vw, styles.alignItemsStart]}>
          <View>
            <CTEXT.NGT_Inter_DispMd_SemiBold>Timer<CTEXT.NGT_Inter_DispMd_SemiBold color={NGHIACOLOR.NghiaBrand300}>Match</CTEXT.NGT_Inter_DispMd_SemiBold></CTEXT.NGT_Inter_DispMd_SemiBold>
            <CLASS.ViewRow style={[styles.gap2vw]}>
              {avatarComponet(vw(5), vw(5))}
              <CTEXT.NGT_Inter_BodyMd_Med>Hi Anh,Wellcome back</CTEXT.NGT_Inter_BodyMd_Med>
            </CLASS.ViewRow>
          </View>
          <CLASS.ViewRowStartCenter style={[styles.borderRadius2vw, styles.gap1vw, styles.paddingV1vw, styles.paddingRight4vw, styles.paddingLeft2vw, styles.border1, { backgroundColor: NGHIACOLOR.NghiaTransparentDark30, borderColor: NGHIACOLOR.NghiaBrand800 }]}>
            <Image style={[{ width: vw(7), height: vw(7) }]} source={require('@/assets/photos/GoldStar.png')} />
            <CTEXT.NGT_Inter_BodyLg_Med>{starNum}</CTEXT.NGT_Inter_BodyLg_Med>
          </CLASS.ViewRowStartCenter>
        </CLASS.ViewRowBetweenCenter>

        <CLASS.ViewCol style={[styles.gap4vw, styles.marginVertical4vw, styles.paddingH4vw, styles.paddingV4vw, componentStyle.borderBrand800]}>
          <CTEXT.NGT_Inter_HeaderMd_SemiBold>Choose difficulty to start</CTEXT.NGT_Inter_HeaderMd_SemiBold>
          {
            lvlData.map((item, index) => {
              return <CLASS.LevelChoosing key={index} icon={item[0]} title={item[1] as string} med={item[2] as string} time={item[3] as number} navAdd={item[4]} />
            })
          }
        </CLASS.ViewCol>

        <CLASS.ViewCol style={[styles.gap4vw, styles.marginVertical4vw, styles.paddingH4vw, styles.paddingV4vw, componentStyle.borderBrand800]}>
          {/*  */}
          <CLASS.ViewRow style={[styles.flex1, styles.borderRadius2vw, styles.overflowHidden]}>

            <CLASS.ViewGra800700 style={[styles.w50, styles.flexRowCenter, styles.paddingV3vw]}>
              <CTEXT.NGT_Inter_HeaderLg_Med>Best match</CTEXT.NGT_Inter_HeaderLg_Med>
            </CLASS.ViewGra800700>

            <CLASS.ViewGra800700 style={[styles.w50, styles.flexRowCenter, styles.paddingV3vw, styles.gap4vw]}>
              <TouchableOpacity
                onPress={() => setBestMatchSelect(0)}
                style={[styles.borderRadius2vw, styles.overflowHidden, styles.positionRelative]}>
                <View style={[styles.positionAbsolute, styles.w100, styles.h100, { backgroundColor: bestMatchSelect != 0 ? NGHIACOLOR.NghiaTransparentDark30 : undefined, zIndex: 2 }]} />
                <CLASS.ViewGra600500 style={[styles.paddingV1vw, styles.paddingH2vw,]}>
                  <CTEXT.NGT_Inter_BodyLg_Med>AO5</CTEXT.NGT_Inter_BodyLg_Med>
                </CLASS.ViewGra600500>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setBestMatchSelect(1)}
                style={[styles.borderRadius2vw, styles.overflowHidden, styles.positionRelative]}>
                <View style={[styles.positionAbsolute, styles.w100, styles.h100, { backgroundColor: bestMatchSelect != 1 ? NGHIACOLOR.NghiaTransparentDark30 : undefined, zIndex: 2 }]} />
                <CLASS.ViewGra600500 style={[styles.paddingV1vw, styles.paddingH2vw,]}>
                  <CTEXT.NGT_Inter_BodyLg_Med>AO12</CTEXT.NGT_Inter_BodyLg_Med>
                </CLASS.ViewGra600500>
              </TouchableOpacity>
            </CLASS.ViewGra800700>
          </CLASS.ViewRow>

          {/* content */}

          <CLASS.ViewCol style={[styles.gap2vw]}>
            {

            }
          </CLASS.ViewCol>
        </CLASS.ViewCol>

        {marginBottomForScrollView()}
      </ScrollView>
    </CLASS.SSBarWithSaveArea>
  )
}