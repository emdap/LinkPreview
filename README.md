# LinkPreview
Google Chrome extension to show more details of link being moused over in a floating div that follows the mouse. Currently works for Kijiji.ca.

# Controls

Press 'shift' to pause the preview window and no longer follow mouse, and maintain the current content. Referred to as a 'paused preview window'.

Press 'f' to pause the preview window and no longer follow mouse, but update with content of what is being moused over. Referred to as a 'fixed preview window'.

Drag a paused or fixed preview window to move it.

Double click a paused or fixed preview window to close it.

Press 'r' to close all paused or fixed preview windows.

Hold down mouse button on a paused or fixed preview window and press 'shift' to toggle the window being paused, or press 'f' to toggle the window being fixed.

Press 'n' to create new preview window - only works there are no preview windows, or if all open preview windows are paused or fixed.


# Update for other sites

Create a new file in the 'webSpecific' folder with function 'getHoverElement' and update manifest.json to use this new file for the desired website. 'getHoverElement' returns the jQuery object that should show the preview window when moused over.