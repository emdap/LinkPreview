# LinkPreview
Google Chrome extension to show more details of link being moused over in a floating div that follows the mouse. Currently works for Kijiji.ca.

# Controls

Press 'shift' to pause the preview window and no longer follow mouse, and maintain the current content. Referred to as a 'paused preview window'.

Press 'f' to pause the preview window and no longer follow mouse, but update with content of what is being moused over. Referred to as a 'fixed preview window'.

Drag a paused or fixed preview window to move it.

Double click a paused or fixed preview window to close it.

Press 'r' to close all paused or fixed preview windows.

Hold down mouse button on a paused or fixed preview window and press 'shift' to toggle the window being paused, or press 'f' to toggle the window being fixed.

Press 'n' to create new preview window - only works if there are no preview windows, or if all open preview windows are paused or fixed.


# Update for other sites

Create two new files in the 'webSpecific' folder:

File 1: has function 'getHoverElement' which returns the jQuery object that should show the preview window when moused over.

File 2: has function 'createFields'. Takes the source code for the link's webpage, and the link itself, as parameters, and returns a string of HTML that will be the content of the preview window.

Update manifest.json by adding a content_script which will load these new files for the desired website.  
