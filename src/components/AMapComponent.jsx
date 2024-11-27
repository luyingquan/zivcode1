import React, { useEffect, useRef } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

const AMapComponent = ({ location }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    AMapLoader.load({
      key: '你的高德地图Key',
      version: '2.0',
      plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Marker']
    }).then((AMap) => {
      const map = new AMap.Map(mapRef.current, {
        zoom: 13,
        center: [location.longitude, location.latitude],
      });

      const marker = new AMap.Marker({
        position: [location.longitude, location.latitude],
        title: location.address
      });

      map.add(marker);
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Scale());
    });
  }, [location]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default AMapComponent; 