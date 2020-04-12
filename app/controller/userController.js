let signUp = (req,res)=>
{
    console.log('inside signup')
}

let signIn = (req,res)=>
{
    console.log('inside signIn')
}

let signOut = (req,res)=>
{
    console.log('inside signOut')
}

module.exports=
{
    signUp:signUp,
    signIn:signIn,
    signOut:signOut
}