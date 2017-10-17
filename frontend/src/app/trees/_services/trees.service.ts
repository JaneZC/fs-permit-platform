import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class TreesService {
  constructor(private http: Http, private router: Router) {}

  getOne(id) {
    return new Promise((resolve, reject) => {
      resolve({
        id: id,
        forestName: 'Mount Hood National Forest',
        forestUrl: 'https://www.fs.usda.gov/mthood',
        treeHeight: 12,
        stumpHeight: 6,
        stumpDiameter: 6,
        notes:
          'There must be another tree of similar size free to grow within 8 feet of the one you cut. Cutting the top of a standing tree is prohibited.',
        startDate: '2017-11-01T00:00:00.000Z',
        endDate: '2017-12-24T00:00:00.000Z',
        species: [
          { id: '1', name: 'Noble Fir', description: 'short thick needles', photos: 'url', status: 'recommended' },
          { id: '2', name: 'Pacific Yew', description: 'short flat needles', photos: 'url', status: 'prohibited' },
          {
            id: '3',
            name: 'Hemlock',
            description: 'Browns quickly and loses needles even if put in water quickly.',
            photos: 'url',
            status: 'not recommended'
          }
        ] // Status is in join table
      });
    });
  }

  private handleError(error: Response | any) {
    let errors: any;
    if (error instanceof Response) {
      if (error.status) {
        errors = [error.status];
      } else {
        const body = error.json() || '';
        errors = body.errors;
      }
    } else {
      errors = ['Server error'];
    }
    return Observable.throw(errors);
  }

  getSectionInfo() {
    return [
      { step: 0, title: 'General Guidelines' },
      {
        step: 1,
        title: 'Tree selection',
        subsections: [{ step: 0, title: 'Types of trees' }]
      },
      {
        step: 2,
        title: 'Cutting instructions',
        subsections: [
          { step: 0, title: 'Tools' },
          { step: 1, title: 'Cutting and cleanup' }
        ]
      },
      { step: 3, title: 'Trip planning' },
      { step: 4, title: 'Safety first' },
      { step: 5, title: 'Contact information' }
    ];
  }
}
