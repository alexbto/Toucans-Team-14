/*
==================================================

Section 1 rotating text

==================================================
*/

// TRYING TO FIGURE OUT THE setTimeout FUNCTION (Why doesn't the for/while loop wait until timeout is done before continuing???)

rotatingDisplay();

function rotatingDisplay() {
    var i = 1;
    while (i <= 1) {
        /* display: block - current icon/text pair */
        setDisplay(i);
        /* wait 3 seconds */
        /* display: none - current icon/text pair */
        // setTimeout(function() {
        //     document.getElementById("section1").style.display="none";
        //     }, 3000);
        i++;
    }
}

function setDisplay(i) {
        var icon = document.getElementById("icon" + i);
        icon.style.display = "block";
        var text = document.getElementById("text" + i);
        text.style.display = "block";
}

function removeDisplay(i) {
    document.getElementById("section1").style.display="none";

    // var icon = document.getElementById("icon" + i);
    // icon.style.display = "none";
    // var text = document.getElementById("text" + i);
    // text.style.display = "none";
}



/*
==================================================

Section 6 Navbar

==================================================
*/
const section6Nav = document.getElementById('section6-nav');

function setEventListeners() {
    section6Nav.addEventListener('click', function(event) {changeBackground(event);});
}

function changeBackground(event) {
    let lis = section6Nav.getElementsByTagName('li');
    for (let i = 0; i < lis.length; i++) {
        lis[i].style.backgroundColor = 'white';
    }
    let parentTarget = event.target.parentElement;
    if (parentTarget.tagName != 'LI') {
        parentTarget = parentTarget.parentElement;
    }
    parentTarget.style.backgroundColor = 'gold';
    displayContent(parentTarget);
}

function displayContent(parentTarget) {
    var section6 = document.getElementById('section6');
    var subSections = section6.getElementsByTagName('section');
    for (let i = 0; i < subSections.length; i++) {
        let sectionId = subSections[i].id;
        if (parentTarget.id == sectionId + '-nav') {
            document.getElementById(sectionId).style.display = 'flex';
        }
        else {
            document.getElementById(sectionId).style.display = 'none';
        }
    }
}
setEventListeners();

/*
==================================================

Section 5 Navbar

==================================================
*/

var sec5Nav = document.getElementById('section5-nav');        // reference to navbar element node

function changeSec5Background(e) {
  var sec5 = document.getElementById('current-projects');                 // reference to section 5 element node
  var sec5NavTabs = sec5Nav.getElementsByTagName('li');           // NodeList for section 5 navbar tabs
  var sec5SubSections = sec5.getElementsByTagName('section');     // NodeList for section 5 subsections
  var target = e.target;
  var elParent = target.parentNode;
  for (let i = 0; i < sec5NavTabs.length; i++) {
    if ((target.id == sec5NavTabs[i].id) || (elParent.id == sec5NavTabs[i].id)) {     // If ID of targer OR target's parent element (if user clicks on image)
      sec5NavTabs[i].className = 'nav5-itemsClear';                                   // change background color of subsection's tab
      sec5SubSections[i].className = 'section5ContentContainer'                       // render active subsection's html content visible
      sec5.className = sec5SubSections[i].id + 'Bckgd';                               // modify's class to change to active subsection's background image
    } else {                                                                          // Otherwise:
      sec5NavTabs[i].className = 'nav5-itemsBlue';                                    // apply default color to inactive navbar tabs
      sec5SubSections[i].className = 'sec5Hidden';                                    // render inactive subsections' HTML hidden
    } 
  }   
}

// Set event listener and pass in event object ("e")
sec5Nav.addEventListener('click', function(e) {
  changeSec5Background(e);
}, false);


/*
==================================================

Scrolling

==================================================
*/


$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


/*
==================================================

Carousel Styling

==================================================
*/

var carousel = document.getElementById('carousel');         // Reference to carousel

