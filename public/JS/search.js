const { default: axios } = require("axios");

const serachInp  =  document.getElementById("search");

serachInp.addEventListener("input",async(e) => {
    const query  = e.target.value;

    try{
        const res   = await axios.get(`/search?query=${query}`);
        const result = res.data;
        console.log(result);
    }catch(err){
        console.log(err);
        console.log("some error  occured while searching");
    }
})