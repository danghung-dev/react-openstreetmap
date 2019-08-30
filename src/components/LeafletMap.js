import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet-contextmenu"
import L from "leaflet";
import Routing from "./RoutingMachine";
import './index.css'
import "./contextmenu.css"
const polyline   = require('@mapbox/polyline')

export default class LeafletMap extends Component {
  state = {
    lat: 10.7979794,
    lng: 106.6538054,
    zoom: 11,
    isMapInit: false,
    from: "10.7979794, 106.6538054",
    to: "10.831332788572645, 106.7638224363",
    waypoints: [],
    simulateRoute: [],
  };
  _decodePolyline = (routeGeometry) => {
    var cs = polyline.decode(routeGeometry, 5),
        result = new Array(cs.length),
        i;
    for (i = cs.length - 1; i >= 0; i--) {
        result[i] = L.latLng(cs[i]);
    }

    return result;
  }
  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true,
    });
  };
  handleChange = ({ target }) => {
    this.setState({[target.name]: target.value, waypoints: []});
  }
  getLatLng = (s) => {
    const result = s.split(',');
    return result
  }
  addWaypoints = (e) => {
    const waypoint = L.latLng(e.latlng.lat, e.latlng.lng);
    this.state.waypoints.push(waypoint)
    this.setState({})
  }
  render() {
    const route = this._decodePolyline("m~{`Amx}iS_EOaFOuFQDeABq@Bc@NyDL}CFoABo@D_BBcAHeCv@oXPmF\\gIBWPkEBk@?MDq@Do@FkAJ{@?QDkA?MDs@BeABe@FsADqA@GLcDDgABc@Bg@@YBa@DoADy@@[B{@DeAJqCDaA@M@c@DuAHeC?I?GDu@F}ABc@FiBNwC@_@DaANqF?OKa@GYOWwAuAmAkAsByBACwAyAuB{BsAwAUS}DcEs@m@MQi@u@O]I]AECYAe@Bs@?KRcCBa@D{@B[@SDm@Di@HmAJ{AJcBDg@Di@H{AHiAFkAXsDDa@HsABa@RyCZoENsBPiCJsAJ{ABSDeA@QD{@B]D{@@e@Ea@Oi@Oe@_@iAk@cBIYIYg@cBKc@u@{BGU]cAC_@r@kEHm@@ELqAFg@B}@@E@_@JeD@QHyBDkA@a@FyBFwA@YBw@?S@YDgADiABg@JiCBiAJ_DN_DxAFXBdAD^HDHFFFDJBL?J?HCHGFGFK@M?OCMGKII@_@?e@B}B@g@Ck@V{C?_@H]t@yDd@kBd@{Al@}AZcArBcFpCyFZSb@y@HWz@gCXcAPcAD]JQ@W@YAm@Ee@CaAGeAg@cFo@}FoAiKMkAGs@mA}Le@yEg@uE?a@EYO}@a@}BGc@Ic@Q[QcBqA_MaAiIe@uE}A_Oe@yESqBOuAGe@Gi@IcAA_A?gADiA@a@F_@A_@C]Gm@U[Q]]y@Y_AA[QaAUwAKSQeAa@eCe@iBo@sBwAiDGi@e@cAa@[k@_A_B_C}@eAoAqA_A{@cBqAy@o@Yc@}@k@c@GmDyAg@SsC}@qA]qA[aAQ{AS}BUyEe@oGs@oEk@qDa@eFm@oCe@YAoDm@eDWkGk@{AW}Do@y@MmCw@wBu@i@SWSUQGWUOeAe@sAm@aAg@cAg@eBw@mM{FaH}COGqCqAw@_@")
    console.log('route', route)
    const position = [this.state.lat, this.state.lng];
    const from = this.getLatLng(this.state.from);
    const to = this.getLatLng(this.state.to)
    const waypoints = [L.latLng(from)]
    for (let i=0;i<this.state.waypoints.length;i++) {
      waypoints.push(this.state.waypoints[i])
    }
    waypoints.push(L.latLng(to))
    const routing = this.state.isMapInit ? (
      <Routing map={this.map} waypoints={waypoints} />
    ) : null
    return (
      <div>
        <div className="big-container">
          <input className="from" placeholder="From" type="text" name="from" onChange={this.handleChange} />
          <br/>
          <input className="to" placeholder="To" type="text" name="to" onChange={this.handleChange} />
        </div>
      <Map 
        center={position} 
        zoom={this.state.zoom}
        ref={this.saveMap}
        contextmenu= {true} contextmenuWidth={130} 
        contextmenuItems={ [{text: 'Add waypoints', callback: this.addWaypoints}]}
        bounds={waypoints} // fitBounds
        boundsOptions={{padding: [10, 10]}} // fitBounds with padding
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://kb-openst.danghung.xyz:6789/openstreetmap-carto/tile/{z}/{x}/{y}.png"
        />
        {routing}
      </Map>
      </div>
    );
  }
}
