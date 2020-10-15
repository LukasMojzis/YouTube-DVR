# YouTube-DVR

[![Maintained](https://img.shields.io/maintenance/yes/2020)](https://github.com/tylermammone/YouTube-DVR/commits/master) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/tylermammone/YouTube-DVR/issues) [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ftylermammone%2FYouTube-DVR&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

When your favorite YouTube channels upload new videos, automatically add them to your playlists. Useful for queuing new videos into your Watch later list, but can be used with any combination of channel/playlist. Specify a different playlist for each channel to keep your favorites organized without missing new content.

## Features
Easy install  
Easy to add new channels  
Ability to specify a different playlist for each channel

## Installation
- Create a copy of the Google Sheet by [clicking here](https://docs.google.com/spreadsheets/d/1683iUmx6bCU_iIJwJGpABGLy9jHngtOTPrRn9VF_e5I/copy#gid=1438744897)
- Select <kbd>Tools</kbd> > <kbd>Script Editor</kbd> from the spreadsheet main menu
- Select <kbd>Run</kbd> > <kbd>Run function</kbd> > <kbd>install</kbd> from the script editor main menu.
- Review and accept permissions when prompted (You may need to click Advanced > Go to YouTube DVR)
- Look for the new <kbd>YouTube DVR</kbd> option in the spreadsheet main menu
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

## Changes
If you modify your copy of the script, please feel free to create a pull request. I would be happy to review any new features or optimizations you make, and possibly include them. To update your copy when changes are made, open the script editor and replace the old code with the new code found in Code.gs  

Wednesday, October 14, 2020 - Script now checks if you already added a channel, before adding it.
