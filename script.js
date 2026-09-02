const display = document.getElementById("display");
let expression = "";

function updateDisplay(value) {
  display.value = value || "0";
}

document.querySelector(".buttons").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const value = button.dataset.value;
  const action = button.dataset.action;

  if (action === "clear") {
    expression = "";
    updateDisplay(expression);
    return;
  }

  if (action === "delete") {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
    return;
  }

  if (action === "equals") {
    try {
      const safeExpression = expression.replace(/%/g, "/100");
      if (!/^[0-9+\-*/.()\s]+$/.test(safeExpression)) throw new Error();
      const result = Function('"use strict"; return (' + safeExpression + ')')();
      if (!Number.isFinite(result)) throw new Error();
      expression = String(Math.round((result + Number.EPSILON) * 1e10) / 1e10);
      updateDisplay(expression);
    } catch {
      expression = "";
      updateDisplay("Error");
    }
    return;
  }

  if (value) {
    if (display.value === "Error") expression = "";
    expression += value;
    updateDisplay(expression);
  }
});
