document.addEventListener("DOMContentLoaded", () => {
    const isFirefox = typeof InstallTrigger !== 'undefined';


    const DOMscrollAreaMain = document.querySelector("#scrollArea");
    const DOMscrollAreaHorizontalBar = document.querySelector("#scrollArea .simplebar-scrollbar");
    const scrollAreaMain_scrollElement = DOMscrollAreaMain.SimpleBar.getScrollElement();

    // Ensures that the correct navbar link is highlighted
    const DOMlinks = document.querySelectorAll("a[href^='#']");
    const DOMnavLinks = document.querySelectorAll("nav a[href^='#']");

    let calculateLinks = () => {
        DOMnavLinks.forEach((link) => {
            let el = document.querySelector(link.getAttribute("href"));
            let elRect = el.getBoundingClientRect();
            let mainAreaRect = scrollAreaMain_scrollElement.getBoundingClientRect();
            
            if(elRect.left <= mainAreaRect.right) {
                link.classList.add("scrolled");
            } else if(link.classList.contains("scrolled")) {
                link.classList.remove("scrolled");
            }
        });
    }

    // Convert standard vertical scroll to horizontal scroll
    DOMscrollAreaMain.addEventListener("onwheel" in document ? "wheel" : "mousewheel", function(e) {
        e.preventDefault();
        if(!isFirefox) {
            e.wheel = e.deltaY ? -e.deltaY : e.wheelDelta / 40;
        } else {
            e.wheel = -e.deltaY * 40;
        }

        if(scrollAreaMain_scrollElement.classList.contains("smooth")) {
            scrollAreaMain_scrollElement.classList.remove("smooth");
        }

        scrollAreaMain_scrollElement.scrollLeft -= e.wheel;
    });

    // Apply event listener to links to make them scroll
    DOMlinks.forEach((link) => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            let el = document.querySelector(this.getAttribute("href"));

            if(!scrollAreaMain_scrollElement.classList.contains("smooth")) {
                scrollAreaMain_scrollElement.classList.add("smooth");
            }

            scrollAreaMain_scrollElement.scrollLeft = el.offsetLeft - 60;

            calculateLinks();
        });
    });

    // Runs when any scrolling happens
    scrollAreaMain_scrollElement.addEventListener("scroll", () => {
        calculateLinks();
    });

    // Fix glitch where dragging the scrollbar manually moves it in an unnatural way
    DOMscrollAreaHorizontalBar.addEventListener("mouseover", () => {
        if(scrollAreaMain_scrollElement.classList.contains("smooth")) {
            scrollAreaMain_scrollElement.classList.remove("smooth");
        }
    });

    // Mobile navigation menu
    const DOMnavMobileBtn = document.querySelector("#navMenu");
    const DOMnavAside = document.querySelector("#asideNav");

    DOMnavMobileBtn.addEventListener("click", () => {
        if(DOMnavAside.classList.contains("open")) {
            DOMnavAside.classList.remove("open");
        } else {
            DOMnavAside.classList.add("open");
        }
    });

    // First execution to ensure that the correct nav link is highlighted
    calculateLinks();
});