import {
  AfterViewInit, Component, DoCheck, ElementRef, HostListener, Inject, Input, OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ChristmasTreesAdminService } from '../trees/admin/christmas-trees-admin.service';
import { WindowRef } from '../_services/native-window.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-forests-admin-nav',
  templateUrl: './forests-admin-nav.component.html'
})
export class ForestAdminNavComponent implements OnInit, DoCheck {
  @Input() user: any;

  forestAdminNavItems = [];
  showAdminNav = true;
  showMobileNav = false;
  menuBtnPosition = 'absolute';
  menuBtnTop = '';
  sideNavPresent = false;

  constructor (
    @Inject(DOCUMENT) private doc: Document,
    private adminService: ChristmasTreesAdminService,
    private winRef: WindowRef
  ) {}

  @HostListener('document:scroll', ['$event'])
  public track(event: Event) {
    const header = this.doc.getElementById('header');
    const mobileButton = this.doc.getElementById('mobile-forest-admin-menu-btn');

    if (mobileButton && !mobileButton.hidden && this.winRef.getNativeWindow().pageYOffset > header.offsetHeight) {
      this.menuBtnPosition = 'fixed';
      this.menuBtnTop = '0px';
    } else {
      this.menuBtnPosition = 'absolute';
      this.menuBtnTop = '';
    }
  }

  ngOnInit() {
    this.forestAdminNavItems = this.adminService.getAdminNavItems();
    this.track(new Event('scroll'));
  }

  ngDoCheck() {
    this.sideNavPresent = this.doc.getElementById('mobile-menu-btn') !== null;
  }

}
