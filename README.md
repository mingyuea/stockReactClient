This is the client-side to my fake stock trading application, written purely in React.

This is purely a personal project, no real money/stocks will be traded. DO NOT RELY ON THE INFORMATION FROM THIS APPLICATION FOR ACTUAL TRADING PURPOSES.

No other front-end frameworks or libraries were used. The graph was generated using a canvas element, not using D3 or another data visualization library. This choice was made because of the interference with DOM rendering that would conflict with React, which uses a virtual DOM.

The stock search and data was provided for free by IEX Group Inc., which runs the Investor's Exchange. Some stocks might not be found/traded on IEX.

Styling was done in SASS/SCSS, and can be found under ./src/scss folder. Final build can be found in the ./dist folder.