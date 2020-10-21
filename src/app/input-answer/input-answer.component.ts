import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Formula } from '../calc/calc.component';

@Component({
  selector: 'app-input-answer',
  templateUrl: './input-answer.component.html',
  styleUrls: ['./input-answer.component.scss']
})
export class InputAnswerComponent implements OnInit {

  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  value = '';

  constructor(
    public dialogRef: MatDialogRef<InputAnswerComponent>,
    @Inject(MAT_DIALOG_DATA)
    public formula: Formula,
  ) {
    if (formula.value !== '?') {
      this.value = formula.value.toString();
    }
  }

  ngOnInit() {
  }

  input(num: number) {
    this.value = `${this.value}${num}`;
  }

  backspace() {
    const length = this.value.length;
    if (length > 0) {
      this.value = this.value.slice(length - 2, length - 1);
    }
  }

  confirm() {
    this.dialogRef.close(Number(this.value));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
