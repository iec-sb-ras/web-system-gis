import React, { useRef, useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import HeatmapLayer from 'ol/layer/Heatmap';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Fill, Stroke, Text } from 'ol/style';
import data from '../data';
import 'ol/ol.css';
import SelectWidget from './SelectWidget';
import OSM from "ol/source/OSM";


const MapComponent = () => {
  const mapRef = useRef();
  const [selectedLayer, setSelectedLayer] = useState('uchastok');
  const textShift = 20;
  const circleRadius = 10;
  const localPalette = ['#001219', '#005F73', '#0A9396', '#94D2BD',
    '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03',
    '#AE2012', '#9B2226'];

  const paletteFunc = (cls) => {
    cls += 3;
    if (localPalette.length < cls) {
      cls = cls % localPalette.length;
    };
    return localPalette[cls];
  };

  useEffect(() => {
    const features = data.map(item => {
      let eitem = { ...item };
      delete eitem["lat"];
      delete eitem["long"];
      delete eitem["sample"];

      const feat = new Feature({
        geometry: new Point(fromLonLat([item.long, item.lat])),
        name: item.sample,
        id: item.id
      });
      feat.data = eitem;
      // console.log(feat.data);
      return feat;
    });

    // const blur = document.getElementById('blur');
    // const radius = document.getElementById('radius'); 
    
    const vectorSource = new VectorSource({
      features: features
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        return new Style({
          image: new Circle({
            radius: circleRadius,
            fill: new Fill({ color: paletteFunc(feature.data.t) }),
            stroke: new Stroke({ color: paletteFunc(feature.data.t + 4), width: 2 }),
            displacement: [-circleRadius, -circleRadius]
          }),
          text: new Text({
            font: '24px Calibri,sans-serif',
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({
              color: '#fff',
              width: 2,
            }),
            // offsetX: 20,
            // offsetY: -10,
            offsetX: textShift,
            offsetY: -textShift,
            text: feature.get('name')
          })
        });
      },
      visible: selectedLayer === 'uchastok'
    });

    const heatMapLayer = new HeatmapLayer({
      source: new VectorSource({
        features:features
      }),
      blur: 30, // parseInt(blur.value, 10),
      radius: 30, // parseInt(radius.value, 10),
      weight: function (feature) {
        // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
        // standards-violating <magnitude> tag in each Placemark.  We extract it from
        // the Placemark's name instead.
        const name = feature.get('name');
        const magnitude = feature.data.value;
        return magnitude - 5;
      },
      visible: selectedLayer === 'uchastok'
    });

    const topoMapLayer = new TileLayer({
      title: 'OpenTopoMap',
      type: 'base',
      visible: true,
      source: new XYZ({
        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
      })
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        topoMapLayer,
        vectorLayer,
        heatMapLayer
      ],
      view: new View({
        center: fromLonLat([105.31, 56.48]),
        zoom: 12
      })
    });

/*     blur.addEventListener('input', function () {
      heatMapLayer.setBlur(parseInt(blur.value, 10));
    });
    
    radius.addEventListener('input', function () {
      heatMapLayer.setRadius(parseInt(radius.value, 10));
    });
 */
    return () => {
      map.dispose();
      // map.setTarget(null);
    }
  }, [selectedLayer]);

  const handleLayerChange = (value) => {
    setSelectedLayer(value);
  };

  const layerOptions = [
    { label: 'Points', value: 'uchastok' },
    { label: 'TopoMap', value: 'topomap' }
  ];

  return (
    <div>
      <SelectWidget options={layerOptions} onChange={handleLayerChange} />
      <div id="map" style={{ width: '800px', height: '600px' }} ref={mapRef}></div>
{/*       
      <form>
        <label for="radius">radius size</label>
        <input id="radius" type="range" min="1" max="50" step="1" value="5" />
        <label for="blur">blur size</label>
        <input id="blur" type="range" min="1" max="50" step="1" value="15" />
      </form>
      
 */}    </div>
  );
};

export default MapComponent;
