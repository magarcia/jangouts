import {
  beforeEach,
  describe,
  expect,
  it
} from "@angular/core/testing";

import { Feed } from "../feed";

import { LogEntry } from "./logentry.model";
import { ActionService } from "./action.service";

declare const jasmine: any;
declare const spyOn: any;

class MockDataChannelService {
  public sendChatMessage(text: string): void {}
}
class MockLogService {
  public add(entry: LogEntry): void {}
}
class MockFeedsService {
  public add(feed: Feed, options: any): void {}
  public allFeeds(): any { }
  public find(): any { }
  public destroy(feedId: number): void {}
  public findMain(): any {}
}

describe("Service: ActionService", () => {

  beforeEach(() => {
    this.dataChannelService = new MockDataChannelService();
    this.feedsService = new MockFeedsService();
    this.logService = new MockLogService();
    this.actionService = new ActionService(
      this.feedsService,
      this.dataChannelService,
      this.logService
    );
  });

  describe("#enterRoom", () => {
    it("should create a publisher feed", () => {
      spyOn(this.feedsService, "add");
      this.actionService.enterRoom(1, {}, {});

      expect(this.feedsService.add).toHaveBeenCalledWith(
        jasmine.objectContaining({
          id: 1,
          isPublisher: true
        }),
        {main: true}
      );
    });
  });

  describe("#leaveRoom", () => {
    it("should destroy feeds", () => {
      let feed: Feed = new Feed();
      feed.setAttrs({id: 1, isPublisher: true});

      spyOn(feed, "disconnect");
      spyOn(this.feedsService, "allFeeds").and.callFake(() => {
        return [feed, {id: 2}];
      });
      spyOn(this.feedsService, "find").and.callFake((id: number) => {
        if (id === 1) {
          return feed;
        } else {
          return null;
        }
      });
      spyOn(this.feedsService, "destroy");

      this.actionService.leaveRoom();

      expect(feed.disconnect).toHaveBeenCalled();
      expect(this.feedsService.destroy).toHaveBeenCalledWith(1);
    });
  });

  describe("#publishScreen", () => {
    it("should create a localScreen feed", () => {
      spyOn(this.feedsService, "add");
      this.actionService.publishScreen(1, {}, {});

      expect(this.feedsService.add).toHaveBeenCalledWith(
        jasmine.objectContaining({
          id: 1,
          isPublisher: true,
          isLocalScreen: true
        })
      );
    });
  });

  describe("#remoteJoin", () => {
    it("should create a non publisher feed", () => {
      spyOn(this.feedsService, "add");
      this.actionService.remoteJoin(1, {}, {});

      expect(this.feedsService.add).toHaveBeenCalledWith(
        jasmine.objectContaining({
          id: 1,
          isPublisher: false
        })
      );
    });
  });

  describe("#ignoreFeed", () => {
    it("should set feed as ignored", () => {
      let feed: Feed = new Feed();
      feed.setAttrs({id: 1});

      spyOn(feed, "ignore");
      spyOn(this.feedsService, "find").and.callFake((id: number) => {
        if (id === 1) {
          return feed;
        } else {
          return null;
        }
      });

      this.actionService.ignoreFeed(1);
      this.actionService.ignoreFeed(2);

      expect(feed.ignore).toHaveBeenCalled();
    });

    it("should set feed as not ignored", () => {
      let connection: any = {};
      let feed: Feed = new Feed();
      feed.setAttrs({id: 1});

      spyOn(feed, "stopIgnoring");
      spyOn(this.feedsService, "find").and.callFake((id: number) => {
        if (id === 1) {
          return feed;
        } else {
          return null;
        }
      });

      this.actionService.stopIgnoringFeed(1, connection);
      this.actionService.stopIgnoringFeed(2, connection);

      expect(feed.stopIgnoring).toHaveBeenCalledWith(connection);
    });
  });

  describe("#writeChatMessage", () => {
    it("should create a new chate message", () => {
      spyOn(this.dataChannelService, "sendChatMessage");

      this.actionService.writeChatMessage("text message");
      this.actionService.writeChatMessage("");

      expect(this.dataChannelService.sendChatMessage.calls.count()).toBe(1);
      expect(this.dataChannelService.sendChatMessage).toHaveBeenCalledWith("text message");
    });
  });

  describe("#toggleChannel", () => {
    it("should disable voice for the main feed", () => {
      let feed: Feed = new Feed();
      feed.setAttrs({ id: 1, isPublisher: true });
      spyOn(feed, "setEnabledChannel");
      spyOn(feed, "isEnabled").and.returnValue(true);
      spyOn(this.feedsService, "findMain").and.returnValue(feed);

      this.actionService.toggleChannel("audio");
      expect(feed.setEnabledChannel).toHaveBeenCalledWith(
        "audio",
        false,
        jasmine.any(Object)
      );
    });

    it("should enable voice for the main feed", () => {
      let feed: Feed = new Feed();
      feed.setAttrs({ id: 1, isPublisher: true });
      spyOn(feed, "setEnabledChannel");
      spyOn(feed, "isEnabled").and.returnValue(false);
      spyOn(this.feedsService, "findMain").and.returnValue(feed);

      this.actionService.toggleChannel("audio");
      expect(feed.setEnabledChannel).toHaveBeenCalledWith("audio", true);
    });

    it("should disable video for the main feed", () => {
      let feed: Feed = new Feed();
      feed.setAttrs({ id: 1, isPublisher: true });
      spyOn(feed, "setEnabledChannel");
      spyOn(feed, "isEnabled").and.returnValue(true);
      spyOn(this.feedsService, "findMain").and.returnValue(feed);

      this.actionService.toggleChannel("video");
      expect(feed.setEnabledChannel).toHaveBeenCalledWith(
        "video",
        false,
        jasmine.any(Object)
      );
    });

    it("should enable video for the main feed", () => {
      let feed: Feed = new Feed();
      feed.setAttrs({ id: 1, isPublisher: true });
      spyOn(feed, "setEnabledChannel");
      spyOn(feed, "isEnabled").and.returnValue(false);
      spyOn(this.feedsService, "findMain").and.returnValue(feed);

      this.actionService.toggleChannel("video");
      expect(feed.setEnabledChannel).toHaveBeenCalledWith("video", true);
    });

    it("should disable voice for the given feed", () => {
      let feed: Feed = new Feed();
      feed.setAttrs({ id: 1, isPublisher: false });
      spyOn(feed, "setEnabledChannel");
      spyOn(feed, "isEnabled").and.returnValue(true);

      this.actionService.toggleChannel("audio", feed);
      expect(feed.setEnabledChannel).toHaveBeenCalledWith(
        "audio",
        false,
        jasmine.any(Object)
      );
    });

    it("should enable voice for the given feed", () => {
      let feed: Feed = new Feed();
      feed.setAttrs({ id: 1, isPublisher: false });
      spyOn(feed, "setEnabledChannel");
      spyOn(feed, "isEnabled").and.returnValue(false);

      this.actionService.toggleChannel("audio", feed);
      expect(feed.setEnabledChannel).toHaveBeenCalledWith("audio", true);
    });

    it("should disable video for the given feed", () => {
      let feed: Feed = new Feed();
      feed.setAttrs({ id: 1, isPublisher: false });
      spyOn(feed, "setEnabledChannel");
      spyOn(feed, "isEnabled").and.returnValue(true);

      this.actionService.toggleChannel("video", feed);
      expect(feed.setEnabledChannel).toHaveBeenCalledWith(
        "video",
        false,
        jasmine.any(Object)
      );
    });

    it("should enable video for the given feed", () => {
      let feed: Feed = new Feed();
      feed.setAttrs({ id: 1, isPublisher: false });
      spyOn(feed, "setEnabledChannel");
      spyOn(feed, "isEnabled").and.returnValue(false);

      this.actionService.toggleChannel("video", feed);
      expect(feed.setEnabledChannel).toHaveBeenCalledWith("video", true);
    });

  });

  describe("#setMedia", () => {
    it("should disable/enable channel for the main feed", () => {
        let feed: Feed = new Feed();
        feed.setAttrs({ id: 1, isPublisher: false });
        spyOn(feed, "setEnabledChannel");
        spyOn(this.feedsService, "findMain").and.returnValue(feed);

        this.actionService.setMedia("audio", false);
        expect(feed.setEnabledChannel).toHaveBeenCalledWith("audio", false);

        this.actionService.setMedia("audio", true);
        expect(feed.setEnabledChannel).toHaveBeenCalledWith("audio", true);

        this.actionService.setMedia("video", false);
        expect(feed.setEnabledChannel).toHaveBeenCalledWith("video", false);

        this.actionService.setMedia("video", true);
        expect(feed.setEnabledChannel).toHaveBeenCalledWith("video", true);
    });
  });

});
