import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer } from '@react-google-maps/api';
import Places from './places';
import Distance from './distance';
import './Map.scss';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
export default function Map() {
    // const [office, setOffice] = useState<LatLngLiteral>();
    const mapRef = useRef<GoogleMap>();
    const center = useMemo<LatLngLiteral>(() => ({ lat: 21.06351, lng: 106.08988 }), []);
    const [directions, setDirections] = useState<DirectionsResult>();
    const [currentPosition, setCurrentPosition] = useState<LatLngLiteral>();
    const options = useMemo<MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: false,
            mapId: '3780d017bd19fd59',
        }),
        [],
    );
    const onLoad = useCallback((map: any) => {
        mapRef.current = map;
    }, []);

    // const houses = useMemo(() => currentPosition && generateHouses(currentPosition), [currentPosition]);
    // const fetchDirection = (house: LatLngLiteral) => {
    //     if (!currentPosition) return;

    //     const service = new google.maps.DirectionsService();
    //     service.route(
    //         {
    //             origin: center,
    //             destination: currentPosition,
    //             travelMode: google.maps.TravelMode.DRIVING,
    //         },
    //         (result, status) => {
    //             if (status === 'OK' && result) {
    //                 setDirections(result);
    //             }
    //         },
    //     );
    // };

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
            <div className="map-controls">
                <h1>Commute</h1>
                <Places
                    setOffice={(position) => {
                        setCurrentPosition(position);
                        mapRef.current?.panTo(position);
                    }}
                />
                {directions && <Distance leg={directions.routes[0].legs[0]} />}
            </div>
            <div className="map-body">
                <GoogleMap
                    zoom={10}
                    center={center}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}
                    // onClick={onMapClick}
                >
                    {/* {directions && (
                        <DirectionsRenderer
                            directions={directions}
                            options={{
                                polylineOptions: {
                                    zIndex: 50,
                                    strokeColor: '#1976D2',
                                    strokeWeight: 5,
                                },
                            }}
                        />
                    )} */}
                    {currentPosition && (
                        <>
                            <Marker
                                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                                position={currentPosition}
                            />
                            {/* <MarkerClusterer>
                                {(clusterer) => (
                                    <>
                                        {houses &&
                                            houses.map((house) => (
                                                <Marker
                                                    key={house.lat}
                                                    position={house}
                                                    clusterer={clusterer}
                                                    onClick={() => {
                                                        fetchDirection(house);
                                                    }}
                                                />
                                            ))}
                                    </>
                                )}
                            </MarkerClusterer> */}
                            <Circle center={currentPosition} radius={15000} options={closeOptions} />
                            <Circle center={currentPosition} radius={30000} options={middleOptions} />
                            <Circle center={currentPosition} radius={45000} options={farOptions} />
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
