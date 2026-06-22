```raw data:
mobile:
PageSpeed Insights logo
PageSpeed Insights
Report from Jun 22, 2026, 6:23:49 PM

Enter a valid URL
Discover what your real users are experiencing
No Data
Diagnose performance issues
55
Performance
94
Accessibility
96
Best Practices
100
SEO
1/2
Agentic Browsing
55 FCP+0LCP+0TBT+30CLS+25SI+0 Performance
Values are estimated and may vary. The performance score is calculated directly from these metrics.See calculator.
0–49 50–89 90–100
Final Screenshot
Metrics
Expand view
First Contentful Paint
22.3 s
Largest Contentful Paint
26.4 s
Total Blocking Time
0 ms
Cumulative Layout Shift
0
Speed Index
22.3 s

    Captured at Jun 22, 2026, 6:23 PM GMT+1
    Emulated Moto G Power with Lighthouse 13.4.0
    Single page session
    Initial page load
    Slow 4G throttling
    Using HeadlessChromium 146.0.7680.177 with lr

Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Show audits relevant to:
All
FCP
LCP
TBT
CLS
Insights
Render-blocking requests Est savings of 19,580 ms
Requests are blocking the page's initial render, which may delay LCP. Deferring or inlining can move these network requests out of the critical path.LCPFCPUnscored
URL

Transfer Size

Duration
devagency.ma
1st party
	56.0 KiB
	2,690 ms
…chunks/bc8470f73e47345d.css(devagency.ma)

34.6 KiB

1,270 ms
…chunks/ac8b093…e3c.css(devagency.ma)

4.3 KiB

480 ms
…chunks/aaf0bb1927b91dc7.css(devagency.ma)

17.1 KiB

950 ms
Google Fonts
cdn
	1.1 KiB
	750 ms
/css2?family=…(fonts.googleapis.com)

1.1 KiB

750 ms
Legacy JavaScript Est savings of 14 KiB
Polyfills and transforms enable older browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile Baseline features, unless you know you must support older browsers. Learn why most sites can deploy ES6+ code without transpilingLCPFCPUnscored
URL


Wasted bytes
devagency.ma
1st party
		13.9 KiB
…chunks/a443e665….js(devagency.ma)

13.9 KiB
…chunks/a443e665….js:1:6067(devagency.ma)


Array.prototype.at


…chunks/a443e665….js:1:5455(devagency.ma)


Array.prototype.flat


…chunks/a443e665….js:1:5568(devagency.ma)


Array.prototype.flatMap


…chunks/a443e665….js:1:5944(devagency.ma)


Object.fromEntries


…chunks/a443e665….js:1:6202(devagency.ma)


Object.hasOwn


…chunks/a443e665….js:1:5197(devagency.ma)


String.prototype.trimEnd


…chunks/a443e665….js:1:5112(devagency.ma)


String.prototype.trimStart


Font display Est savings of 50 ms
Consider setting font-display to swap or optional to ensure text is consistently visible. swap can be further optimized to mitigate layout shifts with font metric overrides.FCPUnscored
URL

Est Savings
Google Fonts
cdn

…v351/kJEhBvYX7….woff2(fonts.gstatic.com)

50 ms
Forced reflow
A forced reflow occurs when JavaScript queries geometric properties (such as offsetWidth) after styles have been invalidated by a change to the DOM state. This can result in poor performance. Learn more about forced reflows and possible mitigations.Unscored
Top function call

Total reflow time
…chunks/a443e665….js:2:8066(devagency.ma)

62 ms
Source

Total reflow time
…chunks/5ab389c069f0db38.js:1:18827(devagency.ma)

6 ms
…chunks/5ab389c069f0db38.js:1:75901(devagency.ma)

50 ms
…chunks/5ab389c069f0db38.js:1:46646(devagency.ma)

3 ms
…chunks/e0e8c45c782b6c52.js:1:15758(devagency.ma)

3 ms
…chunks/c2ae91d6417d7cfb.js:1:807(devagency.ma)

24 ms
…chunks/c2ae91d6417d7cfb.js:1:1031(devagency.ma)

8 ms
…chunks/c4a996cf1250cf80.js:1:8074(devagency.ma)

10 ms
[unattributed]

6 ms
LCP request discovery
Optimize LCP by making the LCP image discoverable from the HTML immediately, and avoiding lazy-loadingLCPUnscored

    LCP resources should not use loading=lazy
    fetchpriority=high should be applied to the image preload request
    Request is discoverable in initial document

Under hero background
<img alt="Under hero background" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/bg-img/underHero.webp">
Network dependency tree
Avoid chaining critical requests by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.LCPUnscored
Maximum critical path latency: 491 ms
Initial Navigation
https://devagency.ma
- 312 ms, 12.77 KiB
…chunks/bc8470f73e47345d.css(devagency.ma)
- 407 ms, 34.61 KiB
…chunks/aaf0bb1927b91dc7.css(devagency.ma)
- 348 ms, 17.08 KiB
…chunks/ac8b093…e3c.css(devagency.ma)
- 400 ms, 4.26 KiB
…cloudflare-static/email-decode.min.js(devagency.ma)
- 491 ms, 1.25 KiB
Preconnected origins
preconnect hints help the browser establish a connection earlier in the page load, saving time when the first request for that origin is made. The following are the origins that the page preconnected to.
no origins were preconnected
Preconnect candidates
Add preconnect hints to your most important origins, but try to use no more than 4.
No additional origins are good candidates for preconnecting
Use efficient cache lifetimes Est savings of 0 KiB
A long cache lifetime can speed up repeat visits to your page. Learn more about caching.LCPFCPUnscored
Request

Cache TTL

Transfer Size
devagency.ma
1st party
		1 KiB
…cloudflare-static/email-decode.min.js(devagency.ma)

1d 23h 59m 49s

1 KiB
Improve image delivery Est savings of 306 KiB
Reducing the download time of images can improve the perceived load time of the page and LCP. Learn more about optimizing image sizeLCPFCPUnscored

URL

Resource Size

Est Savings
devagency.ma
1st party
		350.7 KiB
	306.2 KiB
Under hero background
<img alt="Under hero background" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/bg-img/underHero.webp">

…bg-img/underHero.webp(devagency.ma)

108.5 KiB

98.9 KiB

This image file is larger than it needs to be (1920x1280) for its displayed dimensions (437x500). Use responsive images to reduce the image download size.

98.9 KiB
Our mission illustration
<img alt="Our mission illustration" loading="lazy" width="600" height="400" decoding="async" data-nimg="1" style="color:transparent" src="/assets/img/bg-img/missionarea.webp">

…bg-img/missionarea.webp(devagency.ma)

81.2 KiB

76.7 KiB

This image file is larger than it needs to be (1000x1085) for its displayed dimensions (236x256). Use responsive images to reduce the image download size.

76.7 KiB
Gavilia
<img alt="Gavilia" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/gavilia.webp">

…portfolio/gavilia.webp(devagency.ma)

39.2 KiB

30.8 KiB

This image file is larger than it needs to be (630x450) for its displayed dimensions (312x195). Use responsive images to reduce the image download size.

30.8 KiB
Rif Walks
<img alt="Rif Walks" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/rifwalks.webp">

…portfolio/rifwalks.webp(devagency.ma)

32.4 KiB

25.5 KiB

This image file is larger than it needs to be (630x450) for its displayed dimensions (312x195). Use responsive images to reduce the image download size.

25.5 KiB
Dev Agency Logo
<img alt="Dev Agency Logo" width="200" height="50" decoding="async" data-nimg="1" class="light-logo" style="color:transparent" src="/assets/img/core-img/logo-light.webp">

…core-img/logo-light.webp(devagency.ma)

24.8 KiB

23.6 KiB

This image file is larger than it needs to be (917x430) for its displayed dimensions (200x94). Use responsive images to reduce the image download size.

23.6 KiB
Blausee Switzerland
<img alt="Blausee Switzerland" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/blausee.webp">

…portfolio/blausee.webp(devagency.ma)

16.5 KiB

13.0 KiB

This image file is larger than it needs to be (630x450) for its displayed dimensions (312x195). Use responsive images to reduce the image download size.

13.0 KiB
Blue Guide
<img alt="Blue Guide" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/blueguide.webp">

…portfolio/blueguide.webp(devagency.ma)

14.9 KiB

11.7 KiB

This image file is larger than it needs to be (630x450) for its displayed dimensions (312x195). Use responsive images to reduce the image download size.

11.7 KiB
Rim Bakhat
<img alt="Rim Bakhat" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/rimbakhat.webp">

…portfolio/rimbakhat.webp(devagency.ma)

13.5 KiB

10.6 KiB

This image file is larger than it needs to be (630x450) for its displayed dimensions (312x195). Use responsive images to reduce the image download size.

10.6 KiB
SunnySide Agency
<img alt="SunnySide Agency" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/sunnyside.webp">

…portfolio/sunnyside.webp(devagency.ma)

13.0 KiB

10.2 KiB

This image file is larger than it needs to be (630x450) for its displayed dimensions (312x195). Use responsive images to reduce the image download size.

10.2 KiB
Tip Splitter App
<img alt="Tip Splitter App" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/tipsplitter.webp">

…portfolio/tipsplitter.webp(devagency.ma)

6.7 KiB

5.2 KiB

This image file is larger than it needs to be (630x450) for its displayed dimensions (312x195). Use responsive images to reduce the image download size.

5.2 KiB
Optimize DOM size
A large DOM can increase the duration of style calculations and layout reflows, impacting page responsiveness. A large DOM will also increase memory usage. Learn how to avoid an excessive DOM size.Unscored
Statistic

Element

Value
Total elements

439
DOM depth

+
<span>

12
Most children

body.light-mode
<body class="light-mode">

15
LCP breakdown
Each subpart has specific improvement strategies. Ideally, most of the LCP time should be spent on loading the resources, not within delays.LCPUnscored
Subpart

Duration
Time to first byte

0 ms
Resource load delay

280 ms
Resource load duration

80 ms
Element render delay

2,070 ms
Under hero background
<img alt="Under hero background" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/bg-img/underHero.webp">
3rd parties
3rd party code can significantly impact load performance. Reduce and defer loading of 3rd party code to prioritize your page's content.Unscored
3rd party

Transfer size

Main thread time
Google Tag Manager
tag-manager
	177 KiB
	225 ms
/gtag/js?id=G-CHLV3WJMNY(www.googletagmanager.com)

177 KiB

225 ms
Google Fonts
cdn
	3,861 KiB
	0 ms
…v351/kJEhBvYX7….woff2(fonts.gstatic.com)

3,860 KiB

0 ms
/css2?family=…(fonts.googleapis.com)

1 KiB

0 ms
Google Analytics
analytics
	1 KiB
	0 ms
/g/collect?v=…(www.google-analytics.com)

1 KiB

0 ms
These insights are also available in the Chrome DevTools Performance Panel - record a trace to view more detailed information.
Diagnostics
Reduce unused JavaScript Est savings of 123 KiB
Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. Learn how to reduce unused JavaScript.LCPFCPUnscored
URL

Transfer Size

Est Savings
Google Tag Manager
tag-manager
	176.1 KiB
	69.5 KiB
/gtag/js?id=G-CHLV3WJMNY(www.googletagmanager.com)

176.1 KiB

69.5 KiB
devagency.ma
1st party
	98.8 KiB
	53.4 KiB
…chunks/f83dccd61d1fecb4.js(devagency.ma)

31.9 KiB

31.9 KiB
…chunks/a443e665….js(devagency.ma)

66.9 KiB

21.5 KiB
Reduce unused CSS Est savings of 44 KiB
Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. Learn how to reduce unused CSS.LCPFCPUnscored
URL

Transfer Size

Est Savings
devagency.ma
1st party
	49.6 KiB
	44.0 KiB
…chunks/bc8470f73e47345d.css(devagency.ma)

33.6 KiB

31.0 KiB
…chunks/aaf0bb1927b91dc7.css(devagency.ma)

16.0 KiB

13.0 KiB
Avoid enormous network payloads Total size was 4,853 KiB
Large network payloads cost users real money and are highly correlated with long load times. Learn how to reduce payload sizes.Unscored
URL

Transfer Size
Google Fonts
cdn
	3,860.0 KiB
…v351/kJEhBvYX7….woff2(fonts.gstatic.com)

3,860.0 KiB
devagency.ma
1st party
	450.0 KiB
…bg-img/underHero.webp(devagency.ma)

109.5 KiB
…bg-img/missionarea.webp(devagency.ma)

82.2 KiB
…chunks/a443e665….js(devagency.ma)

68.0 KiB
…media/c825fd02acae0153-s.p.1692d83b.woff2(devagency.ma)

43.1 KiB
…portfolio/gavilia.webp(devagency.ma)

40.2 KiB
…chunks/5ab389c069f0db38.js(devagency.ma)

39.0 KiB
…chunks/bc8470f73e47345d.css(devagency.ma)

34.6 KiB
…chunks/f83dccd61d1fecb4.js(devagency.ma)

33.4 KiB
Google Tag Manager
tag-manager
	176.8 KiB
/gtag/js?id=G-CHLV3WJMNY(www.googletagmanager.com)

176.8 KiB
Avoid non-composited animations 44 animated elements found
Animations which are not composited can be janky and increase CLS. Learn how to avoid non-composited animationsCLSUnscored
Element

Name
Mobile Apps Design
<a href="#">

Unsupported CSS Property: color

color
div.col-12 > div.swiper-navigation-container > div.portfolio-button-next > ::before
<::before>

Unsupported CSS Property: color

color
Unsupported CSS Property: color

color
div.col-12 > div.swiper-navigation-container > div.portfolio-button-prev > ::before
<::before>

Unsupported CSS Property: color

color
Unsupported CSS Property: color

color
div.col-12 > div.footer-card > form.subscribe-form > input.form-control
<input type="email" class="form-control" placeholder="Enter your email address" required="" value="">

Unsupported CSS Property: border-right-color

border-right-color
Unsupported CSS Property: border-top-color

border-top-color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
How long does it take to build a website?
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqQuestion5" aria-expanded="false" aria-controls="faqQuestion5">

Unsupported CSS Property: color

color
div#sideMenuOffcanvas > div.offcanvas-body > div.social-nav > a
<a href="https://www.instagram.com/devagency.ma" target="_blank">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
div.col-12 > div.footer-card > div.social-nav > a
<a href="https://www.facebook.com/devagency.ma">

Unsupported CSS Property: color

color
Our Vision
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">

Unsupported CSS Property: border-bottom-color

border-bottom-color
Unsupported CSS Property: border-left-color

border-left-color
Unsupported CSS Property: border-right-color

border-right-color
Unsupported CSS Property: color

color
Unsupported CSS Property: border-top-color

border-top-color
Web Development
<a href="#">

Unsupported CSS Property: color

color
What is your vision?
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqQuestion1" aria-expanded="false" aria-controls="faqQuestion1">

Unsupported CSS Property: color

color
Do you offer free consultations?
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqQuestion2" aria-expanded="false" aria-controls="faqQuestion2">

Unsupported CSS Property: color

color
view_cozy
<nav class="navbar navbar-expand-lg">

Unsupported CSS Property: color

color
SaaS Design
<a href="#">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://blauseeswitzerland.com/" target="_blank">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
body.light-mode > div.back-to-top-wrapper
<div class="back-to-top-wrapper undefined false">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
Dev Agency Logo
<a class="navbar-brand" href="/">

Unsupported CSS Property: color

color
DISCUSS YOUR PROJECT DISCUSS YOUR PROJECT
<a href="https://wa.me/212776932898?text=Bonjour%20!%20Je%20suis%20int%C3%A9ress%C3…" class="btn btn-primary wow fadeInUp animated" data-wow-duration="1000ms" data-wow-delay="1200ms" style="width: 100%; visibility: visible; animation-duration: 1000ms;">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://theblueguide.com/" target="_blank">

Unsupported CSS Property: color

color
div.row > div.col-12 > div.swiper-navigation-container > div.portfolio-button-next
<div style="cursor:pointer" class="portfolio-button-next">

Unsupported CSS Property: color

color
div > div > h5.mb-0 > a
<a href="tel:+212776932898" target="_blank">

Unsupported CSS Property: color

color
div.col-12 > div.footer-card > div.social-nav > a
<a href="https://www.instagram.com/devagency.ma">

Unsupported CSS Property: color

color
div.row > div.col-12 > div.swiper-navigation-container > div.portfolio-button-prev
<div style="cursor:pointer" class="portfolio-button-prev">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://rimbakhat.com" target="_blank">

Unsupported CSS Property: color

color
Dev Agency Logo
<a href="/">

Unsupported CSS Property: color

color
Dev Agency Logo
<a href="/">

Unsupported CSS Property: color

color
div#sideMenuOffcanvas > div.offcanvas-body > div.social-nav > a
<a href="https://www.facebook.com/devagency.ma" target="_blank">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://gavilia.ma/" target="_blank">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://oubaidelmoudhik.github.io/tip-calculator-app-main/" target="_blank">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
div > div > h5.mb-0 > a
<a href="mailto:contact@devagency.ma" target="_blank">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
Webflow Design
<a href="#">

Unsupported CSS Property: color

color
view_cozy
<header class="header-area false">

Unsupported CSS Property: color

color
Can you help with updates and maintenance?
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqQuestion3" aria-expanded="false" aria-controls="faqQuestion3">

Unsupported CSS Property: color

color
div#sideMenuOffcanvas > div.offcanvas-body > div.social-nav > a
<a href="https://wa.me/212776932898?text=Bonjour%20!%20Je%20suis%20int%C3%A9ress%C3…" target="_blank">

Unsupported CSS Property: color

color
Do you offer e-commerce solutions?
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqQuestion4" aria-expanded="false" aria-controls="faqQuestion4">

Unsupported CSS Property: color

color
UI/UX Design
<a href="#">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://oubaidelmoudhik.github.io/Sunnyside-agency-landing-page/" target="_blank">

Unsupported CSS Property: color

color
Our Mission
<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

Unsupported CSS Property: border-bottom-color

border-bottom-color
Unsupported CSS Property: border-left-color

border-left-color
Unsupported CSS Property: border-right-color

border-right-color
Unsupported CSS Property: color

color
Unsupported CSS Property: border-top-color

border-top-color
Avoid long main-thread tasks 6 long tasks found
Lists the longest tasks on the main thread, useful for identifying worst contributors to input delay. Learn how to avoid long main-thread tasksTBTUnscored
URL

Start Time

Duration
devagency.ma
1st party
		396 ms
…chunks/a443e665….js(devagency.ma)

8,612 ms

154 ms
…chunks/a443e665….js(devagency.ma)

8,505 ms

97 ms
…chunks/8ceeb80d8994d96e.js(devagency.ma)

6,868 ms

95 ms
…chunks/a443e665….js(devagency.ma)

6,818 ms

50 ms
Google Tag Manager
tag-manager
		266 ms
/gtag/js?id=G-CHLV3WJMNY(www.googletagmanager.com)

11,609 ms

143 ms
/gtag/js?id=G-CHLV3WJMNY(www.googletagmanager.com)

11,752 ms

123 ms
More information about the performance of your application. These numbers don't directly affect the Performance score.
Passed audits (11)
Show











































94
Accessibility
These checks highlight opportunities to improve the accessibility of your web app. Automatic detection can only detect a subset of issues and does not guarantee the accessibility of your web app, so manual testing is also encouraged.
Names and labels
Links do not have a discernible name
Link text (and alternate text for images, when used as links) that is discernible, unique, and focusable improves the navigation experience for screen reader users. Learn how to make links accessible.
Failing Elements
div.col-12 > div.footer-card > div.social-nav > a
<a href="https://www.facebook.com/devagency.ma">
div.col-12 > div.footer-card > div.social-nav > a
<a href="https://www.instagram.com/devagency.ma">
These are opportunities to improve the semantics of the controls in your application. This may enhance the experience for users of assistive technology, like a screen reader.
Navigation
Heading elements are not in a sequentially-descending order
Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. Learn more about heading order.
Failing Elements
TRUSTED BY 30+ BUSINESSES
<h6 class="mb-0">
Years of Experience
<h4>
Successful Projects
<h4>
Satisfied Customers
<h4>
Websites that boost visibility and growth.
<h5 class="mb-0">
STEP 1
<h6>
Our Services
<h5 class="mb-0">
These are opportunities to improve keyboard navigation in your application.
Additional items to manually check (10)
Show
These items address areas which an automated testing tool cannot cover. Learn more in our guide on conducting an accessibility review.
Passed audits (21)
Show
Not applicable (40)
Show
96
Best Practices
User Experience
Displays images with incorrect aspect ratio
Image display dimensions should match natural aspect ratio. Learn more about image aspect ratio.

URL

Aspect Ratio (Displayed)

Aspect Ratio (Actual)
devagency.ma
1st party

Under hero background
<img alt="Under hero background" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/bg-img/underHero.webp">

…bg-img/underHero.webp(devagency.ma)

437 x 500 (0.87)

1920 x 1280 (1.50)
Dev Agency Logo
<img alt="Dev Agency Logo" width="200" height="50" decoding="async" data-nimg="1" class="dark-logo" style="color:transparent" src="/assets/img/core-img/logo.webp">

…core-img/logo.webp(devagency.ma)

200 x 50 (4.00)

924 x 426 (2.17)
Dev Agency Logo
<img alt="Dev Agency Logo" width="200" height="50" decoding="async" data-nimg="1" class="dark-logo" style="color:transparent" src="/assets/img/core-img/logo.webp">

…core-img/logo.webp(devagency.ma)

200 x 50 (4.00)

924 x 426 (2.17)
Dev Agency Logo
<img alt="Dev Agency Logo" width="200" height="50" decoding="async" data-nimg="1" class="dark-logo" style="color:transparent" src="/assets/img/core-img/logo.webp">

…core-img/logo.webp(devagency.ma)

200 x 50 (4.00)

924 x 426 (2.17)
Rim Bakhat
<img alt="Rim Bakhat" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/rimbakhat.webp">

…portfolio/rimbakhat.webp(devagency.ma)

312 x 195 (1.60)

630 x 450 (1.40)
Rif Walks
<img alt="Rif Walks" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/rifwalks.webp">

…portfolio/rifwalks.webp(devagency.ma)

312 x 195 (1.60)

630 x 450 (1.40)
Blausee Switzerland
<img alt="Blausee Switzerland" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/blausee.webp">

…portfolio/blausee.webp(devagency.ma)

312 x 195 (1.60)

630 x 450 (1.40)
SunnySide Agency
<img alt="SunnySide Agency" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/sunnyside.webp">

…portfolio/sunnyside.webp(devagency.ma)

312 x 195 (1.60)

630 x 450 (1.40)
Blue Guide
<img alt="Blue Guide" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/blueguide.webp">

…portfolio/blueguide.webp(devagency.ma)

312 x 195 (1.60)

630 x 450 (1.40)
Tip Splitter App
<img alt="Tip Splitter App" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/tipsplitter.webp">

…portfolio/tipsplitter.webp(devagency.ma)

312 x 195 (1.60)

630 x 450 (1.40)
Gavilia
<img alt="Gavilia" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/gavilia.webp">

…portfolio/gavilia.webp(devagency.ma)

312 x 195 (1.60)

630 x 450 (1.40)
Trust and Safety
Ensure CSP is effective against XSS attacks
A strong Content Security Policy (CSP) significantly reduces the risk of cross-site scripting (XSS) attacks. Learn how to use a CSP to prevent XSSUnscored
Description

Directive

Severity
No CSP found in enforcement mode

High
Use a strong HSTS policy
Deployment of the HSTS header significantly reduces the risk of downgrading HTTP connections and eavesdropping attacks. A rollout in stages, starting with a low max-age is recommended. Learn more about using a strong HSTS policy.Unscored
Description

Directive

Severity
No `includeSubDomains` directive found


includeSubDomains


Medium
No `preload` directive found


preload


Medium
Ensure proper origin isolation with COOP
The Cross-Origin-Opener-Policy (COOP) can be used to isolate the top-level window from other documents such as pop-ups. Learn more about deploying the COOP header.Unscored
Description

Directive

Severity
No COOP header found

High
Mitigate clickjacking with XFO or CSP
The X-Frame-Options (XFO) header or the frame-ancestors directive in the Content-Security-Policy (CSP) header control where a page can be embedded. These can mitigate clickjacking attacks by blocking some or all sites from embedding the page. Learn more about mitigating clickjacking.Unscored
Description

Severity
No frame control policy found

High
Mitigate DOM-based XSS with Trusted Types
The require-trusted-types-for directive in the Content-Security-Policy (CSP) header instructs user agents to control the data passed to DOM XSS sink functions. Learn more about mitigating DOM-based XSS with Trusted Types.Unscored
Description

Severity
No `Content-Security-Policy` header with Trusted Types directive found

High
Browser Compatibility
Baseline Features
Lists web features used on the page and their Baseline status as of 2026-06-05. Learn more about Baseline.Unscored
Passed audits (12)
Show
Not applicable (2)
Show
100
SEO
These checks ensure that your page is following basic search engine optimization advice. There are many additional factors Lighthouse does not score here that may affect your search ranking, including performance on Core Web Vitals. Learn more about Google Search Essentials.
Additional items to manually check (1)
Hide
Structured data is valid
Run the Structured Data Testing Tool to validate structured data. Learn more about Structured Data.Unscored
Run these additional validators on your site to check additional SEO best practices.
Passed audits (10)
Show
1/2
Agentic Browsing
These checks ensure high-quality, browsable websites for AI agents and validate the correctness of WebMCP integrations. This category is still under development and subject to change.
Agent Accessibility
Accessibility tree is not well-formed
A well-formed accessibility tree helps AI agents to navigate and interact with the page.
Failed Audits
Description

Failing Element
Links must have discernible text

div.col-12 > div.footer-card > div.social-nav > a
<a href="https://www.facebook.com/devagency.ma">
These audits highlight best practices for improving the accessibility of the website for AI agents.
Passed audits (1)
Show
Not applicable (4)
Hide
WebMCP form coverage
WebMCP tools registered
WebMCP schemas are valid
llms.txt follows recommendations
More on PageSpeed InsightsWhat's newDocumentationLearn about Web PerformanceAsk questions on Stack OverflowMailing list
Related ContentUpdatesWeb FundamentalsCase StudiesPodcasts
ConnectTwitterYoutube
Google Developers Logo
Chrome
Firebase
All products
Terms and Privacy Policy
For details, see the Google Developers Site Policies.

-----
desktop:
PageSpeed Insights logo
PageSpeed Insights
Report from Jun 22, 2026, 6:23:49 PM

Enter a valid URL
Discover what your real users are experiencing
No Data
Diagnose performance issues
61
Performance
94
Accessibility
96
Best Practices
100
SEO
1/2
Agentic Browsing
61 FCP+0LCP+4TBT+30CLS+25SI+1 Performance
Values are estimated and may vary. The performance score is calculated directly from these metrics.See calculator.
0–49 50–89 90–100
Final Screenshot
Metrics
Expand view
First Contentful Paint
3.7 s
Largest Contentful Paint
4.0 s
Total Blocking Time
0 ms
Cumulative Layout Shift
0.002
Speed Index
3.7 s

    Captured at Jun 22, 2026, 6:23 PM GMT+1
    Emulated Desktop with Lighthouse 13.4.0
    Single page session
    Initial page load
    Custom throttling
    Using HeadlessChromium 146.0.7680.177 with lr

Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Show audits relevant to:
All
FCP
LCP
TBT
CLS
Insights
Render-blocking requests Est savings of 3,500 ms
Requests are blocking the page's initial render, which may delay LCP. Deferring or inlining can move these network requests out of the critical path.LCPFCPUnscored
URL

Transfer Size

Duration
devagency.ma
1st party
	56.0 KiB
	500 ms
…chunks/aaf0bb1927b91dc7.css(devagency.ma)

17.1 KiB

200 ms
…chunks/ac8b093…e3c.css(devagency.ma)

4.3 KiB

150 ms
…chunks/bc8470f73e47345d.css(devagency.ma)

34.6 KiB

150 ms
Google Fonts
cdn
	1.1 KiB
	200 ms
/css2?family=…(fonts.googleapis.com)

1.1 KiB

200 ms
Legacy JavaScript Est savings of 14 KiB
Polyfills and transforms enable older browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile Baseline features, unless you know you must support older browsers. Learn why most sites can deploy ES6+ code without transpilingLCPFCPUnscored
URL


Wasted bytes
devagency.ma
1st party
		13.9 KiB
…chunks/a443e665….js(devagency.ma)

13.9 KiB
…chunks/a443e665….js:1:6067(devagency.ma)


Array.prototype.at


…chunks/a443e665….js:1:5455(devagency.ma)


Array.prototype.flat


…chunks/a443e665….js:1:5568(devagency.ma)


Array.prototype.flatMap


…chunks/a443e665….js:1:5944(devagency.ma)


Object.fromEntries


…chunks/a443e665….js:1:6202(devagency.ma)


Object.hasOwn


…chunks/a443e665….js:1:5197(devagency.ma)


String.prototype.trimEnd


…chunks/a443e665….js:1:5112(devagency.ma)


String.prototype.trimStart


Font display Est savings of 40 ms
Consider setting font-display to swap or optional to ensure text is consistently visible. swap can be further optimized to mitigate layout shifts with font metric overrides.FCPUnscored
URL

Est Savings
Google Fonts
cdn

…v351/kJEhBvYX7….woff2(fonts.gstatic.com)

40 ms
Forced reflow
A forced reflow occurs when JavaScript queries geometric properties (such as offsetWidth) after styles have been invalidated by a change to the DOM state. This can result in poor performance. Learn more about forced reflows and possible mitigations.Unscored
Top function call

Total reflow time
…chunks/a443e665….js:2:8066(devagency.ma)

23 ms
Source

Total reflow time
[unattributed]

80 ms
…chunks/5ab389c069f0db38.js:1:18827(devagency.ma)

5 ms
…chunks/5ab389c069f0db38.js:1:46646(devagency.ma)

2 ms
…chunks/e0e8c45c782b6c52.js:1:15758(devagency.ma)

2 ms
…chunks/5ab389c069f0db38.js:1:40033(devagency.ma)

13 ms
…chunks/c4a996cf1250cf80.js:1:8074(devagency.ma)

0 ms
…chunks/6ec9a0a6f824354d.js:1:2391(devagency.ma)

14 ms
LCP request discovery
Optimize LCP by making the LCP image discoverable from the HTML immediately, and avoiding lazy-loadingLCPUnscored

    LCP resources should not use loading=lazy
    fetchpriority=high should be applied to the image preload request
    Request is discoverable in initial document

Under hero background
<img alt="Under hero background" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/bg-img/underHero.webp">
Network dependency tree
Avoid chaining critical requests by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.LCPUnscored
Maximum critical path latency: 493 ms
Initial Navigation
https://devagency.ma
- 355 ms, 12.79 KiB
…chunks/bc8470f73e47345d.css(devagency.ma)
- 461 ms, 34.62 KiB
…chunks/aaf0bb1927b91dc7.css(devagency.ma)
- 493 ms, 17.09 KiB
…chunks/ac8b093…e3c.css(devagency.ma)
- 462 ms, 4.27 KiB
…cloudflare-static/email-decode.min.js(devagency.ma)
- 423 ms, 1.25 KiB
Preconnected origins
preconnect hints help the browser establish a connection earlier in the page load, saving time when the first request for that origin is made. The following are the origins that the page preconnected to.
no origins were preconnected
Preconnect candidates
Add preconnect hints to your most important origins, but try to use no more than 4.
No additional origins are good candidates for preconnecting
Use efficient cache lifetimes Est savings of 0 KiB
A long cache lifetime can speed up repeat visits to your page. Learn more about caching.LCPFCPUnscored
Request

Cache TTL

Transfer Size
devagency.ma
1st party
		1 KiB
…cloudflare-static/email-decode.min.js(devagency.ma)

1d 23h 59m 51s

1 KiB
Improve image delivery Est savings of 199 KiB
Reducing the download time of images can improve the perceived load time of the page and LCP. Learn more about optimizing image sizeLCPFCPUnscored

URL

Resource Size

Est Savings
devagency.ma
1st party
		314.3 KiB
	198.8 KiB
Our mission illustration
<img alt="Our mission illustration" loading="lazy" width="600" height="400" decoding="async" data-nimg="1" style="color:transparent" src="/assets/img/bg-img/missionarea.webp">

…bg-img/missionarea.webp(devagency.ma)

81.2 KiB

65.8 KiB

This image file is larger than it needs to be (1000x1085) for its displayed dimensions (436x473). Use responsive images to reduce the image download size.

65.8 KiB
Under hero background
<img alt="Under hero background" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/bg-img/underHero.webp">

…bg-img/underHero.webp(devagency.ma)

108.5 KiB

59.5 KiB

This image file is larger than it needs to be (1920x1280) for its displayed dimensions (1425x780). Use responsive images to reduce the image download size.

59.5 KiB
Dev Agency Logo
<img alt="Dev Agency Logo" width="200" height="50" decoding="async" data-nimg="1" class="light-logo" style="color:transparent" src="/assets/img/core-img/logo-light.webp">

…core-img/logo-light.webp(devagency.ma)

24.8 KiB

24.2 KiB

This image file is larger than it needs to be (917x430) for its displayed dimensions (140x66). Use responsive images to reduce the image download size.

24.2 KiB
Dev Agency Logo
<img alt="Dev Agency Logo" width="200" height="50" decoding="async" data-nimg="1" class="dark-logo" style="color:transparent" src="/assets/img/core-img/logo.webp">

…core-img/logo.webp(devagency.ma)

16.1 KiB

15.8 KiB

This image file is larger than it needs to be (924x426) for its displayed dimensions (140x65). Use responsive images to reduce the image download size.

15.8 KiB
Gavilia
<img alt="Gavilia" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/gavilia.webp">

…portfolio/gavilia.webp(devagency.ma)

39.2 KiB

15.7 KiB

This image file is larger than it needs to be (630x450) for its displayed dimensions (521x326). Use responsive images to reduce the image download size.

15.7 KiB
Blausee Switzerland
<img alt="Blausee Switzerland" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/blausee.webp">

…portfolio/blausee.webp(devagency.ma)

16.5 KiB

6.6 KiB

This image file is larger than it needs to be (630x450) for its displayed dimensions (521x326). Use responsive images to reduce the image download size.

6.6 KiB
Blue Guide
<img alt="Blue Guide" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/blueguide.webp">

…portfolio/blueguide.webp(devagency.ma)

14.9 KiB

6.0 KiB

This image file is larger than it needs to be (630x450) for its displayed dimensions (521x326). Use responsive images to reduce the image download size.

6.0 KiB
SunnySide Agency
<img alt="SunnySide Agency" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/sunnyside.webp">

…portfolio/sunnyside.webp(devagency.ma)

13.0 KiB

5.2 KiB

This image file is larger than it needs to be (630x450) for its displayed dimensions (521x326). Use responsive images to reduce the image download size.

5.2 KiB
Layout shift culprits
Layout shifts occur when elements move absent any user interaction. Investigate the causes of layout shifts, such as elements being added, removed, or their fonts changing as the page loads.CLSUnscored
Element

Layout shift score
Total

0.002
HOME SERVICES CONTACT BLOG
<ul class="navbar-nav navbar-nav-scroll">

0.002
…v351/kJEhBvYX7….woff2(fonts.gstatic.com)

Web font
LCP breakdown
Each subpart has specific improvement strategies. Ideally, most of the LCP time should be spent on loading the resources, not within delays.LCPUnscored
Subpart

Duration
Time to first byte

0 ms
Resource load delay

330 ms
Resource load duration

160 ms
Element render delay

170 ms
Under hero background
<img alt="Under hero background" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/bg-img/underHero.webp">
3rd parties
3rd party code can significantly impact load performance. Reduce and defer loading of 3rd party code to prioritize your page's content.Unscored
3rd party

Transfer size

Main thread time
Google Tag Manager
tag-manager
	177 KiB
	208 ms
/gtag/js?id=G-CHLV3WJMNY(www.googletagmanager.com)

177 KiB

208 ms
Google Fonts
cdn
	3,861 KiB
	0 ms
…v351/kJEhBvYX7….woff2(fonts.gstatic.com)

3,860 KiB

0 ms
/css2?family=…(fonts.googleapis.com)

1 KiB

0 ms
Google Analytics
analytics
	1 KiB
	0 ms
/g/collect?v=…(www.google-analytics.com)

1 KiB

0 ms
These insights are also available in the Chrome DevTools Performance Panel - record a trace to view more detailed information.
Diagnostics
Reduce unused CSS Est savings of 43 KiB
Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. Learn how to reduce unused CSS.LCPFCPUnscored
URL

Transfer Size

Est Savings
devagency.ma
1st party
	49.6 KiB
	42.9 KiB
…chunks/bc8470f73e47345d.css(devagency.ma)

33.6 KiB

30.7 KiB
…chunks/aaf0bb1927b91dc7.css(devagency.ma)

16.0 KiB

12.2 KiB
Reduce unused JavaScript Est savings of 123 KiB
Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. Learn how to reduce unused JavaScript.LCPFCPUnscored
URL

Transfer Size

Est Savings
Google Tag Manager
tag-manager
	176.1 KiB
	69.6 KiB
/gtag/js?id=G-CHLV3WJMNY(www.googletagmanager.com)

176.1 KiB

69.6 KiB
devagency.ma
1st party
	98.8 KiB
	53.5 KiB
…chunks/f83dccd61d1fecb4.js(devagency.ma)

31.9 KiB

31.9 KiB
…chunks/a443e665….js(devagency.ma)

66.9 KiB

21.6 KiB
Avoid enormous network payloads Total size was 4,870 KiB
Large network payloads cost users real money and are highly correlated with long load times. Learn how to reduce payload sizes.Unscored
URL

Transfer Size
Google Fonts
cdn
	3,860.0 KiB
…v351/kJEhBvYX7….woff2(fonts.gstatic.com)

3,860.0 KiB
devagency.ma
1st party
	450.0 KiB
…bg-img/underHero.webp(devagency.ma)

109.5 KiB
…bg-img/missionarea.webp(devagency.ma)

82.2 KiB
…chunks/a443e665….js(devagency.ma)

68.0 KiB
…media/c825fd02acae0153-s.p.1692d83b.woff2(devagency.ma)

43.1 KiB
…portfolio/gavilia.webp(devagency.ma)

40.2 KiB
…chunks/5ab389c069f0db38.js(devagency.ma)

39.0 KiB
…chunks/bc8470f73e47345d.css(devagency.ma)

34.6 KiB
…chunks/f83dccd61d1fecb4.js(devagency.ma)

33.4 KiB
Google Tag Manager
tag-manager
	176.8 KiB
/gtag/js?id=G-CHLV3WJMNY(www.googletagmanager.com)

176.8 KiB
Avoid non-composited animations 50 animated elements found
Animations which are not composited can be janky and increase CLS. Learn how to avoid non-composited animationsCLSUnscored
Element

Name
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://rifwalks.com" target="_blank">

Unsupported CSS Property: color

color
Mobile Apps Design
<a href="#">

Unsupported CSS Property: color

color
div.col-12 > div.swiper-navigation-container > div.portfolio-button-next > ::before
<::before>

Unsupported CSS Property: color

color
Unsupported CSS Property: color

color
div.col-12 > div.swiper-navigation-container > div.portfolio-button-prev > ::before
<::before>

Unsupported CSS Property: color

color
Unsupported CSS Property: color

color
# Web Design # Web Development # UI/UX Design
<div class="rfm-marquee" style="--play: running; --direction: normal; --duration: 37.765s; --delay: 0s;">

Unsupported CSS Property: border-top-color

scroll
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
How long does it take to build a website?
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqQuestion5" aria-expanded="false" aria-controls="faqQuestion5">

Unsupported CSS Property: color

color
div#sideMenuOffcanvas > div.offcanvas-body > div.social-nav > a
<a href="https://www.instagram.com/devagency.ma" target="_blank">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
div.col-12 > div.footer-card > div.social-nav > a
<a href="https://www.facebook.com/devagency.ma">

Unsupported CSS Property: color

color
Our Vision
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">

Unsupported CSS Property: border-bottom-color

border-bottom-color
Unsupported CSS Property: border-left-color

border-left-color
Unsupported CSS Property: border-right-color

border-right-color
Unsupported CSS Property: color

color
Unsupported CSS Property: border-top-color

border-top-color
Web Development
<a href="#">

Unsupported CSS Property: color

color
BLOG
<a class="nav-link" href="/blog">

Unsupported CSS Property: color

color
What is your vision?
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqQuestion1" aria-expanded="false" aria-controls="faqQuestion1">

Unsupported CSS Property: color

color
Do you offer free consultations?
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqQuestion2" aria-expanded="false" aria-controls="faqQuestion2">

Unsupported CSS Property: color

color
HOME SERVICES CONTACT BLOG language bedtime
<nav class="navbar navbar-expand-lg">

Unsupported CSS Property: color

color
SaaS Design
<a href="#">

Unsupported CSS Property: color

color
HOME
<a class="nav-link" href="/">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://blauseeswitzerland.com/" target="_blank">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
body.light-mode > div.back-to-top-wrapper
<div class="back-to-top-wrapper undefined false">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
Dev Agency Logo
<a class="navbar-brand" href="/">

Unsupported CSS Property: color

color
DISCUSS YOUR PROJECT DISCUSS YOUR PROJECT
<a href="https://wa.me/212776932898?text=Bonjour%20!%20Je%20suis%20int%C3%A9ress%C3…" class="btn btn-primary wow fadeInUp animated" data-wow-duration="1000ms" data-wow-delay="1200ms" style="width: 100%; visibility: visible; animation-duration: 1000ms;">

Unsupported CSS Property: color

color
CONTACT
<a class="nav-link" href="/contact">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://theblueguide.com/" target="_blank">

Unsupported CSS Property: color

color
div.row > div.col-12 > div.swiper-navigation-container > div.portfolio-button-next
<div style="cursor:pointer" class="portfolio-button-next">

Unsupported CSS Property: color

color
div > div > h5.mb-0 > a
<a href="tel:+212776932898" target="_blank">

Unsupported CSS Property: color

color
div.col-12 > div.footer-card > div.social-nav > a
<a href="https://www.instagram.com/devagency.ma">

Unsupported CSS Property: color

color
div.row > div.col-12 > div.swiper-navigation-container > div.portfolio-button-prev
<div style="cursor:pointer" class="portfolio-button-prev">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://rimbakhat.com" target="_blank">

Unsupported CSS Property: color

color
Dev Agency Logo
<a href="/">

Unsupported CSS Property: color

color
Dev Agency Logo
<a href="/">

Unsupported CSS Property: color

color
div#sideMenuOffcanvas > div.offcanvas-body > div.social-nav > a
<a href="https://www.facebook.com/devagency.ma" target="_blank">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://gavilia.ma/" target="_blank">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://oubaidelmoudhik.github.io/tip-calculator-app-main/" target="_blank">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
SERVICES
<a class="nav-link" href="/service">

Unsupported CSS Property: color

color
div > div > h5.mb-0 > a
<a href="mailto:contact@devagency.ma" target="_blank">

Unsupported CSS Property: color

color
div.swiper-wrapper > div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content
<div class="portfolio-overlay-content d-flex align-items-center justify-content-between">

Unsupported CSS Property: color

color
Webflow Design
<a href="#">

Unsupported CSS Property: color

color
HOME SERVICES CONTACT BLOG language bedtime
<header class="header-area false">

Unsupported CSS Property: color

color
div#devAgencyNav > div.d-flex > div#sideMenuButton > a.btn
<a class="btn btn-primary sideMenuButton" data-bs-toggle="offcanvas" href="#sideMenuOffcanvas" role="button" aria-controls="sideMenuOffcanvas">

Unsupported CSS Property: color

color
div#sideMenuOffcanvas > div.offcanvas-body > div.social-nav > a
<a href="https://wa.me/212776932898?text=Bonjour%20!%20Je%20suis%20int%C3%A9ress%C3…" target="_blank">

Unsupported CSS Property: color

color
Do you offer e-commerce solutions?
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqQuestion4" aria-expanded="false" aria-controls="faqQuestion4">

Unsupported CSS Property: color

color
Can you help with updates and maintenance?
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqQuestion3" aria-expanded="false" aria-controls="faqQuestion3">

Unsupported CSS Property: color

color
UI/UX Design
<a href="#">

Unsupported CSS Property: color

color
div.swiper-slide > div.portfolio-card-two > div.portfolio-overlay-content > a
<a href="https://oubaidelmoudhik.github.io/Sunnyside-agency-landing-page/" target="_blank">

Unsupported CSS Property: color

color
Our Mission
<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

Unsupported CSS Property: border-bottom-color

border-bottom-color
Unsupported CSS Property: border-left-color

border-left-color
Unsupported CSS Property: border-right-color

border-right-color
Unsupported CSS Property: color

color
Unsupported CSS Property: border-top-color

border-top-color
Avoid long main-thread tasks 5 long tasks found
Lists the longest tasks on the main thread, useful for identifying worst contributors to input delay. Learn how to avoid long main-thread tasksTBTUnscored
URL

Start Time

Duration
Google Tag Manager
tag-manager
		204 ms
/gtag/js?id=G-CHLV3WJMNY(www.googletagmanager.com)

2,178 ms

108 ms
/gtag/js?id=G-CHLV3WJMNY(www.googletagmanager.com)

2,082 ms

96 ms
devagency.ma
1st party
		201 ms
…chunks/a443e665….js(devagency.ma)

1,670 ms

86 ms
…chunks/0a8918ead5ae4a5d.js(devagency.ma)

1,211 ms

65 ms
…chunks/a443e665….js(devagency.ma)

1,468 ms

50 ms
More information about the performance of your application. These numbers don't directly affect the Performance score.
Passed audits (11)
Show














































94
Accessibility
These checks highlight opportunities to improve the accessibility of your web app. Automatic detection can only detect a subset of issues and does not guarantee the accessibility of your web app, so manual testing is also encouraged.
Names and labels
Links do not have a discernible name
Link text (and alternate text for images, when used as links) that is discernible, unique, and focusable improves the navigation experience for screen reader users. Learn how to make links accessible.
Failing Elements
div#devAgencyNav > div.d-flex > div#sideMenuButton > a.btn
<a class="btn btn-primary sideMenuButton" data-bs-toggle="offcanvas" href="#sideMenuOffcanvas" role="button" aria-controls="sideMenuOffcanvas">
div.col-12 > div.footer-card > div.social-nav > a
<a href="https://www.facebook.com/devagency.ma">
div.col-12 > div.footer-card > div.social-nav > a
<a href="https://www.instagram.com/devagency.ma">
These are opportunities to improve the semantics of the controls in your application. This may enhance the experience for users of assistive technology, like a screen reader.
Navigation
Heading elements are not in a sequentially-descending order
Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. Learn more about heading order.
Failing Elements
TRUSTED BY 30+ BUSINESSES
<h6 class="mb-0">
Years of Experience
<h4>
Successful Projects
<h4>
Satisfied Customers
<h4>
Websites that boost visibility and growth.
<h5 class="mb-0">
STEP 1
<h6>
Our Services
<h5 class="mb-0">
These are opportunities to improve keyboard navigation in your application.
Additional items to manually check (10)
Show
These items address areas which an automated testing tool cannot cover. Learn more in our guide on conducting an accessibility review.
Passed audits (21)
Show
Not applicable (40)
Show
96
Best Practices
User Experience
Displays images with incorrect aspect ratio
Image display dimensions should match natural aspect ratio. Learn more about image aspect ratio.

URL

Aspect Ratio (Displayed)

Aspect Ratio (Actual)
devagency.ma
1st party

Under hero background
<img alt="Under hero background" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/bg-img/underHero.webp">

…bg-img/underHero.webp(devagency.ma)

1425 x 780 (1.83)

1920 x 1280 (1.50)
Dev Agency Logo
<img alt="Dev Agency Logo" width="200" height="50" decoding="async" data-nimg="1" class="dark-logo" style="color:transparent" src="/assets/img/core-img/logo.webp">

…core-img/logo.webp(devagency.ma)

200 x 50 (4.00)

924 x 426 (2.17)
Dev Agency Logo
<img alt="Dev Agency Logo" width="200" height="50" decoding="async" data-nimg="1" class="dark-logo" style="color:transparent" src="/assets/img/core-img/logo.webp">

…core-img/logo.webp(devagency.ma)

200 x 50 (4.00)

924 x 426 (2.17)
Dev Agency Logo
<img alt="Dev Agency Logo" width="200" height="50" decoding="async" data-nimg="1" class="dark-logo" style="color:transparent" src="/assets/img/core-img/logo.webp">

…core-img/logo.webp(devagency.ma)

200 x 50 (4.00)

924 x 426 (2.17)
Rim Bakhat
<img alt="Rim Bakhat" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/rimbakhat.webp">

…portfolio/rimbakhat.webp(devagency.ma)

521 x 326 (1.60)

630 x 450 (1.40)
Rif Walks
<img alt="Rif Walks" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/rifwalks.webp">

…portfolio/rifwalks.webp(devagency.ma)

521 x 326 (1.60)

630 x 450 (1.40)
Blausee Switzerland
<img alt="Blausee Switzerland" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/blausee.webp">

…portfolio/blausee.webp(devagency.ma)

521 x 326 (1.60)

630 x 450 (1.40)
SunnySide Agency
<img alt="SunnySide Agency" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/sunnyside.webp">

…portfolio/sunnyside.webp(devagency.ma)

521 x 326 (1.60)

630 x 450 (1.40)
Blue Guide
<img alt="Blue Guide" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/blueguide.webp">

…portfolio/blueguide.webp(devagency.ma)

521 x 326 (1.60)

630 x 450 (1.40)
Tip Splitter App
<img alt="Tip Splitter App" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/tipsplitter.webp">

…portfolio/tipsplitter.webp(devagency.ma)

521 x 326 (1.60)

630 x 450 (1.40)
Gavilia
<img alt="Gavilia" loading="eager" decoding="async" data-nimg="fill" style="position: absolute; height: 100%; width: 100%; inset: 0px;" src="/assets/img/portfolio/gavilia.webp">

…portfolio/gavilia.webp(devagency.ma)

521 x 326 (1.60)

630 x 450 (1.40)
Trust and Safety
Ensure CSP is effective against XSS attacks
A strong Content Security Policy (CSP) significantly reduces the risk of cross-site scripting (XSS) attacks. Learn how to use a CSP to prevent XSSUnscored
Description

Directive

Severity
No CSP found in enforcement mode

High
Use a strong HSTS policy
Deployment of the HSTS header significantly reduces the risk of downgrading HTTP connections and eavesdropping attacks. A rollout in stages, starting with a low max-age is recommended. Learn more about using a strong HSTS policy.Unscored
Description

Directive

Severity
No `includeSubDomains` directive found


includeSubDomains


Medium
No `preload` directive found


preload


Medium
Ensure proper origin isolation with COOP
The Cross-Origin-Opener-Policy (COOP) can be used to isolate the top-level window from other documents such as pop-ups. Learn more about deploying the COOP header.Unscored
Description

Directive

Severity
No COOP header found

High
Mitigate clickjacking with XFO or CSP
The X-Frame-Options (XFO) header or the frame-ancestors directive in the Content-Security-Policy (CSP) header control where a page can be embedded. These can mitigate clickjacking attacks by blocking some or all sites from embedding the page. Learn more about mitigating clickjacking.Unscored
Description

Severity
No frame control policy found

High
Mitigate DOM-based XSS with Trusted Types
The require-trusted-types-for directive in the Content-Security-Policy (CSP) header instructs user agents to control the data passed to DOM XSS sink functions. Learn more about mitigating DOM-based XSS with Trusted Types.Unscored
Description

Severity
No `Content-Security-Policy` header with Trusted Types directive found

High
Browser Compatibility
Baseline Features
Passed audits (12)
Show
Not applicable (2)
Show
100
SEO
These checks ensure that your page is following basic search engine optimization advice. There are many additional factors Lighthouse does not score here that may affect your search ranking, including performance on Core Web Vitals. Learn more about Google Search Essentials.
Additional items to manually check (1)
Hide
Structured data is valid
Run these additional validators on your site to check additional SEO best practices.
Passed audits (10)
Show
1/2
Agentic Browsing
These checks ensure high-quality, browsable websites for AI agents and validate the correctness of WebMCP integrations. This category is still under development and subject to change.
Agent Accessibility
Accessibility tree is not well-formed
A well-formed accessibility tree helps AI agents to navigate and interact with the page.
Failed Audits
Description

Failing Element
Links must have discernible text

div#devAgencyNav > div.d-flex > div#sideMenuButton > a.btn
<a class="btn btn-primary sideMenuButton" data-bs-toggle="offcanvas" href="#sideMenuOffcanvas" role="button" aria-controls="sideMenuOffcanvas">
These audits highlight best practices for improving the accessibility of the website for AI agents.
Passed audits (1)
Show
Not applicable (4)
Show
More on PageSpeed InsightsWhat's newDocumentationLearn about Web PerformanceAsk questions on Stack OverflowMailing list
Related ContentUpdatesWeb FundamentalsCase StudiesPodcasts
ConnectTwitterYoutube
Google Developers Logo
Chrome
Firebase
All products
Terms and Privacy Policy
For details, see the Google Developers Site Policies.
```

