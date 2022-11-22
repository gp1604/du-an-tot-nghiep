import React, { useEffect, useState } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'

const Map = ({ setLatMap, setLngMap, data, productData, updatingProduct, updatingZoom, selected, setProduct }) => {
  const [lat, setLat] = React.useState(updatingProduct ? updatingProduct.lat : 12.68107)
  const [lng, setLng] = React.useState(updatingProduct ? updatingProduct.lng : 108.0354658)

  const [markerLat, setMarkerLat] = React.useState(0)
  const [markerLng, setMarkerLng] = React.useState(0)
  const [markerZoom, setMarkerZoom] = React.useState(0)
  const onChangeMakers = (e) => {
    setMarkerLng(0)
    setMarkerLat(0)
    setLng(e.latLng.lng())
    setLat(e.latLng.lat())
    return (
      <Marker position={{ lat: lat, lng: lng }} />
    )
  }
  useEffect(() => {
    setLatMap(lat)
    setLngMap(lng)
  }, [lat, lng])
  const options = { closeBoxURL: '', enableEventPropagation: true };

  function onZoomChanged() {
    setMarkerZoom(0)
  }
  return (
    <div>
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 12.68107, lng: 108.0354658 }}
        {...(markerLat && { center: { lat: markerLat, lng: markerLng } })}
        zoom={updatingZoom ? updatingZoom : markerZoom > 0 ? markerZoom : 14}
        onZoomChanged={onZoomChanged}
        onClick={ev => {
          onChangeMakers(ev)
        }}

      >
        <Marker
          icon={{
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          position={{ lat: lat, lng: lng }}
          draggable={true}
          onDragEnd={ev => {
            onChangeMakers(ev)
          }}
        >
          <InfoBox
            options={options}
          >
            <>
              <div style={{ backgroundColor: 'blueviolet', color: 'white', borderRadius: '1em', padding: '0.2em' }}>
                new
              </div>
            </>
          </InfoBox>
        </Marker>
        {data.map((column) => (
          <Marker
            onClick={() => {
              setMarkerLng(column.lng)
              setMarkerLat(column.lat)
              setMarkerZoom(15)
            }
            }
            icon={{
              url: selected ? column.number === selected.num1 || column.number === selected.num2 ? 'https://cdn-icons-png.flaticon.com/512/1476/1476753.png' : 'https://cdn-icons-png.flaticon.com/512/4716/4716198.png' : 'https://cdn-icons-png.flaticon.com/512/4716/4716198.png',
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            position={{ lat: column.lat, lng: column.lng }}
          >
            <InfoBox
              options={options}
            >
              <>
                <div style={{ backgroundColor: 'green', color: 'white', borderRadius: '1em', padding: '0.2em' }}>
                  {column.name === '' ? 'No name' : column.name}
                </div>
              </>
            </InfoBox>

          </Marker>

        ))}

        {productData.map((column) => (
          <Marker
            onClick={() => {

              setMarkerLng(column.lng)
              setMarkerLat(column.lat)
              setMarkerZoom(15)
              setProduct(column)
            }
            }
            icon={{
              url: 'https://cdn-icons-png.flaticon.com/512/4035/4035628.png',
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            position={{ lat: column.lat, lng: column.lng }}
          >
            <InfoBox
              options={options}
            >
              <>
                <div style={{ backgroundColor: 'green', color: 'white', borderRadius: '1em', padding: '0.2em' }}>
                  {column.name === '' ? 'No name' : column.name}
                </div>
              </>
            </InfoBox>

          </Marker>

        ))}

      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));