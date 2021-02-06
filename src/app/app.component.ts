import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponentService } from "./app.component.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  missions: any;
  launchYears: any = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
  missionCount = 0;
  launch: string = '';
  landing: string = '';
  year: string = "";

  constructor(private router: Router, private AppComponentService: AppComponentService, private route: ActivatedRoute) {
    this.router.navigate([""], {
      queryParams: { limit: 100, year: "", land_status: "", launch_status: "" },
    });
   }

  ngOnInit() {
    this.route.queryParams.subscribe(val => {
      console.log('value', val)
      if (val.year && val.launch_status && val.land_status) {
        this.AppComponentService.getAllFilter(val.year, val.launch_status, val.land_status).subscribe((data: any) => {
          this.missions = data;
          this.missionCount = this.missions.length;
        })
      }
      if (val.year && val.launch_status === "" && val.land_status === "") {
        this.AppComponentService.getYearFilter(val.year).subscribe((data: any) => {
          this.missions = data;
          this.missionCount = this.missions.length;
        })
      }
      if (val.year && val.launch_status === "" && val.land_status) {
        this.AppComponentService.getAllFilter(val.year, val.launch_status, val.land_status).subscribe((data: any) => {
          this.missions = data;
          this.missionCount = this.missions.length;
        })
      }
      if (val.year && val.launch_status && val.land_status === "") {
        this.AppComponentService.getAllFilter(val.year, val.launch_status, val.land_status).subscribe((data: any) => {
          this.missions = data;
          this.missionCount = this.missions.length;
        })
      }
      if (val.year === "" && val.launch_status && val.land_status === "") {
        this.AppComponentService.getLaunchFilter(val.launch_status).subscribe((data: any) => {
          this.missions = data;
          this.missionCount = this.missions.length;
        })
      }
      if (val.year === "" && val.launch_status === "" && val.land_status) {
        this.AppComponentService.getLandingFilter(val.land_status).subscribe((data: any) => {
          this.missions = data;
          this.missionCount = this.missions.length;
        })
      }
      if (val.year === "" && val.launch_status === "" && val.land_status === "") {
        this.getAllMissions();
      }
    })
  }

  yearSelected(year: string) {
    if (this.year === year) {
      this.year = ""
      this.router.navigate([""], {
        queryParams: { limit: 100, year: "", land_status: this.landing, launch_status: this.launch },
      });
    }
    else {
      this.year = year;
      this.router.navigate([""], {
        queryParams: { limit: 100, year: this.year, land_status: this.landing, launch_status: this.launch },
      });
    }
  }

  launchSelected(value: any) {
    if (this.launch === value) {
      this.launch = ""
      this.router.navigate([""], {
        queryParams: { limit: 100, year: this.year, land_status: this.landing, launch_status: "" },
      });
    }
    else {
      this.launch = value;
      this.router.navigate([""], {
        queryParams: { limit: 100, year: this.year, land_status: this.landing, launch_status: this.launch },
      });
    }
  }

  landSelected(value: any) {
    if (this.landing === value) {
      this.landing = ""
      this.router.navigate([""], {
        queryParams: { limit: 100, year: this.year, land_status: "", launch_status: this.launch },
      });
    }
    else {
      this.landing = value;
      this.router.navigate([""], {
        queryParams: { limit: 100, year: this.year, land_status: this.landing, launch_status: this.launch },
      });
    }
  }

  getAllMissions() {
    this.AppComponentService.getMissions().subscribe((data: any) => {
      this.missions = data;
      this.missionCount = data.length;
    });
  }
}