# Organized data:

# PageSpeed Insights Report: devagency.ma

**Report Date:** Jun 22, 2026, 6:23:49 PM

## 1. Overall Scores

| Category             | Mobile | Desktop |
| :------------------- | :----- | :------ |
| **Performance**      | 55     | 61      |
| **Accessibility**    | 94     | 94      |
| **Best Practices**   | 96     | 96      |
| **SEO**              | 100    | 100     |
| **Agentic Browsing** | 1/2    | 1/2     |

## 2. Core Web Vitals & Metrics

### Mobile

- **First Contentful Paint (FCP):** 22.3 s
- **Largest Contentful Paint (LCP):** 26.4 s
- **Total Blocking Time (TBT):** 0 ms
- **Cumulative Layout Shift (CLS):** 0
- **Speed Index (SI):** 22.3 s

### Desktop

- **First Contentful Paint (FCP):** 3.7 s
- **Largest Contentful Paint (LCP):** 4.0 s
- **Total Blocking Time (TBT):** 0 ms
- **Cumulative Layout Shift (CLS):** 0.002
- **Speed Index (SI):** 3.7 s

## 3. Performance Opportunities & Diagnostics

### Render-blocking Requests

- **Mobile (Est savings: 19,580 ms):**
  - `devagency.ma` (56.0 KiB, 2,690 ms)
  - `…chunks/bc8470f73e47345d.css` (34.6 KiB, 1,270 ms)
  - `…chunks/ac8b093…e3c.css` (4.3 KiB, 480 ms)
  - `…chunks/aaf0bb1927b91dc7.css` (17.1 KiB, 950 ms)
  - `Google Fonts` (1.1 KiB, 750 ms)
