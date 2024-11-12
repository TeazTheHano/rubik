import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SvgXml } from 'react-native-svg';
import styles, { vw, vh } from '../../assets/stylesheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { NGT_Inter_BodyMd_Med } from '@/assets/CustomText';
import { NGHIACOLOR } from '@/assets/componentStyleSheet';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  let insets = useSafeAreaInsets();

  const screens = [
    {
      name: 'index',
      title: 'Home',
      activeIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0427 3.15016L10.0431 3.14985C11.1273 2.27904 12.8675 2.28414 13.968 3.16073C13.9681 3.16084 13.9682 3.16094 13.9684 3.16105L20.514 8.39756C20.5146 8.39802 20.5152 8.39849 20.5157 8.39895C20.893 8.70711 21.2196 9.18942 21.4304 9.74099C21.641 10.2922 21.7196 10.8699 21.6462 11.351L20.3873 18.8845C20.3872 18.885 20.3872 18.8855 20.3871 18.8859C20.1374 20.3188 18.7432 21.5 17.3 21.5H6.69996C5.23549 21.5 3.8725 20.3476 3.62294 18.8965C3.62288 18.8961 3.62282 18.8958 3.62276 18.8955L2.36313 11.3576L2.36293 11.3565C2.28079 10.8718 2.35452 10.293 2.56465 9.74192C2.77476 9.19094 3.10548 8.70909 3.4918 8.40086L3.49267 8.40016L10.0427 3.15016ZM12 19.25C12.6861 19.25 13.25 18.6862 13.25 18V15C13.25 14.3139 12.6861 13.75 12 13.75C11.3138 13.75 10.75 14.3139 10.75 15V18C10.75 18.6862 11.3138 19.25 12 19.25Z" fill="#F9F5FF" stroke="#F9F5FF"/>
</svg>
`,
      inactiveIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 18V15" stroke="#D6BBFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z" stroke="#D6BBFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
    },
    {
      name: 'explore',
      title: 'Home',
      activeIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0427 3.15016L10.0431 3.14985C11.1273 2.27904 12.8675 2.28414 13.968 3.16073C13.9681 3.16084 13.9682 3.16094 13.9684 3.16105L20.514 8.39756C20.5146 8.39802 20.5152 8.39849 20.5157 8.39895C20.893 8.70711 21.2196 9.18942 21.4304 9.74099C21.641 10.2922 21.7196 10.8699 21.6462 11.351L20.3873 18.8845C20.3872 18.885 20.3872 18.8855 20.3871 18.8859C20.1374 20.3188 18.7432 21.5 17.3 21.5H6.69996C5.23549 21.5 3.8725 20.3476 3.62294 18.8965C3.62288 18.8961 3.62282 18.8958 3.62276 18.8955L2.36313 11.3576L2.36293 11.3565C2.28079 10.8718 2.35452 10.293 2.56465 9.74192C2.77476 9.19094 3.10548 8.70909 3.4918 8.40086L3.49267 8.40016L10.0427 3.15016ZM12 19.25C12.6861 19.25 13.25 18.6862 13.25 18V15C13.25 14.3139 12.6861 13.75 12 13.75C11.3138 13.75 10.75 14.3139 10.75 15V18C10.75 18.6862 11.3138 19.25 12 19.25Z" fill="#F9F5FF" stroke="#F9F5FF"/>
</svg>
`,
      inactiveIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 18V15" stroke="#D6BBFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z" stroke="#D6BBFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
    },
    {
      name: 'hehe',
      title: 'Home',
      activeIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0427 3.15016L10.0431 3.14985C11.1273 2.27904 12.8675 2.28414 13.968 3.16073C13.9681 3.16084 13.9682 3.16094 13.9684 3.16105L20.514 8.39756C20.5146 8.39802 20.5152 8.39849 20.5157 8.39895C20.893 8.70711 21.2196 9.18942 21.4304 9.74099C21.641 10.2922 21.7196 10.8699 21.6462 11.351L20.3873 18.8845C20.3872 18.885 20.3872 18.8855 20.3871 18.8859C20.1374 20.3188 18.7432 21.5 17.3 21.5H6.69996C5.23549 21.5 3.8725 20.3476 3.62294 18.8965C3.62288 18.8961 3.62282 18.8958 3.62276 18.8955L2.36313 11.3576L2.36293 11.3565C2.28079 10.8718 2.35452 10.293 2.56465 9.74192C2.77476 9.19094 3.10548 8.70909 3.4918 8.40086L3.49267 8.40016L10.0427 3.15016ZM12 19.25C12.6861 19.25 13.25 18.6862 13.25 18V15C13.25 14.3139 12.6861 13.75 12 13.75C11.3138 13.75 10.75 14.3139 10.75 15V18C10.75 18.6862 11.3138 19.25 12 19.25Z" fill="#F9F5FF" stroke="#F9F5FF"/>
</svg>
`,
      inactiveIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 18V15" stroke="#D6BBFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z" stroke="#D6BBFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
    },
  ]

  const TabBar = ({ state, navigation }: { state: any, navigation: any }) => {
    return (
      <View style={[styles.flexRowEvenlyCenter, styles.gap1vw, { margin: insets.bottom ? insets.bottom : vw(4), borderRadius: vw(4), borderWidth: 1, borderColor: NGHIACOLOR.NghiaBrand800 as string, backgroundColor: NGHIACOLOR.NghiaTransparentDark30 as string }]}>
        {state.routes.map((route: { key: React.Key | null | undefined; name: any; }, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.borderRadius3vw, styles.overflowHidden, styles.marginVertical2vw,]}
            >
              <LinearGradient
                colors={['rgba(83, 56, 158, 1)', 'rgba(127, 86, 217, 1)']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                locations={[0, 1]}
                style={[styles.flexColCenter, styles.gap1vw, styles.paddingH4vw, styles.paddingV2vw, { width: 'auto', minWidth: '20%' }]}
              >
                <SvgXml xml={isFocused ? screens[index].activeIcon : screens[index].inactiveIcon} width={24} height={24} />
                <NGT_Inter_BodyMd_Med lineNumber={1} color='white'>{screens[index].title}</NGT_Inter_BodyMd_Med>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Tabs
      tabBar={({ state, navigation }) => <TabBar state={state} navigation={navigation} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      {screens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, focused }) => <SvgXml xml={focused ? screen.activeIcon : screen.inactiveIcon} width={24} height={24} fill={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}

