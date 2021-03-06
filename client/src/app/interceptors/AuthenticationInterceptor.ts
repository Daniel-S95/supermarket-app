import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let wholeToken: string | null = localStorage.getItem("token");

    if (wholeToken) {
      let token = JSON.parse(wholeToken).token;

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
