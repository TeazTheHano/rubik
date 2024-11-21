import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { componentStyle, NGHIACOLOR } from '@/assets/componentStyleSheet'
import styles, { vw } from '@/assets/stylesheet'
import { avatarComponet, convertNumberToTime, marginBottomForScrollView } from '@/assets/component'
import * as ICON from '@/assets/svgXml'
import * as  CLASS from '@/assets/Class'
import * as CTEXT from '@/assets/CustomText'
import { DefaultTheme, useNavigation } from '@react-navigation/native'
import { MatchHistoryFormat } from '@/data/interfaceFormat'
import { getStorageList } from '@/data/storageFunc'
import { RootContext } from '@/data/store'
import { lvlData } from '@/data/factoryData'

import { useState } from 'react';
import { PanResponder } from 'react-native';

export default function Game() {
  const navigation = useNavigation()
  const [CurrentCache, dispatch] = React.useContext(RootContext)
  const [multiMode, setMultiMode] = React.useState<0 | 1>(0)

  const [totalTime, setTotalTime] = React.useState<number>(0)
  const [round, setRound] = React.useState<number>(0)
  const [step, setStep] = React.useState<number>(0)
  const [match, setMatch] = React.useState<MatchHistoryFormat>()


  const [touchCount, setTouchCount] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      setTouchCount(evt.nativeEvent.touches.length);
      console.log('Number of fingers touching the screen:', evt.nativeEvent.touches.length);
      if (evt.nativeEvent.touches.length > 1) {
        console.log('Two or more fingers are on the screen. This is not stable on Android');
      }
    },
    onPanResponderRelease: () => {
      setTouchCount(0);
      console.log('No fingers touching the screen.');
    }
  });

  const FOM = `F, D, U, R, L, B, F’, D’, U’, R’, L’, B’, F2, D2, U2, R2, L2, B2`

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    });
    return unsubscribe;
  }, [navigation]);

  class TimerBox extends React.Component<{ round: number, header: string, bottom?: string, time?: number, formular?: string }> {
    render(): React.ReactNode {
      return (
        <CLASS.ViewColCenter style={[componentStyle.borderBrand800, styles.paddingH4vw, styles.paddingV6vw, styles.gap6vw, styles.marginVertical4vw, { backgroundColor: NGHIACOLOR.NghiaTransparentDark40 }]}>
          <CTEXT.NGT_Inter_DispLg_SemiBold color={NGHIACOLOR.NghiaBrand300}>{this.props.header}</CTEXT.NGT_Inter_DispLg_SemiBold>
          {this.props.formular ?
            <View style={[styles.borderRadius2vw, styles.paddingH4vw, styles.paddingV2vw, styles.justifyContentCenter, { backgroundColor: NGHIACOLOR.NghiaTransparentWhite10 }]}>
              <CTEXT.NGT_Inter_BodyLg_Reg style={[styles.textCenter]}>{this.props.formular}</CTEXT.NGT_Inter_BodyLg_Reg>
            </View> :
            <View style={[styles.paddingV3vw, styles.paddingH6vw, styles.borderRadius100, { backgroundColor: NGHIACOLOR.NghiaTransparentWhite30 }]}>
              <CTEXT.NGT_Inter_DispLg_SemiBold color={NGHIACOLOR.NghiaBrand300}>{convertNumberToTime(this.props.time || 0)}</CTEXT.NGT_Inter_DispLg_SemiBold>
            </View>
          }
          {
            this.props.bottom ? <CTEXT.NGT_Inter_BodyLg_Reg color={NGHIACOLOR.NghiaBrand500} style={[styles.textCenter, styles.paddingH4vw]}>{this.props.bottom}</CTEXT.NGT_Inter_BodyLg_Reg> :
              <TouchableOpacity onPress={() => { setStep(1); setRound(round + 1) }} >
                <CLASS.ViewGra800700 style={[styles.justifyContentCenter, styles.borderRadius2vw, styles.paddingV3vw, styles.paddingH8vw, {}]}>
                  <CTEXT.NGT_Inter_HeaderLg_Med>Sẵn sàng</CTEXT.NGT_Inter_HeaderLg_Med>
                </CLASS.ViewGra800700>
              </TouchableOpacity>
          }
        </CLASS.ViewColCenter>
      )
    }
  }

  class RoundResult extends React.Component<{ round: number, time: number }> {
    render(): React.ReactNode {
      let roundNum = 5;
      if (CurrentCache.currentGameLvl === 2) {
        roundNum = 12;
      }
      let roundTime = Array(roundNum).fill(0);
      return (
        <View style={[styles.padding4vw, componentStyle.borderBrand800,]}>
          <CLASS.ViewRow style={[styles.flex1, styles.borderRadius2vw, styles.overflowHidden]}>
            <CLASS.ViewGra800700 style={[styles.w50, styles.flexRowCenter, styles.paddingV3vw]}>
              <CTEXT.NGT_Inter_HeaderLg_Med>Kết quả</CTEXT.NGT_Inter_HeaderLg_Med>
            </CLASS.ViewGra800700>

            <CLASS.ViewGra800700 style={[styles.w50, styles.flexRowCenter, styles.paddingV3vw, styles.gap1vw]}>
              <CTEXT.NGT_Inter_BodyLg_Med>Tốt nhất: </CTEXT.NGT_Inter_BodyLg_Med>
              <View style={[styles.paddingV1vw, styles.paddingH2vw, styles.borderRadius2vw, { backgroundColor: NGHIACOLOR.NghiaTransparentDark30 }]}>
                <CTEXT.NGT_Inter_BodyLg_Med>{lvlData[CurrentCache.currentGameLvl][2].toString()} {CurrentCache.user.best?.[CurrentCache.currentGameLvl] || null}</CTEXT.NGT_Inter_BodyLg_Med>
              </View>
            </CLASS.ViewGra800700>
          </CLASS.ViewRow>

          <CLASS.ViewRowBetweenCenter style={[styles.paddingV3vw,]}>
            <CTEXT.NGT_Inter_BodyLg_Reg>Phương pháp <CTEXT.NGT_Inter_BodyLg_SemiBold color={NGHIACOLOR.NghiaBrand300}>{lvlData[CurrentCache.currentGameLvl][2].toString()}</CTEXT.NGT_Inter_BodyLg_SemiBold></CTEXT.NGT_Inter_BodyLg_Reg>
            <CTEXT.NGT_Inter_BodyMd_Med>{roundNum - round} lượt còn lại</CTEXT.NGT_Inter_BodyMd_Med>
          </CLASS.ViewRowBetweenCenter>

          <CLASS.ViewRowBetweenCenter style={[styles.w100, styles.padding2vw, componentStyle.borderBrand800, styles.flexWrap]}>
            {
              roundTime.map((item, index) => {
                return (
                  <CLASS.ViewColCenter key={index} style={[styles.padding2vw, styles.borderRadius10, styles.gap2vw, styles.w20, { backgroundColor: round == index + 1 ? NGHIACOLOR.NghiaTransparentWhite30 : undefined }]}>
                    <CTEXT.NGT_Inter_BodyLg_Med>{index + 1}</CTEXT.NGT_Inter_BodyLg_Med>
                    {roundNum == 12 ? null : ICON.greenClock(vw(8), vw(8))}
                    <CLASS.ViewRowCenter style={[styles.border1white, styles.w100, styles.paddingH1vw, styles.borderRadius2vw, { backgroundColor: index == 1 ? 'white' : index == roundTime.length - 1 ? NGHIACOLOR.NghiaBrand600 : undefined, borderWidth: index == roundTime.length - 1 ? 0 : 1 }]}>
                      <CTEXT.NGT_Inter_BodyLg_Med color={index == 1 ? NGHIACOLOR.NghiaBrand600 : 'white'}>{item}s</CTEXT.NGT_Inter_BodyLg_Med>
                    </CLASS.ViewRowCenter>
                  </CLASS.ViewColCenter>
                )
              })}
          </CLASS.ViewRowBetweenCenter>
        </View>
      );
    }
  }

  function renderTimeBox() {
    let headerText = [
      ``
    ]
    let bottomText = [
      ``,
      `Chạm 2 ngón tay của bạn vào màn hình khi sẵn sàng`,
      `Bỏ chạm để bắt đầu đếm giờ`,
      `Chạm lại vào màn hình để kết thúc bộ đếm`,
      `Chạm 2 ngón tay của bạn vào màn hình khi sẵn sàng với lượt chơi thứ ${round + 1}`,
    ]

    let thisTime = 0

    return <TimerBox
      round={round}
      formular={step === 0 ? FOM : ''}
      header={`Scramble: lượt ${round}`}
      bottom={step === 0 ? '' : bottomText[step]}
      time={thisTime}
    />
  }

  function TimmerFnc() {
    let now = Date.now()
  }

  function renderItem() {
    switch (multiMode) {
      case 1:
        return (
          <>
          </>
        )

      default:
        return (
          <View
            {...panResponder.panHandlers}

          >
            <CLASS.LevelBeing icon={lvlData[CurrentCache.currentGameLvl][0]} title={lvlData[CurrentCache.currentGameLvl][1] as string} med={lvlData[CurrentCache.currentGameLvl][2] as string} time={totalTime} />
            {renderTimeBox()}
            <RoundResult round={round} time={totalTime} />
          </View>
        )
    }
  }



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

      <ScrollView style={[styles.paddingH6vw]}>
        {renderItem()}

        {marginBottomForScrollView()}
      </ScrollView>
    </CLASS.SSBarWithSaveArea>
  )
}