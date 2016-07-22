/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

import { Feed, VideoStream } from "./shared";
import { SendPics } from "./send-pics.directive";
import { SetVideoSubscription } from "./set-video-subscription.directive";

import {
  AudioButtonComponent,
  VideoButtonComponent,
  IgnoreButtonComponent,
  UnpublishButtonComponent
} from "./buttons";


@Component({
  selector: "jh-feed",
  template: require("./feed.component.html"),
  styles: [require("!raw!sass!./feed.component.scss")],
  directives: [
    SendPics,
    VideoStream,
    SetVideoSubscription,
    AudioButtonComponent,
    VideoButtonComponent,
    IgnoreButtonComponent,
    UnpublishButtonComponent
  ]
})
export class FeedComponent implements OnInit {

  @Input() feed: Feed;
  @Output() toggleHighlight = new EventEmitter<Feed>();
  @Input() highlighted: boolean;
  @Input() highlightedByUser: boolean;

  private mirrored: boolean = false;

  constructor() { }

  public ngOnInit() {
    this.mirrored = (this.feed.isPublisher && !this.feed.isLocalScreen);
  }

  // [TODO] - Show muted notification
  // [NOTE] - This probably should be moved to a service
    //if (feed.isPublisher && !feed.isLocalScreen) {
      ///*
       //* Until this timeout is reached, the "you are muted" notification will
       //* not be displayed again
       //*/
      //var mutedWarningTimeout = now();
      //scope.$on('muted.byRequest', function() {
        //mutedWarningTimeout = secondsFromNow(3);
        //MuteNotifier.muted();
      //});
      //scope.$on('muted.byUser', function() {
        //mutedWarningTimeout = now(); // reset the warning timeout
      //});
      //scope.$on('muted.Join', function() {
        //mutedWarningTimeout = now();
        //MuteNotifier.joinedMuted();
      //});
      //scope.$watch('vm.feed.isVoiceDetected()', function(newVal) {
        ///*
         //* Display warning only if muted (check for false, undefined means
         //* still connecting) and the timeout has been reached
         //*/
        //if (newVal && feed.getAudioEnabled() === false && now() > mutedWarningTimeout) {
          //MuteNotifier.speaking();
          //mutedWarningTimeout = secondsFromNow(60);
        //}
      //});


  public thumbnailTag(): string {
    if (this.highlighted || this.feed.isIgnored) { return "placeholder"; }
    if (!this.feed.getVideoEnabled()) { return "placeholder"; }
    if (this.feed.isPublisher) { return "video"; }

    if (this.feed.getVideoSubscription()) {
      return "video";
    } else {
      if (this.feed.getPicture()) {
        return "picture";
      } else {
        return "placeholder";
      }
    }
  }

  private click (): void {
    this.toggleHighlight.emit(this.feed);
  }

}
