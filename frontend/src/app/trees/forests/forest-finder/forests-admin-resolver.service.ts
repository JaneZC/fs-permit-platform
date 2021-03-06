import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ChristmasTreesService } from '../../_services/christmas-trees.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class ForestsAdminResolver implements Resolve<any> {
  constructor(
    private service: ChristmasTreesService,
    private authenticationService: AuthenticationService,
    private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let result;
    const forests = this.service.getAll();
    const users = this.authenticationService.getAuthenticatedUser();

    return forkJoin([forests, users]).map(results => {
      const user = results[1];
      const allForests = results[0];

      if (user && user.forests && user.forests.length) {
        result = allForests;
        if (Array.isArray(allForests) && user.forests.find(forest => forest !== 'all')) {
          result = allForests.filter(forest =>
            user.forests.find(forestAbbr => forestAbbr === forest.forestAbbr)
          );
        }
        return result;
      } else {
        this.router.navigate(['access-denied']);
        return false;
      }

    })
    .first()
      .catch(err => {
      return Observable.of(null);
    });
  }



}
