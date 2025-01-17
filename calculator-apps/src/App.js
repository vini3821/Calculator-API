import React, { useState } from "react";
import axios from "axios"; 
import "./App.css"; 

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value); 
  };

  const clearInput = () => {
    setInput("");
    setResult(""); 
  };

  const calculate = async () => {
    try {
      const match = input.match(/^(\d+\.?\d*)([+\-*/])(\d+\.?\d*)$/);
      if (!match) {
        setResult("Error");
        return;
      }

      const [, num1, operator, num2] = match;

      const route = {
        "+": "/soma",
        "-": "/subtracao",
        "*": "/multiplicacao",
        "/": "/divisao",
      }[operator];

      
      const response = await axios.post(`http://localhost:3000${route}`, {
        num1: parseFloat(num1),
        num2: parseFloat(num2),
      });

      
      setResult(response.data.result);
    } catch (error) {
      setResult("Erro");
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        {result || input || "0"} {}
      </div>
      <div className="buttons">
        {[
          "7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "0", ".", "=", "+",
        ].map((btn) => (
          <button
            key={btn}
            onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
          >
            {btn}
          </button>
        ))}
        <button onClick={clearInput} className="clear">
          C
        </button>
      </div>
    </div>
  );
};

export default Calculator;
