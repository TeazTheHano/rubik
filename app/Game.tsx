import { View, Text, ScrollView, Image, TouchableOpacity, Pressable, } from 'react-native'
import Animated, { Easing, useSharedValue, withSpring } from 'react-native-reanimated'
import React, { useEffect, useRef } from 'react'
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
  const [multiMode, setMultiMode] = React.useState<0 | 1>(CurrentCache.multiMode)

  const [totalTime, setTotalTime] = React.useState<number>(0)
  const [totalTimeUser2, setTotalTimeUser2] = React.useState<number>(0)
  const [round, setRound] = React.useState<number>(0)
  const [roundUser2, setRoundUser2] = React.useState<number>(0)
  const [step, setStep] = React.useState<number>(0)
  const [match, setMatch] = React.useState<MatchHistoryFormat>()


  const [inspectTime, setInspectTime] = React.useState<number>(lvlData[CurrentCache.currentGameLvl][3] as number)
  const [displayTime, setDisplayTime] = React.useState<number>(0)

  // const [touchCount, setTouchCount] = useState(0);
  // const panResponderRef = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderGrant: (evt, gestureState) => {
  //       const currentTouchCount = evt.nativeEvent.touches.length;
  //       setTouchCount(currentTouchCount);
  //       if (currentTouchCount > 1) {
  //         console.log('Immediate two-finger touch detected');
  //         // Trigger your desired action here
  //       }
  //     },
  //     onPanResponderRelease: () => {
  //       setTouchCount(0);
  //     },
  //   })
  // );

  const FOM = `F, D, U, R, L, B, F’, D’, U’, R’, L’, B’, F2, D2, U2, R2, L2, B2`

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    });
    return unsubscribe;
  }, [navigation]);

  const [isRunning, setIsRunning] = useState(false);
  const [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = requestAnimationFrame(() => {
        const now = performance.now();
        setDisplayTime(prevTime => prevTime + now - lastTime);
        setLastTime(now);
      });
    }

    return () => cancelAnimationFrame(intervalId);
  }, [isRunning, lastTime]);

  useEffect(() => {
    setLastTime(performance.now());
  }, []);

  const handleStartStop = () => {
    if (!isRunning) {
      setLastTime(performance.now()); // Update lastTime only when starting
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setDisplayTime(0);
    setIsRunning(false);
  };

  // const opacityAnimation = useRef(new Animated.Value(0)).current;
  // const opacityAnimate = opacityAnimation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['100%', '0%'],
  // })
  // const opacityAnimator = () => {
  //   Animated.timing(opacityAnimation, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: false,
  //     easing: Easing.inOut(Easing.ease),
  //   }).start();
  // };

  // const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // const opacityAnimatorBlinker = () => {
  //   intervalRef.current = setInterval(() => {
  //     Animated.sequence([
  //       Animated.timing(opacityAnimation, {
  //         toValue: 1,
  //         duration: 500,
  //         useNativeDriver: false,
  //         easing: Easing.ease,
  //       }),
  //       Animated.timing(opacityAnimation, {
  //         toValue: 0,
  //         duration: 500,
  //         delay: 500,
  //         useNativeDriver: false,
  //         easing: Easing.ease,
  //       }),
  //     ]).start();
  //   }, 1500);
  // };

  // const stopOpacityAnimatorBlinker = () => {
  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current);
  //     intervalRef.current = null;
  //   }
  // };

  const opacityAnimate = useSharedValue(0);
  const timerExtraPaddingAnimate = useSharedValue(0);
  const handleOpacityAnimation = (toValue: number) => {
    opacityAnimate.value = withSpring(toValue);
  }

  const handleTimerExtraPadding = (toValue: number) => {
    timerExtraPaddingAnimate.value = withSpring(toValue);
  }

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const opacityAnimatorBlinker = () => {
    let i = false
    handleOpacityAnimation(i ? 1 : 0);
    intervalRef.current = setInterval(() => {
      i = !i
      handleOpacityAnimation(i ? 1 : 0);
    }, 1000);
  };
  const stopOpacityAnimatorBlinker = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      handleOpacityAnimation(0);
    }
  };

  class TimerBox extends React.Component<{ round: number, header: string, bottom?: string, time?: number, formular?: string }> {
    render(): React.ReactNode {
      return (
        <TouchableOpacity
          disabled={step == 0}
          onPressIn={stepFncControl}
          onPressOut={() => {
            console.log('press out');
            step == 2 ? stepFncControl() : null
          }}
        >
          <CLASS.ViewColCenter style={[styles.marginTop4vw, styles.positionRelative, styles.overflowHidden, { backgroundColor: NGHIACOLOR.NghiaTransparentDark30, borderColor: step == 3 ? 'red' : NGHIACOLOR.NghiaBrand800, borderRadius: vw(3), borderWidth: step == 3 ? 3 : 1 }]}>
            <Animated.View style={[styles.flex1, styles.w100, styles.h100, styles.positionAbsolute, { opacity: opacityAnimate }]} >
              <CLASS.ViewGra800700 style={[styles.w100, styles.h100,]} />
            </Animated.View>
            <CLASS.ViewColCenter style={[styles.paddingH4vw, styles.paddingV6vw, styles.gap6vw,]}>
              <CTEXT.NGT_Inter_DispLg_SemiBold color={NGHIACOLOR.NghiaBrand300}>{this.props.header}</CTEXT.NGT_Inter_DispLg_SemiBold>
              {this.props.formular ?
                <View style={[styles.borderRadius2vw, styles.paddingH4vw, styles.paddingV2vw, styles.justifyContentCenter, { backgroundColor: NGHIACOLOR.NghiaTransparentWhite10 }]}>
                  <CTEXT.NGT_Inter_BodyLg_Reg style={[styles.textCenter]}>{this.props.formular}</CTEXT.NGT_Inter_BodyLg_Reg>
                </View> :
                <View style={[styles.paddingV3vw, styles.paddingH6vw, styles.borderRadius100, { backgroundColor: NGHIACOLOR.NghiaTransparentWhite30 }]}>
                  <CTEXT.NGT_Inter_DispLg_SemiBold color={NGHIACOLOR.NghiaBrand300}>{step == 1 ? this.props.time + `"` : convertNumberToTime(this.props.time || 0)}</CTEXT.NGT_Inter_DispLg_SemiBold>
                </View>
              }
              {
                this.props.bottom ? <CTEXT.NGT_Inter_BodyLg_Reg color={NGHIACOLOR.NghiaBrand500} style={[styles.textCenter, styles.paddingH4vw]}>{this.props.bottom}</CTEXT.NGT_Inter_BodyLg_Reg> :
                  <TouchableOpacity onPress={() => { stepFncControl() }} >
                    <CLASS.ViewGra800700 style={[styles.justifyContentCenter, styles.borderRadius2vw, styles.paddingV3vw, styles.paddingH8vw, {}]}>
                      <CTEXT.NGT_Inter_HeaderLg_Med>Sẵn sàng</CTEXT.NGT_Inter_HeaderLg_Med>
                    </CLASS.ViewGra800700>
                  </TouchableOpacity>
              }
            </CLASS.ViewColCenter>
            <Animated.View style={{ height: timerExtraPaddingAnimate }} />
          </CLASS.ViewColCenter>
          {/* <TouchableOpacity style={[styles.w100, styles.borderRadius2vw, styles.overflowHidden, styles.shadowW0H05Black, { borderWidth: 2, borderColor: NGHIACOLOR.NghiaTransparentWhite60 }]}>
            <CLASS.ViewGra700600 style={[styles.positionRelative, styles.w100, styles.flexRowCenter,]}>
              <Animated.View style={[styles.flex1, styles.w100, styles.h100, styles.positionAbsolute, { backgroundColor: NGHIACOLOR.NghiaGray600, opacity: opacityAnimate }]}>
              </Animated.View>
              <CLASS.ViewRowCenter style={[styles.paddingV8vw,]}>
                <CTEXT.NGT_Inter_HeaderLg_Bld>Bắt đầu</CTEXT.NGT_Inter_HeaderLg_Bld>
                {ICON.leftHand(vw(8), vw(8))}
              </CLASS.ViewRowCenter>
            </CLASS.ViewGra700600>
          </TouchableOpacity> */}

        </TouchableOpacity>
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
                    <View pointerEvents="none">{roundNum == 12 ? null : ICON.greenClock(vw(8), vw(8))}</View>
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
      `Scramble: ${multiMode ? `` : ``} lượt ${round}`,
      `Quan sát`,
      `Sẵn sàng`,
      `Đang đếm thời gian`,
      `Kết quả lượt ${round}`,
    ]
    let bottomText = [
      ``,
      `Chạm tay của bạn vào Vùng này khi sẵn sàng`,
      `Bỏ chạm để bắt đầu đếm giờ`,
      `Chạm lại vào Vùng này để kết thúc bộ đếm`,
      `Chạm tay của bạn vào Vùng này khi sẵn sàng với lượt chơi thứ ${round + 1}`,
    ]

    return <TimerBox
      round={round}
      formular={step === 0 ? FOM : ''}
      header={headerText[step]}
      bottom={step === 0 ? '' : bottomText[step]}
      time={displayTime}
    />
  }

  function stepFncControl() {
    console.log(step);
    switch (step) {
      case 0:
        setInspectTime(lvlData[CurrentCache.currentGameLvl][3] as number);
        setRound(round + 1); opacityAnimatorBlinker(); handleTimerExtraPadding(vw(20));
        setDisplayTime(inspectTime);
        function counter(second: number) {
          if (second > 0) {
            setTimeout(() => {
              setDisplayTime(second - 1);
              counter(second - 1);
            }, 1000);
          } else {
            console.log('counter end');
            setStep(3);
          }
        }
        counter(inspectTime);
        break;
      case 1:
        stopOpacityAnimatorBlinker();
        handleOpacityAnimation(0);
        break;
      case 2:
        console.log('start');
        handleStartStop()
        setInspectTime(0);
        opacityAnimatorBlinker();
        break;
      case 3:
        console.log('end');
        handleStartStop()
        setInspectTime(0)
        stopOpacityAnimatorBlinker();
        handleTimerExtraPadding(0);
        break;
      case 4:
        return setStep(0);
    }
    setStep(step + 1);
  }

  useEffect(() => {
    console.log(step);

  }, [step])

  function renderItem() {
    switch (multiMode) {
      case 1:
        return (
          <CLASS.ViewCol style={[styles.h100, styles.paddingH6vw, styles.gap4vw]}>
            <CLASS.LevelBeing icon={lvlData[CurrentCache.currentGameLvl][0]} title={lvlData[CurrentCache.currentGameLvl][1] as string} med={lvlData[CurrentCache.currentGameLvl][2] as string} time={totalTime} />
            {renderTimeBox()}
            <RoundResult round={round} time={totalTime} />
            <RoundResult round={roundUser2} time={totalTimeUser2} />
          </CLASS.ViewCol>
        )

      default:
        return (
          <CLASS.ViewCol style={[styles.h100, styles.paddingH6vw, styles.gap4vw]}>
            <CLASS.LevelBeing icon={lvlData[CurrentCache.currentGameLvl][0]} title={lvlData[CurrentCache.currentGameLvl][1] as string} med={lvlData[CurrentCache.currentGameLvl][2] as string} time={totalTime} />
            {renderTimeBox()}
            <RoundResult round={round} time={totalTime} />
          </CLASS.ViewCol>
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

      <View style={[styles.flex1]}
      // {...panResponderRef.current?.panHandlers}
      >
        <ScrollView style={[styles.flex1]}
        >
          {renderItem()}

          {marginBottomForScrollView()}
        </ScrollView>
      </View>
    </CLASS.SSBarWithSaveArea>
  )
}