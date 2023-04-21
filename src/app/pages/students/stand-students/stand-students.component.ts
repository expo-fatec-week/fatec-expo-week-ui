import { Component, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { Student } from 'src/app/models/student';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-stand-students',
  templateUrl: './stand-students.component.html',
  styleUrls: ['./stand-students.component.scss']
})
export class StandStudentsComponent implements OnInit {

  public isBlock = false;
  public students: Student[] = [];

  constructor(
    private studentService: StudentsService
  ) { }

  ngOnInit(): void {
    this.isBlock = true;
    this.studentService.listStudents()
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          this.students = success;
        }
      );
  }

}
