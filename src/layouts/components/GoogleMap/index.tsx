import { GoogleMap as TypeGoogleMap } from '@react-google-maps/api';
import Map from '../Map';

interface GoogleMapProps {
    setLength: any;
    isGoogleMapLoaded: boolean;
    setCurrentPosition: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | undefined>>;
    currentPosition: google.maps.LatLngLiteral | undefined;
    mapRef: React.MutableRefObject<TypeGoogleMap | undefined>;
}

function GoogleMap(props: GoogleMapProps) {
    if (!props.isGoogleMapLoaded) return <div>Loading...</div>;
    return (
        <Map
            setLatLngLength={(position: google.maps.LatLngLiteral, length: number) => {
                props.setCurrentPosition(position);
                props.setLength(length);
            }}
            currentPosition={props.currentPosition}
            setCurrentPosition={props.setCurrentPosition}
            mapRef={props.mapRef}
        />
    );
}

export default GoogleMap;
