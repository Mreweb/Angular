import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { HandleErrorService } from "./HandleErrorService";

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private error: HandleErrorService, private toastr: ToastrService) { }
    // intercept function
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // returning an observable to complete the request cycle

        const clonedRequest = req.clone({ withCredentials: true });
        // Pass the cloned request instead of the original request to the next handle
        //return next.handle(clonedRequest);


        return new Observable((observer) => {
            next.handle(clonedRequest).subscribe(
                (res: any) => {
                    if (res instanceof HttpResponse) {
                        observer.next(res);
                    }
                },
                (err: HttpErrorResponse) => {
                    this.error.handleError(err);
                }
            );
        });
    }
} 