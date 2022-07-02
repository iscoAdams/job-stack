export default (req, res, next) => {
    res.status(404).send(
        '<h1 style = color:BurlyWood;font-family:verdana;text-align:center>not found!</h1> \
         <a href = "http://localhost:8000/api/v1/jobs">Click here to go to the jobs page</a>'
     
    );
}