function changeCarouselColors(e) {
    var carButtons = carousel.getElementsByTagName('li');   // NodeList for carousel buttons
    var targetParent = e.target.parentNode;                 // Reference to parent of event target
    var targetParentId = targetParent.id;                   // Reference to id of parent node
    for (let i = 0; i < carButtons.length; i++) {
        switch (targetParentId) {  
 
            // Assign white outline to the following sections                       
            case 'section1Car':
            case 'section3Car':
            case 'section4Car': 
            case 'current-projectsCar':
                carousel.className = 'carouselWhite';
                if (carButtons[i].id == targetParentId) {
                    carButtons[i].style.backgroundColor = 'white';
                } else {
                    carButtons[i].style.backgroundColor = 'transparent';
                }
                break;

            // Assign black outline to the following sections 
            case 'section2Car':                     
            case 'section6Car':
            case 'section7Car':
            case 'attributionCar':
                carousel.className = 'carouselBlack';

                // Assign black fill to target
                if (carButtons[i].id == targetParentId) {                   // id belongs to parent <li>, as opposed to inner <a>
                    carButtons[i].style.backgroundColor = 'black';
                } else {
                    carButtons[i].style.backgroundColor = 'transparent';    // reset all other buttons to transparent
                }
                break;

            // SF Removed default case because it leads to <li> elements triggering carousel color change
        }
  }
}

// ADD EVENT LISTENER -----------------------

carousel.addEventListener('click', function(e) {
  changeCarouselColors(e);
}, false);

/*
==================================================

Smooth auto-scroll on wheel and keyboard arrow events 

==================================================
*/
/* Known bugs:  scrolling for more than 1 "click" is an issue, as is immediate repeated arrow.  Need to add short delay between events?

// ------------------  ----------------- //
/* Resources used: 
    https://stackoverflow.com/questions/31223341/detecting-scroll-direction
    https://stackoverflow.com/questions/24217087/how-to-determine-scroll-direction-without-actually-scrolling
    https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript  */

//array of hashes for all main sections
var sectionHashes = [
    '#section1',
    '#introduction',
    '#section3',
    '#section4',
    '#current-projects',
    '#section6',
    '#section7',
    '#attribution'
]
//returns location of current hash in hash list
function returnHashLocation(hash) {
    return sectionHashes.indexOf(hash);
}

// Scrolls smoothly to section
function goToSection(e, direction) {
    //get hash from current view (assumes it replects current view)
    hash = window.location.hash;

    if (hash == null) {
        hash = '#section1';
    }

    console.log('hash:', hash);
    // determine list of sectionHashes list
    hashListLength = sectionHashes.length;
    console.log('List length:', hashListLength);
    //get the integer location of current hash in list
    hashLocation = returnHashLocation(hash);
    console.log('Hash location:', hashLocation);

    //if scroll direction is *up*
    if ((direction === 'up') && (hashLocation !== 0)) {
        //move up on section if not already at top (otherwise do nothing)
        hashLocation = hashLocation - 1;
        console.log('New hash location (upscroll)', hashLocation);
        hash = sectionHashes[hashLocation];
        console.log('New hash:', hash);
        //if scroll direction is *down*
    } else if ((direction === 'down') && (hashLocation < (hashListLength - 1))) {
        //move down a section if not already at bottom
        hashLocation = hashLocation + 1;
        console.log('New hash location (downscroll)', hashLocation);
        hash = sectionHashes[hashLocation];
        console.log('New hash:', hash);
    // else if hash location is first or last item in list do nothing
    }  else {
        console.log('do nothing!');
    }  // smooth-scroll to the appropriate section
        console.log('-----------------------------');
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
    
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
}

// Determines scroll direction and returns string 'up' or 'down'
function scrollUpDown(e) {
    var direction;
    if (e.deltaY < 0) {
        console.log('scrolling up');
        direction = 'up';
        
    }
    if (e.deltaY >0) {
        console.log('scrolling down');
        direction = 'down';
    }
    goToSection(e, direction);
}

/* Listen to wheel event.  Does not use scrollTop because no scrolling actually occurs. Works for trackpads
does not work for arrow keys (add in next) */
window.addEventListener('wheel', scrollUpDown, false);

// Listen for key-down event
document.onkeydown = keyUpDown;

function keyUpDown(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        direction = 'up';
        // "goToSection" functions are in if statement to prevent execution if some other key is pressed
        goToSection(e, direction);
    } else if (e.keyCode == '40') {
        direction = 'down';
        goToSection(e, direction);
    }
}


// May be useful to disable event listener to add delay:

/*  
    //disable event listener for now
    document.removeEventListener('scroll', getScrollDirection);


    //re-enable event listener after short pause
    setTimeout(reEnableListener, 1000);



function reEnableListener() {
    document.addEventListener('scroll', getScrollDirection, false);
}
*/