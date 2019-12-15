Notes:

Given the time constraints and nature of this project, I have chosen to author
the code natively in HTML, CSS, and JS. I did run manually run the CSS through
CSS auto-prefixer to maximize cross-browser display formatting, but deliberately
chose not transpile the JavaScript for pre-ES6 browsers for legibility.
In particular, that means that the JavaScript is incompatible with Internet
Explorer, although it follows modern coding practices.

Typically, I would follow a progressive enhancement approach and not build an
application that relies on client-side data APIs such as this.

Important to note that I would flag this design has having very low contrast for
the salmon color text on white background and the background gradient with white
text. This contrast ratio does not pass WCAG AA.

With further time, I would have added a loading throbber for slower network
connections and a service worker to cache data for offline useage, see, e.g.
https://amanire.com/isw/.

Thank you for your time,
Aaron
