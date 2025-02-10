import { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map (props) {
    const [markers, setMarkers] = useState([]);

    const addMarker = (e) => {
        const coords = e.nativeEvent.coordinate; // talletetaan painettu koordinaatti
        setMarkers([...markers, coords]); // lisätään koordinaatti markers tauluun
    }

    return (
        <MapView
            key={markers.length} // kartta päivittyy kun lisätään uusi markkeri
            style={styles.map}
            region={props.location}
            onLongPress={addMarker} 
        >
            {markers.map((marker, index) => ( // ajetaan kaikki markkerit kartalle
                <Marker
                    key={index}
                    coordinate={marker}
                />
            ))}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
});