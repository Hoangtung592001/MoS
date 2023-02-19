import { useLoadScript } from '@react-google-maps/api';
import Map from '../Map';
function GoogleMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBNK_XlyBPvM1UhqKTq04d8AHx5qWOOdso',
        libraries: ['places'],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

export default GoogleMap;
