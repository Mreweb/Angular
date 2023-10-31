import { Component } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr'; 
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: BrowserStorageService,
    private toastr: ToastrService
  ) { }

  logOut(){
    this.storage.removeLocal('userInfo');
    this.router.navigateByUrl('/Login');
  }

}
