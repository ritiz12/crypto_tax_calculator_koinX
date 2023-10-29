import React, { useState, useEffect } from 'react';
import '../styles/calculator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

function Calculator() {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investmentType, setInvestmentType] = useState('Long Term');
  const [annualIncome, setAnnualIncome] = useState('$0 - $18200');
  const [taxRate, setTaxRate] = useState('0%');
  const [capitalGainsAmount, setCapitalGainsAmount] = useState(0);
  const [longTermDiscount, setLongTermDiscount] = useState(0);
  const [netCapitalGains, setNetCapitalGains] = useState(0);
  const [taxToPay, setTaxToPay] = useState(0);

  useEffect(() => {
    const capitalGainsAmount = parseFloat(salePrice) - parseFloat(purchasePrice) - parseFloat(expenses);
    let taxRate = '';
    let taxToPay = 0;
    let discount = investmentType === 'Long Term' ? (capitalGainsAmount > 0 ? capitalGainsAmount * 0.5 : 0) : 0;
    let netCapitalGains = investmentType === 'Long Term' ? (capitalGainsAmount - discount) : capitalGainsAmount;

    switch (annualIncome) {
      case '$0 - $18200':
        taxRate = '0%';
        break;
      case '$18201 - $45000':

          taxToPay = (capitalGainsAmount - 18200) * 0.19;


        taxRate = '19% of excess over $18200';
        break;
      case '$45001 - $120000':
         {
          const excessOver45000 = capitalGainsAmount - 45000;
          taxToPay = 5092 + (excessOver45000 * 0.325);

        }
        taxRate = '$5092 + 32.5% of excess over $45000';
        break;
      case '$120001 - $180000':
        {
          const excessOver120000 = capitalGainsAmount - 120000;
          taxToPay = 29467 + (excessOver120000 * 0.37);

        }
        taxRate = '$29467 + 37% of excess over $120000';
        break;
      case '$180001+':
        {
          const excessOver180000 = capitalGainsAmount - 180000;
          taxToPay = 51667 + (excessOver180000 * 0.45);

        }
        taxRate = '$51667 + 45% of excess over $180000';
        break;
      default:
        taxRate = 'Invalid income range';
    }

    setTaxRate(taxRate);
    setCapitalGainsAmount(capitalGainsAmount);
    setLongTermDiscount(discount);
    setNetCapitalGains(netCapitalGains);
    setTaxToPay(taxToPay);
  }, [purchasePrice, salePrice, expenses, investmentType, annualIncome]);

  // Function to format currency input
  const formatCurrency = (value) => {
    return '$' + parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const handleInputChange = (event, setter) => {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/[^0-9.]/g, '');
    setter(numericValue);
  };

  return (
    <div className="calculator">
      <h1>Free Crypto Tax Calculator Australia</h1>
      <div className="column-container">
        <div className="column">
          <div>
            <label>Financial Year</label>
            <select>
              <option value="FY 2023-24">FY 2023-24</option>
            </select>
          </div>

          <div>
            <label>Enter purchase Price of Crypto</label>
            <input
              type="text"
              value={formatCurrency(purchasePrice)}
              onChange={(e) => handleInputChange(e, setPurchasePrice)}
            />
          </div>
          <div>
            <label>Enter your Expenses</label>
            <input
              type="text"
              value={formatCurrency(expenses)}
              onChange={(e) => handleInputChange(e, setExpenses)}
            />
          </div>
          <div>
            <label>Select Your Annual Income</label>
            <select
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
            >
              <option value="$0 - $18200">$0 - $18200</option>
              <option value="$18201 - $45000">$18201 - $45000</option>
              <option value="$45001 - $120000">$45001 - $120000</option>
              <option value="$120001 - $180000">$120001 - $180000</option>
              <option value="$180001+">$180001+</option>
            </select>
          </div>
          <div>
            <label>Capital Gains amount</label>
            <p id="out1">{`${formatCurrency(capitalGainsAmount)}`}</p>
          </div>
          <div>
          <p id="out2"> <span style={{ color: 'black' }}>Net Capital Gains Amount</span><br/>{formatCurrency(netCapitalGains)}</p>

          </div>
        </div>
        <div className="column">
          <div>

            <label>Country</label>
            <select>
              <option value="Country">🌎  Australia</option>
            </select>
          </div>
          <div>
            <label>Enter sale price of Crypto</label>
            <input
              type="text"
              value={formatCurrency(salePrice)}
              onChange={(e) => handleInputChange(e, setSalePrice)}
            />
          </div>
          <div>
            <div>
              <label>Investment Type</label>
            </div>
            <div className="button-container">
              <button
                onClick={() => setInvestmentType('Short Term')}
                className={investmentType === 'Short Term' ? 'active' : ''}
              >
                Short Term
              </button>

              <button
                onClick={() => setInvestmentType('Long Term')}
                className={investmentType === 'Long Term' ? 'active' : ''}
              >
               Long Term
              </button>

            </div>
            <p id = "out6">  &nbsp; &nbsp;  &lt; 12  months     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;      &gt; 12 months</p>
          </div>
          <div >

            <p id="out5">Tax Rate <br/>{taxRate}</p>
          </div>
          <div>
            <label>Discount for long-term gains</label>
            <p id='out4'>{`${formatCurrency(longTermDiscount)}`}</p>
          </div>
          <div>
          <p id="out3"><span style={{ color: 'black' }}>The Tax you need to pay</span> <br/>{formatCurrency(taxToPay)}</p>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;