// -------------------------------------------------
// YouTube DVR Video to Playlist Queuer
// https://github.com/tylermammone/YouTube-DVR
// -------------------------------------------------

// -------------------------------------------------
// SETTINGS
// -------------------------------------------------
var hoursBetweenQueueRuns = 1;
var channelsPerQueueRun = 1;
var maxVideosPerChannelPerCheck = 25;
var timezone = "GMT-4";

// -------------------------------------------------
// SYSTEM VARIABLES
// -------------------------------------------------
var timestampFormat = "yyyy-MM-dd HH:mm:ss";
var date = Utilities.formatDate(new Date(), timezone, timestampFormat);
var dvrSheet = SpreadsheetApp.getActiveSpreadsheet();
var channelsSheet = dvrSheet.getSheetByName('Channels');
var videosSheet = dvrSheet.getSheetByName('Videos');

// -------------------------------------------------
// MAIN FUNCTION
// -------------------------------------------------
function queueRunner() {
  var firstVideo = videosSheet.getRange(2,1).getValue();
  totalChannels = channelsSheet.getLastRow() - 1;
  if ( totalChannels < channelsPerQueueRun ) {
    channelsPerQueueRun = totalChannels;
  }
  var thisRow = channelsSheet.getLastRow() - (channelsPerQueueRun - 1);
  var myChannels = channelsSheet.getRange(thisRow, 1, channelsPerQueueRun, 4).getValues();
  myChannels.forEach(function(channelRow) {
    var lastCheckedDate = new Date(channelRow[3]);
    try {
      var channels = YouTube.Channels.list('contentDetails', {'id': channelRow[0]});
      for (var c = 0; c < channels.items.length; c++) {
        var channel = channels.items[c];
        var playlistResponse = YouTube.PlaylistItems.list('snippet', {
          playlistId: channel.contentDetails.relatedPlaylists.uploads,
          maxResults: maxVideosPerChannelPerCheck
        });
        for (var v = 0; v < playlistResponse.items.length; v++) {
          var video = playlistResponse.items[v];
          video.snippet.publishedAt = video.snippet.publishedAt.replace('T', ' ').replace('Z', '');
          var videoPubDate = new Date(video.snippet.publishedAt);
          if (videoPubDate.valueOf() > lastCheckedDate.valueOf()) {
            var newRow = [video.snippet.resourceId.videoId, video.snippet.title, video.snippet.publishedAt, video.snippet.channelTitle, channelRow[1], date];
            if (firstVideo.length) {
              var alreadyQueued = videosSheet.getRange(2, 1, videosSheet.getLastRow() - 1, 3).getValues();
              var alreadyQueuedFlat = alreadyQueued.map(function(row) {return row[0];});
              if (alreadyQueuedFlat.indexOf(video.snippet.resourceId.videoId) == -1) {
                videosSheet.insertRowsAfter(1, 1).getRange(2, 1, 1, 6).setValues([newRow]);
                addVideoToPlaylist(channelRow[1], video.snippet.resourceId.videoId);
              }
            } else {
              videosSheet.insertRowsAfter(1, 1).getRange(2, 1, 1, 6).setValues([newRow]);
              addVideoToPlaylist(channelRow[1], video.snippet.resourceId.videoId);
            }
            videosSheet.autoResizeColumns(1, 6);
          }
          channelsSheet.getRange(thisRow, 3).setValue(video.snippet.channelTitle);
          channelsSheet.getRange(thisRow, 4).setValue(date);
        }
      }
    }
    catch(e) {
      Logger.log('Error: ' + e.message);
    }
    thisRow++;
  });
  channelsSheet.getRange(2, 1, channelsSheet.getLastRow() - 1, 4).sort({column: 4, ascending: false});
  channelsSheet.autoResizeColumns(1, 4);
  allTimeQueued = videosSheet.getLastRow() - 1;
  if (allTimeQueued > 5002) {
    videosSheet.deleteRows(5002, allTimeQueued);
  }
}