- **Desktop (Est savings: 3,500 ms):**
  - `devagency.ma` (56.0 KiB, 500 ms)
  - `…chunks/aaf0bb1927b91dc7.css` (17.1 KiB, 200 ms)
  - `…chunks/ac8b093…e3c.css` (4.3 KiB, 150 ms)
  - `…chunks/bc8470f73e47345d.css` (34.6 KiB, 150 ms)
  - `Google Fonts` (1.1 KiB, 200 ms)

### Legacy JavaScript

- **Both (Est savings: 14 KiB):**
  - `…chunks/a443e665….js` (13.9 KiB)
  - Polyfills included: `Array.prototype.at`, `Array.prototype.flat`, `Array.prototype.flatMap`, `Object.fromEntries`, `Object.hasOwn`, `String.prototype.trimEnd`, `String.prototype.trimStart`.

### Font Display

- **Mobile (Est savings: 50 ms):** `Google Fonts` woff2.
- **Desktop (Est savings: 40 ms):** `Google Fonts` woff2.

### Forced Reflow

- **Mobile:** Top function `…chunks/a443e665….js:2:8066` (62 ms). Total 9 sources.
- **Desktop:** Top function `…chunks/a443e665….js:2:8066` (23 ms). Total 8 sources.

### LCP Request Discovery

