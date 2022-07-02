export default (req, res, next) => {
    res.status(404).send(
        '<h1 style = color:BurlyWood;font-family:verdana;text-align:center>not found!</h1> \
         <a href = "https://job-stack.herokuapp.com/">Click here to go to the home page</a>'
     
    );
}
