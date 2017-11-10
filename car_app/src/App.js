import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Cars from './Car/Cars.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      storedCars: [{
        make: "Ferrari",
        country: "Italy",
        topSpeed: 200
      },
      {
        make: "Porsche",
        country: "Italy",
        topSpeed: 160

      }]
    }

      this.handleSubmitInParent = (dataFromForm) => {
        let array = this.state.storedCars;
        array.push({
          make: dataFromForm.make,
          country: dataFromForm.country,
          topSpeed: dataFromForm.topSpeed
        });
        this.setState({array});
      }

      this.handleCarDelete = (carID) => {
        let array = this.state.storedCars;
        array.splice(carID, 1);
      }

      // this.handleCarUpdate = (carObj, carID) => {
      //   let array = this.state.storedCars;
      //   array.push(carObj);
      //   this.setState({storedCars: array});
      // }
    
  }
  render() {
    return (
      <div className="App">
          <div> 
            {/* <List storedCars={this.state.storedCars}/> */}
            <DisplayCar storedCars={this.state.storedCars} deleteEntry={this.handleCarDelete} updateEntry={this.handleCarUpdate}/> 
            <UserInputs onSubmit ={this.handleSubmitInParent}/> 
          </div>
      </div>
    );
  }
}

class DisplayCar extends Component{
  constructor(props){
    super(props);

    this.deleteCarFromTableAndDB = (event) => {
      const element = event.target;
      const idToDelete = element.getAttribute('data-id');
      this.props.deleteEntry(idToDelete);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    }

    // this.updateCarFromTableAndDB = (event) => {
    //   const element = event.target;
    //   const idToUpdate = element.getAttribute('data-id');
    //   this.props.updateEntry(car, idToUpdate);
    // }
  }
    render(){
      //let data = this.props.storedCars;
      let keys = Object.keys(this.props.storedCars[0]);

      let cars = null;

      cars = (
        this.props.storedCars.map((car, index) => {
            return <Cars
              make = {car.make}
              country = {car.country}
              topSpeed = {car.topSpeed}
              deleteFunc = {this.deleteCarFromTableAndDB}
              updateFunc = {this.updateCarFromTableAndDB}/>
          })        
      );

      return(
        <div>
            <table>
              <tr>
                <th>{keys[0]}</th>
                <th>{keys[1]}</th>
                <th>{keys[2]}</th>
              </tr>
                 {cars}
            </table>
        </div>
      );
    }
}

class UserInputs extends Component{
  constructor(props){
    super(props);

    this.handleChange = (valueName) => (event) => this.setState({ [valueName]: event.target.value });

    this.handleSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit(this.state);
      this.setState({
        make: "",
        country: "",
        topSpeed: ""
      });
    }

    this.state = {
      make: "",
      country: "",
      topSpeed: ""
    };
  }
  render(){
    return(
      <div>
        <form id="addMyData">
          <input type="text" name="make" placeholder="Make" value={this.state.make} onChange={this.handleChange("make")}></input>
          <input type="text" name="country" placeholder="Country" value={this.state.country} onChange={this.handleChange("country")}></input>
          <input type="text" name="topSpeed" placeholder="Top Speed" value={this.state.topSpeed} onChange={this.handleChange("topSpeed")}></input>
          <input type="button" value="Create Car" onClick={this.handleSubmit}></input>
        </form>
      </div>
    );
  }
}

export default App;
