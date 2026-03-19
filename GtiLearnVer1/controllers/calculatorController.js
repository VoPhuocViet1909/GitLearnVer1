const CalculatorModel = require("../models/calculatorModel");

exports.showForm = (req, res) => {
  res.render("index", {
    title: "MVC Calculator",
    error: null,
    values: { a: "", b: "", operation: "add" },
  });
};

exports.calculate = (req, res) => {
  const { a, b, operation } = req.body;
  const numA = Number(a);
  const numB = Number(b);

  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    return res.status(400).render("index", {
      title: "MVC Calculator",
      error: "Please enter valid numbers.",
      values: { a, b, operation },
    });
  }

  let result;
  if (operation === "add") {
    result = CalculatorModel.add(numA, numB);
  } else if (operation === "subtract") {
    result = CalculatorModel.subtract(numA, numB);
  } else {
    return res.status(400).render("index", {
      title: "MVC Calculator",
      error: "Operation is not supported.",
      values: { a, b, operation: "add" },
    });
  }

  return res.render("result", {
    title: "Result",
    a: numA,
    b: numB,
    operation,
    result,
  });
};
