import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private exerciseSubscription$!: Subscription;

  displayColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService){}
  
  ngOnInit(): void {
    
    this.trainingService.fetchCompletedOrCancelledExercises();
    this.exerciseSubscription$ = this.trainingService.getCompletedOrCancelledExercises()
    .subscribe( (exercises: Exercise[]) => {
      this.dataSource.data = exercises
    });
  }
  
  ngOnDestroy(): void {
    this.exerciseSubscription$.unsubscribe();
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
