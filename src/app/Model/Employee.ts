//var names based on employee_data.xlsx
//10 field match with first row - 10 columns
export class Employee {
  constructor(public first_name: string, public last_name: string,public company_name: string,public address: string,
    public city: string,public county: string,public postal: string,public phone: string,public email: string, public web: string){}
}
