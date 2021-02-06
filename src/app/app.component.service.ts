import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AppComponentService {
  Url = "https://api.spacexdata.com/v3/launches?limit=100";

  constructor(private Http: HttpClient) {}

  getMissions() {
    return this.Http.get(this.Url);
  }
  
  getAllFilter(launch_year: string, launch_success: string, landSuccess: string) {
    return this.Http.get(this.Url +"&launch_year=" +launch_year +"&launch_success="+launch_success +"&land_success=" +landSuccess);
  }

  getLaunchFilter(launch_success: string) {
    return this.Http.get(this.Url + "&launch_success=" + launch_success);
  }

  getLandingFilter(land_success: string){
    return this.Http.get(this.Url + "&land_success=" + land_success);
  }

  getYearFilter(launch_year: string){
    return this.Http.get(this.Url + "&launch_year=" + launch_year);
  }

}
