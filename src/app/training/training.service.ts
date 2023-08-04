import { Observable, Subscription } from "rxjs";
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { UIService } from "../shared/ui.service";
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService { 

    private fbSubscription: Subscription[] = [];

    constructor(
        private db: AngularFirestore, 
        private uiService: UIService, 
        private store: Store<fromTraining.State>
        ){}
    
    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubscription.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(map((docData: any) => {
                return docData.map((doc: any) => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data().name,
                        duration: doc.payload.doc.data().duration,
                        calories: doc.payload.doc.data().calories,
                    }
                });
            }))
            .subscribe({
                next: (exercises: Exercise[]) => {
                    this.store.dispatch(new UI.StopLoading());
                    this.store.dispatch(new Training.SetAvailableExercises(exercises));
                },
                error: () => {
                    this.store.dispatch(new UI.StopLoading());
                    this.uiService.showSnackBar('Fetching exercises failed, please try again later.', undefined, 3000);
                }
            }));

    }


    startExercise(selectedId: string) {
        this.store.dispatch(new Training.StartExercise(selectedId));
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe((exercise:Exercise) => {
            this.addDataToDatabase({
                ...exercise, 
                date: new Date(), 
                state: 'completed' 
            });
            this.store.dispatch(new Training.StopExercise());
        });
    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe((exercise:Exercise) => {
            this.addDataToDatabase({
                ...exercise,
                duration: exercise.duration * (progress / 100),
                calories: exercise.calories * (progress / 100), 
                date: new Date(), 
                state: 'cancelled' 
            });
        });

        this.store.dispatch(new Training.StopExercise());
    }

    
    fetchCompletedOrCancelledExercises(): void {
       this.fbSubscription.push(this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: any[]) => {
            this.store.dispatch(new Training.SetFinishedExercises(exercises));
        }));

    }

    cancelSubscriptions(): void {
        if(this.fbSubscription) {
            this.fbSubscription.forEach(subs => {
                subs.unsubscribe();
            });
        }
    }

    private addDataToDatabase(exercise:Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }

}