- **Both:** LCP element is "Under hero background" (`/assets/img/bg-img/underHero.webp`).
  - LCP resources should not use `loading=lazy`.
  - `fetchpriority=high` should be applied to the image preload request.

### Network Dependency Tree

- **Mobile:** Maximum critical path latency: 491 ms.
- **Desktop:** Maximum critical path latency: 493 ms.

### Image Delivery

- **Mobile (Est savings: 306 KiB):**
  - `underHero.webp` (108.5 KiB, displayed 437x500, actual 1920x1280, savings 98.9 KiB)
  - `missionarea.webp` (81.2 KiB, displayed 236x256, actual 1000x1085, savings 76.7 KiB)
  - `gavilia.webp` (39.2 KiB, displayed 312x195, actual 630x450, savings 30.8 KiB)
  - `rifwalks.webp` (32.4 KiB, displayed 312x195, actual 630x450, savings 25.5 KiB)
  - `logo-light.webp` (24.8 KiB, displayed 200x94, actual 917x430, savings 23.6 KiB)
  - `blausee.webp`, `blueguide.webp`, `rimbakhat.webp`, `sunnyside.webp`, `tipsplitter.webp` (savings 5.2 KiB to 13.0 KiB)
- **Desktop (Est savings: 199 KiB):**
  - `missionarea.webp` (81.2 KiB, displayed 436x473, actual 1000x1085, savings 65.8 KiB)
  - `underHero.webp` (108.5 KiB, displayed 1425x780, actual 1920x1280, savings 59.5 KiB)
  - `logo-light.webp` (24.8 KiB, displayed 140x66, actual 917x430, savings 24.2 KiB)
  - `logo.webp` (16.1 KiB, displayed 140x65, actual 924x426, savings 15.8 KiB)
  - Portfolio images (`gavilia`, `blausee`, `blueguide`, `sunnyside`, `rimbakhat`, `rifwalks`, `tipsplitter`) (savings 5.2 KiB to 15.7 KiB)

