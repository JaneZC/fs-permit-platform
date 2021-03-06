import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable()
export class ChristmasTreesAdminService {
  setStartEndDate(formGroup, form) {
    if (formGroup && form.get('dateTimeRange')) {
      form.get('dateTimeRange.startMonth').setValue(moment(formGroup.startDate).format('MM'));
      form.get('dateTimeRange.startDay').setValue(moment(formGroup.startDate).format('DD'));
      form.get('dateTimeRange.startYear').setValue(moment(formGroup.startDate).format('YYYY'));
      form.get('dateTimeRange.endMonth').setValue(moment(formGroup.endDate).format('MM'));
      form.get('dateTimeRange.endDay').setValue(moment(formGroup.endDate).format('DD'));
      form.get('dateTimeRange.endYear').setValue(moment(formGroup.endDate).format('YYYY'));
    }
  }

  setStartEndTimes(formGroup, form) {
    if (formGroup && form.get('dateTimeRange')) {
      form.get('dateTimeRange.startHour').setValue(moment(formGroup.startDate).format('hh'));
      form.get('dateTimeRange.startMinutes').setValue(moment(formGroup.startDate).format('mm'));
      form.get('dateTimeRange.startPeriod').setValue(moment(formGroup.startDate).format('A'));
      form.get('dateTimeRange.endHour').setValue(moment(formGroup.endDate).format('hh'));
      form.get('dateTimeRange.endMinutes').setValue(moment(formGroup.endDate).format('mm'));
      form.get('dateTimeRange.endPeriod').setValue(moment(formGroup.endDate).format('A'));
    }
  }

  getAdminNavItems() {
    return [
      { id: 'forest-admin-permits', routerLink: '/christmas-trees/forests', title: 'Christmas tree permits'},
      { id: 'forest-admin-reports', routerLink: '/admin/christmas-trees/reports', title: 'Generate reports'},
      { id: 'forest-admin-seasons', routerLink: '/admin/christmas-trees/season-dates', title: 'Change season dates'},
      { id: 'forest-admin-areas', routerLink: '/admin/christmas-trees/district-dates', title: 'Change cutting area dates'},
      { id: 'forest-admin-form', href: 'https://docs.google.com/forms/d/e/1FAIpQLSca7taTXY7xUTDvcnyR7rf7jkfvinBPtGqbNWgLBd3Dy6kH4Q/viewform', title: 'Request a content change' }
    ];
  }
}
