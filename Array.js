function generateRandomArray() {
    let randomArray = [];
    for (let i = 0; i < 5; i++) {
        let randomNumber = Math.floor(Math.random() * 101);
        randomArray.push(randomNumber);
    }

    
    let sum = randomArray.reduce((a, b) => a + b, 0);


    let mean = sum / randomArray.length;

       let greaterThanMean = randomArray.filter(value => value > mean);

        document.querySelector("#arrayOut").innerHTML = `
        The array is: [${randomArray}]<br>
        The mean is: ${mean.toFixed(2)}<br>
        Numbers greater than the mean: [${greaterThanMean}]
    `;

   
    console.log("Array:", randomArray);
    console.log("Mean:", mean);
    console.log("Numbers greater than mean:", greaterThanMean);
}