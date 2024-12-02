import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import Animated, { Easing, useSharedValue, withSpring } from 'react-native-reanimated';
import { componentStyle, NGHIACOLOR } from '@/assets/componentStyleSheet';
import styles, { vw } from '@/assets/stylesheet';
import { avatarComponet, convertNumberToTime, marginBottomForScrollView } from '@/assets/component';
import * as ICON from '@/assets/svgXml';
import * as CLASS from '@/assets/Class';
import * as CTEXT from '@/assets/CustomText';
import { DefaultTheme, useNavigation } from '@react-navigation/native';
import { MatchHistoryFormat } from '@/data/interfaceFormat';
import { getStorageList } from '@/data/storageFunc';
import { RootContext } from '@/data/store';
import { lvlData } from '@/data/factoryData';

export default function Game() {
  const navigation = useNavigation();
  const [CurrentCache, dispatch] = React.useContext(RootContext);
  const [multiMode, setMultiMode] = React.useState<0 | 1>(CurrentCache.multiMode);

  const [totalTime, setTotalTime] = React.useState<number>(0);
  const [totalTimeUser2, setTotalTimeUser2] = React.useState<number>(0);
  const [round, setRound] = React.useState<number>(0);
  const [roundUser2, setRoundUser2] = React.useState<number>(0);
  const [step, setStep] = React.useState<number>(0);
  const [match, setMatch] = React.useState<MatchHistoryFormat>();

  const [roundNum, setRoundNum] = React.useState<12 | 5>(CurrentCache.currentGameLvl === 2 ? 12 : 5);

  const commonProps = {
    icon: lvlData[CurrentCache.currentGameLvl][0],
    title: lvlData[CurrentCache.currentGameLvl][1] as string,
    med: lvlData[CurrentCache.currentGameLvl][2] as string,
  };

  // TIMER VAR
  const [inspectTime, setInspectTime] = React.useState<number>(lvlData[CurrentCache.currentGameLvl][3] as number);
  const [displayTime, setDisplayTime] = React.useState<number>(0);
  const [timerboxHeaderStr, setTimerboxHeaderStr] = React.useState<string>(`Scramble: ${multiMode ? `` : ``} lượt ${round + 1}`);
  const [timerboxBottomStr, setTimerboxBottomStr] = React.useState<string>('');

  const [roundTime, setRoundTime] = React.useState<number[]>(Array(roundNum).fill(0));
  const FOM = `F, D, U, R, L, B, F’, D’, U’, R’, L’, B’, F2, D2, U2, R2, L2, B2`;

  // STOPWATCH FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
  const [isRunning, setIsRunning] = useState(false);
  const [lastTime, setLastTime] = useState(0);

  /**
   * Updates the display time whenever the component is running
   * by adding the difference between the current time and the last time
   * to the display time.
   */
  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = requestAnimationFrame(() => {
        const now = performance.now();
        setDisplayTime(prevTime => prevTime + now - lastTime);
        setLastTime(now);
      });
    }

    // Cancel the previous animation frame when the component is unmounted
    // or the isRunning state changes.
    return () => cancelAnimationFrame(intervalId);
  }, [isRunning, lastTime]);

  /**
   * Updates the last time whenever the component is mounted or
   * the isRunning state changes.
   */
  useEffect(() => {
    setLastTime(performance.now());
  }, []);

  /**
   * Toggles the isRunning state and updates the last time
   * when the start/stop button is pressed.
   */
  const handleStartStop = useCallback(() => {
    if (!isRunning) {
      setLastTime(performance.now()); // Update lastTime only when starting
    }
    setIsRunning(!isRunning);
  }, [isRunning]);

  /**
   * Resets the display time and stops the component when the
   * reset button is pressed.
   */
  const handleReset = useCallback(() => {
    setDisplayTime(0);
    setIsRunning(false);
  }, []);

  // END OF STOPWATCH FUNCTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  let counterTimeoutId: number | null = null;

  // Memoize the counter function for improved performance
  const memoizedCounter = useCallback((second: number) => {
    if (second > 0) {
      counterTimeoutId = window.setTimeout(() => {
        setDisplayTime(second - 1);
        memoizedCounter(second - 1); // Use memoized version
      }, 1000);
    } else {
      setStep(2);
      counterTimeoutId = null;
    }
  }, []);
  const endCounter = useCallback(() => {
    if (counterTimeoutId) {
      clearTimeout(counterTimeoutId);
      counterTimeoutId = null;
    }
    setDisplayTime(0);
    setInspectTime(0);
  }, []);

  // OPACITY ANIMATOR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const opacityAnimate = useSharedValue(0);
  const timerExtraPaddingAnimate = useSharedValue(0);

  const handleOpacityAnimation = useCallback((toValue: number) => {
    opacityAnimate.value = withSpring(toValue, {
      damping: 10,
      stiffness: 100,
    });
  }, []);

  const handleTimerExtraPadding = useCallback((toValue: number) => {
    timerExtraPaddingAnimate.value = withSpring(toValue, {
      damping: 10,
      stiffness: 100,
    });
  }, []);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const opacityAnimatorBlinker = useCallback(() => {
    let i = false;
    handleOpacityAnimation(i ? 1 : 0);
    intervalRef.current = setInterval(() => {
      i = !i;
      handleOpacityAnimation(i ? 1 : 0);
    }, 1000);
  }, [handleOpacityAnimation]);

  const stopOpacityAnimatorBlinker = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      handleOpacityAnimation(0);
    }
  }, [handleOpacityAnimation]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);
  // END OF OPACITY ANIMATOR <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const stepFncControl = useCallback(() => {
    console.log('stepfnccontrol ' + step);

    switch (step) {
      case 0:
        setInspectTime(lvlData[CurrentCache.currentGameLvl][3] as number);
        setRound(prevRound => prevRound + 1);
        handleTimerExtraPadding(vw(20));
        setDisplayTime(inspectTime);
        memoizedCounter(inspectTime);
        opacityAnimatorBlinker();
        // content
        setTimerboxHeaderStr(`Quan sát`)
        setTimerboxBottomStr(`Chạm tay của bạn vào Vùng này khi sẵn sàng`)
        break;
      case 1:
        stopOpacityAnimatorBlinker();
        handleOpacityAnimation(0);
        endCounter();
        // content
        setTimerboxHeaderStr(`Sẵn sàng`)
        setTimerboxBottomStr(`Bỏ chạm để bắt đầu đếm giờ`)
        break;
      case 2:
        handleStartStop();
        setInspectTime(0);
        opacityAnimatorBlinker();
        // content
        setTimerboxHeaderStr(`Đang đếm thời gian`)
        setTimerboxBottomStr(`Chạm lại vào Vùng này để kết thúc bộ đếm`)
        break;
      case 3:
        handleStartStop();
        setInspectTime(0);
        stopOpacityAnimatorBlinker();
        handleTimerExtraPadding(0);
        setTotalTime(displayTime);
        // content
        setTimerboxHeaderStr(`Kết quả lượt ${round}`)
        setTimerboxBottomStr(`Chạm tay của bạn vào Vùng này khi sẵn sàng với lượt chơi thứ ${round + 1}`)
        break;
      case 4:
        setTimerboxHeaderStr(`Scramble: ${multiMode ? `` : ``} lượt ${round + 1}`)
        setTimerboxBottomStr(``)
        setStep(0);
        break;
      default:
        break;
    }
    setStep(prevStep => prevStep + 1);
  }, [step, inspectTime, displayTime, handleStartStop, memoizedCounter, stopOpacityAnimatorBlinker, handleOpacityAnimation]);

  const HEADER = useMemo(() => {
    return (
      <CLASS.ViewRowBetweenCenter style={[styles.paddingH4vw, styles.paddingV2vw]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} style={[styles.padding2vw]}>
          {ICON.sharpLeftArrow(vw(6), vw(6), 'white')}
        </TouchableOpacity>
        <CTEXT.NGT_Inter_DispMd_SemiBold>Game on</CTEXT.NGT_Inter_DispMd_SemiBold>
        <TouchableOpacity style={[styles.padding2vw]}>
          {ICON.tripleline(vw(6), vw(6), 'white')}
        </TouchableOpacity>
      </CLASS.ViewRowBetweenCenter>
    )
  }, [])

  const LEVELBEING = useMemo(() => {
    return <CLASS.LevelBeing icon={commonProps.icon} title={commonProps.title} time={totalTime} med={commonProps.med} />
  }, [])

  const TIMERBOX_HEADER = useMemo(() => {
    return <CTEXT.NGT_Inter_DispLg_SemiBold color={NGHIACOLOR.NghiaBrand300}>{timerboxHeaderStr}</CTEXT.NGT_Inter_DispLg_SemiBold>
  }, [timerboxHeaderStr])

  const TIMERBOX_FOMULAR = useMemo(() => {
    return (
      <View style={[styles.borderRadius2vw, styles.paddingH4vw, styles.paddingV2vw, styles.justifyContentCenter, { backgroundColor: NGHIACOLOR.NghiaTransparentWhite10 }]}>
        <CTEXT.NGT_Inter_BodyLg_Reg style={[styles.textCenter]}>{FOM}</CTEXT.NGT_Inter_BodyLg_Reg>
      </View>
    )
  }, [FOM])

  const TIMERBOX_BOTTOM = useMemo(() => {
    return <CTEXT.NGT_Inter_BodyLg_Reg color={NGHIACOLOR.NghiaBrand500} style={[styles.textCenter, styles.paddingH4vw]}>{timerboxBottomStr}</CTEXT.NGT_Inter_BodyLg_Reg>
  }, [timerboxBottomStr])

  const TIMERBOX_READYBTN = useMemo(() => {
    return (
      <TouchableOpacity onPress={stepFncControl}>
        <CLASS.ViewGra800700 style={[styles.justifyContentCenter, styles.borderRadius2vw, styles.paddingV3vw, styles.paddingH8vw]}>
          <CTEXT.NGT_Inter_HeaderLg_Med>Sẵn sàng</CTEXT.NGT_Inter_HeaderLg_Med>
        </CLASS.ViewGra800700>
      </TouchableOpacity>
    )
  }, [])

  const BESTRESULT = useMemo(() => {
    return (
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
    )
  }, [])

  class RoundResult extends React.Component<{ round: number }> {
    shouldComponentUpdate(nextProps: Readonly<{ round: number }>, nextState: Readonly<{}>, nextContext: any): boolean {
      return nextProps.round !== this.props.round;
    }
    render(): React.ReactNode {
      return (
        <>
          <CLASS.ViewRowBetweenCenter style={[styles.paddingV3vw]}>
            <CTEXT.NGT_Inter_BodyLg_Reg>Phương pháp <CTEXT.NGT_Inter_BodyLg_SemiBold color={NGHIACOLOR.NghiaBrand300}>{lvlData[CurrentCache.currentGameLvl][2].toString()}</CTEXT.NGT_Inter_BodyLg_SemiBold></CTEXT.NGT_Inter_BodyLg_Reg>
            <CTEXT.NGT_Inter_BodyMd_Med>{roundNum - this.props.round} lượt còn lại</CTEXT.NGT_Inter_BodyMd_Med>
          </CLASS.ViewRowBetweenCenter>
          <CLASS.ViewRowBetweenCenter style={[styles.w100, styles.padding2vw, componentStyle.borderBrand800, styles.flexWrap]}>
            {roundTime.map((item, index) => (
              <CLASS.ViewColCenter key={index} style={[styles.padding2vw, styles.borderRadius10, styles.gap2vw, styles.w20, { backgroundColor: round === index + 1 ? NGHIACOLOR.NghiaTransparentWhite30 : undefined }]}>
                <CTEXT.NGT_Inter_BodyLg_Med>{index + 1}</CTEXT.NGT_Inter_BodyLg_Med>
                <View pointerEvents="none">{roundNum === 12 ? null : ICON.greenClock(vw(8), vw(8))}</View>
                <CLASS.ViewRowCenter style={[styles.border1white, styles.w100, styles.paddingH1vw, styles.borderRadius2vw, { backgroundColor: index === 1 ? 'white' : index === roundTime.length - 1 ? NGHIACOLOR.NghiaBrand600 : undefined, borderWidth: index === roundTime.length - 1 ? 0 : 1 }]}>
                  <CTEXT.NGT_Inter_BodyLg_Med color={index === 1 ? NGHIACOLOR.NghiaBrand600 : 'white'}>{item}s</CTEXT.NGT_Inter_BodyLg_Med>
                </CLASS.ViewRowCenter>
              </CLASS.ViewColCenter>
            ))}
          </CLASS.ViewRowBetweenCenter>
        </>
      )
    }
  }

  class TimerBoxBottomCompo extends React.Component<{ round: number }> {
    shouldComponentUpdate(nextProps: Readonly<{ round: number }>, nextState: Readonly<{}>, nextContext: any): boolean {
      return nextProps.round !== this.props.round;
    }
    render(): React.ReactNode {
      return step === 0 ? TIMERBOX_READYBTN : TIMERBOX_BOTTOM
    }
  }

  return (
    <CLASS.SSBarWithSaveArea trans margin barContentStyle='light-content' bgColor={DefaultTheme.colors.background} barColor={DefaultTheme.colors.background}>
      {HEADER}

      <View style={[styles.flex1]}>
        <ScrollView style={[styles.flex1]}>
          <CLASS.ViewCol style={[styles.h100, styles.paddingH6vw, styles.gap4vw]}>
            {LEVELBEING}
            <TouchableOpacity
              disabled={step === 0}
              onPressIn={stepFncControl}
              onPressOut={() => {
                if (step === 2) stepFncControl();
              }}
            >
              <CLASS.ViewColCenter style={[styles.marginTop4vw, styles.positionRelative, styles.overflowHidden, { backgroundColor: NGHIACOLOR.NghiaTransparentDark30, borderColor: step === 3 ? 'red' : NGHIACOLOR.NghiaBrand800, borderRadius: vw(3), borderWidth: step === 3 ? 3 : 1 }]}>
                <Animated.View style={[styles.flex1, styles.w100, styles.h100, styles.positionAbsolute, { opacity: opacityAnimate }]} >
                  <CLASS.ViewGra800700 style={[styles.w100, styles.h100]} />
                </Animated.View>
                <CLASS.ViewColCenter style={[styles.paddingH4vw, styles.paddingV6vw, styles.gap6vw]}>
                  {TIMERBOX_HEADER}
                  {
                    step === 0 ? TIMERBOX_FOMULAR :
                      <View style={[styles.paddingV3vw, styles.paddingH6vw, styles.borderRadius100, { backgroundColor: NGHIACOLOR.NghiaTransparentWhite30 }]}>
                        <CTEXT.NGT_Inter_DispLg_SemiBold color={NGHIACOLOR.NghiaBrand300}>{step === 1 ? `${displayTime}"` : convertNumberToTime(displayTime || 0)}</CTEXT.NGT_Inter_DispLg_SemiBold>
                      </View>
                  }

                  <TimerBoxBottomCompo round={round} />
                </CLASS.ViewColCenter>
                <Animated.View style={{ height: timerExtraPaddingAnimate }} />
              </CLASS.ViewColCenter>

            </TouchableOpacity>

            <View style={[styles.padding4vw, componentStyle.borderBrand800]}>
              {BESTRESULT}
              <RoundResult round={round} />
            </View>
            {marginBottomForScrollView()}
          </CLASS.ViewCol>
        </ScrollView>
      </View>
    </CLASS.SSBarWithSaveArea>
  );
}