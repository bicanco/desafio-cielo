import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Injectable } from '@angular/core';
import serviceData from '@data';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  createDb(): {} {
    return { serviceData };
  }
}
