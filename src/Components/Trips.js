import React from "react";
import { Map,TileLayer,Marker } from "react-leaflet";
import Leaflet from "leaflet";
class Trips extends React.Component {
  state = {
    zoom: 5,
    histories: this.props.histories,
    trips:this.props.trips.map(
      (item)=>({
        consignee_name:item.consignee_name,
        consigner_name:item.consigner_name,
        consignment_id:item.id
      })
    )
  };
  render() {
    const pos = [28, 77];
    var id = 2;
    const color=["#E6E6FA","#D3D3D3"];
    var i=0;
    return ( 
      <React.Fragment>
        <div style={{width:"1000px",display:"inline"}}>
       <div style={{float:"left"}}>
        {
          this.state.trips.map(
            (item)=>(<React.Fragment><table id={item.consignment_id} style={{width:"200px",border:"0.5px solid black",backgroundColor:color[i++]}}>
             <th style={{border:"0.5px solid black"}} colSpan="2"><b>Consignment id : </b>{item.consignment_id}</th>
            <tr><td><b>Consignee name : </b></td><td>{item.consignee_name}</td></tr>
           <tr><td><b> Consigner name : </b></td><td>{item.consigner_name}</td></tr></table>
           <br/>
           <br/>
    
           </React.Fragment>
            )
          )
        }
        </div>
      <div style={{ height: "600px",float: "right",width:"800px"}} key={id++}>
        <Map center={pos} zoom={this.state.zoom} key={id++}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            key={id++}
            maxZoom="18"
    id="mapbox.streets"
    accessToken='your.mapbox.access.token'
          />
          {this.state.histories.map((history, index) => (
            <MapPath data={history} key={index} parentKey={index}/>
            
          ))}
        </Map>
      </div>
      </div>
      </React.Fragment>
    );
  }
}

class MapPath extends React.Component {
 
  render() {
    const image = new Leaflet.Icon({
      iconUrl: 'https://i.imgur.com/EKIEJsN.png'  })
   return (
      <React.Fragment>
        {this.props.data &&
          this.props.data.map((val, index) => (
          
            <Marker
              position={{
                lat: Number(val.latitude),
                lng: Number(val.longitude)
              }}
              
              key={`marker_${this.props.parentKey}_${index}`}
            
              icon={ image}
              
            />
          ))
          }
     
      </React.Fragment>
      
    );
  }
}
export default Trips;
