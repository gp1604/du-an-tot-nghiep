import React, {useEffect, useState} from 'react'
import {withGoogleMap, withScriptjs, GoogleMap, Marker} from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'

const Map = ({setLatMap, setLngMap,data,setUpdatingStatus,setUpdatingItem,finish}) => {
  const [lat, setLat] = React.useState( 12.68107)
  const [lng, setLng] = React.useState(108.0354658)

  const [update, setUpdate] = React.useState(false)
  const [markerLat, setMarkerLat] = React.useState( 0)
  const [markerLng, setMarkerLng] = React.useState(0)
  const [markerZoom, setMarkerZoom] = React.useState(0)
  const onChangeMakers = (e) => {
    setMarkerLng(0)
    setMarkerLat(0)
    setLng(e.latLng.lng())
    setLat(e.latLng.lat())
    return (
      <Marker position={{lat: lat, lng: lng}} />
    )
  }
  useEffect(() => {
    if(finish){
      setUpdatingStatus(false)
    }

    if(update===false){
      setLatMap(lat)
      setLngMap(lng)
    }

  }, [lat, lng,finish])
  const options = { closeBoxURL: '', enableEventPropagation: true };

  function onZoomChanged() {
    setMarkerZoom(0)
  }

  function onDragEnd(ev,item) {
    setUpdatingStatus(true)
    setUpdatingItem({...item,lat:ev.latLng.lat(),lng:ev.latLng.lng()})
    console.log("ended")
  }


  useEffect(() => {

  })
  return (
      <div>
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 12.68107, lng: 108.0354658 }}
            {...(markerLat && {center: {lat: markerLat, lng: markerLng}})}

            zoom={markerZoom >0 ? markerZoom :14}
            onZoomChanged={onZoomChanged}
            onClick={onChangeMakers}
        >
          <Marker
              position={{lat: lat, lng: lng}}

          >
            <InfoBox
                options={options}
            >
              <>
                <div style={{ backgroundColor: 'green', color: 'white', borderRadius:'1em', padding: '0.2em' }}>
                 new
                </div>
              </>
            </InfoBox>

          </Marker>
          {data.map((column) => (
              <Marker
                  draggable={true}

                  onDragEnd={ev => {
                    onDragEnd(ev, column)
                  }}
                  onClick={() => {
                    setMarkerLng(column.lng)
                    setMarkerLat(column.lat)
                    setMarkerZoom(15)
                  }
                  }
                  icon={{
                    url: 'https://cdn-icons-png.flaticon.com/512/4035/4035628.png',
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                  position={{lat: column.lat, lng: column.lng}}
              >
                <InfoBox
                    options={options}
                >
                  <>
                    <div style={{ backgroundColor: 'green', color: 'white', borderRadius:'1em', padding: '0.2em' }}>
                      {column.name ==='' ? 'No name' : column.name}
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