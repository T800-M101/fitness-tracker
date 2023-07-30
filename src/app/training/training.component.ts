import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription$!:Subscription;
  
  constructor(private trainingService: TrainingService){}
  
  ngOnInit(): void {
    this.exerciseSubscription$ = this.trainingService.getExerciseChange().subscribe((exercise: Exercise) => {
      exercise ? this.ongoingTraining = true : this.ongoingTraining = false;
    });
  }

  ngOnDestroy(): void {
    this.exerciseSubscription$.unsubscribe();
  }


}
