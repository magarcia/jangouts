/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Directive, ElementRef, Input, OnInit} from "@angular/core";

import { Feed } from "./shared";

@Directive({ selector: "[jhSendPics]" })
export class SendPicsDirective implements OnInit {

  @Input("jhSendPics") public feed: Feed;
  private el: any;

  constructor (el: ElementRef) {
    this.el = el.nativeElement;
  }

  public ngOnInit(): void {
    /* For publisher feeds, we have to constantly send video and photos */
    if (this.feed.isPublisher) {
      let data: any = this.initPics(this.el);
      this.takePic(this.feed, data.canvas, data.context, data.video);
      setInterval(() => {
        this.takePic(this.feed, data.canvas, data.context, data.video);
      }, 20000);
    }
  }

  public initPics(element: ElementRef): any {
    let canvas: any = $("canvas", element);
    let canvasTag: HTMLCanvasElement = <HTMLCanvasElement>canvas[0];
    let video: any = $("video", element).first();
    let context: any = canvasTag.getContext("2d");

    // initially set it to 4:3 (fitting the placeholder image)
    canvasTag.width = canvas.width();
    canvasTag.height = Math.round(canvasTag.width * 0.75);

    let placeholder: any = new window.Image();
    placeholder.src = require("../../assets/images/placeholder.png");
    placeholder.onload = (): void => {
      context.drawImage(placeholder, 0, 0, canvasTag.width, canvasTag.height);
    };

    return {
      canvas: canvasTag,
      context: context,
      video: video[0]
    };
  }

  public takePic(feed: Feed, canvas: HTMLCanvasElement, context: any, video: HTMLVideoElement): void {
    let width: number = canvas.width;
    if (video.videoHeight) {
      let height: number = width * video.videoHeight / video.videoWidth;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      feed.updateLocalPic(canvas.toDataURL("image/jpeg", 0.4));
    }
  }

}
