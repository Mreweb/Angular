import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './conflict.html',
  styleUrls: ['./conflict.css']
})
export class ConflictListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private storage: BrowserStorageService,
    private toastr: ToastrService) { }

  @BlockUI() blockUI: NgBlockUI;
  captchaSrc = "";
  pageNumber: number = 1;
  pageSize: number = 1;
  total: number;
  loading: boolean;
  config: any;
  ConflictList: any = [];
  dataLoaded: boolean = false;


  pageForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    captchaCode: new FormControl('', [Validators.required]),
    captchaId: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.getConflictList();
  }
  getConflictList() {
    this.dataLoaded = false;
    this.CustomerService.get(null, null, "posts?pageNumber=" + this.pageNumber).subscribe({
      next: (data: any) => {
        this.ConflictList = data;
        this.dataLoaded = true;
      },
      error: ()=>{ }
    }
    );
  }


}
