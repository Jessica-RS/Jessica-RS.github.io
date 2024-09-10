function popUp() 
    {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
     year = date.getFullYear();
     month = months[date.getMonth()];
     day = date.getDate();
     minutes = date.getMinutes();
     is12HourFormat = document.getElementById("Hours").selectedIndex === 0;
     hour = date.getHours();
     period = '';

    if (is12HourFormat) 
    {
        period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12; // Convert hour to 12-hour format
    }

    
     formattedTime = `${hour}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
    
    
    alert("The date today is: " + month + " " + day + ", " + year);
    alert("And the current time is: " + formattedTime);
}

function dateTimeP() 
    {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
     year = date.getFullYear();
     month = months[date.getMonth()];
     day = date.getDate();
     minutes = date.getMinutes();
     is12HourFormat = document.getElementById("Hours").selectedIndex === 0;
     hour = date.getHours();
     period = '';

    if (is12HourFormat) 
    {
        period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12; // Convert hour to 12-hour format
    }

    
    const formattedTime = `${hour}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
    
    
    document.querySelector("#dateOut").innerHTML =
        "The date today is: " + month + " " + day + ", " + year + "<br>" +
        "And the current time is: " + formattedTime;
}
