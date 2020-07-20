import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';

declare var M:any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService],
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService :EmployeeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }
 
  resetForm(form?: NgForm){
    if(form)
    form.reset(); 
    this.employeeService.selectedEmployee={
      EmpID:null,
      Name:"",
      EmpCode:"",
      Salary:null
    }
  }
  onSubmit(form:NgForm){
    if(form.value.EmpID != "SELECT EmpID FROM employee"){
     this.employeeService.postEmployee(form.value).subscribe((res)=>{
       this.resetForm(form);
       this.refreshEmployeeList();
       M.toast({html:'added successfully',classes:'rounded'})
     });
  }
  else if(form.value.EmpID == "SELECT EmpID from employee"){
    this.employeeService.putEmployee(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({html:'Updated Successfully',classes:'rounded'})
    });
  }
}
  
  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res)=>{
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp : Employee){
    this.employeeService.selectedEmployee = emp;
  }

 onDelete(EmpID:number,form:NgForm){
    if(confirm("sure you want delete record ?")==true){
      this.employeeService.deleteEmployee(EmpID).subscribe((res)=>{
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({html:'Delete Successfully',classes:'rounded'})
      });
    }
 } 
}

