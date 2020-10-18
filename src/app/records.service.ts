import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { HttpHeaders } from '@angular/common/http';
import { Data } from './data';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
  // providedIn: 'root'
export class RecordsService {

  private _url1: string = "https://cs251-outlab-6.herokuapp.com/initial_values/";
  private _url2: string = "https://cs251-outlab-6.herokuapp.com/add_new_feedback/";
  
  // httpOptions: {
    // headers: new HttpHeaders({
    //   'Content-Type':  'application/json',
    //   Authorization: 'my-auth-token'
    // }),
    // responseType?: 'json',
    // more to be added
  // };

  constructor(private http: HttpClient) { }

  getData(): Observable<Data> {
    return this.http.get<Data>(this._url1)
    .pipe(
      retry(1),
      catchError(this.handleError),
    );
  }

  postData(data: Data): Observable<Data> {
    const headers = { 'content-type': 'application/json' };
   const body = JSON.stringify(data);
    // console.log(body);
    return this.http.post<Data>(this._url2, body, {'headers': headers});
      //.pipe(
       // retry(1),
        //catchError(this.handleError),
      //);

      //.toPromise().then(function (data: any) {console.log(data);});
  }

  handleError(error: any) {
    let errorMessage = '';
 
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`; 
    }
    else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
