# YouTube-DVR

[![Maintained](https://img.shields.io/maintenance/yes/2020)](https://github.com/tylermammone/YouTube-DVR/commits/master) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/tylermammone/YouTube-DVR/issues) [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ftylermammone%2FYouTube-DVR&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

When your favorite YouTube channels upload new videos, automatically add them to your playlists. Useful for queuing new uploads into your Watch later list, but can be used with any combination of channel/playlist. Specify a different playlist for each channel to keep your favorites organized without missing new content.

## Features
Easy install  
Easy to add new channels  
Ability to specify a different playlist for each channel

## Installation
- Create a new blank Google Spreadsheet https://docs.google.com/spreadsheets/
- Select <kbd>Tools</kbd> > <kbd>Script Editor</kbd> from the spreadsheet main menu
- Copy & paste the code from [Code.gs](https://github.com/tylermammone/YouTube-DVR/blob/master/Code.gs) in this GitHub repository
- Select <kbd>File</kbd> > <kbd>Save</kbd> to save the script
- Select <kbd>Resources</kbd> > <kbd>Advanced Google services...</kbd> from the script editor main menu. Turn on `YouTube Data API v3`
- Reload/refresh the spreadsheet
- Accept API permissions when prompted
- Look for the new <kbd>YouTube DVR</kbd> option in the spreadsheet main menu
- Select <kbd>YouTube DVR</kbd> > <kbd>Install</kbd>
- Start adding your favorite channels using <kbd>YouTube DVR</kbd> > <kbd>Add channel</kbd>

## Usage
Once installed, the script will run automatically every hour always checking the oldest entry in the Channels spreadsheet. Videos newer than the timestamp in the Last Checked column will be added to your desired playlist. Sit back, watch your new playlists, and enjoy!

### Tips
Add channels you're subscribed to, and have their new videos automatically added to your Watch later list. Sort your Watch later list oldest to newest, then press play to watch all your subscriptions, in order... Just like using a DVR to record/schedule your favorite TV shows.

#### Thanks
If you use, like, or support this code, share it with your friends. Say hi to me on your favorite social network and let me know my work is appreciated! This is free code... GitHub stars, repo watchers, and followers are welcomed!  

You can contact me through the following...  

tyler@tylermammone.com  
https://github.com/tylermammone  
https://twitter.com/tylermammone

https://tylermammone.com
