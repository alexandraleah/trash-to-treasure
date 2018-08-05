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
      <div>
        <h1>Item</h1>
        <div>
          <img src={this.state.treasure.imageURL} className="treasureImage" />
        </div>
        <h5>Approximate Location: {this.state.treasure.approxAddress}</h5>
        <h5> Date Posted: {this.state.treasure.postedDate}</h5>
      </div>
    );
  }
}
