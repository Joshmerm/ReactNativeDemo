
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Vibration } from 'react-native';
// import {vibrate} from './utils';


export default function App() {

  const [workTimerSeconds, setWorkTimerSeconds] = useState("03");
  const [workTimerMinutes, setWorkTimerMinutes] = useState("00");
  const [breakTimerSeconds, setBreakTimerSeconds] = useState("05");
  const [breakTimerMintues, setBreakTimerMinutes] = useState("00");

  const [workTimerSecondsHolder, setWorkTimerSecondsHolder] = useState("03");
  const [workTimerMinutesHolder, setWorkTimerMinutesHolder] = useState("00");
  const [breakTimerSecondsHolder, setBreakTimerSecondsHolder] = useState("05");
  const [breakTimerMintuesHolder, setBreakTimerMinutesHolder] = useState("00");

  const [isWork, setIsWork] = useState(true); 
  const [stop, setStop] = useState(false);


  const setWorkSec = (text) => {
    setWorkTimerSeconds(text);
    setWorkTimerSecondsHolder(text);
    setStop(true);
  }

  const setWorkMin = (text) => {
    setWorkTimerMinutes(text);
    setWorkTimerMinutesHolder(text);
    setStop(true);
  }

  const setBreakSec = (text) => {
    setBreakTimerSeconds(text);
    setBreakTimerSecondsHolder(text);
    setStop(true);
  }

  const setBreakMin = (text) => {
    setBreakTimerMinutes(text);
    setBreakTimerMinutesHolder(text);
    setStop(true);
  }

  const reset = () => {
    setBreakTimerMinutes(breakTimerMintuesHolder);
    setBreakTimerSeconds(breakTimerSecondsHolder);
    setWorkTimerMinutes(workTimerMinutesHolder);
    setWorkTimerSeconds(workTimerSecondsHolder);
  }




  useEffect(() => {
    const interval = setTimeout(() => {
      reduce();
    }, 1000);
    return () => clearTimeout(interval);
  });

  const reduce = () => {
    console.log(workTimerSeconds);
    if(isWork && !stop){
      if(workTimerSeconds == "00" && workTimerMinutes == "00"){
        // setWorkTimerMinutes(workTimerMinutes)
        setIsWork(false);
        setBreakTimerMinutes(breakTimerMintuesHolder);
        setBreakTimerSeconds(breakTimerSecondsHolder);
        Vibration.vibrate([0, 500, 100, 200]);
        // Vibration.cancel()
      }else if(workTimerSeconds == "00"){
        //go to break;
        let min = parseInt(workTimerMinutes) - 1;
        if(min < 10) min = "0" + min;
        setWorkTimerMinutes(min);
        setWorkTimerSeconds("59");
      }else{
        let seconds = parseInt(workTimerSeconds) - 1;
        if(seconds < 10) seconds = "0" + seconds;
        setWorkTimerSeconds(seconds);
      }
    }else if(!stop){
      if(breakTimerSeconds == "00" && breakTimerSeconds == "00"){
        // setWorkTimerMinutes(workTimerMinutes)
        setIsWork(true);
        setWorkTimerMinutes(workTimerMinutesHolder);
        setWorkTimerSeconds(workTimerSecondsHolder);
        Vibration.vibrate([0, 500, 100, 200]);
        // Vibration.cancel()

      }else if(breakTimerSeconds == "00"){
        //go to break;
        let min = parseInt(breakTimerMintues) - 1;
        if(min < 10) min = "0" + min;
        setBreakTimerMinutes(min);
        setBreakTimerSeconds("59");
      }else{
        let seconds = parseInt(breakTimerSeconds) - 1;
        if(seconds < 10) seconds = "0" + seconds;
        setBreakTimerSeconds(seconds);
      }

    }


  }





  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.container}>
      <View style={styles.container}>
      {isWork ? 
        <Text>
          Work Timer
        </Text>
      :
        <Text>
          Break Timer
        </Text>
      }
      {isWork ? 
        <Text>
        {workTimerMinutes + ":" + workTimerSeconds}
      </Text>
      :
      <Text>
      {breakTimerMintues + ":" + breakTimerSeconds}
    </Text>
      }
      <TouchableOpacity onPress={() => setStop(!stop)} style={styles.button}>
        {!stop ? <Text>Stop</Text> : <Text>Start</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={styles.button}>
        <Text>
          Reset
        </Text>
      </TouchableOpacity>
      <Text>Worker Time: </Text>
      <View style={styles.row}>
        <Text style={{alignSelf: 'center'}}>Mins: </Text>
        <TextInput style={styles.in} maxLength={2} onChangeText={text => setWorkMin(text)} value={workTimerMinutesHolder}/>
        <Text style={{alignSelf: 'center'}}>Secs: </Text>
        <TextInput style={styles.in}  maxLength={2} onChangeText={text => setWorkSec(text)} value={workTimerSecondsHolder}/>
      </View>
      <Text>Break Time: </Text>
      <View style={styles.row}>
        <Text style={{alignSelf: 'center'}}>Mins: </Text>
        <TextInput style={styles.in} maxLength={2} onChangeText={text => setBreakMin(text)} value={breakTimerMintuesHolder}/>
        <Text style={{alignSelf: 'center'}}>Secs: </Text>
        <TextInput style={styles.in}  maxLength={2} onChangeText={text => setBreakSec(text)} value={breakTimerSecondsHolder}/>
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  button: {
    backgroundColor: 'blue',
    width: 150,
    height: 50,
  },
  in: {
    width: '20%',
    height: 50,
    margin: 10,
    backgroundColor: 'yellow',
  },
  row: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row'
  }
});
