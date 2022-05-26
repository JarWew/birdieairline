const btnstore = document.getElementById('store');
const destination = document.getElementById('destination');
const date = document.getElementById('date');

btnstore.addEventListener('click', () => {
 
    const lDestination = document.getElementById('destination');
    localStorage.setItem("destination", lDestination.value)
        console.log(lDestination);

    const lDate = document.getElementById('date');
    localStorage.setItem("date", lDate.value)
    console.log(lDate );
 
  });

  

