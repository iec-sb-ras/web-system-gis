import React, { useRef, useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Fill, Stroke, Text } from 'ol/style';
import data from '../data';
import 'ol/ol.css';
import SelectWidget from './SelectWidget';

const MapComponent = () => {
    const mapRef = useRef();
    const [selectedLayer, setSelectedLayer] = useState('uchastok');
    const textShift = 20;
    const circleRadius = 10;
    const localPalette = ['#001219', '#005F73', '#0A9396', '#94D2BD',
        '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03',
        '#AE2012', '#9B2226'];

    const paletteFunc = (cls) => {
        if (localPalette.length < cls) {
            cls = cls % localPalette.length;
        };
        return localPalette[cls];
    };

    useEffect(() => {
        const features = data.map(item => {
            return new Feature({
                geometry: new Point(fromLonLat([item.long, item.lat])),
                name: item.sample,
                id: item.id,
                t: item.t
            });
        });

        const vectorSource = new VectorSource({
            features: features
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: (feature) => {
                return new Style({
                    image: new Circle({
                        radius: circleRadius,
                        fill: new Fill({ color: paletteFunc(feature.get("t")) }),
                        stroke: new Stroke({ color: '#006666', width: 2 }),
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
                vectorLayer
            ],
            view: new View({
                center: fromLonLat([105.31, 56.48]),
                zoom: 12
            })
        });

        return () => map.dispose();
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
        </div>
    );
};

export default MapComponent;
