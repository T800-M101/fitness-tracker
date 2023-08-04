import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  displayColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>){}
  
  ngOnInit(): void {
    
    this.store.select(fromTraining.getFinishedExercises)
    .subscribe( (exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }
  

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(e: any): void {
    const filterValue = e.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
