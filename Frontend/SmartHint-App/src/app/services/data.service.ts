import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  sharedData: any;
  isFiltering: any;

  constructor() {}
}
