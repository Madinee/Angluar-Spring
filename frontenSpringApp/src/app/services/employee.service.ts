import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl="http://localhost:8080/api/v1/employees";

  constructor(private httpClient:HttpClient) { }

  getEmployeeList():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseUrl}`);
  }
  getEmployeeById(id:number):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`);

  }
  createEmployee(employee:Employee):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, employee);
  }

  updateEmployee(id:number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`,employee);
  }
  deleteEmployee(id:number):Observable<Object>{
    return this.httpClient.delete<Employee>(`${this.baseUrl}/${id}`);
  }

  deleteAllEmployee():Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}`);
  }
}
