import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as CLASS from '@/assets/Class'
import { DefaultTheme } from '@react-navigation/native'
import { clearStorage, getStorageList, saveStorageItem } from '@/data/storageFunc'
import { MatchHistoryFormat } from '@/data/interfaceFormat'

export default function Setting() {
  const [x, setX] = useState<any>()

  return (
    <CLASS.SSBarWithSaveArea trans margin barContentStyle='light-content' bgColor={DefaultTheme.colors.background} barColor={DefaultTheme.colors.background}>
      <TouchableOpacity onPress={() => {
        const now = new Date();
        const generateRandomTime = () => now.getTime() + Math.round(Math.random() * 10000) + 1000;

        const fakedata: MatchHistoryFormat = {
          date: now,
          time: {
            start: generateRandomTime(),
            end: generateRandomTime(),
          },
          lvl: 'Beginner',
          rounds: Array.from({ length: 5 }, () => ({
            start: generateRandomTime(),
            end: generateRandomTime(),
          })),
          result: 123114,
        };

        saveStorageItem('match', fakedata, `a${Math.round(Math.random() * 20)}`);
      }}>
        <Text>add match his</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => {
        try {
          await clearStorage('x')
          console.log('done');
        } catch (error) {
          Alert.alert('shiet')
        }
      }}>
        <Text>clear all</Text>
      </TouchableOpacity>


    </CLASS.SSBarWithSaveArea >
  )
}