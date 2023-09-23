import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionic from 'react-native-vector-icons/Ionicons'
import uuid from 'react-native-uuid'

export class StorageExample extends Component {
    state = {
        'id': '',
        'name': '',
        'age': null,
    }
    // componentDidMount = () => {
    //     //AsyncStorage.multiGet(AsyncStorage.getAllKeys()).then((values) => { console.log(value)})
    //     // AsyncStorage.clear();
    // }
    // componentDidMount = () => AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }))

    // componentDidMount = () => console.log("Loading...\n"+JSON.parse(AsyncStorage.getItem('23')).id)
    componentDidMount = async () => {
        try {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                        // get at each store's key/value so you can work with it
                        let key = store[i][0];
                        let value = store[i][1];
                        console.log("Key-" + key)
                        console.log("Value-" + value)
                    });
                });
            });
        } catch (error) {
            // Error retrieving data
            console.log("Error reading storage," + error)
        }
    }
    saveObj = async () => {
        if (this.state.name !== '' && this.state.age > 1) {
            const obj = new Object();
            obj.id = (uuid.v4().slice(-9));
            obj.age = this.state.age;
            obj.name = this.state.name;
            this.setState({ 'name': ''})
            this.setState({ 'age': ''})
            // console.log("Keys:"+AsyncStorage.getAllKeys()+"\n"+JSON.stringify(obj))
            await AsyncStorage.setItem(obj.id, JSON.stringify(obj), (err) => {
                if (err) {
                    console.log("an error");
                    throw err;
                }
                console.log("success");

            }).catch((err) => {
                console.log("error is: " + err);
            });

        } else {
            console.log("ERROR: Invalid name or age")
        }

    }
    setName = (value) => {
        this.setState({ 'name': value })
    }
    setAge = (value) => {
        // AsyncStorage.setItem('age',value)
        this.setState({ 'age': value })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>Storage Example</Text>
                <View style={styles.form}>
                    <View style={styles.row}>
                        <Ionic name="person" color="#222" size={30} />
                        <TextInput maxLength={20} style={styles.nameBox} onChangeText={this.setName} value={this.state.name} placeholder='Your name e.g John Doe' />
                    </View>
                    <View style={styles.row}>
                        <Ionic name="key" color="#222" size={30} />
                        <TextInput keyboardType='numeric' maxLength={20} style={styles.ageBox} onChangeText={this.setAge} value={this.state.age} placeholder='Your age e.g 22' />
                    </View>
                    <TouchableOpacity style={styles.save} onPress={this.saveObj}>
                        <Text style={styles.saveText}>Save</Text></TouchableOpacity>
                </View>
                <Text style={styles.h2}>Your name and age will show here below</Text>
                <Text style={styles.name}>Hi, {this.state.name} your age is {this.state.age}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    form: {
        padding: 20,
    },
    h1: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10,
    },
    h2: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
    },
    nameBox: {
        fontSize: 21,
        borderWidth: 0.5,
        borderRadius: 2,
        padding: 5,
        marginBottom: 10,
        marginLeft: 10,
        width: 300,
    },
    ageBox: {
        fontSize: 21,
        borderWidth: 0.5,
        borderRadius: 2,
        padding: 5,
        marginBottom: 10,
        marginLeft: 10,
        width: 300,
    },
    save: {
        borderRadius: 3,
        padding: 5,
        backgroundColor: '#3d3d3d',
    },
    saveText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
});
