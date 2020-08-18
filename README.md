# Clip-Module
A community clipping module for Caffeinated.

## Install Instructions
1. Close OBS.
2. Download [obs-websocket 4.7.0](https://github.com/Palakis/obs-websocket/releases/tag/4.7.0) (Later versions will __not__ work with COBS)
3. Installing
    1. For COBS:  
        Follow the install instructions for the zip version, the installer will __not__ work!
    2. For other versions:  
        Use the installer
4. Open OBS, and the WebSockets Server Settings dialog from the tools menu
5. Check enable, you can leave authentication off.
6. Now in Caffeinated, press `CTRL + SHIFT + I` to open inspect element
7. Press the 3 dots in the top right and click `Undock into separate window`
8. Now goto console, and paste `CAFFEINATED.addRepo("https://casterlabs.github.io/Clip-Module/")` and press `Enter`
9. You will see the module appear at the bottom of settings, you can close the inspect window now
10. The default settings should be fine, however if you changed the password or port change them in there. (Leave password blank if its off in OBS)
