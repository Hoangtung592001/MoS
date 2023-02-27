import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer } from '@react-google-maps/api';
import { GoogleMap as TypeGoogleMap } from '@react-google-maps/api';
import Places from './places';
import Distance from './distance';
import './Map.scss';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

type PlacesProps = {
    setLatLngLength: (position: google.maps.LatLngLiteral, length: number) => void;
    setCurrentPosition: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | undefined>>;
    currentPosition: google.maps.LatLngLiteral | undefined;
    mapRef: React.MutableRefObject<TypeGoogleMap | undefined>;
};

export default function Map({ setLatLngLength, currentPosition, setCurrentPosition, mapRef }: PlacesProps) {
    const center = useMemo<LatLngLiteral>(() => ({ lat: 21.06351, lng: 106.08988 }), []);
    const [directions, setDirections] = useState<DirectionsResult>();

    currentPosition &&
        directions &&
        directions.routes[0].legs[0].distance?.value &&
        setLatLngLength(currentPosition, directions.routes[0].legs[0].distance?.value);

    const options = useMemo<MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: false,
            // mapId: '3780d017bd19fd59',
        }),
        [],
    );

    const onLoad = useCallback((map: any) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        if (!currentPosition) return;

        const service = new google.maps.DirectionsService();
        service.route(
            {
                origin: center,
                destination: currentPosition,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === 'OK' && result) {
                    setDirections(result);
                }
            },
        );
    }, [currentPosition]);

    const onMapClick = useCallback((mapsMouseEvent: any) => {
        setCurrentPosition({
            lat: mapsMouseEvent.latLng.lat(),
            lng: mapsMouseEvent.latLng.lng(),
        });
    }, []);

    return (
        <div className="map">
            {/* <div className="map-controls">
                <h1 className="map-controls__title">Search your address</h1>
                <Places
                    setOffice={(position) => {
                        setCurrentPosition(position);
                        mapRef.current?.panTo(position);
                    }}
                />
                {directions && <Distance leg={directions.routes[0].legs[0]} />}
            </div> */}
            <div className="map-body">
                <GoogleMap
                    zoom={20}
                    center={center}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}
                    onClick={onMapClick}
                >
                    {currentPosition && (
                        <>
                            <Marker
                                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                                position={currentPosition}
                            />
                            {/* <Circle center={currentPosition} radius={15000} options={closeOptions} />
                            <Circle center={currentPosition} radius={30000} options={middleOptions} />
                            <Circle center={currentPosition} radius={45000} options={farOptions} /> */}
                        </>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
}

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
};
const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: '#8BC34A',
    fillColor: '#8BC34A',
};
const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: '#FBC02D',
    fillColor: '#FBC02D',
};
const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: '#FF5252',
    fillColor: '#FF5252',
};

const generateHouses = (position: LatLngLiteral) => {
    const _houses: Array<LatLngLiteral> = [];
    for (let i = 0; i < 100; i++) {
        const direction = Math.random() < 0.5 ? -2 : 2;
        _houses.push({
            lat: position.lat + Math.random() / direction,
            lng: position.lng + Math.random() / direction,
        });
    }
    return _houses;
};
