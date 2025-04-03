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
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Fill, Stroke, Text } from 'ol/style';
import 'ol/ol.css';

const data = [{'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 407.0,
           'Co (мг/кг)': 8.0,
           'Cr (мг/кг)': 120.0,
           'Cu (мг/кг)': 64.0,
           'Hg (мг/кг)': 0.0153,
           'Ni (мг/кг)': 56.0,
           'Pb (мг/кг)': 8.94,
           'Sr (мг/кг)': 147.0,
           'V (мг/кг)': 96.0,
           'Zn (мг/кг)': 49.0},
  'lat': 53.2441166,
  'long': 104.3910035,
  'name': 'Дундай',
  'sample': '2411'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 557.0,
           'Co (мг/кг)': 10.0,
           'Cr (мг/кг)': 156.0,
           'Cu (мг/кг)': 70.0,
           'Hg (мг/кг)': 0.0278,
           'Ni (мг/кг)': 56.0,
           'Pb (мг/кг)': 5.44,
           'Sr (мг/кг)': 119.0,
           'V (мг/кг)': 96.0,
           'Zn (мг/кг)': 57.0},
  'lat': 53.2440885,
  'long': 104.3909605,
  'name': 'Дундай',
  'sample': '2412'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 489.0,
           'Co (мг/кг)': 9.0,
           'Cr (мг/кг)': 139.0,
           'Cu (мг/кг)': 44.0,
           'Hg (мг/кг)': 0.0097,
           'Ni (мг/кг)': 60.0,
           'Pb (мг/кг)': 9.17,
           'Sr (мг/кг)': 148.0,
           'V (мг/кг)': 99.0,
           'Zn (мг/кг)': 51.0},
  'lat': 53.2440946,
  'long': 104.3909125,
  'name': 'Дундай',
  'sample': '2413'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 473.0,
           'Co (мг/кг)': 7.0,
           'Cr (мг/кг)': 141.0,
           'Cu (мг/кг)': 37.0,
           'Hg (мг/кг)': 0.0055,
           'Ni (мг/кг)': 58.0,
           'Pb (мг/кг)': 8.77,
           'Sr (мг/кг)': 183.0,
           'V (мг/кг)': 88.0,
           'Zn (мг/кг)': 46.0},
  'lat': 53.2440957,
  'long': 104.3908723,
  'name': 'Дундай',
  'sample': '2414'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 680.0,
           'Co (мг/кг)': 11.0,
           'Cr (мг/кг)': 133.0,
           'Cu (мг/кг)': 40.0,
           'Hg (мг/кг)': 0.0049,
           'Ni (мг/кг)': 55.0,
           'Pb (мг/кг)': 8.47,
           'Sr (мг/кг)': 182.0,
           'V (мг/кг)': 96.0,
           'Zn (мг/кг)': 46.0},
  'lat': 53.2440953,
  'long': 104.3908353,
  'name': 'Дундай',
  'sample': '2415'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 378.0,
           'Co (мг/кг)': 9.0,
           'Cr (мг/кг)': 124.0,
           'Cu (мг/кг)': 36.0,
           'Hg (мг/кг)': 0.0057,
           'Ni (мг/кг)': 63.0,
           'Pb (мг/кг)': 9.01,
           'Sr (мг/кг)': 179.0,
           'V (мг/кг)': 83.0,
           'Zn (мг/кг)': 50.0},
  'lat': 53.2440939,
  'long': 104.3908054,
  'name': 'Дундай',
  'sample': '2416'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 400.0,
           'Co (мг/кг)': 9.0,
           'Cr (мг/кг)': 130.0,
           'Cu (мг/кг)': 38.0,
           'Hg (мг/кг)': 0.0116,
           'Ni (мг/кг)': 58.0,
           'Pb (мг/кг)': 8.33,
           'Sr (мг/кг)': 159.0,
           'V (мг/кг)': 79.0,
           'Zn (мг/кг)': 49.0},
  'lat': 53.2440937,
  'long': 104.3907842,
  'name': 'Дундай',
  'sample': '2417'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 411.0,
           'Co (мг/кг)': 15.0,
           'Cr (мг/кг)': 151.0,
           'Cu (мг/кг)': 34.0,
           'Hg (мг/кг)': 0.0053,
           'Ni (мг/кг)': 88.0,
           'Pb (мг/кг)': 10.33,
           'Sr (мг/кг)': 187.0,
           'V (мг/кг)': 108.0,
           'Zn (мг/кг)': 64.0},
  'lat': 53.2440857,
  'long': 104.3907534,
  'name': 'Дундай',
  'sample': '2418'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 361.0,
           'Co (мг/кг)': 7.0,
           'Cr (мг/кг)': 139.0,
           'Cu (мг/кг)': 32.0,
           'Hg (мг/кг)': 0.0157,
           'Ni (мг/кг)': 44.0,
           'Pb (мг/кг)': 7.19,
           'Sr (мг/кг)': 191.0,
           'V (мг/кг)': 58.0,
           'Zn (мг/кг)': 34.0},
  'lat': 53.2440946,
  'long': 104.3909125,
  'name': 'Дундай',
  'sample': '2420'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 150.0,
           'Co (мг/кг)': 4.0,
           'Cr (мг/кг)': 112.0,
           'Cu (мг/кг)': 32.0,
           'Hg (мг/кг)': 0.0117,
           'Ni (мг/кг)': 30.0,
           'Pb (мг/кг)': 5.0,
           'Sr (мг/кг)': 188.0,
           'V (мг/кг)': 37.0,
           'Zn (мг/кг)': 24.0},
  'lat': 53.2440914,
  'long': 104.3908198,
  'name': 'Дундай',
  'sample': '2421'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 157.0,
           'Co (мг/кг)': 9.0,
           'Cr (мг/кг)': 132.0,
           'Cu (мг/кг)': 42.0,
           'Hg (мг/кг)': 0.0077,
           'Ni (мг/кг)': 36.0,
           'Pb (мг/кг)': 5.4,
           'Sr (мг/кг)': 204.0,
           'V (мг/кг)': 62.0,
           'Zn (мг/кг)': 32.0},
  'lat': 53.24409061,
  'long': 104.3908097,
  'name': 'Дундай',
  'sample': '2422'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 201.0,
           'Co (мг/кг)': 8.0,
           'Cr (мг/кг)': 118.0,
           'Cu (мг/кг)': 35.0,
           'Hg (мг/кг)': 0.0082,
           'Ni (мг/кг)': 45.0,
           'Pb (мг/кг)': 7.62,
           'Sr (мг/кг)': 177.0,
           'V (мг/кг)': 56.0,
           'Zn (мг/кг)': 36.0},
  'lat': 53.2440957,
  'long': 104.3908723,
  'name': 'Дундай',
  'sample': '2423'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 208.0,
           'Co (мг/кг)': 9.0,
           'Cr (мг/кг)': 138.0,
           'Cu (мг/кг)': 35.0,
           'Hg (мг/кг)': 0.0099,
           'Ni (мг/кг)': 56.0,
           'Pb (мг/кг)': 7.66,
           'Sr (мг/кг)': 190.0,
           'V (мг/кг)': 63.0,
           'Zn (мг/кг)': 45.0},
  'lat': 53.24408903,
  'long': 104.3907896,
  'name': 'Дундай',
  'sample': '2424'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 1661.0,
           'Co (мг/кг)': 5.0,
           'Cr (мг/кг)': 33.0,
           'Cu (мг/кг)': 26.0,
           'Hg (мг/кг)': 0.0075,
           'Ni (мг/кг)': 13.0,
           'Pb (мг/кг)': 2.77,
           'Sr (мг/кг)': 217.0,
           'V (мг/кг)': 30.0,
           'Zn (мг/кг)': 11.0},
  'lat': 53.3169155,
  'long': 104.0739466,
  'name': 'Грязнушка',
  'sample': '2425'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 1146.0,
           'Co (мг/кг)': 5.0,
           'Cr (мг/кг)': 21.0,
           'Cu (мг/кг)': 22.0,
           'Hg (мг/кг)': 0.0072,
           'Ni (мг/кг)': 10.0,
           'Pb (мг/кг)': 3.51,
           'Sr (мг/кг)': 163.0,
           'V (мг/кг)': 35.0,
           'Zn (мг/кг)': 6.0},
  'lat': 53.3169155,
  'long': 104.0739466,
  'name': 'Грязнушка',
  'sample': '2426'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 497.0,
           'Co (мг/кг)': 20.0,
           'Cr (мг/кг)': 44.0,
           'Cu (мг/кг)': 21.0,
           'Hg (мг/кг)': 0.2699,
           'Ni (мг/кг)': 33.0,
           'Pb (мг/кг)': 14.31,
           'Sr (мг/кг)': 163.0,
           'V (мг/кг)': 78.0,
           'Zn (мг/кг)': 69.0},
  'lat': 52.80723,
  'long': 105.1409911,
  'name': 'Муринский',
  'sample': '2427'},
 {'data': {'As (мг/кг)': 26.6,
           'Ba (мг/кг)': 582.0,
           'Co (мг/кг)': 28.0,
           'Cr (мг/кг)': 132.0,
           'Cu (мг/кг)': 49.0,
           'Hg (мг/кг)': 0.0456,
           'Ni (мг/кг)': 82.0,
           'Pb (мг/кг)': 9.2,
           'Sr (мг/кг)': 133.0,
           'V (мг/кг)': 163.0,
           'Zn (мг/кг)': 122.0},
  'lat': 52.8072909,
  'long': 105.1408478,
  'name': 'Муринский',
  'sample': '2428'},
 {'data': {'As (мг/кг)': 14.8,
           'Ba (мг/кг)': 584.0,
           'Co (мг/кг)': 17.0,
           'Cr (мг/кг)': 125.0,
           'Cu (мг/кг)': 42.0,
           'Hg (мг/кг)': 0.0056,
           'Ni (мг/кг)': 66.0,
           'Pb (мг/кг)': 22.23,
           'Sr (мг/кг)': 117.0,
           'V (мг/кг)': 228.0,
           'Zn (мг/кг)': 121.0},
  'lat': 52.8071738,
  'long': 105.1411168,
  'name': 'Муринский',
  'sample': '2429'},
 {'data': {'As (мг/кг)': 18.4,
           'Ba (мг/кг)': 579.0,
           'Co (мг/кг)': 22.0,
           'Cr (мг/кг)': 132.0,
           'Cu (мг/кг)': 41.0,
           'Hg (мг/кг)': 0.0054,
           'Ni (мг/кг)': 73.0,
           'Pb (мг/кг)': 23.74,
           'Sr (мг/кг)': 123.0,
           'V (мг/кг)': 128.0,
           'Zn (мг/кг)': 132.0},
  'lat': 52.80699578,
  'long': 105.1410057,
  'name': 'Муринский',
  'sample': '2430'},
 {'data': {'As (мг/кг)': 15.7,
           'Ba (мг/кг)': 579.0,
           'Co (мг/кг)': 24.0,
           'Cr (мг/кг)': 133.0,
           'Cu (мг/кг)': 45.0,
           'Hg (мг/кг)': 0.0065,
           'Ni (мг/кг)': 82.0,
           'Pb (мг/кг)': 22.66,
           'Sr (мг/кг)': 123.0,
           'V (мг/кг)': 137.0,
           'Zn (мг/кг)': 132.0},
  'lat': 52.8070837,
  'long': 105.1413254,
  'name': 'Муринский',
  'sample': '2431'},
 {'data': {'As (мг/кг)': 20.7,
           'Ba (мг/кг)': 593.0,
           'Co (мг/кг)': 25.0,
           'Cr (мг/кг)': 132.0,
           'Cu (мг/кг)': 45.0,
           'Hg (мг/кг)': 0.0037,
           'Ni (мг/кг)': 82.0,
           'Pb (мг/кг)': 25.37,
           'Sr (мг/кг)': 117.0,
           'V (мг/кг)': 128.0,
           'Zn (мг/кг)': 131.0},
  'lat': 52.8070242,
  'long': 105.1413904,
  'name': 'Муринский',
  'sample': '2432'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 407.0,
           'Co (мг/кг)': 20.0,
           'Cr (мг/кг)': 79.0,
           'Cu (мг/кг)': 41.0,
           'Hg (мг/кг)': 0.0026,
           'Ni (мг/кг)': 63.0,
           'Pb (мг/кг)': 15.67,
           'Sr (мг/кг)': 171.0,
           'V (мг/кг)': 131.0,
           'Zn (мг/кг)': 97.0},
  'lat': 52.8068854,
  'long': 105.1416429,
  'name': 'Муринский',
  'sample': '2433'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 461.0,
           'Co (мг/кг)': 10.0,
           'Cr (мг/кг)': 63.0,
           'Cu (мг/кг)': 35.0,
           'Hg (мг/кг)': 0.0113,
           'Ni (мг/кг)': 44.0,
           'Pb (мг/кг)': 11.48,
           'Sr (мг/кг)': 211.0,
           'V (мг/кг)': 74.0,
           'Zn (мг/кг)': 143.0},
  'lat': 52.8062495,
  'long': 105.1405552,
  'name': 'Муринский',
  'sample': '2434'},
 {'data': {'As (мг/кг)': 3.0,
           'Ba (мг/кг)': 736.0,
           'Co (мг/кг)': 10.0,
           'Cr (мг/кг)': 44.0,
           'Cu (мг/кг)': 18.0,
           'Hg (мг/кг)': 0.0188,
           'Ni (мг/кг)': 27.0,
           'Pb (мг/кг)': 17.98,
           'Sr (мг/кг)': 113.0,
           'V (мг/кг)': 39.0,
           'Zn (мг/кг)': 65.0},
  'lat': 52.8053496,
  'long': 105.1391621,
  'name': 'Муринский',
  'sample': '2435'}];

