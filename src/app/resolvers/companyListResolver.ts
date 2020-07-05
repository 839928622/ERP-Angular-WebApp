import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Company } from '../models/company';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyListResolver implements Resolve<Company[]> {

  constructor(private router: Router, private alertify: AlertifyService,
              private customerService: CustomerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Company[]> {
    return this.customerService.readCompanyList().pipe(
        catchError(error => {
           this.alertify.alert('加载公司信息出错', '' + error) ;
           this.router.navigate(['/nav']);
           return of(null);
        })
    );
}

}
