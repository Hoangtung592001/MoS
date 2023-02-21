import { useLoadScript } from '@react-google-maps/api';
import Map from '../Map';

interface GoogleMapProps {
    setLongitude: any;
    setLatitude: any;
    setLength: any;
}

function GoogleMap(props: GoogleMapProps) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBNK_XlyBPvM1UhqKTq04d8AHx5qWOOdso',
        libraries: ['places'],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <Map
            setLatLngLength={(position: google.maps.LatLngLiteral, length: number) => {
                props.setLatitude(position.lat);
                props.setLongitude(position.lng);
                props.setLength(length);
            }}
        />
    );
}

export default GoogleMap;
