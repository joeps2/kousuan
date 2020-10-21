import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    public el: any[],
  ) { }

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
    const value = this.value ? Number(this.value) : '?';
    this.dialogRef.close(value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
