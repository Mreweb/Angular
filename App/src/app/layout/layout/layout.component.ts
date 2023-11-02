import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  adminName = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: BrowserStorageService,
    private toastr: ToastrService
  ) { }



  ngOnInit(): void {
    let userInfo = this.storage.getLocal('userInfo');
    if (userInfo != null && userInfo != undefined) {
      this.adminName = JSON.parse(this.storage.getLocal('userInfo')).name;
    }
  }


  logOut() {
    this.storage.removeLocal('userInfo');
    this.router.navigateByUrl('/Login');
  }

}
