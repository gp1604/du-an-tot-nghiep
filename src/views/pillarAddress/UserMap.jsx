import React, {useEffect, useState} from 'react'
import {withGoogleMap, withScriptjs, GoogleMap, Marker} from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'

const Map = ({data,productData,selected,item}) => {
  const options = { closeBoxURL: '', enableEventPropagation: true };
  const [itemSelected, setItemSelected] = useState({});

  useEffect(() => {
    setItemSelected(item);
  }, [item]);
  return (
      <div>
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 12.68107, lng: 108.0354658 }}
            center={{ lat: item.lat, lng: item.lng }}
            zoom={14}
        >
          {data.map((column) => (
              <Marker
                  icon={{
                    url: selected? column.number === selected.num1 || column.number === selected.num2? 'https://cdn-icons-png.flaticon.com/512/1476/1476753.png': 'https://cdn-icons-png.flaticon.com/512/4716/4716198.png': 'https://cdn-icons-png.flaticon.com/512/4716/4716198.png',
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                  position={{lat: column.lat, lng: column.lng}}
              >
                <InfoBox
                    options={options}
                >
                  <>
                    <div style={{ backgroundColor: 'green', color: 'white', borderRadius:'1em', padding: '0.2em' }}>
                      {column.name === ''? 'No name' : column.name}
                    </div>
                  </>
                </InfoBox>

              </Marker>

          ))}

          {productData.map((column) => (
              <Marker
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