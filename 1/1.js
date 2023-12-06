import { open } from 'node:fs/promises';

const spelledValidDigits = [
    {name: 'one', value: 1},
    {name: 'two', value: 2},
    {name: 'three', value: 3},
    {name: 'four', value: 4},
    {name: 'five', value: 5},
    {name: 'six', value: 6},
    {name: 'seven', value: 7},
    {name: 'eight', value: 8},
    {name: 'nine', value: 9},
];

function getValueFromCalibrationLine(calibrationLine) {
    let firstDigit;
    let lastDigit;
    for (let i = 0; i < calibrationLine.length; i++) {
        // console.log(`index is ${i}`);
        if (isNaN(firstDigit)) { // first digit hasnt been found yet
            // console.log(`calibrationLine[i] is ${calibrationLine[i]}`);
            if (!isNaN(calibrationLine[i])) {
                // console.log(`calibrationLine[i] is a digit`);
                firstDigit = calibrationLine[i];
            } else {
                // calibrationLine[i] is not a number
                // console.log(`calibrationLine[i] is NOT a digit`);
                for (let j = 0; j < spelledValidDigits.length; j++) {
                    const validDigitName = spelledValidDigits[j].name;
                    // console.log(`j is ${j}`);
                    // console.log(`validDigitName is ${validDigitName}`);
                    // console.log(`calibrationLine.substr(i, validDigitName.length) is ${calibrationLine.substr(i, validDigitName.length)}`);
                    if (validDigitName === calibrationLine.substr(i, validDigitName.length)) {
                        firstDigit = spelledValidDigits[j].value;
                        break;
                    }
                }
            }
        }
        if (isNaN(lastDigit)) { // last digit hasnt been found yet
            if (!isNaN(calibrationLine[calibrationLine.length - (i+1)])) {
                lastDigit = calibrationLine[calibrationLine.length - (i+1)];
            } else {
                // calibrationLine[calibrationLine.length - (i+1)] is not a number
                for (let j = 0; j < spelledValidDigits.length; j++) {
                    const validDigitName = spelledValidDigits[j].name;
                    const lastCharPosition = calibrationLine.length - i;
                    // console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                    // console.log(`j is ${j}`);
                    // console.log(`validDigitName is ${validDigitName}`);
                    // console.log(`lastCharPosition is ${lastCharPosition}`);
                    // console.log(`calibrationLine.substr(lastCharPosition - validDigitName.length, validDigitName.length) is ${calibrationLine.substr(lastCharPosition - validDigitName.length, validDigitName.length)}`);
                    if (validDigitName === calibrationLine.substr(lastCharPosition - validDigitName.length, validDigitName.length)) {
                        lastDigit = spelledValidDigits[j].value;
                        break;
                    }
                }
            }
        }
        if (!isNaN(firstDigit) && !isNaN(lastDigit)) {
            break;
        }
    }
    return (parseInt(firstDigit) * 10) + parseInt(lastDigit); 
}

function runTests() {
    console.log('FINDING two1nine');
    console.log(getValueFromCalibrationLine('two1nine'));
    console.log('*******************************************************************************')
    console.log('FINDING eightwothree');
    console.log(getValueFromCalibrationLine('eightwothree'));
    console.log('*******************************************************************************')
    console.log('FINDING abcone2threexyz');
    console.log(getValueFromCalibrationLine('abcone2threexyz'));
    console.log('*******************************************************************************')
    console.log('FINDING xtwone3four');
    console.log(getValueFromCalibrationLine('xtwone3four'));
    console.log('*******************************************************************************')
    console.log('FINDING 4nineeightseven2');
    console.log(getValueFromCalibrationLine('4nineeightseven2'));
    console.log('*******************************************************************************')
    console.log('FINDING zoneight234');
    console.log(getValueFromCalibrationLine('zoneight234'));
    console.log('*******************************************************************************')
    console.log('FINDING 7pqrstsixteen');
    console.log(getValueFromCalibrationLine('7pqrstsixteen'));
    console.log('*******************************************************************************')
}

async function calculateCalibration() {
    const calibrationData = await open('./input.data');
    let totalCalibration = 0;
    for await (const line of calibrationData.readLines()) {
        const calibrationLineValue = getValueFromCalibrationLine(line);
        totalCalibration += calibrationLineValue;
    }
    console.log(`Total calibation value is ${totalCalibration}`);
}

// runTests();
calculateCalibration();