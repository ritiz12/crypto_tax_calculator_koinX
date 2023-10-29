import React, { useState } from 'react';
import '../styles/calculator.css'; // Import your CSS file

function Calculator() {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investmentType, setInvestmentType] = useState('Long Term');
  const [annualIncome, setAnnualIncome] = useState('$0 - $18200');
  const [taxRate, setTaxRate] = useState('');
  const [capitalGainsAmount, setCapitalGainsAmount] = useState(0);
  const [longTermDiscount, setLongTermDiscount] = useState(0);
  const [netCapitalGains, setNetCapitalGains] = useState(0);
  const [taxToPay, setTaxToPay] = useState(0);

  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [result, setResult] = useState(0);

  const calculateSum = () => {
    setResult(Number(number1) + Number(number2));
  };

  const calculateTax = () => {
    const capitalGainsAmount = salePrice - purchasePrice - expenses;
    let taxRate = '';
    let taxToPay = 0;

    if (investmentType === 'Long Term') {
      let discount = 0;
      if (capitalGainsAmount > 0) {
        discount = capitalGainsAmount * 0.5;
      }

      const netCapitalGains = capitalGainsAmount - discount;

      // Calculate tax rate based on annual income range
      switch (annualIncome) {
        case '$0 - $18200':
          taxRate = '0%';
          break;
        case '$18201 - $45000':
          if (capitalGainsAmount > 18200) {
            taxToPay = (capitalGainsAmount - 18200) * 0.19;
          }
          taxRate = '19% of excess over $18200';
          break;
        case '$45001 - $120000':
          if (capitalGainsAmount > 1500) {
            const excessOver45000 = capitalGainsAmount - 1500;
            taxToPay = 5092 + (excessOver45000 * 0.325);
          }
          taxRate = '$5092 + 32.5% of excess over $45000';
          break;
        default:
          taxRate = 'Invalid income range';
      }

      setTaxRate(taxRate);
      setCapitalGainsAmount(capitalGainsAmount);
      setLongTermDiscount(discount);
      setNetCapitalGains(netCapitalGains);
      setTaxToPay(taxToPay);
    } else {
      // Handle Short Term calculations here
      // Hide the Long Term related fields
      setTaxRate('Short Term Tax Rate Logic');
      setCapitalGainsAmount(capitalGainsAmount);
      setLongTermDiscount(0);
      setNetCapitalGains(capitalGainsAmount);
      setTaxToPay(0); // Calculate Short Term tax here
    }
  };

  return (
    <div className="calculator">
      <h1>Crypto Tax Calculator for Australia</h1>
      <div>
        <label>Financial Year</label>
        <select  >
          <option value="FY 2023-24">FY 2023-24</option>

          {/* Add more fiscal years as needed */}
        </select>
      </div>
      <div>
        <label>Country</label>
        <select  >
          <option value="Countery">Australia</option>

          {/* Add more fiscal years as needed */}
        </select>
      </div>
      <div>
        <label>Purchase Price:</label>
        <input
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
      </div>
      <div>
        <label>Sale Price:</label>
        <input
          type="number"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
        />
      </div>
      <div>
        <label>Expenses:</label>
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
        />
      </div>
      <div>
        <label>Investment Type:</label>
        <select
          value={investmentType}
          onChange={(e) => setInvestmentType(e.target.value)}
        >
          <option value="Long Term">Long Term</option>
          <option value="Short Term">Short Term</option>
        </select>
      </div>
      <div>
        <label>Annual Income:</label>
        <select
          value={annualIncome}
          onChange={(e) => setAnnualIncome(e.target.value)}
        >
          <option value="$0 - $18200">$0 - $18200</option>
          <option value="$18201 - $45000">$18201 - $45000</option>
          <option value="$45001 - $120000">$45001 - $120000</option>
        </select>
      </div>
      <button onClick={calculateTax}>Calculate Tax</button>
      <div className='output_class'>
      <label>Tax Rate</label>
        <p id='out1'>{taxRate}</p>
        <label>Capital Gains Amount </label>
        <p  id='out1'> {capitalGainsAmount}</p>
        <label>Discount for long term gains </label>
        {investmentType === 'Long Term' && (

          <p  id='out1'> {longTermDiscount}</p>
        )}
        <p id='out2'>Net Capital Gains tax Amount {netCapitalGains}</p>
        <p id='out3'>Tax you need to pay{taxToPay}</p>
      </div>

    </div>
  );
}

export default Calculator;
