import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SaveViewWithColorStatusBar } from '@/assets/Class';
import { convertNumberToTime } from '@/assets/component';

export default function Guide() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [lastTime, setLastTime] = useState(0);

    useEffect(() => {
        let intervalId: any;
        if (isRunning) {
            intervalId = requestAnimationFrame(() => {
                const now = performance.now();
                setTime(prevTime => prevTime + now - lastTime);
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
        setTime(0);
        setIsRunning(false);
    };

    const [countDown, setCountDown] = useState(0);
    const handleCountDownTrigger = () => setCountDown(15);
    useEffect(() => {
        if (countDown > 0) {
            const intervalId = setInterval(() => {
                setCountDown(countDown - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [countDown]);

    const formatTime
        = (time: number) => {
            const milliseconds = time % 1000;
            const seconds = Math.floor((time / 1000) % 60);
            const minutes = Math.floor((time / 1000 / 60)
                % 60);
            const hours = Math.floor((time / 1000 / 60 / 60));
            return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${milliseconds.toString().padStart(3, '0')}`;
        };

    return (
        <SaveViewWithColorStatusBar>
            <Text style={{ fontSize: 24 }}>{formatTime(time)}</Text>
            <Text>{convertNumberToTime(time)}</Text>
            <Button title={isRunning ? 'Pause' : 'Start'} onPress={handleStartStop} />
            <Button title="Reset" onPress={handleReset} />

            <Text>{countDown}</Text>
            <Button title="Countdown" onPress={handleCountDownTrigger} />
        </SaveViewWithColorStatusBar>
    );
}