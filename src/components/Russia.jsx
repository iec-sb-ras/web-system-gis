import React, { useRef, useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Fill, Text } from 'ol/style';
import 'ol/ol.css';

const MapComponent = () => {
    const mapRef = useRef();
    const [layers, setLayers] = useState([
        { id: 'russia-border', label: 'Границы России', visible: true },
        { id: 'lake-baikal', label: 'Озеро Байкал', visible: true }
    ]);
    const [baikalColor, setBaikalColor] = useState('#a1d9f7'); // Default color for Lake Baikal

    useEffect(() => {
        const loadGeoJSON = async (url, layerId) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Network response was not ok for ${url}`);
                }
                const data = await response.json();
                console.log(`Data loaded for ${layerId}:`, data);

                const geojsonFormat = new GeoJSON();
                const features = geojsonFormat.readFeatures(data, {
                    featureProjection: 'EPSG:3857'
                });
                const source = new VectorSource({
                    features: features
                });

                const layer = new VectorLayer({
                    source: source,
                    style: (feature) => {
                        return new Style({
                            stroke: new Stroke({
                                color: layerId === 'russia-border' ? 'black' : 'blue',
                                width: 5
                            }),
                            fill: new Fill({
                                color: layerId === 'russia-border' ? 'rgba(128, 128, 128, 0.5)' : baikalColor
                            }),
                            text: new Text({
                                font: '14px Calibri,sans-serif',
                                fill: new Fill({ color: '#000' }),
                                textAlign: 'center',
                                textBaseline: 'middle'
                            })
                        });
                    },
                    visible: layers.find(layer => layer.id === layerId).visible
                });

                return layer;
            } catch (error) {
                console.error(`Error loading GeoJSON data for ${layerId}:`, error);
            }
        };

        Promise.all([
            loadGeoJSON('/russia-detailed-boundary_1012.geojson', 'russia-border'),
            loadGeoJSON('/lake-baikal-russia_834.geojson', 'lake-baikal')
        ])
            .then(([russiaLayer, baikalLayer]) => {
                const map = new Map({
                    target: mapRef.current,
                    layers: [
                        russiaLayer,
                        baikalLayer
                    ],
                    view: new View({
                        center: fromLonLat([105.31, 56.48]),
                        zoom: 4
                    })
                });

                // Set the map background to transparent
                map.setSize([800, 600]);
                map.getViewport().style.backgroundColor = 'transparent';

                return () => {
                    map.dispose();
                }
            })
            .catch(error => {
                console.error('Error loading GeoJSON data:', error);
            });

        return () => {};
    }, [layers, baikalColor]);

    const handleLayerChange = (id, visible) => {
        setLayers(layers.map(layer =>
            layer.id === id ? { ...layer, visible } : layer
        ));
    };

    return (
        <div>
            <div>
                {layers.map((layer, index) => (
                    <div key={layer.id}>
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
                <div>
                    <label>
                        Цвет озера Байкал:
                        <input
                            type="color"
                            value={baikalColor}
                            onChange={(e) => setBaikalColor(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div id="map" style={{ width: '800px', height: '600px' }} ref={mapRef}></div>
        </div>
    );
};

export default MapComponent;
