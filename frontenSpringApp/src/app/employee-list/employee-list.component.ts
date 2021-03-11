import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees!: Employee[];
  constructor(private employeeService:EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.onGetEmployeeList();
  }
 private onGetEmployeeList(){
     this.employeeService.getEmployeeList().subscribe(data=>{
       this.employees=data
     });
  }

  updateEmployee(id:number){
    this.router.navigate(['/update-employee', id]);
  }
  onDeleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe(
      data=>console.log(data),
      error=>console.log(error)
    );
    this.onGetEmployeeList();
  }
  onDetailsEmployee(id:number){
    this.router.navigate(['/employee-details', id]);

  }
}
