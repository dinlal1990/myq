import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { filter,map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class LaunchDataService {

  constructor(
    private httpCLient : HttpClient
  ) { }

  getLaunchData() : Observable<any> {
    return this.httpCLient.get('https://api.spacexdata.com/v2/launches')
  }

  getLaunchDataWithFilters(signUpForm: FormGroup, missinonName: string) : Observable<any> { 
    let launchSucess: any = null
    if(signUpForm.controls['successField'].value) {
      launchSucess = true
    } else if(signUpForm.controls['failureField'].value) {
      launchSucess = false
    }

    return this.httpCLient.get('https://api.spacexdata.com/v2/launches').pipe(
                                                                        map((result:any)=> {
                                                                          if(launchSucess !== null) {
                                                                            return result.filter((r:any)=> r.mission_name.toLowerCase().includes(missinonName.toLowerCase()) && r.launch_success === launchSucess)
                                                                          } else {

                                                                          }
                                                                         return result.filter((r:any)=> r.mission_name.toLowerCase().includes(missinonName.toLowerCase()))
                                                                  
                                                                        })
    )
  }
    
}
                                                                

                                                                        


