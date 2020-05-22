// Setting up time-value
document.getElementById("time").value = "00:00:00";

// fetching toggle and btn element
var startBtn = document.getElementById("btn");
var toggle = document.getElementById("toggled");

// variables for timer's interval and toggling
var countInterval, toggled = false;

// when toggle btn click
toggle.addEventListener("click" ,function(){
    var circle = document.getElementById("circle");
    var toggleHeading = document.getElementById("toggle-heading");

    if (toggled){
        circle.style.backgroundColor = "black";
        circle.style.marginLeft = "0"
        toggle.style.backgroundColor = "white"
        toggleHeading.innerText = "Toggle it to Down-Counter";

        toggled = false;
    }
    else{
        circle.style.backgroundColor = "white";
        circle.style.marginLeft = "100px"
        toggle.style.backgroundColor = "black"
        toggleHeading.innerText = "Toggle it to Up-Counter";
        toggled = true;
    }
});

// when startBtn clicked
startBtn.addEventListener("click", function(){
    // toggle.disabled = true;

    // fetch time and set separate hour, min, sec values.
    var time = document.getElementById("time");

    var hour = parseInt(time.value.slice(0, 2));
    var min = parseInt(time.value.slice(3, 5));
    var sec = parseInt(time.value.slice(6, 8));

    if (isNaN(hour) || isNaN(min) || isNaN(sec)){
        alert("Enter Time Properly");
        clearInterval(countInterval);
        return;
    }

    // fetch the blocks of timer
    var currentNums = document.querySelectorAll(".current");
    var nextNums = document.querySelectorAll(".next");

    // if start button clicked again then,
    // 1st reset the values
    // resetNumbers(currentNums, nextNums, num, toggled);
    resetNumbers(currentNums, nextNums, time.value, toggled);
    

    // 2nd clear the previous interval
    clearInterval(countInterval);

    if (toggled != true){
        var countHour2 = 0, countHour1 = 0, countMin2 = 0, countMin1 = 0, countSec2 = 0, countSec1 = 0;
        countInterval = setInterval(function() {
            if((countHour2*10 +countHour1 == hour) && (countMin2*10 +countMin1 == min) && (countSec2*10 +countSec1 == sec)){
                clearInterval(countInterval);
                alert("Counter has stopped");
                return;
            }
            
            increaseCount(currentNums[5], nextNums[5], 10);
            countSec1++;
            if (countSec1 == 10){
                increaseCount(currentNums[4], nextNums[4], 6);
                countSec1 = 0;
                countSec2++;
            }

            if (countSec2*10 == 60){
                increaseCount(currentNums[3], nextNums[3], 10);
                countSec1 = 0;
                countSec2 = 0;
                countMin1++;
            }

            if (countMin1 == 10){
                increaseCount(currentNums[2], nextNumss[2], 6);
                countMin1 = 0;
                countMin2++;
            }

            if (countMin2*10 == 60){
                increaseCount(currentNums[1], nextNums[1], 10)
                countMin1 = 0;
                countMin2 = 0;
                countHour1++;
            }

            if (countHour1 == 10){
                increaseCount(currentNums[0], nextNums[0], 10)
                countHour1 = 0;
                countHour2++;
            }
        }, 1000);
    }

    else{
        var countHour2 = parseInt(hour/10), countHour1 = hour%10, countMin2 = parseInt(min/10), countMin1 = min%10, countSec2 = parseInt(sec/10), countSec1 = sec%10;
        countInterval = setInterval(function() {
            if((countHour2*10 +countHour1 == 0) && (countMin2*10 +countMin1 == 0) && (countSec2*10 +countSec1 == 0)){
                clearInterval(countInterval);
                alert("Counter has stopped");
                return;
            }
            
            decreaseCount(currentNums[5], nextNums[5], 10);
            countSec1--;
            if (countSec1 == -1){
                decreaseCount(currentNums[4], nextNums[4], 6);
                countSec1 = 9;
                countSec2--;
            }

            if (countSec2 == -1){
                decreaseCount(currentNums[3], nextNums[3], 10);
                countSec2 = 5;
                countMin1--;
            }

            if (countMin1 == -1){
                decreaseCount(currentNums[2], nextNumss[2], 6);
                countMin1 = 9;
                countMin2--;
            }

            if (countMin2 == -1){
                decreaseCount(currentNums[1], nextNums[1], 10)
                countMin2 = 5;
                countHour1--;
            }

            if (countHour1 == -1){
                decreaseCount(currentNums[0], nextNums[0], 10)
                countHour1 = 9;
                countHour2--;
            }
        }, 1000);
    }
});


function resetNumbers(currentNums, nextNums, timeValue, toggled){
    if (toggled != true){
        for(let i=0;i<6;i++){
            currentNums[i].innerText = 0;
            nextNums[i].innerText = 1;
        }
    }
    else{
        currentNums[0].innerText = parseInt(timeValue[0]);
        currentNums[1].innerText = parseInt(timeValue[1]);
        currentNums[2].innerText = parseInt(timeValue[3]);
        currentNums[3].innerText = parseInt(timeValue[4]);
        currentNums[4].innerText = parseInt(timeValue[6]);
        currentNums[5].innerText = parseInt(timeValue[7]);

        nextNums[0].innerText = currentNums[0].innerText -1;
        if(nextNums[0].innerText == -1){
            nextNums[0].innerText = 9;
        }

        nextNums[1].innerText = currentNums[1].innerText -1;
        if(nextNums[1].innerText == -1){
            nextNums[1].innerText = 9;
        }

        nextNums[2].innerText = currentNums[2].innerText -1;
        if(nextNums[2].innerText == -1){
            nextNums[2].innerText = 5;
        }

        nextNums[3].innerText = currentNums[3].innerText -1;
        if(nextNums[3].innerText == -1){
            nextNums[3].innerText = 9;
        }

        nextNums[4].innerText = currentNums[4].innerText -1;
        if(nextNums[4].innerText == -1){
            nextNums[4].innerText = 5;
        }

        nextNums[5].innerText = currentNums[5].innerText -1;
        if(nextNums[5].innerText == -1){
            nextNums[5].innerText = 9;
        }
    }

}


function increaseCount(currentField, nextField, fieldLimit){
    nextField.classList.add("animate");

    setTimeout(function(){
        currentField.innerText = nextField.innerText;
        nextField.classList.remove("animate");

        nextField.innerText = parseInt(nextField.innerText) +1;
        if (nextField.innerText == fieldLimit){
            nextField.innerText = 0;
        }
    }, 500);
}

function decreaseCount(currentField, nextField, fieldLimit){
    nextField.classList.add("animate");

    setTimeout(function(){
        currentField.innerText = nextField.innerText;
        nextField.classList.remove("animate");

        nextField.innerText = parseInt(nextField.innerText) -1;
        if (nextField.innerText == -1){
            nextField.innerText = fieldLimit -1;
        }
    }, 500);
}