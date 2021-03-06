import { Inject, HostListener, Component, Input, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WindowRef } from '../../../_services/native-window.service';

@Component({
  moduleId: module.id,
  selector: 'app-trees-sticky-footer',
  templateUrl: 'tree-guidelines-footer.html'
})

export class TreeGuidelinesFooterComponent implements AfterViewInit {
  @Input() forest: any;

  public fixed = true;
  lastScrollHeight;

  constructor(
      @Inject(DOCUMENT) private doc: Document,
      private winRef: WindowRef
    ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const footerHeight = 233;
    const nativeWindow = this.winRef.getNativeWindow();

    const windowHeight = nativeWindow.innerHeight + nativeWindow.scrollY + footerHeight;
    let scrollHeight = this.doc.body.scrollHeight;

    if (!this.fixed) {
      scrollHeight = scrollHeight - 85;
    }
    this.lastScrollHeight = scrollHeight;


    if (windowHeight > scrollHeight) {
      this.fixed = false;
    } else {
      this.fixed = true;

    }
  }

  ngAfterViewInit() {
    this.lastScrollHeight = this.doc.body.scrollHeight;
  }
}
