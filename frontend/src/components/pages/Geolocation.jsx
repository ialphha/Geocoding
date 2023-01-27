import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function Geolocation({ contacts, itemNumber }) {
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);
	//store a list of address from the contacts list from the Dashboard component
	const [positions, setPositions] = useState([]);

	useEffect(() => {
		loadpositions();
	}, [contacts, itemNumber]);

	useEffect(() => {
		if (positions.length > 0) {
			setLat(positions[itemNumber].latitude);
			setLng(positions[itemNumber].longitude);
			console.log(itemNumber);
		}
	}, [positions, itemNumber, lat, lng]);

	const loadpositions = async () => {
		const promises = contacts.map(async (element) => {
			const latlong = await axios.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${
					element.street.split(" ").join("%20") +
					"%2C" +
					element.city +
					"%2C" +
					element.state +
					"%2C" +
					element.zip
				}.json?access_token=pk.eyJ1IjoiaXByYWRoYW4iLCJhIjoiY2tpMXkxN2s3MDU5ODJybzVsMzYxN3o2ciJ9.SPwmcyoXwNfWcuYxn8qiIg`
			);
			const [longitude, latitude] = latlong.data.features[0].center;
			return { latitude, longitude };
		});
		const positionCollections = await Promise.all(promises);
		setPositions(positionCollections);
	};

	//onclick=> pass the lat long of the component from contact list: to the lat, lng state

	return (
		<>
			{lat && (
				<div id="map">
					<MapContainer
						center={[lat, lng]}
						zoom={13}
						style={{ width: "90vw", height: "45vh" }}
					>
						<TileLayer
							attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
							url="https://api.mapbox.com/styles/v1/ipradhan/cl62tiflk001d14qlk39weosa/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaXByYWRoYW4iLCJhIjoiY2w2M294ZHB5MGVndTNibmo1d3F5N2tsbCJ9.k-qPymS8iPphz74Uwzl2eg"
						/>
						{positions.map((marker) => (
							<Marker
								key={marker.latitude}
								position={[marker.latitude, marker.longitude]}
							>
								<Popup></Popup>
							</Marker>
						))}
					</MapContainer>
				</div>
			)}
		</>
	);
}

export default Geolocation;
