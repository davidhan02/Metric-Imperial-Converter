/*
*
*
*       Complete the handler logic below
*       
*       
*/
var math = require('mathjs');
const possibleUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'kg', 'km'];

function ConvertHandler() {
  
  this.getNum = function(input) {
    
    //convert input to string for tests
    let result = input.toString();
    
    //if no digit in result, test for 1 unit
    if (!/\d/.test(result)) {
      result = '1' + result;
    };
    
    //removes the commas and takes away the unit of measurement from number
    result = result.replace(/,/g, '').split(/[A-Za-z]/)[0];
    
    //This function takes the number string and returns rounded number output
    const evaluate = (num) => Math.floor(Number(math.eval(num))*100000)/100000;
    
    // test if there are / signs inside the input
    if (result.match(/\//g) !== null) {
      //if there are more than two / signs or the result is not an number
      if (result.match(/\//g).length >= 2 || isNaN(evaluate(result))) {
        return "invalid number";
      } else {
        return evaluate(result);
      }
    } else {
      //answer is number or not
      if (isNaN(evaluate(result))) {
        return "invalid number";
      } else {
        return evaluate(result);
      }
    }
  };
  
  this.getUnit = function(input) {
    let result = input.toLowerCase();
    
    // removes the commas
    result = result.replace(/,/g, '');
    
    //tests the letters after the number
    let results = result.match(/[A-Za-z]+/);
    if (results === null) {
      return 'invalid unit';
    } else {
      result = results[0];
    }
    if (possibleUnits.includes(result)) {
      if (result == 'l') {
        return 'L';
      } else {
        return result;
      }
    } else {
      return 'invalid unit';
    }
  };
  
  // take init unit from getUnit and return new unit
  this.getReturnUnit = function(initUnit) {
    let result = initUnit.toLowerCase();
    switch(result) {
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'gal':
        result = 'L';
        break;
      default:
        result = 'invalid unit';
    }
    return result;
  };
  
  //take the shortened unit values and return long
  this.spellOutUnit = function(unit) {
    let result = unit.toLowerCase();
    switch(result) {
      case 'lb':
        result = 'pound';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'gal':
        result = 'gallons';
        break;
      default:
        result = 'invalid unit';
    }
    return result;
  };
  
  //use conversion formulas based on init unit
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit.toLowerCase()) {
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      default:
        result = 'invalid unit';
    }
    //round result to 5 decimals
    return Math.floor(result*100000)/100000;
  };
  
  //convert result into an answer string
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    //use of ` tags allow variable use
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
