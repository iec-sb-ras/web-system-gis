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

const data = [
  { long: 104.3910035, lat: 53.2441166, sample: 2420, name: 'Дундай', description: 'Мергель светло-серый запесоченный с прослоями кр-бурых', data: { "Hg (мг/кг)": 0.0157, "As (мг/кг)": null, "Pb (мг/кг)": null, "Ba (мг/кг)": 7.19, "Sr (мг/кг)": 361, "V (мг/кг)": 191, "Cr (мг/кг)": 58, "Co (мг/кг)": 139, "Ni (мг/кг)": 7, "Cu (мг/кг)": 44, "Zn (мг/кг)": 32 } },
  { long: 104.3909605, lat: 53.2440885, sample: 2421, name: 'Дундай', description: 'Мергель светло-серый запесоченный с прослоями кр-бурых', data: { "Hg (мг/кг)": 0.0117, "As (мг/кг)": null, "Pb (мг/кг)": null, "Ba (мг/кг)": 5.00, "Sr (мг/кг)": 150, "V (мг/кг)": 188, "Cr (мг/кг)": 37, "Co (мг/кг)": 112, "Ni (мг/кг)": 4, "Cu (мг/кг)": 30, "Zn (мг/кг)": 32 } },
  { long: 104.3909125, lat: 53.2440946, sample: 2422, name: 'Дундай', description: 'Мергель светло-серый запесоченный с прослоями кр-бурых', data: { "Hg (мг/кг)": 0.0077, "As (мг/кг)": null, "Pb (мг/кг)": null, "Ba (мг/кг)": 5.40, "Sr (мг/кг)": 157, "V (мг/кг)": 204, "Cr (мг/кг)": 62, "Co (мг/кг)": 132, "Ni (мг/кг)": 9, "Cu (мг/кг)": 36, "Zn (мг/кг)": 42 } },
  { long: 104.3908723, lat: 53.2440957, sample: 2423, name: 'Дундай', description: 'Мергель светло-серый запесоченный с прослоями кр-бурых', data: { "Hg (мг/кг)": 0.0082, "As (мг/кг)": null, "Pb (мг/кг)": null, "Ba (мг/кг)": 7.62, "Sr (мг/кг)": 201, "V (мг/кг)": 177, "Cr (мг/кг)": 56, "Co (мг/кг)": 118, "Ni (мг/кг)": 8, "Cu (мг/кг)": 45, "Zn (мг/кг)": 35 } },
  { long: 104.3908723, lat: 53.2440957, sample: 2424, name: 'Дундай', description: 'Мергель светло-серый запесоченный с прослоями кр-бурых', data: { "Hg (мг/кг)": 0.0099, "As (мг/кг)": null, "Pb (мг/кг)": null, "Ba (мг/кг)": 7.66, "Sr (мг/кг)": 208, "V (мг/кг)": 190, "Cr (мг/кг)": 63, "Co (мг/кг)": 138, "Ni (мг/кг)": 9, "Cu (мг/кг)": 56, "Zn (мг/кг)": 35 } },
  { long: 104.0739466, lat: 53.3169155, sample: 2425, name: 'Грязнушка', description: 'Доломит серый катаклазированный, выветрелый (до "муки")', data: { "Hg (мг/кг)": 0.0075, "As (мг/кг)": null, "Pb (мг/кг)": null, "Ba (мг/кг)": 2.77, "Sr (мг/кг)": 1661, "V (мг/кг)": 217, "Cr (мг/кг)": 30, "Co (мг/кг)": 33, "Ni (мг/кг)": 5, "Cu (мг/кг)": 13, "Zn (мг/кг)": 26 } },
  { long: 104.0739466, lat: 53.3169155, sample: 2426, name: 'Грязнушка', description: 'Доломит серый массивный (плотный)', data: { "Hg (мг/кг)": 0.0072, "As (мг/кг)": null, "Pb (мг/кг)": null, "Ba (мг/кг)": 3.51, "Sr (мг/кг)": 1146, "V (мг/кг)": 163, "Cr (мг/кг)": 35, "Co (мг/кг)": 21, "Ni (мг/кг)": 5, "Cu (мг/кг)": 10, "Zn (мг/кг)": 22 } },
  { long: 105.1411168, lat: 52.8071738, sample: 2429, name: 'Муринский', description: 'Туфопесчаник оранжево-бурый изм. (горелик?)', data: { "Hg (мг/кг)": 0.0056, "As (мг/кг)": 14.8, "Pb (мг/кг)": 22.23, "Ba (мг/кг)": null, "Sr (мг/кг)": 584, "V (мг/кг)": 117, "Cr (мг/кг)": 228, "Co (мг/кг)": 125, "Ni (мг/кг)": 17, "Cu (мг/кг)": 66, "Zn (мг/кг)": 42 } },
  { long: 105.1413254, lat: 52.8070837, sample: 2431, name: 'Муринский', description: 'Туфопесчаник оранжево-бурый изм. (горелик?)', data: { "Hg (мг/кг)": 0.0065, "As (мг/кг)": 15.7, "Pb (мг/кг)": 22.66, "Ba (мг/кг)": null, "Sr (мг/кг)": 579, "V (мг/кг)": 123, "Cr (мг/кг)": 137, "Co (мг/кг)": 133, "Ni (мг/кг)": 24, "Cu (мг/кг)": 82, "Zn (мг/кг)": 45 } },
  { long: 105.1413904, lat: 52.8070242, sample: 2432, name: 'Муринский', description: 'Туфопесчаник оранжево-бурый изм. (горелик?)', data: { "Hg (мг/кг)": 0.0037, "As (мг/кг)": 20.7, "Pb (мг/кг)": 25.37, "Ba (мг/кг)": null, "Sr (мг/кг)": 593, "V (мг/кг)": 117, "Cr (мг/кг)": 128, "Co (мг/кг)": 132, "Ni (мг/кг)": 25, "Cu (мг/кг)": 82, "Zn (мг/кг)": 45 } },
  { long: 105.1416429, lat: 52.8068854, sample: 2433, name: 'Муринский', description: 'Туфопесчаник оранжево-бурый изм. (горелик?)', data: { "Hg (мг/кг)": 0.0026, "As (мг/кг)": null, "Pb (мг/кг)": null, "Ba (мг/кг)": 15.67, "Sr (мг/кг)": 407, "V (мг/кг)": 171, "Cr (мг/кг)": 131, "Co (мг/кг)": 79, "Ni (мг/кг)": 20, "Cu (мг/кг)": 63, "Zn (мг/кг)": 41 } },
  { long: 105.1409911, lat: 52.80723, sample: 2427, name: 'Муринский', description: 'Левая стенка отвала канавы', data: { "Hg (мг/кг)": 0.2699, "As (мг/кг)": null, "Pb (мг/кг)": null, "Ba (мг/кг)": 14.31, "Sr (мг/кг)": 497, "V (мг/кг)": 163, "Cr (мг/кг)": 78, "Co (мг/кг)": 44, "Ni (мг/кг)": 20, "Cu (мг/кг)": 33, "Zn (мг/кг)": 21 } },
  { long: 105.1408478, lat: 52.8072909, sample: 2428, name: 'Муринский', description: 'Отвал шурфа', data: { "Hg (мг/кг)": 0.0456, "As (мг/кг)": 26.6, "Pb (мг/кг)": 9.20, "Ba (мг/кг)": null, "Sr (мг/кг)": 582, "V (мг/кг)": 133, "Cr (мг/кг)": 163, "Co (мг/кг)": 132, "Ni (мг/кг)": 28, "Cu (мг/кг)": 82, "Zn (мг/кг)": 49 } },
  { long: 105.1391621, lat: 52.8053496, sample: 2435, name: 'Муринский', description: 'Шлих 100 зн Au', data: { "Hg (мг/кг)": 0.0188, "As (мг/кг)": null, "Pb (мг/кг)": null, "Ba (мг/кг)": 17.98, "Sr (мг/кг)": 736, "V (мг/кг)": 113, "Cr (мг/кг)": 39, "Co (мг/кг)": 44, "Ni (мг/кг)": 10, "Cu (мг/кг)": 27, "Zn (мг/кг)": 18 } }
];

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