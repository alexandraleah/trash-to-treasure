import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotFound from './not-found';

export default class TreasureDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treasure: {},
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    //get the specific item from the database based on the url id

    const id = this.props.match.params.id;
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

  async handleClick() {
    //when delete button is clicked send an axio request to the database to delete it
    const id = this.props.match.params.id;
    await axios.delete(
      `https://trash-to-treasur-1533175223809.firebaseio.com/treasures/${id}.json`
    );
    this.props.history.push('/');
  }

  render() {
    if (this.state.treasure) {
      return (
        <div className="container treasureDetail card">
          <h4 className="text-center">Item</h4>
          <div className="row">
            <div className="image-wrapper col-sm-12 col-md-6">
              <img
                src={this.state.treasure.imageURL}
                className="img-fluid"
                alt="Item"
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <br />
              <h5 className=".ml-1">Details</h5>
              <p>
                Approximate Location:{' '}
                <a
                  href={`https://www.google.com/maps/?q=${
                    this.state.treasure.lat
                  },${this.state.treasure.long}`}
                  target="_blank"
                >
                  {this.state.treasure.approxAddress ||
                    this.state.treasure.lat + ', ' + this.state.treasure.long}
                </a>
              </p>
              <p>Date Posted: {this.state.treasure.postedDate}</p>
              <div className="row">
                <div className="col">
                  <button
                    onClick={this.handleClick}
                    className="btn btn-primary"
                  >
                    Item taken
                  </button>
                </div>
                <div className="col">
                  <Link to="/">
                    <button className="btn btn-primary myBtn">Home</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
}
