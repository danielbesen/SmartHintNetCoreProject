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

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss'],
})
export class DetailCustomerComponent implements OnInit {
  public typeTitle: string;
  public isChecked: boolean = false;
  public genderTitle: string;
  form: FormGroup;
  customer = {} as Customer;
  saveState: string = 'post';
  constructor(
    private router: Router,
    private acRouter: ActivatedRoute,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

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

  public loadCustomer(): void {
    const customerIdParam = this.acRouter.snapshot.paramMap.get('id');

    if (customerIdParam !== null) {
      this.saveState = 'put';

      this.customerService.getCustomerById(+customerIdParam).subscribe(
        (customer: Customer) => {
          this.customer = { ...customer };
          this.customer.password = null;
          this.form.patchValue(this.customer);
        },
        (error: any) => {
          console.error(error);
        },
        () => {}
      );
    }
  }

  public saveCustomer(): void {
    if (this.form.valid) {
      this.customer =
        this.saveState == 'post'
          ? { ...this.form.value }
          : { id: this.customer.id, ...this.form.value };

      this.customerService[this.saveState](this.customer).subscribe(
        () => this.toastr.success('Sucesso!', 'Cliente salvo :)'),
        (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao salvar cliente :(');
        },
        () => {}
      );
    }
  }
}
