import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  config: Config = {
    answerMax: 5,
    numCount: 2,
    numMax: 5,
    kousuan: false
  };
  formulas: Formula[];
  studying: boolean;
  kousuaning: boolean;
  writing: boolean;
  complete: boolean;
  time: number;
  private startTime: number;
  private formulaCount = 20;

  constructor() { }

  get usedTime() {
    const min = Math.floor(this.time / 60);
    const secend = Math.ceil(this.time - min * 60);
    return min > 0 ? `${min}分钟${secend}秒` : `${secend}秒`;
  }

  get result() {
    const right = this.formulas
      .filter(f => f.value === f.answer)
      .length;
    return `对${right}题，错${this.formulaCount - right}题`;
  }

  ngOnInit(): void {
    const config = localStorage.getItem('kousuan-config');
    if (config) {
      this.config = JSON.parse(config);
    }
    this.formulas = (new Array(this.formulaCount).fill(1).map(el => this.getEquation(this.config)));
  }

  genFormulas() {
    this.initStatus();
    localStorage.setItem('kousuan-config', JSON.stringify(this.config));
    this.formulas = (new Array(24).fill(1).map(el => this.getEquation(this.config)));
    for (let i = 0; i < 20; i++) {
      if (i > 9) {

      }
    }
  }

  start() {
    this.initStatus();
    this.formulas.forEach(formula => formula.value = null);
    this.time = null;
    this.startTime = Date.now();
    this.kousuaning = true;
    this.studying = true;
  }

  completeKS() {
    this.time = (Date.now() - this.startTime) / 1000;
    this.startTime = null;
    this.kousuaning = false;
    if (this.config.kousuan) {
      this.complete = true;
      this.studying = false;
    }
  }

  write() {
    this.kousuaning = false;
    this.writing = true;
  }

  submit() {
    this.complete = true;
    this.studying = false;
    this.writing = false;
  }

  private initStatus() {
    this.studying = false;
    this.kousuaning = false;
    this.writing = false;
    this.complete = false;
  }

  private getEquation(config: Config): Formula {
    const el = [];
    let calcEls = [];
    const answer = this.randomNum(0, config.answerMax);
    const num0 = this.randomNum(1, config.numMax);
    el.push(num0);
    calcEls.push(num0);
    const opCount = config.numCount - 1;
    for (let i = 1; i <= opCount; i++) {
      const ans = i === opCount ? answer : undefined;
      const num1 = el.length === 1 ? num0 : calcEls[2];
      calcEls = this.getNumber(num1, config.numMax, ans);
      el.push(calcEls[0]);
      el.push(calcEls[1]);
    }
    const negativeIndex = el.findIndex(n => typeof n === 'number' && n < 0);
    if (negativeIndex > 0) {
      const negativeNumer = el[negativeIndex];
      el.splice(negativeIndex - 1, 2);
      el.unshift('+');
      el.unshift(Math.abs(negativeNumer));
      el
        .filter(n => typeof n === 'string')
        .forEach(n => n = n === '+' ? '-' : '+');
    }
    return { answer, el };
  }

  private getNumber(num1: number, numMax: number, answer?: number) {
    let num2: number;
    let num3: number;
    let plus: boolean;
    if (answer !== undefined) {
      if (num1 > answer) {
        plus = false;
      } else {
        plus = Math.round(Math.random()) === 1 ? true : false;
      }
      num3 = answer;
      num2 = plus
        ? num3 - num1
        : num1 - num3;
    } else {
      num2 = this.randomNum(0, numMax);
      if (num2 > num1) {
        plus = true;
      } else {
        plus = Math.round(Math.random()) === 1 ? true : false;
      }
      num3 = plus
        ? num1 + num2
        : num1 - num2;
    }
    return [plus ? '+' : '-', num2, num3];
  }

  private randomNum(minNum: number, maxNum: number) {
    switch (arguments.length) {
      case 1:
        const num1 = (Math.random() * minNum + 1).toString();
        return parseInt(num1, 10);
      case 2:
        const num2 = (Math.random() * (maxNum - minNum + 1) + minNum).toString();
        return parseInt(num2, 10);
      default:
        return 0;
    }
  }

}

export interface Formula {
  el: any[];
  answer: number;
  value?: number;
}

interface Config {
  answerMax: number;
  numCount: number;
  numMax: number;
  kousuan: boolean;
}


