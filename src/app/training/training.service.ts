import { Observable, Subject } from "rxjs";
import { Exercise } from "./exercise.model";

export class TrainingService { 
    private exerciseChanged$ = new Subject<Exercise>();

    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
        { id: 'bridges', name: 'Bridges', duration: 60, calories: 8 },
    ];

    private completedExercises:Exercise[] = [];

    private runningExercise!: Exercise;

    // private setExerciseNull(exercise: Exercise): any {
    //   return exercise = {} as any;
    // } 

    getAvailableExercises(): Exercise[] {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId)!;
        this.exerciseChanged$.next({...this.runningExercise})
    }

    completeExercise() {
        this.completedExercises.push({
            ...this.runningExercise, 
            date: new Date(), 
            state: 'completed' 
        });
        //this.runningExercise = this.setExerciseNull(this.runningExercise);
        this.exerciseChanged$.next(this.runningExercise);
    }

    cancelExercise(progress: number) {
        this.completedExercises.push({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100), 
            date: new Date(), 
            state: 'cancelled' 
        });
    }

    getRunningExercise(): Exercise | null{
        if(this.runningExercise) {
            return {...this.runningExercise};
        } else {
            return null
        }
        
    }

    getExerciseChange(): any{
        return this.exerciseChanged$.asObservable();
    }
    
    getCompletedOrCancelledExercises(): Exercise[] {
        return [...this.completedExercises];
    }

}