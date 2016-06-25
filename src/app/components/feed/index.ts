import { upgradeAdapter } from "../../adapter";

import { FeedsService, Feed, FeedConnection } from "./shared";

import { PushToTalkComponent } from "./pushtotalk";
import { MainFeedComponent } from "./main-feed";

import { FeedComponent } from "./feed.component";

import jhAudioButton from "./buttons/jh-audio-button.directive";
import jhIgnoreButton from "./buttons/jh-ignore-button.directive";
import jhUnpublishButton from "./buttons/jh-unpublish-button.directive";
import jhVideoButton from "./buttons/jh-video-button.directive";

upgradeAdapter.addProvider(FeedsService);
upgradeAdapter.addProvider(Feed);
upgradeAdapter.addProvider(FeedConnection);

upgradeAdapter.upgradeNg1Provider("hotkeys"); // needed for pushToTalk

export default angular.module("janusHangouts.feedComponent", [])
  .service("FeedsService", upgradeAdapter.downgradeNg2Provider(FeedsService))
  .factory("Feed", upgradeAdapter.downgradeNg2Provider(Feed))
  .factory("FeedConnection", upgradeAdapter.downgradeNg2Provider(FeedConnection))
  .directive("jhPushtotalkButton", <angular.IDirectiveFactory>upgradeAdapter.downgradeNg2Component(PushToTalkComponent))
  .directive("jhFeed", <angular.IDirectiveFactory>upgradeAdapter.downgradeNg2Component(FeedComponent))
  .directive("jhMainFeed", <angular.IDirectiveFactory>upgradeAdapter.downgradeNg2Component(MainFeedComponent))
  //.directive("jhAudioButton", jhAudioButton)
  //.directive("jhIgnoreButton", jhIgnoreButton)
  //.directive("jhUnpublishButton", jhUnpublishButton)
  //.directive("jhVideoButton", jhVideoButton);

