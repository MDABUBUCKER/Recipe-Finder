const inputbox = document.getElementById("searchinput")
const findbtn = document.getElementById("findbtn")
const recipecontain = document.getElementById('recipecontain')

 const sueggstion = ["beef","chicken","fish","salmon"]

inputbox.addEventListener("input",() =>{
    const input_value = inputbox.value.toLowerCase()

    const matched = sueggstion.filter(item => item.startsWith(input_value))

    matched.forEach(item => {
        const div = document.createElement('div')
        div.textContent =item

    }) 
})


findbtn.addEventListener('click',() => {
    const search_text = inputbox.value.trim()
    console.log(search_text)

    if(search_text === ""){
        alert("enter any recipe")

    }

    recipecontain.innerHTML = "<p>Searching For Recipe</p>"

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_text}`)

    .then(Response => Response.json())
    .then(data => 
        {
            recipecontain.innerHTML = ""
            if(!data.meals){
                recipecontain.innerHTML = "<p>No Data Found</p>"
            }
            console.log(data)

            data.meals.forEach(meal => {
                const recipediv = document.createElement('div')
                recipediv.classList.add('recipe')
                recipediv.innerHTML = `
                <img src = "${meal.strMealThumb}"/>
                <p>${meal.strMeal}</p>
                <a href = "https://www.themealdb.com/meal/${meal.idMeal}" target = "_blank">View Details</a>
                `
                    recipecontain.appendChild(recipediv)
            
            })

        })
    .catch(Error =>  recipecontain.innerHTML = `<p>Data Not Fetch Try Again</p> `) ;
    console.log(Error)
    

    
})

// document.querySelector('#search-btn').addEventListener("click",() => {
//     const input_value = document.querySelector("#input-btn").Value()
//     console.log(input_value)
// })