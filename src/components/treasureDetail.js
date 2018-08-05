import React, { Component } from 'react';
import Path from 'path';
import axios from 'axios';

export default class TreasureDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treasure: {},
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    try {
      const response = await axios.get(
        `https://trash-to-treasur-1533175223809.firebaseio.com/treasures/${id}.json`
      );
      const treasure = response.data;
      this.setState({ treasure: treasure });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="container treasureDetail card">
        <h4 className="text-center">Item</h4>
        <div className="row">
          <div className="image-wrapper col-sm-12 col-md-6">
            <img
              src={this.state.treasure.imageURL}
              className="img-fluid"
              alt="Item image"
            />
          </div>
          {/* possibly link this to google maps like meal pal does? and/or show map below  */}
          <div className="col-sm-12 col-md-6">
            <br />
            <h5 className=".ml-1">Details</h5>
            {/* check that this is working and fix it if it's not */}
            <p>
              Approximate Location:{' '}
              {this.state.treasure.approxAddress ||
                this.state.treasure.lat + ', ' + this.state.treasure.long}
            </p>
            <p> Date Posted: {this.state.treasure.postedDate}</p>

            <button className="btn btn-primary">Item taken</button>
          </div>
        </div>
      </div>
    );
  }
}
