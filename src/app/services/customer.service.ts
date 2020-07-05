import { Company } from './../models/company';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient,
              ) { }

  readCustomerByKeyword(keywork: string): Observable<Customer[]>
  {
    return this.httpClient.get<Customer[]>(environment.erpApiBase + '/customer/keyword=' + keywork);
  }


  readCompanyList(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(environment.erpApiBase + '/customer/companylist');
  }
}
