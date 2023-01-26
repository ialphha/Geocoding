import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useEffect, useState } from "react";

function Geolocation({ contacts }) {
	const [lng, setLng] = useState(0);
	const [lat, setLat] = useState(0);
	const [zoom, setZoom] = useState(12);
	const [map, setMap] = useState(null);

	//store a list of address from the contacts list from the Dashboard component
	const addresses = [];
	contacts.forEach((element) => {
		addresses.push(
			element.street.split(" ").join("%20") +
				"%2C" +
				element.city +
				"%2C" +
				element.state +
				"%2C" +
				element.zip
		);
	});

	addresses.forEach((address) => {
		axios
			.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaXByYWRoYW4iLCJhIjoiY2tpMXkxN2s3MDU5ODJybzVsMzYxN3o2ciJ9.SPwmcyoXwNfWcuYxn8qiIg`
			)
			.then((response) => {
				const [lng, lat] = response.data.features[0].center;
				console.log(" long , lat=>", lng, lat);
			});
	});
	//console.log(addresses);

	return <></>;
}

export default Geolocation;
