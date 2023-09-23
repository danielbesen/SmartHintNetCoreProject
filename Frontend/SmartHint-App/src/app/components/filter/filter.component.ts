import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public blockTitle: string = 'Selecione uma opção';
  isCollapsed = true;
  constructor(private localeService: BsLocaleService) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {}

  public applyFilter(): void {}

  public changeBlockTitle(value: string): void {
    this.blockTitle = value;
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }
}
