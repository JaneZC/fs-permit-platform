import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment-timezone';
import { WindowRef } from '../../../_services/native-window.service';
import { ChristmasTreesAdminService } from '../christmas-trees-admin.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-season-dates',
  templateUrl: './season-dates.component.html'
})
export class AdminSeasonDatesComponent implements OnInit, AfterViewInit {
  user: any;
  forests: any;
  forest: any;
  form: any;
  updateStatus: any;
  apiErrors: any;
  changeRequestFormUrl = environment.changeRequestForm;

  dateStatus = {
    startDateTimeValid: true,
    endDateTimeValid: true,
    startBeforeEnd: true,
    startAfterToday: true,
    hasErrors: false,
    dateTimeSpan: 0
  };

  constructor(
    private treesAdminService: ChristmasTreesAdminService,
    private service: ChristmasTreesApplicationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public afs: ApplicationFieldsService,
    private winRef: WindowRef
  ) {
    this.form = formBuilder.group({
      forestId: ['', [Validators.required]]
    });

    this.form.get('forestId').valueChanges.subscribe(id => {
      const forestId = parseInt(id, 10);
      if (forestId) {
        this.updateStatus = null;
        this.forest = this.forests.find(forest => forest.id === forestId);
        this.setStartEndDate(this.forest, this.form);
      }
    });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data && data.user) {
        this.user = data.user;
        this.forests = data.forests;
        this.forest = this.forests[0];
        if (this.forest) {
          this.form.get('forestId').setValue(this.forest.id);
        }
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setStartEndDate(this.forest, this.form);
    }, 0);
  }

  setStartEndDate(forest, form) {
    this.treesAdminService.setStartEndDate(forest, form);
  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

  updateSeasonDates() {
    this.afs.touchAllFields(this.form);
    this.updateStatus = null;
    this.updateDates();
  }

  private updateDates() {
    if (this.form.valid && !this.dateStatus.hasErrors && this.forest) {
      const newStart = moment.tz(this.form.get('dateTimeRange.startDateTime').value, this.forest.timezone);
      const newEnd = moment.tz(this.form.get('dateTimeRange.endDateTime').value, this.forest.timezone);
      this.service.updateSeasonDates(this.forest.id, newStart.format('YYYY-MM-DD'), newEnd.format('YYYY-MM-DD'))
        .subscribe(
          () => {
            this.updateStatus = `Season dates for ${this.forest.forestName} are now ${newStart.format(
              'MMM DD, YYYY'
            )} to  ${newEnd.format('MMM DD, YYYY')}`;
            this.winRef.getNativeWindow().scroll(0, 200);
          },
          err => {
            this.apiErrors = err;
            this.winRef.getNativeWindow().scroll(0, 200);
          }
        );
    }
  }
}
