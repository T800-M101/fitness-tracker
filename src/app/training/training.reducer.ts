import { Exercise } from './exercise.model';
import { TrainingActions, SET_AVAILABLE_EXERCISES, SET_FINISHED_EXERCISES, START_EXERCISE, STOP_EXERCISE } from './training.actions'; 
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeExercise: Exercise;
}

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeExercise: null
}

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch(action.type) {
        case SET_AVAILABLE_EXERCISES:
            return {
                ...state,
                availableExercises: action.payload  
            };
        case SET_FINISHED_EXERCISES:
            return {
                ...state,
                finishedExercises: action.payload  
            };
        case START_EXERCISE:
            return {
                ...state,
                activeExercise: {...state.availableExercises.find(ex => ex.id === action.payload)}
            };
        case STOP_EXERCISE:
            return {
                ...state,
                activeExercise: null  
            };
        default: {
            return state;
        }
        
    }

}


export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailablExercises = createSelector(getTrainingState,(state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveExercise = createSelector(getTrainingState, (state: TrainingState) => state.activeExercise);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeExercise !== null);
