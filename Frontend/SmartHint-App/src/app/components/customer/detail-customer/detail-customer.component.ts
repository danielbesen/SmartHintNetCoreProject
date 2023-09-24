import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss'],
})
export class DetailCustomerComponent implements OnInit {
  form: FormGroup;
  customer = {} as Customer;
  saveState: string = 'post';
  constructor(
    private router: ActivatedRoute,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  get f(): any {
    return this.form.controls;
  }

  public validation(): void {
    this.form = this.fb.group({
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
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      registerDate: [''],
      identityDocument: [
        '',
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      stateRegistration: [
        '',
        [Validators.maxLength(12), Validators.pattern('^[0-9]*$')],
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
    });
  }

  public loadCustomer(): void {
    const customerIdParam = this.router.snapshot.paramMap.get('id');

    if (customerIdParam !== null) {
      this.saveState = 'put';

      this.customerService.getCustomerById(+customerIdParam).subscribe(
        (customer: Customer) => {
          this.customer = { ...customer };
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
