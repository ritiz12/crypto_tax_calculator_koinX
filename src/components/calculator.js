
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const capitalGainsAmount = salePrice - purchasePrice - expenses;
    let taxRate = '';
    let taxToPay = 0;

    if (investmentType === 'Long Term') {
      let discount = 0;
      if (capitalGainsAmount > 0) {
        discount = capitalGainsAmount * 0.5;
      }

      const netCapitalGains = capitalGainsAmount - discount;

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
      setTaxRate('Short Term Tax Rate Logic');
      setCapitalGainsAmount(capitalGainsAmount);
      setLongTermDiscount(0);
      setNetCapitalGains(capitalGainsAmount);
      setTaxToPay(0);
    }
  }, [purchasePrice, salePrice, expenses, investmentType, annualIncome]);

  // Function to format currency input
  const formatCurrency = (value) => {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
            <label>Purchase Price:</label>
            <input
              type="text"
              value={formatCurrency(purchasePrice)}
              onChange={(e) => setPurchasePrice(Number(e.target.value.replace(/\$/g, '').replace(/,/g, '')))
              }
            />
          </div>
          <div>
            <label>Expenses:</label>
            <input
              type="text"
              value={formatCurrency(expenses)}
              onChange={(e) => setExpenses(Number(e.target.value.replace(/\$/g, '').replace(/,/g, '')))
              }
            />
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
          <div>
            <label>Capital Gains Amount:</label>
            <p id="out1">{`${formatCurrency(capitalGainsAmount)}`}</p>
          </div>
          <div>
            <p id="out2">Net Capital Gains Amount {`${formatCurrency(netCapitalGains)}`}</p>
          </div>
        </div>
        <div className="column">
          <div>
            <label>Country</label>
            <select>
              <option value="Country">Australia</option>
            </select>
          </div>
          <div>
            <label>Sale Price:</label>
            <input
              type="text"
              value={formatCurrency(salePrice)}
              onChange={(e) => setSalePrice(Number(e.target.value.replace(/\$/g, '').replace(/,/g, '')))
              }
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
            <label>Tax Rate:</label>
            <p id="out1">{taxRate}</p>
          </div>
          <div>
            <label>Discount for long-term gains:</label>
            {investmentType === 'Long Term' && <p id="out1">{`${formatCurrency(longTermDiscount)}`}</p>}
          </div>
          <div>

            <p id="out3">Tax you need to pay {`${formatCurrency(taxToPay)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