// -------------------------------------------------
// UTILITIES
// -------------------------------------------------
function addMenu() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('YouTube DVR')
  .addItem('Add channel', 'addNewChannel')
  .addSeparator()
  .addItem('Queue videos', 'queueRunner')
  .addSeparator()
  .addItem('Install', 'install')
  .addItem('Turn off', 'stopTrigger')
  .addToUi();
}
function addNewChannel() {
  var ui = SpreadsheetApp.getUi();
  var newChannelId = ui.prompt(
    'Enter the channel ID',
    'Browse to the channel you wish to queue from, and copy the ID from the end of the URL.\n\n\
Example\n\
- URL: https://www.youtube.com/channel/UCHNzlEHQ1eUbSdmrr66PWuQ\n\
- Channel ID: UCHNzlEHQ1eUbSdmrr66PWuQ',
    ui.ButtonSet.OK_CANCEL
  );
  if (newChannelId.getSelectedButton() == ui.Button.OK && newChannelId.getResponseText().length) {
    var channelId = newChannelId.getResponseText();
    var newPlaylistId = ui.prompt(
      'Enter the playlist ID',
      'Browse to the playlist you want videos added to, and copy the ID from the end of the URL. (Enter WL to use your Watch later list.)\n\n\
Example\n\
- URL: https://www.youtube.com/playlist?list=PLKTLcJD2K0kXKhVpB3gbn80qSG6ykSjHD\n\
- Playlist ID: PLKTLcJD2K0kXKhVpB3gbn80qSG6ykSjHD',
      ui.ButtonSet.OK_CANCEL
    );
    if (newPlaylistId.getSelectedButton() == ui.Button.OK && newPlaylistId.getResponseText().length) {
      var playlistId = newPlaylistId.getResponseText();
      channelsSheet.appendRow([channelId, playlistId, '*Title auto added first queue run*', date]);
      ui.alert('Added! Videos will be queued soon...');
    } else {
      ui.alert('You forgot to enter the playlist ID!');
    }
  } else {
    ui.alert('You forgot to enter the channel ID!');
  }
}
function addVideoToPlaylist(playlistId, videoId) {
  try {
    YouTube.PlaylistItems.insert({
      snippet: {
        playlistId: playlistId,
        resourceId: {
          videoId: videoId,
          kind: 'youtube#video'
        }
      }
    }, 'snippet');
  }
  catch(e) {
    Logger.log('Error: ' + e.message);
  }
}
function install() {
  var ui = SpreadsheetApp.getUi();
  if (!channelsSheet) {
    channelsSheet = dvrSheet.insertSheet('Channels');
    channelsSheet.appendRow(['Channel ID', 'Playlist ID', 'Channel Title', 'Last Checked']);
    channelsSheet.appendRow(['UCHNzlEHQ1eUbSdmrr66PWuQ', 'WL', 'Tyler Mammone', date]);
    channelsSheet.deleteColumns(5, channelsSheet.getMaxColumns() - 4);
    channelsSheet.setFrozenRows(1);
    channelsSheet.autoResizeColumns(1, 4);
  }
  if (!videosSheet) {
    videosSheet = dvrSheet.insertSheet('Videos');
    videosSheet.appendRow(['Video ID', 'Video Title', 'Uploaded', 'Channel Title', 'Playlist ID', 'Queued']);
    videosSheet.deleteColumns(7, videosSheet.getMaxColumns() - 6);
    videosSheet.setFrozenRows(1);
    videosSheet.autoResizeColumns(1, 6);
  }
  dvrSheet.setActiveSheet(channelsSheet);
  var sheets = dvrSheet.getSheets();
  for (i = 0; i < sheets.length; i++) {
    switch(sheets[i].getSheetName()) {
      case "Channels":
      case "Videos":
        break;
      default:
        dvrSheet.deleteSheet(sheets[i]);
    }
  }
  stopTrigger();
  ScriptApp.newTrigger('queueRunner')
  .timeBased()
  .everyHours(hoursBetweenQueueRuns)
  .create();
  ui.alert('Installed! Use "Add channel" to start queuing videos from your first channel...');
}
function onOpen(e) {
  addMenu();
}
function stopTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}
