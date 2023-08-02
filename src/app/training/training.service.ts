import { Observable, Subject, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { UIService } from "../shared/ui.service";

@Injectable()
export class TrainingService { 
    private exerciseChanged$ = new Subject<Exercise | null>();
    private exercisesChanged$ = new Subject<Exercise[]>();
    private finishedExercisesChanged$ = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];
    private runningExercise!: Exercise;
    private fbSubscription: Subscription[] = [];

    constructor(private db: AngularFirestore, private uiService: UIService){}
    
    fetchAvailableExercises() {
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
                    this.availableExercises = exercises;
                    this.exercisesChanged$.next([...this.availableExercises]);
                },
                error: () => {
                    this.uiService.loadingStateChanged$.next(false);
                    this.uiService.showSnackBar('Fetching exercises failed, please try again later.', undefined, 3000);
                    this.exercisesChanged$.next([]);
                }
            }));

    }


    

    getCompletedOrCancelledExercises(): Observable<Exercise[]> {
        return this.finishedExercisesChanged$.asObservable();
    }


    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId)!;
        this.exerciseChanged$.next({...this.runningExercise})
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise, 
            date: new Date(), 
            state: 'completed' 
        });
        this.exerciseChanged$.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100), 
            date: new Date(), 
            state: 'cancelled' 
        });

        this.exerciseChanged$.next(null);
    }

    getRunningExercise(): Exercise | null{
        if(this.runningExercise) {
            return {...this.runningExercise};
        } else {
            return null
        }
        
    }

    getExerciseChange(): Observable<any>{
        return this.exerciseChanged$.asObservable();
    }
    
    fetchCompletedOrCancelledExercises(): void {
       this.fbSubscription.push(this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: any[]) => {
            this.finishedExercisesChanged$.next(exercises);
        }));

    }

    getAvailableExercises(): Observable<any> {
        return this.exercisesChanged$.asObservable();
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