### DOM Size (Mobile)

- Total elements: 439
- DOM depth: 12
- Most children: 15 (`body.light-mode`)

### LCP Breakdown (Element: underHero.webp)

- **Mobile:** TTFB: 0 ms | Resource load delay: 280 ms | Resource load duration: 80 ms | Element render delay: 2,070 ms
- **Desktop:** TTFB: 0 ms | Resource load delay: 330 ms | Resource load duration: 160 ms | Element render delay: 170 ms

### 3rd Parties

- **Both:**
  - Google Tag Manager: 177 KiB (Mobile: 225 ms main thread, Desktop: 208 ms main thread)
  - Google Fonts: 3,861 KiB (0 ms main thread)
  - Google Analytics: 1 KiB (0 ms main thread)

### Unused JavaScript

- **Both (Est savings: 123 KiB):**
  - Google Tag Manager (`/gtag/js`): 176.1 KiB (Est savings: 69.5/69.6 KiB)
  - `…chunks/f83dccd61d1fecb4.js`: 31.9 KiB (Est savings: 31.9 KiB)
  - `…chunks/a443e665….js`: 66.9 KiB (Est savings: 21.5/21.6 KiB)

### Unused CSS

- **Mobile (Est savings: 44 KiB):**
  - `…chunks/bc8470f73e47345d.css` (33.6 KiB, savings 31.0 KiB)
  - `…chunks/aaf0bb1927b91dc7.css` (16.0 KiB, savings 13.0 KiB)
