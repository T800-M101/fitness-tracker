import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  
  exercises!: Exercise[];
  exerciseSubscription$!: Subscription;


  constructor(private trainingService: TrainingService) {}
  
  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();
    this.exerciseSubscription$ = this.trainingService.getAvailableExercises()
    .subscribe((exercises: any) => {
      this.exercises = exercises;
    });
  }
  
  ngOnDestroy(): void {
    this.exerciseSubscription$.unsubscribe();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
