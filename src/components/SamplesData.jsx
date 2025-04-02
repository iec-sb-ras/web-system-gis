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
import Overlay from 'ol/Overlay';
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

const MapComponent = () => {
  const mapRef = useRef();
  const popupRef = useRef();
  const mapInstance = useRef(null);
  const [layers, setLayers] = useState([
    { id: 'topomap', label: 'Топографическая карта', visible: true },
    { id: 'russia-border', label: 'Контур России', visible: true },
    { id: 'heatmap', label: 'Тепловая карта', visible: true },
    { id: 'vector', label: 'Точки', visible: true }
  ]);
  const [selectedParameter, setSelectedParameter] = useState('Hg (мг/кг)');
  const [selectedSample, setSelectedSample] = useState(null);
  const textShift = 7;
  const circleRadius = 5;

  const localPalette = [
    '#ffffcc', '#ffeda0', '#fed976', '#feb24c',
    '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'
  ];

  const maxValues = {
    "Hg (мг/кг)": 0.3,
    "As (мг/кг)": 30,
    "Pb (мг/кг)": 30,
    "Ba (мг/кг)": 20,
    "Sr (мг/кг)": 2000,
    "V (мг/кг)": 300,
    "Cr (мг/кг)": 300,
    "Co (мг/кг)": 200,
    "Ni (мг/кг)": 50,
    "Cu (мг/кг)": 100,
    "Zn (мг/кг)": 100
  };

  const getColor = (value, maxValue) => {
    if (value === null || value === undefined || isNaN(value)) {
      return '#cccccc';
    }
    const normalizedValue = Math.min(value / maxValue, 1);
    const index = Math.floor(normalizedValue * (localPalette.length - 1));
    return localPalette[index];
  };

  const getDisplayValue = (sample, parameter) => {
    const value = sample.data[parameter];
    if (value === null || value === undefined) return 'н.д.';
    return value.toFixed(parameter === "Hg (мг/кг)" ? 4 : 2);
  };

  useEffect(() => {
    // Create features for vector layer
    const features = data.map(item => {
      const feat = new Feature({
        geometry: new Point(fromLonLat([item.long, item.lat])),
        sample: item.sample.toString(),
        name: item.name,
        description: item.description,
        location: `${item.long.toFixed(6)}, ${item.lat.toFixed(6)}`,
        ...item.data,
        originalData: item
      });
      return feat;
    });

    const vectorSource = new VectorSource({
      features: features
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const value = feature.get(selectedParameter);
        const color = getColor(value, maxValues[selectedParameter]);
        const sampleId = feature.get('sample');

        return new Style({
          image: new Circle({
            radius: circleRadius,
            fill: new Fill({ color: color }),
            stroke: new Stroke({ color: '#000', width: 1 }),
          }),
          text: new Text({
            font: '11px Calibri,sans-serif',
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({
              color: '#fff',
              width: 3,
            }),
            offsetX: textShift,
            offsetY: -textShift,
            text: sampleId
          })
        });
      },
      visible: layers.find(layer => layer.id === 'vector').visible,
      zIndex: 20
    });

    const heatMapLayer = new HeatmapLayer({
      source: vectorSource,
      blur: 15,
      radius: 10,
      weight: function (feature) {
        const value = feature.get(selectedParameter);
        if (value === null || value === undefined || isNaN(value)) return 0;
        return value / maxValues[selectedParameter];
      },
      visible: layers.find(layer => layer.id === 'heatmap').visible,
      zIndex: 10
    });

    const topoMapLayer = new TileLayer({
      title: 'OpenTopoMap',
      type: 'base',
      visible: layers.find(layer => layer.id === 'topomap').visible,
      source: new XYZ({
        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
      }),
      zIndex: 0
    });


    const map = new Map({
      target: mapRef.current,
      layers: [
        topoMapLayer,
        heatMapLayer,
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([104.5, 53.0]), // Center between Dundai and Murinskiy
        zoom: 8
      })
    });

    mapInstance.current = map;

    // Create popup overlay
    const popup = new Overlay({
      element: popupRef.current,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10]
    });
    map.addOverlay(popup);

    map.on('click', function(evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
        return feature;
      });

      if (feature) {
        const originalData = feature.get('originalData');
        if (originalData) {
          setSelectedSample(originalData);
          popup.setPosition(evt.coordinate);
        }
      } else {
        setSelectedSample(null);
        popup.setPosition(undefined);
      }
    });

    map.on('pointermove', function(e) {
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });

    return () => {
      map.dispose();
    };
  }, [layers, selectedParameter]);

  useEffect(() => {
    if (!mapInstance.current) return;

    const layersToUpdate = mapInstance.current.getLayers().getArray();

    layersToUpdate.forEach(layer => {
      if (layer instanceof HeatmapLayer) {
        layer.getSource().refresh();
      }
      if (layer instanceof VectorLayer && layer.getSource() instanceof VectorSource) {
        layer.changed();
      }
    });
  }, [selectedParameter]);

  const handleLayerChange = (id, visible) => {
    setLayers(layers.map(layer =>
        layer.id === id ? { ...layer, visible } : layer
    ));

    if (!mapInstance.current) return;

    const layersToUpdate = mapInstance.current.getLayers().getArray();

    layersToUpdate.forEach(layer => {
      if (layer instanceof HeatmapLayer && id === 'heatmap') {
        layer.setVisible(visible);
      } else if (layer instanceof VectorLayer && layer.getSource() instanceof VectorSource && id === 'vector') {
        layer.setVisible(visible);
      } else if (layer instanceof TileLayer && id === 'topomap') {
        layer.setVisible(visible);
      } else if (layer instanceof VectorLayer && id === 'russia-border') {
        layer.setVisible(visible);
      }
    });
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

  const legendColors = [];
  for (let i = 0; i < localPalette.length; i++) {
    const value = (maxValues[selectedParameter] * i / (localPalette.length - 1)).toFixed(4);
    legendColors.push({ color: localPalette[i], value });
  }

  return (
      <div>
        <div className="map-container" style={{ position: 'relative' }}>
          <div className="controls-panel" style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1000,
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)'
          }}>
            <h3>Настройки слоев</h3>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Параметр:</label>
              <select
                  value={selectedParameter}
                  onChange={(e) => setSelectedParameter(e.target.value)}
                  style={{ width: '100%', padding: '5px' }}
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

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Слои:</label>
              {layers.map((layer, index) => (
                  <div
                      key={layer.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      style={{
                        padding: '5px',
                        border: '1px solid #ccc',
                        margin: '3px 0',
                        cursor: 'move',
                        backgroundColor: layer.visible ? '#f0f9ff' : '#f5f5f5'
                      }}
                  >
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                          type="checkbox"
                          checked={layer.visible}
                          onChange={(e) => handleLayerChange(layer.id, e.target.checked)}
                          style={{ marginRight: '5px' }}
                      />
                      {layer.label}
                    </label>
                  </div>
              ))}
            </div>

            {/* Legend */}
            <div className="legend" style={{ marginTop: '10px' }}>
              <h4>Легенда ({selectedParameter.split(' ')[0]})</h4>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {legendColors.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                      <div style={{
                        width: '20px',
                        height: '10px',
                        backgroundColor: item.color,
                        marginRight: '5px',
                        border: '1px solid #000'
                      }}></div>
                      <small>{item.value}</small>
                    </div>
                ))}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '5px',
                  marginBottom: '2px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '10px',
                    backgroundColor: '#cccccc',
                    marginRight: '5px',
                    border: '1px solid #000'
                  }}></div>
                  <small>н.д. (нет данных)</small>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div
              id="map"
              style={{ width: '800px', height: '600px' }}
              ref={mapRef}
          ></div>

          {/* Popup for sample details */}
          <div
              ref={popupRef}
              style={{
                display: selectedSample ? 'block' : 'none',
                position: 'absolute',
                backgroundColor: 'white',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #cccccc',
                bottom: '12px',
                left: '-50px',
                minWidth: '280px',
                zIndex: 1000
              }}
          >
            {selectedSample && (
                <div>
                  <h3 style={{ margin: '0 0 10px 0' }}>
                    {selectedSample.name} - Проба №{selectedSample.sample}
                  </h3>
                  <p style={{ margin: '0 0 5px 0' }}>
                    <strong>Описание:</strong> {selectedSample.description}
                  </p>
                  <p style={{ margin: '0 0 10px 0' }}>
                    <strong>Координаты:</strong> {selectedSample.long.toFixed(6)}, {selectedSample.lat.toFixed(6)}
                  </p>

                  <h4 style={{ margin: '10px 0 5px 0' }}>Содержание элементов:</h4>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '3px', borderBottom: '1px solid #ddd' }}>Элемент</th>
                        <th style={{ textAlign: 'right', padding: '3px', borderBottom: '1px solid #ddd' }}>Значение</th>
                      </tr>
                      </thead>
                      <tbody>
                      {Object.entries(selectedSample.data).map(([key, value]) => (
                          <tr key={key} style={{
                            backgroundColor: key === selectedParameter ? '#f0f9ff' : 'transparent',
                            fontWeight: key === selectedParameter ? 'bold' : 'normal'
                          }}>
                            <td style={{ padding: '3px', borderBottom: '1px solid #eee' }}>{key}</td>
                            <td style={{
                              textAlign: 'right',
                              padding: '3px',
                              borderBottom: '1px solid #eee'
                            }}>
                              {value !== null ? (
                                  key === "Hg (мг/кг)" ? value.toFixed(4) : value.toFixed(2)
                              ) : 'н.д.'}
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                      onClick={() => setSelectedSample(null)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                  >
                    ✕
                  </button>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default MapComponent;