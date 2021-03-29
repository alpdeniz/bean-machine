import React from 'react';
import {randomBeanDistribution, deterministicBeanDistribution} from '../lib/beans';

const config = {
  numberOfPegRows: 9,
  numberOfBins: 10
}

class Stage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialNumberOfBeans:10000,
      levels: [[] /*{histogram: [5,10,15], sum: 10000}*/],
      running: false
    }
  }

  fillBeans(count) {
    // let elem = (<img className="float-left h-1 w-1" src="/img/bean.png" alt="bean"/>);
    let elem = (<div className="float-left h-1 w-1 rounded-full bg-gray-200"/>)
    let beans = [];
    for (let i=0; i<count; i++)
      beans.push(elem)
    return beans;
  }

  run = (numberOfBeans) => {
    // set running. disable button. 
    this.setState(() => {
      return {
        running: true
      }
    })

    console.log(numberOfBeans);
    let histogram = randomBeanDistribution(numberOfBeans, config.numberOfBins, config.numberOfPegRows);
    let histogram2 = deterministicBeanDistribution(numberOfBeans, config.numberOfBins, config.numberOfPegRows);

    this.setState((state, props) => {
      return {
        running: false,
        levels: state.levels.concat([histogram])
      }
    });
  }

  createLevel(level, index, lastRow) {
    let boxes = [];
    level.forEach( (numberOfBeans, boxIndex) => {
      boxes.push(
        <div key={boxIndex} className="h-116" id={`box-${index}-${boxIndex}`}>
          <div className="w-full float-left h-90 border-2 border-gray-500 my-4">
            {this.fillBeans(numberOfBeans)}
          </div>
          <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border border-blue-700 rounded ${this.state.running? 'running' : ''}`} onClick={() => {this.run(numberOfBeans)}}>{this.state.running? "Running" : 'Run'}</button>
        </div>
      )
    })
  
    return (
      <div key={index} className="grid grid-cols-10 text-center my-4">
          {boxes}
      </div>
    )
  }

  createFirstBin = () => {
    this.firstBin = (<div className="float-left border-2 border-gray-500">
      {this.fillBeans(this.state.initialNumberOfBeans)}
    </div>)
    return this.firstBin;
  }

  render() {
        
    let levelElements = [];
    this.state.levels.forEach( (level, index) => {
      if (index === 0) {
        // initial box
        levelElements.push(
            <div key={index} className="col-start-3 col-span-6 text-center my-4">
              {this.firstBin? this.firstBin : this.createFirstBin()}
              <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 border border-blue-700 rounded ${this.state.running? 'running' : ''}`} onClick={() => {this.run(this.state.initialNumberOfBeans)}}>{this.state.running? "Running" : 'Run'}</button>
            </div>
        )
      } else 
        levelElements.push(this.createLevel(level, index, index === this.state.levels.length-1))
    })
    
    return (
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-2 font-bold text-center">Coding Challenge</div>
          <div className="px-4 py-6 sm:px-0">
            
            {/* Galton Board Stage */}
            {levelElements}
  
          </div>
        </div>
      </main>
    )
  }
}

export default Stage;