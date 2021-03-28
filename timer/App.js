
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Vibration, SafeAreaView } from 'react-native';
// import {vibrate} from './utils';


export default function App() {

  const [workTimerSeconds, setWorkTimerSeconds] = useState("00");
  const [workTimerMinutes, setWorkTimerMinutes] = useState("25");
  const [breakTimerSeconds, setBreakTimerSeconds] = useState("00");
  const [breakTimerMintues, setBreakTimerMinutes] = useState("25");

  const [workTimerSecondsHolder, setWorkTimerSecondsHolder] = useState(workTimerSeconds);
  const [workTimerMinutesHolder, setWorkTimerMinutesHolder] = useState(workTimerMinutes);
  const [breakTimerSecondsHolder, setBreakTimerSecondsHolder] = useState(breakTimerSeconds);
  const [breakTimerMintuesHolder, setBreakTimerMinutesHolder] = useState(breakTimerMintues);

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
    if(isWork && !stop){
      if(workTimerSeconds == "00" && workTimerMinutes == "00"){
        // setWorkTimerMinutes(workTimerMinutes)
        setIsWork(false);
        setBreakTimerMinutes(breakTimerMintuesHolder);
        setBreakTimerSeconds(breakTimerSecondsHolder);
        Vibration.vibrate([0, 500, 100, 200]);
        Vibration.cancel()
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
      if(breakTimerSeconds == "00" && breakTimerMintues == "00"){
        // setWorkTimerMinutes(workTimerMinutes)
        console.log("Here")
        setIsWork(true);
        setWorkTimerMinutes(workTimerMinutesHolder);
        setWorkTimerSeconds(workTimerSecondsHolder);
        Vibration.vibrate([0, 500, 100, 200]);
        Vibration.cancel()

      }else if(breakTimerSeconds == "00"){
        console.log("Here")
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.container}>
      
      <View style={styles.container}>
        <Text style={styles.timerType}>
          {isWork ? 
            "Work Timer"
            :
            "Break Timer"
          }
        </Text>
        <Text style={styles.timer}>
          {isWork ? 
            workTimerMinutes + ":" + workTimerSeconds
          :
            breakTimerMintues + ":" + breakTimerSeconds
          }
        </Text>
      <View style={{flexDirection: 'row', margin: 10}}>
      {!stop ? 
        <TouchableOpacity onPress={() => setStop(!stop)} style={[styles.button, styles.stop]}>
          <Text>Stop</Text>
        </TouchableOpacity>
      :
      <TouchableOpacity onPress={() => setStop(!stop)} style={[styles.button, styles.start]}>
        <Text>Start</Text>
      </TouchableOpacity>
    
      }
      
      <TouchableOpacity onPress={reset} style={styles.button}>
        <Text>
          Reset
        </Text>
      </TouchableOpacity>

      </View>
      <Text style={styles.label}>Worker Time</Text>

      <View style={styles.line}/>

      <View style={styles.input}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Minutes</Text>
        <TextInput style={styles.in} maxLength={2} onChangeText={text => setWorkMin(text)} value={workTimerMinutesHolder}/>
      </View>

      <View style={styles.input}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Seconds</Text>
        <TextInput style={styles.in}  maxLength={2} onChangeText={text => setWorkSec(text)} value={workTimerSecondsHolder}/>        
      </View>

      <Text style={styles.label}>Break Time</Text>

      <View style={styles.line}/>

      <View style={styles.input}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Minutes</Text>
        <TextInput keyboardType={'number-pad'} style={styles.in} maxLength={2} onChangeText={text => setBreakMin(text)} value={breakTimerMintuesHolder}/>
      </View>

      <View style={styles.input}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Seconds</Text>
        <TextInput style={styles.in}  maxLength={2} onChangeText={text => setBreakSec(text)} value={breakTimerSecondsHolder}/>
      </View>

      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  input: {
    width: '60%',
    // margin: 10
    // padding: 10
    // backgroundColor: 'green'

  },
  button: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100/2,
    borderWidth: 4,
    shadowColor: 'grey',
    shadowOpacity: 10,
    elevation: 5,
    shadowOffset : { width: 1, height: 4},
    margin: 10
  },
  in: {
    width: '100%',
    height: 50,
    borderColor: '#479FE7',
    borderWidth: 2,
    borderRadius: 17,
    padding: 15,
    // margin: 10,
    // backgroundColor: 'yellow',
  },
  row: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row'
  },
  timerType: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  timer: {
    fontSize: 40,
  },
  start: {
    borderColor: 'green',
  },
  stop: {
    borderColor: 'red',
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  line: {
    width: '60%',
    // width: 100,
    height: 2,
    margin: 5,
    backgroundColor: '#479FE7',
    borderRadius: 17,
  }
});
