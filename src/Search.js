import React, { Component } from "react";
import Papa from "papaparse";
import "./styles.css";
import Item from "./item";
import csvdata from "./csvdata";


class Search extends Component {
  state = { searchValue: "", restrauntItems: [], dropDownValue: "All" };
  allData = [];
  allCusines = new Set();
  options = [];

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.search(this.state.searchValue);
  };

  handleDropDown = (event) => {
    this.setState({ dropDownValue: event.target.value });
    this.filterCusine(event.target.value);
  };

  sortRatingAsc = false;
  sortByRating = () => {
    let temp = this.state.restrauntItems;

    if (this.sortRatingAsc) {
      temp.sort((a, b) => {
        return a["Aggregate rating"] - b["Aggregate rating"];
      });
    } else {
      temp.sort((a, b) => {
        return b["Aggregate rating"] - a["Aggregate rating"];
      });
    }
    this.sortRatingAsc = !this.sortRatingAsc;
    this.setState({ restrauntItems: temp });
  };

  sortVotesAsc = false;
  sortByVotes = () => {
    let temp = this.state.restrauntItems;

    if (this.sortVotesAsc) {
      temp.sort((a, b) => {
        return a.Votes - b.Votes;
      });
    } else {
      temp.sort((a, b) => {
        return b.Votes - a.Votes;
      });
    }
    this.sortVotesAsc = !this.sortVotesAsc;
    this.setState({ restrauntItems: temp });
  };

  sortAvgCost = false;
  sortByAvgCost = () => {
    let temp = this.state.restrauntItems;

    if (this.sortAvgCost) {
      temp.sort((a, b) => {
        return a["Average Cost for two"] - b["Average Cost for two"];
      });
    } else {
      temp.sort((a, b) => {
        return b["Average Cost for two"] - a["Average Cost for two"];
      });
    }
    this.sortAvgCost = !this.sortAvgCost;
    this.setState({ restrauntItems: temp });
  };

  search = (searchInput) => {
    let temp = [];
    if (searchInput) temp = this.state.restrauntItems;
    else temp = this.allData;
    let temp2 = [];

    for (let i = 0; i < temp.length; i++) {
      let wo = "" + temp[i]["Restaurant Name"];
      if (wo.toLowerCase().includes(searchInput.toLowerCase())) {
        temp2.push(temp[i]);
      }
    }
    this.setState({ restrauntItems: temp2 });
  };

  filterCusine = (cusineName) => {
    if (cusineName === "All") {
      this.setState({ restrauntItems: this.allData });
    } else {
      let temp2 = this.allData.filter((item) => {
        return item.Cuisines.includes(cusineName);
      });
      this.setState({ restrauntItems: temp2 });
    }
  };

  componentDidMount() {
    // var results = Papa.parse("./assets/restaurantsa9126b3.csv"); // Not working

    let config = {
      header: true,
    };
    var results = Papa.parse(csvdata, config);
    console.log(results.data);
    this.setState({ restrauntItems: results.data });
    this.allData = results.data;

    this.allData.forEach((val) => {
      let cusines = val.Cuisines.split(",");
      if (cusines != "") {
        cusines.forEach((elem) => {
          this.allCusines.add(elem.trim());
        });
      }
    });
  }

  render() {
    let opt = [...this.allCusines.values()].map((data) => (
      <option key={data} value={data}>
        {data}
      </option>
    ));

    return (
      <div>
        <h1>Restauraunt Finder</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={(event) => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        <div className="select-container">
          <span className="select-header">Select Cusine</span>
          <select
            className="select-box"
            value={this.state.dropDownValue}
            onChange={this.handleDropDown}
          >
            <option defaultValue value="All">
              All
            </option>
            {opt}
          </select>
        </div>

        <button onClick={this.sortByRating}>
          Sort By Rating
          {this.sortRatingAsc ? (
            <i className="fontIcon fa fa-caret-down" aria-hidden="true"></i>
          ) : (
            <i className="fontIcon fa fa-caret-up" aria-hidden="true"></i>
          )}
        </button>

        <button onClick={this.sortByVotes}>
          Sort By Votes
          {this.sortVotesAsc ? (
            <i className="fontIcon fa fa-caret-down" aria-hidden="true"></i>
          ) : (
            <i className="fontIcon fa fa-caret-up" aria-hidden="true"></i>
          )}
        </button>

        <button onClick={this.sortByAvgCost}>
          Sort By Average Cost for 2
          {this.sortAvgCost ? (
            <i className="fontIcon fa fa-caret-down" aria-hidden="true"></i>
          ) : (
            <i className="fontIcon fa fa-caret-up" aria-hidden="true"></i>
          )}
        </button>

        {this.state.restrauntItems ? (
          <div className="container">
            <div className="card">
              <div className="card-item">
                <p>Restaurant Name</p>
              </div>
              <div className="card-item">
                <p>Cuisines</p>
              </div>
              <div className="card-item">
                <p>Average Cost for two</p>
              </div>
              <div className="card-item">
                <p>Currency</p>
              </div>
              <div className="card-item">
                <p>Has Table booking</p>
              </div>
              <div className="card-item">
                <p>Has Online delivery</p>
              </div>
              <div className="card-item">
                <p>Aggregate rating</p>
              </div>
              <div className="card-item">
                <p>Rating</p>
              </div>
              <div className="card-item">
                <p>Votes</p>
              </div>
            </div>

            {this.state.restrauntItems.map((restraunt) => (
              <Item key={restraunt["Restaurant ID"]} data={restraunt} />
            ))}
          </div>
        ) : (
          <p />
        )}
      </div>
    );
  }
}
export default Search;
