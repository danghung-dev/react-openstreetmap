import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "../lrm";
import { withLeaflet } from "react-leaflet";
import Geocoder from 'leaflet-control-geocoder'

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    const router =   L.Routing.osrmv1({
      serviceUrl: 'https://openst.danghung.xyz/route/v1',
      language: 'vi',
      useHints: false,
    })
    const waypoints = [L.latLng(10.7979794, 106.6538054), L.latLng(10.8019022, 106.677889)]
    var markerList = ['assets/marker-start-icon-2x.png', 'assets/marker-end-icon-2x.png', 'assets/marker-via-icon-2x.png'];
    const startIcon = L.icon({
      iconUrl: markerList[0],
      iconSize: [20, 56],
      iconAnchor: [10, 28]
    });
    const endIcon = L.icon({
      iconUrl: markerList[1],
      iconSize: [20, 56],
      iconAnchor: [10, 28]
    });
    const viaIcon = L.icon({
      iconUrl: markerList[2],
      iconSize: [20, 56],
      iconAnchor: [10, 28]
    });
    let leafletElement = L.Routing.control({
      waypoints,
      geocoder: Geocoder.nominatim(),
      routeWhileDragging: true,
      router,
      fitSelectedRoutes: false,
      collapsible: true,
      // summaryTemplate: '<div class="osrm-directions-summary"><h2>{name}</h2><h3>{distance}, {time}</h3></div>',
      containerClassName: 'dark pad2',
      // alternativeClassName: 'osrm-directions-instructions',
      // stepClassName: 'osrm-directions-step',
      geocodersClassName: 'osrm-directions-inputs',
      showAlternatives: false,
      useZoomParameter: false,
      routeDragInterval: 200,
      plan: L.Routing.plan(waypoints, {
        createMarker: function(i, wp, n) {
          if (i ===0) {
            return L.marker(wp.latLng, {
              draggable: true,
              icon: startIcon,
            });
          }
          if (i === n - 1)
          {
            return L.marker(wp.latLng, {
              draggable: true,
              icon: endIcon,
            });
          }
          return L.marker(wp.latLng, {
            draggable: true,
            icon: viaIcon,
          }); 
        },
        routeWhileDragging: true
      })
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
