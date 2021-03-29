import binomial from '../lib/binomial';

/* Calculates the number of beans in each bin using closer-to-real random generator of window.crypto or Math.ranom
by going through every row of pegs
returns a histogram array of size {numberOfBins}
*/
const randomBeanDistribution = (numberOfBeans, numberOfBins, numberOfPegRows) => {
  let histogram = [];
  // initialize bins
  for (let i=0; i < numberOfBins; i++)
    histogram.push(0);
  
  // half of 32 bit number range
  // const diceThreshold = Math.pow(2, 32) / 2;
  const diceThreshold = 0.5
  
  for (let i=0; i < numberOfBeans; i++) {
    let currentX = (histogram.length-1)/2;
    let binNumber;
    
    // generate random numbers for each row of pegs
    // let diceArray = new Uint32Array(numberOfPegRows);
    // window.crypto.getRandomValues(diceArray);

    let diceArray = [];
    for (let index=0; index < numberOfPegRows; index++)
      diceArray.push(Math.random())

    for (let j=0; j < numberOfPegRows; j++) {
      let inc = 0.5;
      // determine which side the bean goes
      let toLeft = diceArray[j] < diceThreshold;
      if ((currentX-inc >= 0 && toLeft) || currentX+inc >= histogram.length) {
        currentX -= inc;
      } else {
        currentX += inc;
      }
    }
    binNumber = parseInt(currentX);
    // increment the bin histogram
    histogram[binNumber]++;
  }
  console.log(histogram)
  return histogram;
}

/* Deterministically distributes beans into 10 bins
   distribution of beans in each bin is denoted as `binomial(n, k) * p^k * (1-p)^(n-k)`
   where k is the bin number and p is the probability (taken as 0.5)
   n is the number of peg rows
   Reference:
    https://en.wikipedia.org/wiki/Bean_machine

   Returns a histogram in the form of an array
*/
const deterministicBeanDistribution = (numberOfBeans, numberOfBins, numberOfPegRows) => {
  let histogram = [];
  for (let k=0; k < numberOfBins; k++) {
    let probabilityOfKthBin = binomial(numberOfPegRows, k) * Math.pow(0.5, k) * Math.pow(0.5, (numberOfPegRows-k));
    histogram.push(Math.round(probabilityOfKthBin * numberOfBeans))
  }
  console.log(histogram);
  return histogram;
}

export {
  randomBeanDistribution,
  deterministicBeanDistribution
}