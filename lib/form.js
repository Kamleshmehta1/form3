class Form {
  constructor(formContainerId, formData) {
    this.renderForm(formContainerId, formData);
    // Pass formContainerId to append form element inside of HTML DIV element
  }
  // create methods/event to create form/ reset form/ submit form, etc

  renderForm(formContainerId, formData) {
    formData.forEach((ele) => {
      let input = document.createElement("input");

      if (ele.type !== "submit" && ele.type !== "reset") {
        if (ele.type !== "select") {
          input.classList = "inputBox";
        }
      } else {
        input.classList = "buttonEvent";
      }
      let label = document.createElement("label");
      if (ele.attr && ele.type !== "hidden") {
        label.setAttribute("for", `${ele.attr.id}`);
        if (ele.type != "select") {
          input.setAttribute("id", `${ele.attr.id}`);
        }
      }
      let left = document.createElement("div");
      left.classList = "left";
      let right = document.createElement("div");
      right.classList = "right";
      let labelInput = document.createElement("div");
      labelInput.id = "inputLabel";

      if (ele.type !== "hidden") {
        if (ele.type !== "submit" && ele.type !== "reset") {
          label.innerText = `${ele.label}`;
          left.appendChild(label);
        }
        if (
          ele.type !== "select" &&
          ele.type !== "radio" &&
          ele.type !== "checkbox"
        ) {
          if (ele.type) {
            input.setAttribute(
              `${this.getKeyByValue(ele, ele.type)}`,
              `${ele.type}`
            );
          }
          if (ele.attr) {
            for (let x in ele.attr) {
              if (typeof ele.attr[x] === "function") {
                input.setAttribute(`${x}`, `callMe(${ele.attr[x]})`);
              } else {
                input.setAttribute(`${x}`, `${ele.attr[x]}`);
              }
            }
          }
          right.appendChild(input);
        }
        if (ele.type === "select") {
          this.createSelect(ele, right);
        }
        labelInput.appendChild(left);
        labelInput.appendChild(right);
      }

      if (ele.type === "radio") {
        this.createToggleButtons(ele.options, ele, right);
      }

      if (ele.type === "checkbox") {
        this.createToggleButtons(ele.options, ele, right);
      }
      formContainerId.appendChild(labelInput);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("submit called");
  }
  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  createSelect(ele, right) {
    let select = document.createElement("select");
    if (ele.options) {
      ele.options.forEach((ele) => {
        let option = document.createElement("option");
        option.innerText = `${ele.innerText}`;
        option.setAttribute("value", `${ele.value}`);
        select.appendChild(option);
      });
    }
    for (let x in ele.attr) {
      if (typeof ele.attr[x] === "function") {
        select.setAttribute(
          `${this.getKeyByValue(ele.attr, ele.attr[x])}`,
          `this.callMe(${ele.attr[x]})`
        );
      }
      select.setAttribute(`${x}`, `${ele.attr[x]}`);
    }
    right.appendChild(select);
  }

  // create radio buttons
  createToggleButtons(options, ele, right) {
    options.forEach((item) => {
      let label = document.createElement("label");
      let input = document.createElement("input");
      let div = document.createElement("div");
      label.setAttribute(
        `${this.getKeyByValue(item, item.value)}`,
        `${item.value}`
      );
      label.innerText = item.innerText;
      for (let x in item.attr) {
        if (x === "innerText") {
          label.innerText = x;
        } else {
          input.setAttribute(
            `${this.getKeyByValue(ele, ele.type)}`,
            `${ele.type}`
          );
          input.setAttribute(
            `${this.getKeyByValue(item, item.name)}`,
            `${item.name}`
          );
          if (item.value === item.attr[x]) {
            label.setAttribute("for", `${item.attr[x]}`);
          }
          if (typeof item.attr[x] == "function") {
            input.setAttribute(`${x}`, this.callMe(item.attr[x]));
          } else {
            input.setAttribute(`${x}`, `${item.attr[x]}`);
          }
        }
      }
      div.appendChild(input);
      div.appendChild(label);
      right.appendChild(div);
      right.appendChild(div);
    });
  }

  // call-back function
  callMe(e) {
    console.log(e);
  }
}
