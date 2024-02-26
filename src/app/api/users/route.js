export default function loginHandler(req , res){
    console.log(req.body)

    return res.json('login route')
}