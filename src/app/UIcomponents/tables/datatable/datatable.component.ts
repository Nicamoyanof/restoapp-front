import { Component } from '@angular/core';
import { GridJsDirective } from '@core/directives/gridjs.directive';

@Component({
  selector: 'app-datatable',
  imports: [GridJsDirective],
  templateUrl: './datatable.component.html',
  styles: ``
})
export class DatatableComponent {
  tableColumns =  ["ID","Name", "Email", "Position", "Company","Country"];  // Define column headers
  paginationColumn =  ["ID","Name", "Date", "Total"];  // Define column headers
 searchColumn =  ["ID","Name", "Position", "Company","Country"];  // Define column headers

  basic = [
    ["11", "Alice", "alice@example.com", "Software Engineer", "ABC Company", "United States"],
    ["12", "Bob", "bob@example.com", "Product Manager", "XYZ Inc", "Canada"],
    ["13", "Charlie", "charlie@example.com", "Data Analyst", "123 Corp", "Australia"],
    ["14", "David", "david@example.com", "UI/UX Designer", "456 Ltd", "United Kingdom"],
    ["15", "Eve", "eve@example.com", "Marketing Specialist", "789 Enterprises", "France"],
    ["16", "Frank", "frank@example.com", "HR Manager", "ABC Company", "Germany"],
    ["17", "Grace", "grace@example.com", "Financial Analyst", "XYZ Inc", "Japan"],
    ["18", "Hannah", "hannah@example.com", "Sales Representative", "123 Corp", "Brazil"],
    ["19", "Ian", "ian@example.com", "Software Developer", "456 Ltd", "India"],
    ["20", "Jane", "jane@example.com", "Operations Manager", "789 Enterprises", "China"]
  ]

  pagination = [["#RB2320", "Alice", "07 Oct, 2024", "$24.05"],
  ["#RB8652", "Bob", "07 Oct, 2024", "$26.15"],
  ["#RB8520", "Charlie", "06 Oct, 2024", "$21.25"],
  ["#RB9512", "David", "05 Oct, 2024", "$25.03"],
  ["#RB7532", "Eve", "05 Oct, 2024", "$22.61"],
  ["#RB9632", "Frank", "04 Oct, 2024", "$24.05"],
  ["#RB7456", "Grace", "04 Oct, 2024", "$26.15"],
  ["#RB3002", "Hannah", "04 Oct, 2024", "$21.25"],
  ["#RB9857", "Ian", "03 Oct, 2024", "$22.61"],
  ["#RB2589", "Jane", "03 Oct, 2024", "$25.03"],]


  search = [
    ["Alice", "alice@example.com", "Software Engineer", "ABC Company", "United States"],
    ["Bob", "bob@example.com", "Product Manager", "XYZ Inc", "Canada"],
    ["Charlie", "charlie@example.com", "Data Analyst", "123 Corp", "Australia"],
    ["David", "david@example.com", "UI/UX Designer", "456 Ltd", "United Kingdom"],
    ["Eve", "eve@example.com", "Marketing Specialist", "789 Enterprises", "France"],
    ["Frank", "frank@example.com", "HR Manager", "ABC Company", "Germany"],
    ["Grace", "grace@example.com", "Financial Analyst", "XYZ Inc", "Japan"],
    ["Hannah", "hannah@example.com", "Sales Representative", "123 Corp", "Brazil"],
    ["Ian", "ian@example.com", "Software Developer", "456 Ltd", "India"],
    ["Jane", "jane@example.com", "Operations Manager", "789 Enterprises", "China"]
  ]

  sorting = [
    ["Alice", "alice@example.com", "Software Engineer", "ABC Company", "United States"],
    ["Bob", "bob@example.com", "Product Manager", "XYZ Inc", "Canada"],
    ["Charlie", "charlie@example.com", "Data Analyst", "123 Corp", "Australia"],
    ["David", "david@example.com", "UI/UX Designer", "456 Ltd", "United Kingdom"],
    ["Eve", "eve@example.com", "Marketing Specialist", "789 Enterprises", "France"],
    ["Frank", "frank@example.com", "HR Manager", "ABC Company", "Germany"],
    ["Grace", "grace@example.com", "Financial Analyst", "XYZ Inc", "Japan"],
    ["Hannah", "hannah@example.com", "Sales Representative", "123 Corp", "Brazil"],
    ["Ian", "ian@example.com", "Software Developer", "456 Ltd", "India"],
    ["Jane", "jane@example.com", "Operations Manager", "789 Enterprises", "China"]
]
}