const SamplesData = () => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [layers, setLayers] = useState([
    { id: 'vector', label: 'Точки отбора проб', visible: true },
    { id: 'heatmap', label: 'Тепловая карта', visible: true },
    { id: 'topomap', label: 'Топографическая карта', visible: true }
  ]);
  const [selectedParameter, setSelectedParameter] = useState('Hg (мг/кг)');
  const [showLabels, setShowLabels] = useState(true);
  const textShift = 12;
  const circleRadius = 6;

  // Better color palette for geochemical data visualization
  const localPalette = [
    '#0d47a1', '#1976d2', '#42a5f5', '#90caf9',
    '#e3f2fd', '#fffde7', '#fff59d', '#ffee58',
    '#ffeb3b', '#f57f17'
  ];

  // Calculate actual max values from data for more accurate scaling
  const calculateMaxValues = () => {
    const result = {};
    const parameters = Object.keys(data[0].data);

    parameters.forEach(param => {
      let max = 0;
      data.forEach(item => {
        if (item.data[param] !== null && !isNaN(item.data[param])) {
          max = Math.max(max, item.data[param]);
        }
      });
      // Add 20% buffer to max value for better visualization
      result[param] = max * 1.2;
    });

    // Override with custom values for specific elements if needed
    result["Hg (мг/кг)"] = 0.3; // Adjusted for outlier value 0.2699

    return result;
  };

  const maxValues = calculateMaxValues();

  const getColor = (value, parameter) => {
    if (value === null || isNaN(value)) return '#ccc';

    const normalizedValue = Math.min(value / maxValues[parameter], 1);
    const index = Math.floor(normalizedValue * (localPalette.length - 1));
    return localPalette[index];
  };

  // Function to get normalized weight for heatmap
  const getNormalizedWeight = (value, parameter) => {
    if (value === null || isNaN(value)) return 0;
    return Math.min(value / maxValues[parameter], 1);
  };

  useEffect(() => {
    // Create point features
    const features = data.map(item => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([item.long, item.lat])),
        name: item.name,
        sample: item.sample.toString(),
        description: item.description,
        ...item.data
      });
      return feature;
    });

    const vectorSource = new VectorSource({
      features: features
    });

    // Point vector layer
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const value = feature.get(selectedParameter);
        const color = getColor(value, selectedParameter);

        return new Style({
          image: new Circle({
            radius: circleRadius,
            fill: new Fill({ color }),
            stroke: new Stroke({ color: '#000', width: 1 }),
          }),
          text: showLabels ? new Text({
            font: '12px Calibri,sans-serif',
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({
              color: '#fff',
              width: 3,
            }),
            offsetX: textShift,
            offsetY: -textShift,
            text: `${feature.get('sample')}: ${value !== null ? value.toFixed(4) : 'н/д'}`
          }) : null
        });
      },
      visible: layers.find(layer => layer.id === 'vector').visible,
      zIndex: 2
    });

    // Heatmap layer with improved weight function
    const heatMapLayer = new HeatmapLayer({
      source: vectorSource,
      blur: 15,
      radius: 15,
      weight: function(feature) {
        const value = feature.get(selectedParameter);
        return getNormalizedWeight(value, selectedParameter);
      },
      visible: layers.find(layer => layer.id === 'heatmap').visible,
      zIndex: 1
    });

    // Topographic base map
    const topoMapLayer = new TileLayer({
      title: 'OpenTopoMap',
      type: 'base',
      visible: layers.find(layer => layer.id === 'topomap').visible,
      source: new XYZ({
        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
      }),
      zIndex: 0
    });

    // Create and store map
    const newMap = new Map({
      target: mapRef.current,
      layers: [topoMapLayer, heatMapLayer, vectorLayer],
      view: new View({
        center: fromLonLat([104.75, 53.0]), // Adjusted to better show all sample points
        zoom: 9
      })
    });

    setMap(newMap);

    // Add popup or tooltip functionality
    const createPopup = () => {
      const container = document.createElement('div');
      container.className = 'ol-popup';
      const closer = document.createElement('a');
      closer.className = 'ol-popup-closer';
      const content = document.createElement('div');
      content.id = 'popup-content';

      container.appendChild(closer);
      container.appendChild(content);
      document.body.appendChild(container);

      return { container, content, closer };
    };

    const { container, content, closer } = createPopup();

    // Add click interaction for sample points
    newMap.on('click', function(evt) {
      const feature = newMap.forEachFeatureAtPixel(evt.pixel, function(feature) {
        return feature;
      });

      if (feature) {
        const sample = feature.get('sample');
        const name = feature.get('name');
        const description = feature.get('description');
        const value = feature.get(selectedParameter);

        content.innerHTML = `
          <h4>Проба №${sample}</h4>
          <p><strong>Место:</strong> ${name}</p>
          <p><strong>Описание:</strong> ${description}</p>
          <p><strong>${selectedParameter}:</strong> ${value !== null ? value.toFixed(4) : 'нет данных'}</p>
        `;

        container.style.display = 'block';
        const coordinates = feature.getGeometry().getCoordinates();
        container.style.left = evt.pixel[0] + 'px';
        container.style.top = evt.pixel[1] + 'px';
      } else {
        container.style.display = 'none';
      }
    });

    // Clean up
    return () => {
      if (newMap) {
        newMap.setTarget(null);
        newMap.dispose();
      }
      document.body.removeChild(container);
    };
  }, [selectedParameter, showLabels]);

  // Update layer visibility when changed in state
  useEffect(() => {
    if (!map) return;

    map.getLayers().forEach(layer => {
      const layerId = layer.get('id');
      if (layerId) {
        const layerState = layers.find(l => l.id === layerId);
        if (layerState) {
          layer.setVisible(layerState.visible);
        }
      }
    });
  }, [layers, map]);

  // Set layer IDs for easier management
  useEffect(() => {
    if (!map) return;

    map.getLayers().forEach((layer, index) => {
      if (index === 0) layer.set('id', 'topomap');
      if (index === 1) layer.set('id', 'heatmap');
      if (index === 2) layer.set('id', 'vector');
    });
  }, [map]);

  const handleLayerChange = (id, visible) => {
    setLayers(layers.map(layer =>
        layer.id === id ? { ...layer, visible } : layer
    ));
  };

  // Create legend for current parameter
  const renderLegend = () => {
    const steps = 5;
    const legendItems = [];

    for (let i = 0; i < steps; i++) {
      const value = (maxValues[selectedParameter] / steps) * i;
      const color = getColor(value, selectedParameter);

      legendItems.push(
          <div key={i} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: color,
              marginRight: '10px',
              border: '1px solid #000'
            }}></div>
            <span>{value.toFixed(4)}</span>
          </div>
      );
    }

    return (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          zIndex: 1000
        }}>
          <h4>{selectedParameter}</h4>
          {legendItems}
          <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: getColor(maxValues[selectedParameter], selectedParameter),
              marginRight: '10px',
              border: '1px solid #000'
            }}></div>
            <span>{maxValues[selectedParameter].toFixed(4)}</span>
          </div>
        </div>
    );
  };

  return (
      <div style={{ position: 'relative' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          margin: '10px 0',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '5px'
        }}>
          <div>
            <h3>Параметры отображения:</h3>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {layers.map((layer) => (
                  <div key={layer.id} style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input
                          type="checkbox"
                          checked={layer.visible}
                          onChange={(e) => handleLayerChange(layer.id, e.target.checked)}
                      />
                      {layer.label}
                    </label>
                  </div>
              ))}
              <div style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                      type="checkbox"
                      checked={showLabels}
                      onChange={(e) => setShowLabels(e.target.checked)}
                  />
                  Отображать подписи
                </label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="parameter-select">Отображаемый элемент: </label>
            <select
                id="parameter-select"
                value={selectedParameter}
                onChange={(e) => setSelectedParameter(e.target.value)}
                style={{ padding: '5px', borderRadius: '3px' }}
            >
              <option value="Hg (мг/кг)">Ртуть (Hg)</option>
              <option value="As (мг/кг)">Мышьяк (As)</option>
              <option value="Pb (мг/кг)">Свинец (Pb)</option>
              <option value="Ba (мг/кг)">Барий (Ba)</option>
              <option value="Sr (мг/кг)">Стронций (Sr)</option>
              <option value="V (мг/кг)">Ванадий (V)</option>
              <option value="Cr (мг/кг)">Хром (Cr)</option>
              <option value="Co (мг/кг)">Кобальт (Co)</option>
              <option value="Ni (мг/кг)">Никель (Ni)</option>
              <option value="Cu (мг/кг)">Медь (Cu)</option>
              <option value="Zn (мг/кг)">Цинк (Zn)</option>
            </select>
          </div>
        </div>

        <div
            className="map-container"
            style={{ width: '100%', height: '600px', position: 'relative' }}
            ref={mapRef}
        >
          {renderLegend()}
        </div>

        <style jsx>{`
        .ol-popup {
          position: absolute;
          background-color: white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          padding: 15px;
          border-radius: 10px;
          border: 1px solid #cccccc;
          bottom: 12px;
          left: -50px;
          min-width: 280px;
          display: none;
        }
        .ol-popup-closer {
          text-decoration: none;
          position: absolute;
          top: 2px;
          right: 8px;
        }
        .ol-popup-closer:after {
          content: "✖";
        }
      `}</style>
      </div>
  );
};

export default SamplesData;
