import { useEffect, useState } from "react"
import mapData from "./Assignment_38_slMap.json"

export default function Assignment38() {

    const [city, setCity] = useState("");
    const [coordinates, setCoordinates] = useState({
        long: 0,
        latt: 0
    });


    const getDistance = (lat1, lon1, lat2, lon2) => {
        const deltaLat = lat2 - lat1;
        const deltaLon = lon2 - lon1;
        return Math.sqrt(deltaLat * deltaLat + deltaLon * deltaLon);
    };

    useEffect(() => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const flattenMapData = (data) => {
            const cities = [];
            Object.entries(data).forEach(([districtName, citiesObj]) => {
                Object.entries(citiesObj).forEach(([cityName, entry]) => {
                    cities.push({
                        city: cityName,
                        district: districtName,
                        latitude: parseFloat(entry.latitude),
                        longitude: parseFloat(entry.longitude)
                    });
                });
            });
            return cities;
        };

        const success = (position) => {
            const crds = position.coords;
            setCoordinates({
                long: crds.longitude,
                latt: crds.latitude
            });

            const flatCities = flattenMapData(mapData);

            let nearestCity = "";
            let miniDistance = Infinity;

            flatCities.forEach((entry) => {
                const dist = getDistance(
                    crds.latitude,
                    crds.longitude,
                    entry.latitude,
                    entry.longitude
                );
                if (dist < miniDistance) {
                    miniDistance = dist;
                    nearestCity = entry.city;
                }
            });
            setCity(nearestCity)
        };

        const error = (err) => {
            console.error(`ERROR(${err.code}) : ${err.message}`);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);


    return (
        <div>
            <h2>Location mapping</h2>
            <div>Longitude: {coordinates.long}</div>
            <div>Lattitude: {coordinates.latt}</div>
            <div>Nearest City: {city}</div>
        </div>
    )
}