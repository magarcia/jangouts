/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Component, OnInit, Input, Inject } from "@angular/core";

import { Feed } from "../shared";

@Component({
  selector: "jh-video-button",
  template: require("./video-button.component.html")
})
export class VideoButtonComponent implements OnInit {

  @Input() public feed: Feed;

  constructor(@Inject('RoomService') private roomService: any) { }

  ngOnInit() { }

  public toggle() {
    this.roomService.toggleChannel("video", this.feed);
  }

  public showsEnable() {
    return (this.feed.isPublisher && !this.feed.getVideoEnabled());
  }

  public showsDisable() {
    return (this.feed.isPublisher && this.feed.getVideoEnabled());
  }

}
