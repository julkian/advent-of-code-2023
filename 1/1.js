import { open } from 'node:fs/promises';

async function readCalibrationFile() {
    return await open('./input.data');
}

function getValueFromCalibrationLine(calibrationLine) {
    let firstDigit;
    let lastDigit;
    for (let i = 0; i < calibrationLine.length; i++) {
        if (isNaN(firstDigit) && !isNaN(calibrationLine[i])) {
            firstDigit = calibrationLine[i];
        }
        if (isNaN(lastDigit) && !isNaN(calibrationLine[calibrationLine.length - (i+1)])) {
            lastDigit = calibrationLine[calibrationLine.length - (i+1)];
        }
        if (!isNaN(firstDigit) && !isNaN(lastDigit)) {
            break;
        }
    }
    return (parseInt(firstDigit) * 10) + parseInt(lastDigit); 
}

async function calculateCalibration() {
    const calibrationData = await readCalibrationFile();
    let totalCalibration = 0;
    for await (const line of calibrationData.readLines()) {
        const calibrationLineValue = getValueFromCalibrationLine(line);
        totalCalibration += calibrationLineValue;
    }
    console.log(`Total calibation value is ${totalCalibration}`);
}

calculateCalibration();