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
  const [layers, setLayers] = useState([
    { id: 'vector', label: 'Точки', visible: true },
    { id: 'heatmap', label: 'Тепловая карта', visible: true },
    { id: 'topomap', label: 'Топографическая карта', visible: true }
  ]);
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
            offsetX: textShift,
            offsetY: -textShift,
            text: feature.get('name')
          })
        });
      },
      visible: layers.find(layer => layer.id === 'vector').visible
    });

    // const heatMapLayer = new HeatmapLayer({
    //   source: new VectorSource({
    //     features:features
    //   }),
    //   blur: 30, // parseInt(blur.value, 10),
    //   radius: 30, // parseInt(radius.value, 10),
    //   weight: function (feature) {
    //     // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
    //     // standards-violating <magnitude> tag in each Placemark.  We extract it from
    //     // the Placemark's name instead.
    //     const name = feature.get('name');
    //     const magnitude = feature.data.value;
    //     return magnitude - 5;
    //   },
    //   visible: selectedLayer === 'uchastok'
    // });

    const heatMapLayer = new HeatmapLayer({
      source: vectorSource,
      blur: 30,
      radius: 30,
      weight: function (feature) {
        const magnitude = feature.data.value;
        return magnitude != null && !isNaN(magnitude) ? magnitude : 0;
      },
      visible: layers.find(layer => layer.id === 'heatmap').visible
    });

    const topoMapLayer = new TileLayer({
      title: 'OpenTopoMap',
      type: 'base',
      visible: layers.find(layer => layer.id === 'topomap').visible,
      source: new XYZ({
        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
      })
    });

    const map = new Map({
      target: mapRef.current,
      layers: layers.map(layer => {
        if (layer.id === 'vector') return vectorLayer;
        if (layer.id === 'heatmap') return heatMapLayer;
        if (layer.id === 'topomap') return topoMapLayer;
        return null;
      }).filter(layer => layer !== null).reverse(), // Добавляем слои в обратном порядке
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
    }
  }, [layers]);

  const handleLayerChange = (id, visible) => {
    setLayers(layers.map(layer =>
        layer.id === id ? { ...layer, visible } : layer
    ));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const newLayers = [...layers];
    const [movedLayer] = newLayers.splice(sourceIndex, 1);
    newLayers.splice(targetIndex, 0, movedLayer);
    setLayers(newLayers);
  };

  return (
      <div>
        <div>
          {layers.map((layer, index) => (
              <div
                  key={layer.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnter={handleDragOver}
                  style={{ padding: '10px', border: '1px solid #ccc', margin: '5px 0', cursor: 'move' }}
              >
                <label>
                  <input
                      type="checkbox"
                      checked={layer.visible}
                      onChange={(e) => handleLayerChange(layer.id, e.target.checked)}
                  />
                  {layer.label}
                </label>
              </div>
          ))}
        </div>
        <div id="map" style={{ width: '800px', height: '600px' }} ref={mapRef}></div>
      </div>
  );
};

export default MapComponent;
