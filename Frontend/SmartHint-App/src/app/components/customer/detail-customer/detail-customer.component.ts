import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss'],
})
export class DetailCustomerComponent implements OnInit {
  public typeTitle: string;
  public disabled: boolean = false;
  public isChecked: boolean = false;
  public genderTitle: string;
  form: FormGroup;
  customer = {} as Customer;
  saveState: string = 'post';
  constructor(
    private localeService: BsLocaleService,
    private router: Router,
    private acRouter: ActivatedRoute,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.loadCustomer();
    this.validation();
  }
  public changeTypeTitle(value: string): void {
    this.typeTitle = value;
  }

  public changeGenderTitle(value: string): void {
    this.genderTitle = value;
  }

  get f(): any {
    return this.form.controls;
  }

  public cancelOperation(): void {
    this.router.navigate([`customers/list`]);
  }

  public validation(): void {
    this.form = this.fb.group({
      free: [],
      name: ['', [Validators.required, Validators.maxLength(150)]],
      type: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(150)],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      registerDate: [''],
      identityDocument: ['', [Validators.required]],
      stateRegistration: [
        '',
        [Validators.maxLength(15), Validators.pattern('^[0-9]*$')],
      ],
      gender: [''],
      dateOfBirth: [''],
      isBlocked: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
      passwordConfirmation: ['', Validators.required],
    });
  }

  public setChecked(): boolean {
    if (
      this.form.value.stateRegistration == null ||
      this.form.value.stateRegistration == ''
    ) {
      return true;
    } else return false;
  }

  public loadCustomer(): void {
    const customerIdParam = this.acRouter.snapshot.paramMap.get('id');

    if (customerIdParam !== null) {
      this.saveState = 'put';
    }

    this.customerService.getCustomerById(+customerIdParam).subscribe(
      (customer: Customer) => {
        this.customer = { ...customer };
        this.customer.password = null;
        this.typeTitle = this.customer.type;
        this.genderTitle = this.customer.gender;
        this.form.patchValue(this.customer);

        const registerDateObj = new Date(this.customer.registerDate);
        this.form.controls.registerDate.patchValue(registerDateObj);

        const dateOfBirthObj = new Date(this.customer.dateOfBirth);
        this.form.controls.dateOfBirth.patchValue(dateOfBirthObj);
      },
      (error: any) => {
        console.error(error);
      },
      () => {}
    );
  }

  public saveCustomer(): void {
    if (this.saveState == 'put') {
      this.form.controls.password.clearValidators();
      this.form.controls.password.updateValueAndValidity();
      this.form.controls.passwordConfirmation.clearValidators();
      this.form.controls.passwordConfirmation.updateValueAndValidity();
    }

    if (
      this.form.value.identityDocument != '' &&
      this.form.value.identityDocument != null
    ) {
      this.form.controls.identityDocument.clearValidators();
      this.form.controls.identityDocument.updateValueAndValidity();
    }

    this.form.controls.type.setValue(this.typeTitle);
    this.form.controls.type.clearValidators();
    this.form.controls.type.updateValueAndValidity();

    if (this.form.valid) {
      let fm =
        this.saveState == 'post'
          ? { ...this.form.value }
          : { id: this.customer.id, ...this.form.value };

      fm.registerDate = fm.registerDate?.toLocaleString().split(',')[0] || null;
      fm.dateOfBirth = fm.dateOfBirth?.toLocaleString().split(',')[0] || null;
      fm.gender = this.genderTitle;

      const customer: Customer = { ...fm };

      this.customerService[this.saveState](customer).subscribe(
        () => {
          this.toastr.success('Sucesso!', 'Cliente salvo :)');
          setTimeout(() => {
            this.router.navigate([`customers/list`]);
          }, 3200);
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao salvar cliente :(');
        },
        () => {}
      );
    } else {
      this.toastr.error('Campo(s) inválidos :(');
    }
  }

  public bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }
}
