import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
  const [time, setTime] = useState(0)
  const [textBtn, setTextBtn] = useState("INICIAR")
  const [lastTime, setLastTime] = useState(null)

  let timer = null;

  const startStop = useCallback(() => {

    if (timer != null) {
      setTextBtn('INICIAR')
      clearInterval(timer)
      timer = null
      return
    }

    timer = setInterval(() => {
      setTextBtn('PARAR')
      setTime((prevState) => prevState + 0.1)
    }, 100)

  }, [])


  const clean = () => {
    setLastTime(time)
    setTextBtn('INICIAR')
    clearInterval(timer)
    timer = null
    setTime(0)
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("./src/assets/cronometro.png")}
        style={styles.igmTimer}
      />
      <Text style={styles.time}>{time?.toFixed(1)}</Text>

      <View style={styles.btnArea}>

        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.btn}
          onPress={startStop}
        >
          <Text style={styles.btnText}>{textBtn}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.btn}
          onPress={clean}
        >
          <Text style={styles.btnText}>LIMPAR</Text>
        </TouchableOpacity>

      </View>

      {lastTime === null ? (
        <View style={styles.lastArea} />
      ) : <View style={styles.lastArea}>
        <Text style={styles.lastText}>Último tempo: {lastTime?.toFixed(2)}s</Text>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005EBF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    marginTop: -160,
    color: '#FFF',
    fontSize: 65,
    fontWeight: 'bold'
  },
  igmTimer: {},
  btnArea: {
    flexDirection: 'row',
    marginTop: 120,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 12
  },
  btnText: {
    color: '#005EBF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  lastArea: {
    marginTop: 55,
    minHeight: 45
  },
  lastText: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#FFF'
  },
});
