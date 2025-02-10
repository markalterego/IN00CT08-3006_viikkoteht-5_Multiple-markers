import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import Map from './screens/Map';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function App() {
    const [location, setLocation] = useState({ // käyttäjän sijaintitiedot alustettu oletusarvoilla
        latitude: 65.0800,
        longitude: 25.4800,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    useEffect(() => { // haetaan käyttäjän sijainti sovelluksen avautuessa
        (async() => {
            getUserPosition();
        })()
    }, []);

    const getUserPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync(); // pyydetään lupaa käyttäjältä sijainnin jakamiseen
        try {
            if (status !== 'granted') {
                console.log('Geolocation failed');
                return;
            }
            const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High}); 
            setLocation({...location,'latitude': position.coords.latitude,'longitude': position.coords.longitude}); // talletetaan sijaintitiedot location muuttujaan
        } catch (error) {
            console.log(error);
        }
    }

    return (        
        <SafeAreaView style={styles.container}>
            <Map location={location}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
    },
});
