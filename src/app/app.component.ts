import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { LaunchDataService } from './launch-data.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchForm!:FormGroup;
  tableDataSets:any = null
  constructor(private launchData : LaunchDataService) {
     this.launchData.getLaunchData().subscribe(data => {
      this.tableDataSets = data
     })
  }

  
  get searchField() { return this.searchForm.get('searchField')?.value }

  ngOnInit() {
   this.searchForm = new FormGroup({
  'successField' : new FormControl(false),
  'failureField' : new FormControl(false),
  'searchField' : new FormControl(''),
    }) 
  }


  ngAfterViewInit(){

    this.searchForm.controls['searchField'].valueChanges
                                           .pipe(debounceTime(500))
                                           .pipe(distinctUntilChanged())
                                          .subscribe(data => {
                                             this.launchData.getLaunchDataWithFilters(this.searchForm,data).subscribe(launchResult => {
                                              if(launchResult.length > 0) {
                                                this.tableDataSets = launchResult
                                              } else {
                                                this.tableDataSets = null
                                              }
                                              
                                             })
                                          })
  }

  



}