- **Desktop (Est savings: 43 KiB):**
  - `…chunks/bc8470f73e47345d.css` (33.6 KiB, savings 30.7 KiB)
  - `…chunks/aaf0bb1927b91dc7.css` (16.0 KiB, savings 12.2 KiB)

### Enormous Network Payloads

- **Mobile (Total size: 4,853 KiB):** Top contributors: Google Fonts (3,860 KiB), `underHero.webp` (109.5 KiB), `missionarea.webp` (82.2 KiB).
- **Desktop (Total size: 4,870 KiB):** Top contributors: Google Fonts (3,860 KiB), `underHero.webp` (109.5 KiB), `missionarea.webp` (82.2 KiB).

### Non-composited Animations

- **Mobile:** 44 animated elements found. Unsupported CSS properties: `color`, `border-right-color`, `border-top-color`, `border-bottom-color`, `border-left-color`.
- **Desktop:** 50 animated elements found. Unsupported CSS properties: `color`, `border-top-color`, `border-bottom-color`, `border-left-color`, `border-right-color`.

### Long Main-thread Tasks

- **Mobile (6 tasks):** Longest: `…chunks/a443e665….js` (154 ms), `…chunks/a443e665….js` (97 ms), `…chunks/8ceeb80d8994d96e.js` (95 ms).
- **Desktop (5 tasks):** Longest: `/gtag/js` (108 ms), `/gtag/js` (96 ms), `…chunks/a443e665….js` (86 ms).

