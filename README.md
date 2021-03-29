# Intro

This app simulates a Galton Board AKA Bean Machine. 

For more info please visit the related [wiki page](https://en.wikipedia.org/wiki/Bean_machine).

## Boilerplate
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

To begin with:

    npm install

To build:
    npm run build 


To start development server:

    npm run start

## About the simulation
There are two functions in '/lib/beans.js' file:

- randomBeanDistribution
- deterministicBeanDistribution

The first one runs a simulation by throwing a dice via window.crypto object or Math.random function and returns a historgram.

The second one calculates the historgram by using the ideal mathematical function described in the wikipedia page mentioned above. 
