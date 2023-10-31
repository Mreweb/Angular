import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/services/ui/cutsomer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorageService } from '@app/core/services/storage/browser-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private storage: BrowserStorageService,
    private toastr: ToastrService
  ) { }
  @BlockUI() blockUI: NgBlockUI;
  captchaSrc = "";

  pageForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    captchaCode: new FormControl('', [Validators.required]),
    captchaId: new FormControl('', [Validators.required])
  });

  getCaptcha(){
    this.CustomerService.get({
      captchaId : this.pageForm.controls['captchaId'].value
    }, null, "/captcha").subscribe(
      data =>{
        this.captchaSrc = "data:image/png;base64,"+data.content.captchaImage;
        this.pageForm.controls['captchaId'].setValue(data.content.captchaId);
        console.log(data);
      }
    )
  }
  ngOnInit(): void {   
    this.getCaptcha();
  }
  doRegister() {

    if (!this.pageForm.valid) {
      this.toastr.error('خطا در ورود', 'ورودی ها نامعتبر هستند');
    } else {
      this.blockUI.start();
      this.CustomerService.post(this.pageForm.value, null, "/signin/password").subscribe(
        data => {
          this.blockUI.stop();
          this.getCaptcha();
          let userId = data.content;
          if(data.content.result == 'LoginSuccessful'){
            this.storage.setLocal("userInfo" , data.content.userInfo );
            this.router.navigate(['/Dashboard/Home'] ,  { relativeTo: this.route });
          }
          this.toastr.info(data.message);
        },
        error => {
          this.blockUI.stop();
          this.getCaptcha();
          this.toastr.info(error.error.message);
        }
      );
    }
  }

}
