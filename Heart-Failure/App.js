import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import api from './app/api/compute';

import Constants from 'expo-constants';

export default function App() {

  const [output, setOutput] = useState('');

  const [fields, setFields] = useState({
    age: '',
    cre: '',
    dia: '',
    eje: '',
    bp: '',
    plt: '',
    ser: '',
    secre: '',
    seso: '',
    sex: '',
    smok: '',
    time: '',
  });

  const handleSubmit = async () => {
    console.log('submitted');
    const { data } = await api.computeData(fields);
    setOutput(data);
  }

  const handleChange = (text, name) => {
    const copyObject = {...fields};
    copyObject[name] = text;
    setFields(copyObject); 
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Age"
        onChangeText={text => handleChange(text, 'age')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Creatine"
        onChangeText={text => handleChange(text, 'cre')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Diabetes"
        onChangeText={text => handleChange(text, 'dia')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Ejection"
        onChangeText={text => handleChange(text, 'eje')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Blood Pressure"
        onChangeText={text => handleChange(text, 'bp')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Platelets"
        onChangeText={text => handleChange(text, 'plt')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Serum"
        onChangeText={text => handleChange(text, 'ser')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Serum Creatine"
        onChangeText={text => handleChange(text, 'secre')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Serum Sodium"
        onChangeText={text => handleChange(text, 'seso')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Sex"
        onChangeText={text => handleChange(text, 'sex')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Smoking"
        onChangeText={text => handleChange(text, 'smok')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Time"
        onChangeText={text => handleChange(text, 'time')}
        style={styles.input}
        keyboardType='number-pad'
      />
      <TextInput
        label="Output"
        value={output}
        style={styles.input}
        keyboardType='number-pad'
        editable={false}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Press me
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  container: {
    paddingVertical: Constants.statusBarHeight,
  },
  input: {
    height: 50,
    margin: 10,
  },
});