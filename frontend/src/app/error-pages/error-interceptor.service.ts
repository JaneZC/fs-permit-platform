import { Injectable } from '@angular/core';
import { HttpEvent, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;
    const request = req;
    return next.handle(req).catch((err: HttpErrorResponse) => {
      if (err.status === 404) {
        this.router.navigate(['/404']);
      } else if (err.status === 0) {
        if (url.indexOf('forest') > -1) {
          this.router.navigate(['/christmas-trees/forests']);
        }
        this.router.navigate(['/']);
      }
      return Observable.throw(err);
    });
  }
}