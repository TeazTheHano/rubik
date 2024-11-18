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
import { RootContext } from '@/data/store'
import { lvlData } from '@/data/factoryData'

export default function Game() {
  const navigation = useNavigation()
  const [CurrentCache, dispatch] = React.useContext(RootContext)
  const [multiode, setMultiode] = React.useState<0 | 1>(0)

  const [totalTime, setTotalTime] = React.useState<number>(0)
  const [round, setRound] = React.useState<number>(1)
  const [match, setMatch] = React.useState<MatchHistoryFormat>()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    });
    return unsubscribe;
  }, [navigation]);


  return (
    <CLASS.SSBarWithSaveArea trans margin barContentStyle='light-content' bgColor={DefaultTheme.colors.background} barColor={DefaultTheme.colors.background}>
      <CLASS.ViewRowBetweenCenter style={[styles.paddingH4vw, styles.paddingV2vw]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.padding2vw]}>
          {ICON.sharpLeftArrow(vw(6), vw(6), 'white')}
        </TouchableOpacity>
        <CTEXT.NGT_Inter_DispMd_SemiBold>Game on</CTEXT.NGT_Inter_DispMd_SemiBold>
        <TouchableOpacity style={[styles.padding2vw]}>
          {ICON.tripleline(vw(6), vw(6), 'white')}
        </TouchableOpacity>
      </CLASS.ViewRowBetweenCenter>

      <ScrollView style={[styles.paddingH8vw]}>

        <CLASS.LevelBeing icon={lvlData[CurrentCache.currentGameLvl][0]} title={lvlData[CurrentCache.currentGameLvl][1] as string} med={lvlData[CurrentCache.currentGameLvl][2] as string} time={totalTime} />

        {marginBottomForScrollView()}
      </ScrollView>
    </CLASS.SSBarWithSaveArea>
  )
}