import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee:Employee=new Employee();
  id!:number;
  constructor(private employeeService:EmployeeService,
    private route:ActivatedRoute, 
    ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'],
    this.employeeService.getEmployeeById(this.id).subscribe(
      data=>{this.employee=data;
            console.log(data)},
      error=>console.log(error)
    );
  }
}