### Layout Shift Culprits (Desktop)

- Total CLS: 0.002
- `ul.navbar-nav.navbar-nav-scroll` (0.002)
- Web font (`…v351/kJEhBvYX7….woff2`)

## 4. Accessibility Audit

### Names and Labels

- **Mobile:** Links do not have a discernible name.
  - Failing elements: Facebook link, Instagram link.
- **Desktop:** Links do not have a discernible name.
  - Failing elements: Side menu button, Facebook link, Instagram link.

### Navigation

- **Both:** Heading elements are not in a sequentially-descending order.
  - Failing elements: `h6` ("TRUSTED BY 30+ BUSINESSES"), `h4` ("Years of Experience", "Successful Projects", "Satisfied Customers"), `h5` ("Websites that boost visibility and growth.", "STEP 1", "Our Services").

## 5. Best Practices & Security

### User Experience

- **Both:** Displays images with incorrect aspect ratio.
  - Failing elements: `underHero.webp`, `logo.webp` (dark-logo), `logo-light.webp` (light-logo), and all portfolio images (`rimbakhat`, `rifwalks`, `blausee`, `sunnyside`, `blueguide`, `tipsplitter`, `gavilia`).

### Trust and Safety (Security Headers)

- **Both:**
  - No CSP found in enforcement mode (High severity).
  - No `includeSubDomains` directive found in HSTS (Medium severity).
  - No `preload` directive found in HSTS (Medium severity).
  - No COOP header found (High severity).
  - No frame control policy found (XFO/CSP) (High severity).
  - No `Content-Security-Policy` header with Trusted Types directive found (High severity).

## 6. Agentic Browsing

### Agent Accessibility

- **Mobile:** Accessibility tree is not well-formed.
  - Failing element: Links must have discernible text (Facebook link, Instagram link).
- **Desktop:** Accessibility tree is not well-formed.
  - Failing element: Links must have discernible text (Side menu button).
