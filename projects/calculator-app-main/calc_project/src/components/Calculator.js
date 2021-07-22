// import React from "react";
import './calcStyles.css';
import './ButtonColor.css';

import React, { Component } from 'react'

export class Calculator extends Component {
  state = {
    currentTheme: 1,
    currentSymbol: '',
    activeInputScore: '0',
    secondaryInputScore: '',
    previousExpression: '',
    previousAnswer: '',
    symbolSelected: false
  }
  changeInput = (currNum) => {
    this.setState({ activeInputScore: currNum.target.value })
    // console.log(currNum.target.value)
  }
  changeTheme(theme) {
    this.setState({
      currentTheme: theme
    })
    // console.log("body---" + this.state.currentTheme)
  }

  reset = () => {
    this.setState({ activeInputScore: '', secondaryInputScore: '', currentSymbol: '', symbolSelected: false })
  }

  del = () => {
    this.setState({ activeInputScore: '' })
  }

  getNum = () => {
    // debugger

    let b = this.state.activeInputScore;
    let a = this.state.secondaryInputScore;
    let result = 0;
    let operation = this.state.currentSymbol;
    let previousExpression = ''
    let previousAnswer = ''
    a = Number(a)
    b = Number(b)


    switch (operation) {
      case "+":
        // debugger
        // this.setState({ activeInputScore: '' })
        result = this.sum(a, b);
        break;
      case "-":
        result = this.subtract(a, b);
        break;
      case "*":
        result = this.multiply(a, b);
        break;
      case "/":
        result = this.divide(a, b);
        break;

      default:
        result = 0;
        break;
    }
    previousAnswer = result;
    previousExpression = a + ' ' + operation + ' ' + b + ' ='
    this.setState({
      secondaryInputScore: previousExpression,
      activeInputScore: result,
      previousExpression: previousExpression,
      previousAnswer: previousAnswer,
    });
    // 5 * 10 =
    // 5*10=

  }
  // this.setState({ secondaryInputScore: this.state.activeInputScore })

  sum = (a, b) => {
    // this.setState({ activeInputScore: '' })
    return a + b;
  }


  subtract = (a, b) => {
    return a - b;
  }

  divide = (a, b) => {
    return a / b;
  }

  multiply = (a, b) => {
    return a * b;
  }

  swap = () => {
    this.setState({
      secondaryInputScore: this.state.activeInputScore
    }
    )
    // return "you did not return a value so  nothing will log to the console!"
  }

  getIndividualNums = (e) => {
    this.setState({
      activeInputScore: this.state.activeInputScore + e.target.innerHTML
    })
  }

  changeSymbol = (e) => {
    e.preventDefault()
    if (this.state.secondaryInputScore !== '') {

    } else {
      this.swap()
    }
    if (this.state.previousExpression === this.state.secondaryInputScore) {
      this.swap()
    }
    console.log(this.state.previousExpression)
    // else
    this.setState(
      { currentSymbol: e.target.innerHTML, symbolSelected: true, activeInputScore: '' }
    )
    console.log(this.state.currentSymbol)
  }
  render() {
    return (
      <div className={"body---" + this.state.currentTheme}>
        {/* <div className={"body---" + this.state.currentTheme}> */}
        <div className={"box---" + this.state.currentTheme}>
          <div className="container">
            <div className="txt">calc</div>
            <div className={"form-switch-a---" + this.state.currentTheme} data-toggle="radio" role="group">
              <p className="themeToggle">theme</p>
              <label className="new-button" onClick={() => { this.changeTheme(1) }}>
                <div className="numAlign">1</div>
                <input type="radio" name="options" id="option1" defaultChecked />
                <div className={"dot-check---" + this.state.currentTheme}></div>
              </label>
              <label className="new-button" onClick={() => { this.changeTheme(2) }}>
                <div className="numAlign">2</div>
                <input type="radio" name="options" id="option2" />
                <div className={"dot-check---" + this.state.currentTheme}></div>
              </label>
              <label className="new-button" onClick={() => { this.changeTheme(3) }}>
                <div className="numAlign">3</div>
                <input type="radio" name="options" id="option3" />
                <div className={"dot-check---" + this.state.currentTheme}></div>
              </label>
            </div>
          </div>

          <main className="calcPortion">
            <div className="row">
              <div className={"row---" + this.state.currentTheme}>
                <input type="number" name="num" id="#" value={this.state.activeInputScore} onChange={this.changeInput} />
                <div className="inputScore">{this.state.secondaryInputScore}</div>
                <div className="currSign">{this.state.currentSymbol}</div>
              </div>
              <div className={"row2---" + this.state.currentTheme}>
                <button className={"button---" + this.state.currentTheme} onClick={this.getIndividualNums}>7</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.getIndividualNums}>8</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.getIndividualNums}>9</button>
                <button className={"button---" + this.state.currentTheme + " item4---" + this.state.currentTheme} onClick={this.del}>DEL</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.getIndividualNums}>4</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.getIndividualNums}>5</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.getIndividualNums}>6</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.changeSymbol}>+</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.getIndividualNums}>1</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.getIndividualNums}>2</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.getIndividualNums}>3</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.changeSymbol}>-</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.getIndividualNums}>.</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.getIndividualNums}>0</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.changeSymbol}>/</button>
                <button className={"button---" + this.state.currentTheme} onClick={this.changeSymbol}>*</button>
                <button className={"button---" + this.state.currentTheme + " item17---" + this.state.currentTheme} onClick={this.reset}>RESET</button>
                <button className={"button---" + this.state.currentTheme + " item18---" + this.state.currentTheme} onClick={this.getNum}>=</button>
              </div>
            </div>
          </main>
        </div>
      </div>

    )
  }
}

export default Calculator
