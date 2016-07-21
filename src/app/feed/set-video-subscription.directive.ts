/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Directive, ElementRef, Input, OnInit } from "@angular/core";

import { Feed } from "./shared";

@Directive({ selector: "[jhSetVideoSubscription]" })
export class SetVideoSubscriptionDirective implements OnInit {

  @Input() public feed: Feed;
  @Input() public initial: boolean;

  private el: any;

  constructor (el: ElementRef) {
    this.el = el.nativeElement;
  }

  public ngOnInit(): void {
    this.feed.setVideoSubscription(this.initial);
  }

  @Input("jhSetVideoSubscription")
  set setVideoSubscription(video: boolean) {
    /* For subscribers we have to manage the video subscription */
    if (!this.feed.isPublisher) {
      this.feed.setVideoSubscription(video);
    }
  }

}
