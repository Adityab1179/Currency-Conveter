let countrySelection = document.querySelector(".country-selection");
let selects = countrySelection.querySelectorAll("select");
let from=document.querySelector("#from")
let to=document.querySelector("#to")
let baseurl=`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`
selects.forEach(function (select) {
  for (codes in countryList) {
    let option = document.createElement("option");
    option.text = codes;
    option.value = codes;
    select.appendChild(option);
    if (select.id === "from" && codes === "USD") {
      select.value = "USD";
      select.selected = true;
    } else if (select.id === "to" && codes === "INR") {
      select.value = "INR";
      select.selected = true;
    }
    select.addEventListener("change",(event)=>{
        updateflag(event.target);
    })
  }
});
function updateflag(element){
    let curr=element.value;
    let countryCode=countryList[curr]
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img")
    img.src=newsrc
}
let btn=document.querySelector("button")
btn.addEventListener("click",async(event)=>{
    event.preventDefault();
    let input=document.querySelector("input");
    let amount=input.value;
    const url=`${baseurl}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data= await response.json();
    console.log(data)
    let output=amount*data[to.value.toLowerCase()];
    console.log(output)
    input.value=output
})
let i=document.querySelector("i");
i.addEventListener("click",function(){
        let a=selects[0].value;
        selects[0].value=selects[1].value;
        selects[0].text=selects[1].text;
        selects[1].value=a;
        selects[1].text=a;
        selects.forEach(function(select){
            updateflag(select)
        })

    })
