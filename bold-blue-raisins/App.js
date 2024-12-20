import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';

const TimerApp = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleTimer = useCallback(() => {
    if (isRunning) {
      return setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return null;
  }, [isRunning]);

  useEffect(() => {
    const interval = handleTimer();
    return () => clearInterval(interval);
  }, [handleTimer]);

  const handleStartPause = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer</Text>
      <TimerDisplay time={time} />
      <TimerControls isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});

export default TimerApp;
