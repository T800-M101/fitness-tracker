import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component ';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer'
;
import { take } from 'rxjs';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  selectedExercise!: Exercise | null;
  progress = 0;
  timer!: any;
 

  constructor(
    private dialog: MatDialog, 
    private trainingService: TrainingService, 
    private router: Router,
    private store: Store<fromTraining.State>){}
  
  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(): void {
    this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe((exercise: Exercise) => {
      this.selectedExercise = exercise;
      const step = (this.selectedExercise!.duration / 100) * 1000;

      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
         clearInterval(this.timer);
         this.router.navigate(['training']);
        }
     }, step);

    });
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result){
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
