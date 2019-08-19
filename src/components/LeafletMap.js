import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import Routing from "./RoutingMachine";

export default class LeafletMap extends Component {
  state = {
    lat: 10.7979794,
    lng: 106.6538054,
    zoom: 11,
    isMapInit: false,
    from: "10.7979794, 106.6538054",
    to: "10.831332788572645, 106.7638224363"
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
  render() {
    const position = [this.state.lat, this.state.lng];
    const from = this.getLatLng(this.state.from);
    const to = this.getLatLng(this.state.to)
    const waypoints = [L.latLng(from), L.latLng(to)]
    const routing = this.state.isMapInit ? (
      <Routing map={this.map} waypoints={waypoints} />
    ) : null
    return (
      <div>
        <form>
        <label>
          from:
          <input type="text" name="from" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          to:
          <input type="text" name="to" onChange={this.handleChange} />
        </label>
        </form>
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap}>
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
