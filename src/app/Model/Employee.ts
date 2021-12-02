//var names based on employee_data.xlsx
//10 field match with first row - 10 columns
export class Employee {
  constructor(public id: number, public first_name: string, public last_name: string,public company_name: string,public address: string,
    public city: string,public county: string,public postal: string,public phone: string,public email: string, public web: string){}

  public clone(): Employee {
    return new Employee(this.id, this.first_name, this.last_name,this.company_name,this.address,this.city,this.county,this.postal,this.phone,this.email,this.web);
  }

  public change(data: Employee): void {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.company_name = data.company_name;
    this.address = data.address;
    this.city = data.city;
    this.county = data.county;
    this.postal = data.postal;
    this.phone = data.phone;
    this.email = data.email;
    this.web = data.web;
  }
}
