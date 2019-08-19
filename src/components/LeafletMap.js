import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet-contextmenu"
import L from "leaflet";
import Routing from "./RoutingMachine";
import './index.css'
import "./contextmenu.css"

export default class LeafletMap extends Component {
  state = {
    lat: 10.7979794,
    lng: 106.6538054,
    zoom: 11,
    isMapInit: false,
    from: "10.7979794, 106.6538054",
    to: "10.831332788572645, 106.7638224363",
    waypoints: [],
  };
  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true,
    });
  };
  handleChange = ({ target }) => {
    this.setState({[target.name]: target.value});
  }
  getLatLng = (s) => {
    const result = s.split(',');
    return result
  }
  handleContextMenu = (e) => {
    // var popup = L.popup().setContent('<p>Hello world!<br />This is a nice popup.</p>'); 
    // popup.openOn(this.map)
    if (this.popup) this.popup.removeFrom(this.map.leafletElement)
    this.popup = L.popup()
      .setLatLng(e.latlng)
      .setContent('<input type="button">Add waypoint here</input>')
    this.popup.addTo(this.map.leafletElement)
  }
  addWaypoints = (e) => {
    const waypoint = L.latLng(e.latlng.lat, e.latlng.lng);
    this.state.waypoints.push(waypoint)
    this.setState({})
  }
  render() {
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
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap} contextmenu= {true} contextmenuWidth={ 130} 
        contextmenuItems={ [{text: 'Add waypoints', callback: this.addWaypoints}]}>
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
